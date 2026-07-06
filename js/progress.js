const Progress = {
  render() {
    const container = document.getElementById('view-progress');
    const logs = Store.getWorkoutLogs();

    if (logs.length < 2) {
      container.innerHTML = `<div class="empty-state">
        <p>You need at least 2 workouts to see your progress.</p>
        <p style="font-size:0.85rem">Keep training and come back here.</p>
      </div>`;
      return;
    }

    let html = '';

    html += this._renderStats(logs);
    html += this._renderExerciseProgress(logs);

    container.innerHTML = html;
  },

  _renderStats(logs) {
    const totalWorkouts = logs.length;
    const thisWeek = logs.filter(l => l.week === Store._getWeekNumber()).length;

    const totalVolume = logs.reduce((acc, log) => {
      if (!log.exercises) return acc;
      log.exercises.forEach(ex => {
        if (ex.sets) {
          ex.sets.forEach(s => {
            if (s.reps && s.weight) acc += s.reps * s.weight;
          });
        }
      });
      return acc;
    }, 0);

    const totalPullups = logs.reduce((acc, log) => {
      if (!log.exercises) return acc;
      log.exercises.forEach(ex => {
        if (ex.id && ex.id.includes('dominada')) {
          if (ex.sets) {
            ex.sets.forEach(s => {
              if (s.reps) acc += s.reps;
            });
          }
        }
      });
      return acc;
    }, 0);

    return `<div class="stat-grid">
      <div class="stat-card">
        <div class="stat-value">${totalWorkouts}</div>
        <div class="stat-label">Total workouts</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${thisWeek}/3</div>
        <div class="stat-label">This week</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Math.round(totalVolume).toLocaleString()}</div>
        <div class="stat-label">Total volume (kg)</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${totalPullups}</div>
        <div class="stat-label">Total pull-ups</div>
      </div>
    </div>`;
  },

  _renderExerciseProgress(logs) {
    const exerciseMap = {};

    logs.forEach(log => {
      const day = ROUTINE[log.dayId];
      if (!day || !log.exercises) return;

      log.exercises.forEach(ex => {
        const exDef = day.exercises.find(e => e.id === ex.id);
        if (!exDef || !ex.sets) return;

        if (!exerciseMap[ex.id]) {
          exerciseMap[ex.id] = { name: exDef.name, entries: [] };
        }

        const bestSet = ex.sets.reduce((best, s) => {
          if (!s.reps) return best;
          const vol = (s.reps || 0) * (s.weight || 0);
          const bestVol = (best.reps || 0) * (best.weight || 0);
          return vol > bestVol ? s : best;
        }, { reps: 0, weight: 0 });

        const totalReps = ex.sets.reduce((acc, s) => acc + (s.reps || 0) + (s.repsL || 0) + (s.repsR || 0), 0);

        exerciseMap[ex.id].entries.push({
          date: log.date,
          bestReps: bestSet.reps || 0,
          bestWeight: bestSet.weight || 0,
          totalReps: totalReps,
          feeling: ex.feeling
        });
      });
    });

    let html = '<h3 style="color:var(--accent);margin:16px 0 8px">Progress by exercise</h3>';

    Object.values(exerciseMap).forEach(ex => {
      if (ex.entries.length < 1) return;

      const first = ex.entries[0];
      const last = ex.entries[ex.entries.length - 1];

      const repsDiff = last.totalReps - first.totalReps;
      const weightDiff = last.bestWeight - first.bestWeight;

      let trend = '';
      if (repsDiff > 0 || weightDiff > 0) {
        trend = `<span style="color:var(--success)">&#9650;`;
        if (weightDiff > 0) trend += ` +${weightDiff}kg`;
        if (repsDiff > 0) trend += ` +${repsDiff} reps`;
        trend += `</span>`;
      } else if (repsDiff < 0 && weightDiff <= 0) {
        trend = `<span style="color:var(--danger)">&#9660; ${repsDiff} reps</span>`;
      } else {
        trend = `<span style="color:var(--text-dim)">= no change</span>`;
      }

      html += `<div class="card">
        <div class="exercise-name">${ex.name}</div>
        <div style="font-size:0.85rem;margin:4px 0">${trend}</div>
        <div style="font-size:0.8rem;color:var(--text-dim)">`;

      ex.entries.forEach(entry => {
        html += `<div style="display:flex;justify-content:space-between;padding:2px 0">
          <span>${entry.date}</span>
          <span>${entry.totalReps} reps${entry.bestWeight ? ' @ ' + entry.bestWeight + 'kg' : ''}</span>
          ${entry.feeling ? `<span class="history-feeling feeling-${entry.feeling}">${entry.feeling}</span>` : ''}
        </div>`;
      });

      html += `</div></div>`;
    });

    return html;
  }
};
