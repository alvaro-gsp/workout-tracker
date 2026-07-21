const History = {
  render() {
    const container = document.getElementById('view-history');
    const logs = Store.getWorkoutLogs();

    if (!logs.length) {
      container.innerHTML = `<div class="empty-state">
        <p>No workouts logged yet.</p>
        <p style="font-size:0.85rem">Go to the "Workout" tab and complete your first session.</p>
      </div>`;
      return;
    }

    const sorted = [...logs].reverse();

    let html = `<div class="btn-group" style="margin-bottom:16px">
      <button class="btn btn-secondary btn-small" id="export-json">Export JSON</button>
    </div>`;

    let currentWeek = null;

    sorted.forEach(log => {
      const day = ROUTINE[log.dayId];
      if (!day) return;

      if (log.week !== currentWeek) {
        currentWeek = log.week;
        html += `<div class="week-label">Week ${log.week}</div>`;
      }

      html += `<div class="card history-entry" data-logid="${log.id}">
        <div class="history-date">${UI.formatDate(log.timestamp)}</div>
        <div class="history-workout-name">${day.name} — ${day.subtitle}</div>`;

      if (log.exercises) {
        const allExDefs = [];
        day.exercises.forEach(e => {
          allExDefs.push(e);
          if (e.alternatives) allExDefs.push(...e.alternatives);
        });

        log.exercises.forEach(ex => {
          const exDef = allExDefs.find(e => e.id === ex.id);
          if (!exDef) return;
          const validSets = ex.sets?.filter(s => s.reps !== null || s.repsL !== null || s.skipped) || [];
          if (!validSets.length) return;

          const unilateral = validSets.some(s => s.repsL != null || s.repsR != null);

          html += `<div class="history-exercise-block">
            <div class="history-exercise-name">${exDef.name}</div>
            <table class="history-table">
              <thead><tr>
                <th>Set</th>
                <th>${unilateral ? 'Reps (L/R)' : 'Reps'}</th>
                <th>Weight</th>
                <th>Band</th>
              </tr></thead>
              <tbody>`;

          validSets.forEach((s, i) => {
            if (s.skipped) {
              html += `<tr class="history-skipped"><td>${i + 1}</td><td colspan="3">Skipped</td></tr>`;
              return;
            }
            const reps = unilateral ? `${s.repsL || 0} / ${s.repsR || 0}` : `${s.reps || 0}`;
            const weight = s.weight ? `${s.weight} kg` : '-';
            const band = s.bandWeight ? `${s.bandWeight} kg` : '-';
            html += `<tr>
              <td>${i + 1}</td>
              <td>${reps}</td>
              <td>${weight}</td>
              <td>${band}</td>
            </tr>`;
          });

          html += `</tbody></table>`;

          if (ex.notes) {
            html += `<div class="history-notes">${ex.notes}</div>`;
          }
          html += `</div>`;
        });
      }

      html += `<button class="btn btn-small btn-danger" style="margin-top:8px" data-delete="${log.id}">Delete</button>`;
      html += `</div>`;
    });

    container.innerHTML = html;

    container.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => {
        const logId = btn.dataset.delete;
        UI.showModal(`
          <h3 style="margin-bottom:12px">Delete workout?</h3>
          <p style="color:var(--text-dim);margin-bottom:16px">This action cannot be undone.</p>
          <div class="btn-group">
            <button class="btn btn-secondary" onclick="UI.hideModal()">Cancel</button>
            <button class="btn btn-danger" id="confirm-delete" data-id="${logId}">Delete</button>
          </div>
        `);
        document.getElementById('confirm-delete').addEventListener('click', () => {
          Store.deleteWorkoutLog(logId);
          UI.hideModal();
          History.render();
        });
      });
    });

    document.getElementById('export-json')?.addEventListener('click', () => {
      const data = Store.exportData();
      this._download(JSON.stringify(data, null, 2), `workout-tracker-${data.user}-${new Date().toISOString().slice(0,10)}.json`, 'application/json');
    });

  },

  _download(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
};
