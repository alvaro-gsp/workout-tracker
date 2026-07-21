const Progress = {
  _COLORS: {
    weight: '#3987e5',
    reps: '#008300',
    volume: '#d55181',
    grid: '#333',
    text: '#888',
    textPrimary: '#e0e0e0',
    surface: '#1a1a1a',
    success: '#66bb6a',
    danger: '#ef5350',
    accent: '#4fc3f7',
  },

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

    const exerciseData = this._buildExerciseData(logs);
    let html = '';
    html += this._renderStats(logs);
    html += '<h3 class="progress-section-title">Trends</h3>';
    Object.values(exerciseData).forEach(ex => {
      if (ex.entries.length < 2) return;
      html += this._renderChart(ex);
    });
    html += '<h3 class="progress-section-title">Progress summary</h3>';
    Object.values(exerciseData).forEach(ex => {
      if (ex.entries.length < 1) return;
      html += this._renderTable(ex);
    });

    container.innerHTML = html;
    this._attachTooltips(container);
  },

  _buildExerciseData(logs) {
    const map = {};
    logs.forEach(log => {
      const day = ROUTINE[log.dayId];
      if (!day || !log.exercises) return;
      log.exercises.forEach(ex => {
        const allExDefs = [];
        day.exercises.forEach(e => {
          allExDefs.push(e);
          if (e.alternatives) allExDefs.push(...e.alternatives);
        });
        const exDef = allExDefs.find(e => e.id === ex.id);
        if (!exDef || !ex.sets) return;

        if (!map[ex.id]) {
          map[ex.id] = { id: ex.id, name: exDef.name, unilateral: exDef.unilateral || false, entries: [] };
        }

        const validSets = ex.sets.filter(s => !s.skipped);
        if (!validSets.length) return;

        const maxWeight = validSets.reduce((m, s) => Math.max(m, s.weight || 0), 0);
        let totalReps;
        if (exDef.unilateral) {
          totalReps = validSets.reduce((a, s) => a + (s.repsL || 0) + (s.repsR || 0), 0);
        } else {
          totalReps = validSets.reduce((a, s) => a + (s.reps || 0), 0);
        }
        const completedSets = validSets.length;
        const bandWeight = validSets.reduce((m, s) => Math.max(m, s.bandWeight || 0), 0);
        const volume = validSets.reduce((a, s) => {
          const r = s.reps || ((s.repsL || 0) + (s.repsR || 0)) / 2;
          return a + r * ((s.weight || 0) + (s.bandWeight || 0));
        }, 0);

        map[ex.id].entries.push({
          date: log.date || new Date(log.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          dateShort: this._shortDate(log.timestamp || log.date),
          timestamp: log.timestamp,
          maxWeight, bandWeight, totalReps, completedSets, volume: Math.round(volume)
        });
      });
    });
    return map;
  },

  _shortDate(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    if (isNaN(d)) return String(ts).slice(0, 5);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  },

  _renderStats(logs) {
    const totalWorkouts = logs.length;
    const thisWeek = logs.filter(l => l.week === Store._getWeekNumber()).length;
    const totalVolume = logs.reduce((acc, log) => {
      if (!log.exercises) return acc;
      log.exercises.forEach(ex => {
        if (ex.sets) ex.sets.forEach(s => {
          if (s.reps && s.weight) acc += s.reps * s.weight;
        });
      });
      return acc;
    }, 0);
    const totalPullups = logs.reduce((acc, log) => {
      if (!log.exercises) return acc;
      log.exercises.forEach(ex => {
        if (ex.id && ex.id.includes('pullup') || ex.id.includes('chinup') && ex.sets) {
          ex.sets.forEach(s => { if (s.reps) acc += s.reps; });
        }
      });
      return acc;
    }, 0);

    return `<div class="stat-grid">
      <div class="stat-card"><div class="stat-value">${totalWorkouts}</div><div class="stat-label">Total workouts</div></div>
      <div class="stat-card"><div class="stat-value">${thisWeek}/3</div><div class="stat-label">This week</div></div>
      <div class="stat-card"><div class="stat-value">${Math.round(totalVolume).toLocaleString()}</div><div class="stat-label">Total volume (kg)</div></div>
      <div class="stat-card"><div class="stat-value">${totalPullups}</div><div class="stat-label">Total pull-ups</div></div>
    </div>`;
  },

  _renderChart(ex) {
    const entries = ex.entries;
    const W = 320, H = 160, PAD_L = 38, PAD_R = 12, PAD_T = 24, PAD_B = 28;
    const plotW = W - PAD_L - PAD_R;
    const plotH = H - PAD_T - PAD_B;
    const n = entries.length;

    const hasBand = entries.some(e => e.bandWeight > 0);
    const metrics = [
      { key: 'maxWeight', label: 'Weight (kg)', color: this._COLORS.weight },
      ...(hasBand ? [{ key: 'bandWeight', label: 'Band (kg)', color: this._COLORS.volume }] : []),
      { key: 'totalReps', label: 'Reps', color: this._COLORS.reps },
    ];

    let chartsHtml = '';

    metrics.forEach(metric => {
      const vals = entries.map(e => e[metric.key]);
      if (vals.every(v => v === 0)) return;
      const minV = Math.min(...vals);
      const maxV = Math.max(...vals);
      const range = maxV - minV || 1;
      const padRange = range * 0.1;
      const yMin = Math.max(0, minV - padRange);
      const yMax = maxV + padRange;
      const yRange = yMax - yMin || 1;

      const points = entries.map((e, i) => {
        const x = PAD_L + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
        const y = PAD_T + plotH - ((e[metric.key] - yMin) / yRange) * plotH;
        return { x, y, val: e[metric.key], date: e.dateShort };
      });

      const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

      const areaD = pathD +
        ` L${points[points.length - 1].x.toFixed(1)},${PAD_T + plotH}` +
        ` L${points[0].x.toFixed(1)},${PAD_T + plotH} Z`;

      const gridLines = 4;
      let gridHtml = '';
      for (let i = 0; i <= gridLines; i++) {
        const y = PAD_T + (i / gridLines) * plotH;
        const val = yMax - (i / gridLines) * yRange;
        gridHtml += `<line x1="${PAD_L}" y1="${y}" x2="${W - PAD_R}" y2="${y}" stroke="${this._COLORS.grid}" stroke-width="1"/>`;
        gridHtml += `<text x="${PAD_L - 6}" y="${y + 3}" fill="${this._COLORS.text}" font-size="9" text-anchor="end" font-family="system-ui">${this._fmtVal(val)}</text>`;
      }

      const xLabelsHtml = this._xLabels(entries, points, PAD_T, plotH, PAD_B);

      const endPt = points[points.length - 1];
      const startPt = points[0];
      const endLabel = `<text x="${endPt.x}" y="${endPt.y - 8}" fill="${this._COLORS.textPrimary}" font-size="10" text-anchor="middle" font-weight="600" font-family="system-ui">${this._fmtVal(endPt.val)}</text>`;

      const dotsHtml = points.map((p, i) =>
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="${metric.color}" stroke="${this._COLORS.surface}" stroke-width="2"/>` +
        `<circle class="progress-hit" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="12" fill="transparent" data-tip="${p.date}: ${this._fmtVal(p.val)} ${metric.label}"/>`
      ).join('');

      chartsHtml += `
        <div class="progress-chart-mini">
          <div class="progress-chart-label">${metric.label}</div>
          <svg viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="xMidYMid meet">
            ${gridHtml}
            <path d="${areaD}" fill="${metric.color}" opacity="0.1"/>
            <path d="${pathD}" fill="none" stroke="${metric.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            ${dotsHtml}
            ${endLabel}
            ${xLabelsHtml}
          </svg>
        </div>`;
    });

    if (!chartsHtml) return '';

    return `<div class="card progress-card">
      <div class="exercise-name">${ex.name}</div>
      <div class="progress-charts-row">${chartsHtml}</div>
    </div>`;
  },

  _xLabels(entries, points, padT, plotH, padB) {
    const n = entries.length;
    if (n <= 6) {
      return points.map(p =>
        `<text x="${p.x.toFixed(1)}" y="${padT + plotH + padB - 4}" fill="${this._COLORS.text}" font-size="8" text-anchor="middle" font-family="system-ui">${p.date}</text>`
      ).join('');
    }
    const step = Math.ceil(n / 5);
    return points.filter((_, i) => i === 0 || i === n - 1 || i % step === 0).map(p =>
      `<text x="${p.x.toFixed(1)}" y="${padT + plotH + padB - 4}" fill="${this._COLORS.text}" font-size="8" text-anchor="middle" font-family="system-ui">${p.date}</text>`
    ).join('');
  },

  _fmtVal(v) {
    if (v >= 1000) return (v / 1000).toFixed(1) + 'K';
    return Number.isInteger(v) ? v : v.toFixed(1);
  },

  _renderTable(ex) {
    const entries = ex.entries;
    const first = entries[0];
    const last = entries[entries.length - 1];

    const hasBand = entries.some(e => e.bandWeight > 0);
    const weightDiff = last.maxWeight - first.maxWeight;
    const bandDiff = (last.bandWeight || 0) - (first.bandWeight || 0);
    const repsDiff = last.totalReps - first.totalReps;
    const setsDiff = last.completedSets - first.completedSets;

    const arrow = (diff, unit) => {
      const u = unit || '';
      if (diff > 0) return `<span style="color:${this._COLORS.success}">+${diff}${u}</span>`;
      if (diff < 0) return `<span style="color:${this._COLORS.danger}">${diff}${u}</span>`;
      return `<span style="color:${this._COLORS.text}">0</span>`;
    };

    let rows = '';
    entries.forEach(e => {
      const weightCell = e.bandWeight > 0 ? `${e.maxWeight} + ${e.bandWeight}` : `${e.maxWeight}`;
      rows += `<tr>
        <td>${e.dateShort}</td>
        <td>${weightCell}</td>
        <td>${e.totalReps}</td>
        <td>${e.completedSets}</td>
        <td>${e.volume}</td>
      </tr>`;
    });

    return `<div class="card progress-table-card">
      <div class="exercise-name" style="margin-bottom:8px">${ex.name}</div>
      <div class="progress-delta-row">
        <div class="progress-delta">
          <span class="progress-delta-label">Weight</span>
          <span class="progress-delta-value">${arrow(weightDiff, 'kg')}</span>
        </div>
        ${hasBand ? `<div class="progress-delta">
          <span class="progress-delta-label">Band</span>
          <span class="progress-delta-value">${arrow(bandDiff, 'kg')}</span>
        </div>` : ''}
        <div class="progress-delta">
          <span class="progress-delta-label">Reps</span>
          <span class="progress-delta-value">${arrow(repsDiff)}</span>
        </div>
        <div class="progress-delta">
          <span class="progress-delta-label">Sets</span>
          <span class="progress-delta-value">${arrow(setsDiff)}</span>
        </div>
      </div>
      <div class="progress-table-scroll">
        <table class="progress-table">
          <thead>
            <tr><th>Date</th><th>${hasBand ? 'Wt+Band' : 'Weight'}</th><th>Reps</th><th>Sets</th><th>Volume</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="progress-table-footer">
        ${first.dateShort} &rarr; ${last.dateShort} &middot; ${entries.length} sessions
      </div>
    </div>`;
  },

  _attachTooltips(container) {
    let tip = container.querySelector('.progress-tooltip');
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'progress-tooltip';
      container.appendChild(tip);
    }
    container.querySelectorAll('.progress-hit').forEach(el => {
      el.addEventListener('pointerenter', (e) => {
        const text = el.getAttribute('data-tip');
        tip.textContent = text;
        tip.classList.add('visible');
        const rect = el.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        tip.style.left = (rect.left - cRect.left + rect.width / 2) + 'px';
        tip.style.top = (rect.top - cRect.top - 28) + 'px';
      });
      el.addEventListener('pointerleave', () => {
        tip.classList.remove('visible');
      });
    });
  }
};
