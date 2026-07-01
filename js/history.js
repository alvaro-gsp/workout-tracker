const History = {
  render() {
    const container = document.getElementById('view-history');
    const logs = Store.getWorkoutLogs();

    if (!logs.length) {
      container.innerHTML = `<div class="empty-state">
        <p>Sin entrenos registrados todavia.</p>
        <p style="font-size:0.85rem">Ve a la pestana "Entreno" y completa tu primera sesion.</p>
      </div>`;
      return;
    }

    const sorted = [...logs].reverse();

    let html = `<div class="btn-group" style="margin-bottom:16px">
      <button class="btn btn-secondary btn-small" id="export-json">Exportar JSON</button>
    </div>`;

    let currentWeek = null;

    sorted.forEach(log => {
      const day = ROUTINE[log.dayId];
      if (!day) return;

      if (log.week !== currentWeek) {
        currentWeek = log.week;
        html += `<div class="week-label">Semana ${log.week}</div>`;
      }

      html += `<div class="card history-entry" data-logid="${log.id}">
        <div class="history-date">${UI.formatDate(log.timestamp)}</div>
        <div class="history-workout-name">${day.name} — ${day.subtitle}</div>`;

      if (log.exercises) {
        log.exercises.forEach(ex => {
          const exDef = day.exercises.find(e => e.id === ex.id);
          if (!exDef) return;

          const feelingEmojis = { great: '💪', good: '🙂', meh: '😐', hard: '😫', dying: '🤯' };

          const setsText = ex.sets
            ?.filter(s => s.reps !== null || s.repsL !== null || s.skipped)
            .map(s => {
              if (s.skipped) return '✗';
              let t;
              if (s.repsL != null || s.repsR != null) {
                t = `L${s.repsL || 0}/R${s.repsR || 0}`;
              } else {
                t = `${s.reps}`;
              }
              if (s.weight) t += `x${s.weight}kg`;
              if (s.feeling) t += feelingEmojis[s.feeling] || '';
              return t;
            })
            .join(' | ') || 'sin datos';

          html += `<div class="history-exercise">
            <strong>${exDef.name}</strong>: ${setsText}
          </div>`;

          if (ex.notes) {
            html += `<div style="font-size:0.75rem;color:var(--text-dim);padding-left:8px;font-style:italic">${ex.notes}</div>`;
          }
        });
      }

      html += `<button class="btn btn-small btn-danger" style="margin-top:8px" data-delete="${log.id}">Eliminar</button>`;
      html += `</div>`;
    });

    container.innerHTML = html;

    container.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => {
        const logId = btn.dataset.delete;
        UI.showModal(`
          <h3 style="margin-bottom:12px">Eliminar entreno?</h3>
          <p style="color:var(--text-dim);margin-bottom:16px">Esta accion no se puede deshacer.</p>
          <div class="btn-group">
            <button class="btn btn-secondary" onclick="UI.hideModal()">Cancelar</button>
            <button class="btn btn-danger" id="confirm-delete" data-id="${logId}">Eliminar</button>
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
