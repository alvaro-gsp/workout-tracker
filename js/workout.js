const Workout = {
  _timers: {},

  _beepCtx: null,

  _beep() {
    try {
      if (!this._beepCtx) this._beepCtx = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = this._beepCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = 'square';
      gain.gain.value = 0.3;
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {}
  },

  _beepFinal() {
    try {
      if (!this._beepCtx) this._beepCtx = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = this._beepCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 1200;
      osc.type = 'square';
      gain.gain.value = 0.4;
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {}
  },

  _svgTimerOn: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/><path d="M12 2v2"/></svg>',

  _svgTimerOff: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/><path d="M12 2v2"/><line x1="4" y1="4" x2="20" y2="20" stroke-width="2.5"/></svg>',

  _svgSwap: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8"/><path d="M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16"/></svg>',

  _activeExercises: {},

  render() {
    const container = document.getElementById('view-workout');
    this._stopAllTimers();
    container.innerHTML = '';

    container.innerHTML += `<div class="day-selector">
      ${Object.values(ROUTINE).map((day, i) => `
        <button class="day-btn" data-day="${day.id}">
          <span class="day-name">${day.name}</span>
          <span class="day-label">${day.subtitle}</span>
        </button>
      `).join('')}
    </div>`;

    container.innerHTML += '<div id="workout-area"></div>';

    container.querySelectorAll('.day-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._stopAllTimers();
        this._activeExercises = {};
        this.renderDay(btn.dataset.day);
      });
    });

    const firstBtn = container.querySelector('[data-day="dayA"]');
    firstBtn.classList.add('active');
    this.renderDay('dayA');
  },

  renderDay(dayId) {
    const day = ROUTINE[dayId];
    const area = document.getElementById('workout-area');
    this._currentDraftId = null;
    if (!this._activeExercises) this._activeExercises = {};
    const lastLog = this._getLastLogForDay(dayId);

    let html = '';

    day.exercises.forEach((ex, exIdx) => {
      const activeEx = this._activeExercises[exIdx] || ex;
      const lastEx = lastLog?.exercises?.find(e => e.id === activeEx.id);

      const lastMaxWeight = lastEx?.sets
        ?.filter(s => !s.skipped)
        .reduce((max, s) => Math.max(max, s.weight || 0), 0) || 0;
      const suggestedLoad = lastMaxWeight > 0
        ? `Carga sugerida: ${lastMaxWeight} kg`
        : 'Elige una carga que puedas manejar con buena tecnica';

      const hasAlts = ex.alternatives && ex.alternatives.length > 0;
      const suggestionBtn = hasAlts
        ? `<button class="suggestion-btn" data-ex="${exIdx}" title="Alternativas">${this._svgSwap}</button>`
        : '';

      html += `<div class="card" id="ex-${exIdx}">
        <div class="exercise-header">
          <div style="flex:1">
            <div class="exercise-name">${activeEx.name} ${suggestionBtn}</div>
            <div class="exercise-target">${activeEx.sets}x${activeEx.repsTarget} | Descanso: ${activeEx.rest}s</div>
            <div class="exercise-material">${suggestedLoad}</div>
          </div>
          <div class="timer-inline">
            <span class="timer-bar-display hidden" id="timer-display-${exIdx}">0:00</span>
            <button class="timer-exercise-btn" data-ex="${exIdx}" data-rest="${activeEx.rest}" title="Descanso ${activeEx.rest}s">
              ${this._svgTimerOn}
            </button>
          </div>
        </div>`;

      if (activeEx.notes) {
        html += `<div style="font-size:0.75rem;color:var(--text-dim);margin-bottom:10px;font-style:italic">${activeEx.notes}</div>`;
      }

      const isUnilateral = activeEx.unilateral || false;
      const isSeconds = activeEx.unit === 'seconds';
      const repsLabel = isSeconds ? 'Segs' : 'Reps';

      html += `<div class="set-grid-v2">
        <div class="set-grid-header-row">
          <div class="sg-h"></div>
          ${isUnilateral ? '<div class="sg-h">Reps/L</div><div class="sg-h">Reps/R</div>' : `<div class="sg-h">${repsLabel}</div>`}
          <div class="sg-h">Peso</div>
          <div class="sg-h">Estado</div>
          <div class="sg-h"></div>
        </div>`;

      for (let s = 0; s < activeEx.sets; s++) {
        const prevSet = lastEx?.sets?.[s];
        const prevReps = prevSet?.reps || '';
        const prevRepsL = prevSet?.repsL || '';
        const prevRepsR = prevSet?.repsR || '';
        const prevWeight = prevSet?.weight || '';
        const placeholder_r = prevReps ? `${prevReps}` : '';
        const placeholder_rl = prevRepsL ? `${prevRepsL}` : '';
        const placeholder_rr = prevRepsR ? `${prevRepsR}` : '';
        const placeholder_w = prevWeight ? `${prevWeight}` : '';

        html += `<div class="set-row-v2">
          <div class="set-label-v2">S${s + 1}</div>`;

        if (isUnilateral) {
          html += `<input type="number" class="set-input set-input-small" data-ex="${exIdx}" data-set="${s}" data-field="repsL" placeholder="${placeholder_rl}" inputmode="numeric" min="0">
          <input type="number" class="set-input set-input-small" data-ex="${exIdx}" data-set="${s}" data-field="repsR" placeholder="${placeholder_rr}" inputmode="numeric" min="0">`;
        } else {
          html += `<input type="number" class="set-input set-input-small" data-ex="${exIdx}" data-set="${s}" data-field="reps" placeholder="${placeholder_r}" inputmode="numeric" min="0">`;
        }

        html += `<input type="number" class="set-input set-input-small" data-ex="${exIdx}" data-set="${s}" data-field="weight" placeholder="${placeholder_w}" inputmode="decimal" step="0.5" min="0">
          <div class="feeling-faces" data-ex="${exIdx}" data-set="${s}">
            <button class="face-btn" data-feeling="good" title="Bien">&#128578;</button>
            <button class="face-btn" data-feeling="meh" title="Regular">&#128528;</button>
            <button class="face-btn" data-feeling="dying" title="Moribundo">&#128565;</button>
          </div>
          <button class="skip-btn" data-ex="${exIdx}" data-set="${s}" title="No pude hacerla"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg></button>
        </div>`;
      }

      html += `</div>`;

      html += `<textarea class="notes-input" data-ex="${exIdx}" placeholder="Notas: sensaciones, dolor, ajustes..."></textarea>`;
      html += `</div>`;
    });

    html += `<div class="autosave-bar" id="autosave-bar">
      <span class="autosave-status" id="autosave-status">Sin cambios</span>
    </div>`;

    html += `<button class="btn btn-sync" id="sync-workout" data-day="${dayId}" style="margin-top:12px">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8"/><path d="M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16"/></svg>
      Sincronizar
    </button>`;

    area.innerHTML = html;
    this._bindEvents(area, dayId);
  },

  _bindEvents(area, dayId) {
    area.querySelectorAll('.face-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.feeling-faces');
        parent.querySelectorAll('.face-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this._autosave(dayId);
      });
    });

    area.querySelectorAll('.skip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const row = btn.closest('.set-row-v2');
        if (btn.classList.contains('active')) {
          row.classList.add('skipped');
          row.querySelectorAll('.set-input').forEach(inp => { inp.disabled = true; inp.value = ''; });
          row.querySelectorAll('.face-btn').forEach(fb => { fb.classList.remove('selected'); fb.disabled = true; });
        } else {
          row.classList.remove('skipped');
          row.querySelectorAll('.set-input').forEach(inp => inp.disabled = false);
          row.querySelectorAll('.face-btn').forEach(fb => fb.disabled = false);
        }
        this._autosave(dayId);
      });
    });

    area.querySelectorAll('.timer-exercise-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const exIdx = btn.dataset.ex;
        const rest = parseInt(btn.dataset.rest);
        if (this._timers[exIdx]) {
          this._stopExTimer(exIdx);
          btn.innerHTML = this._svgTimerOn;
          btn.classList.remove('timer-active');
        } else {
          this._startExTimer(exIdx, rest);
          btn.innerHTML = this._svgTimerOff;
          btn.classList.add('timer-active');
        }
      });
    });

    area.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const exIdx = parseInt(btn.dataset.ex);
        const day = ROUTINE[dayId];
        const originalEx = day.exercises[exIdx];
        const alts = originalEx.alternatives || [];
        const currentActive = this._activeExercises[exIdx] || originalEx;

        const options = [originalEx, ...alts].filter(a => a.id !== currentActive.id);

        let listHtml = '<h3 style="margin-bottom:12px;color:var(--accent)">Cambiar ejercicio</h3>';
        options.forEach(alt => {
          listHtml += `<button class="btn btn-secondary alt-option" data-alt-id="${alt.id}" style="width:100%;margin-bottom:8px;text-align:left">${alt.name}</button>`;
        });
        listHtml += `<button class="btn btn-secondary" onclick="UI.hideModal()" style="width:100%;margin-top:4px">Cancelar</button>`;

        UI.showModal(listHtml);

        document.querySelectorAll('.alt-option').forEach(optBtn => {
          optBtn.addEventListener('click', () => {
            const altId = optBtn.dataset.altId;
            const selected = [originalEx, ...alts].find(a => a.id === altId);
            if (selected) {
              this._activeExercises[exIdx] = selected;
              UI.hideModal();
              this.renderDay(dayId);
            }
          });
        });
      });
    });

    area.querySelectorAll('.set-input').forEach(input => {
      input.addEventListener('input', () => {
        const val = parseFloat(input.value);
        if (val < 0) input.value = 0;
        this._autosave(dayId);
      });
    });

    area.querySelectorAll('.notes-input').forEach(input => {
      input.addEventListener('input', () => this._autosave(dayId));
    });

    document.getElementById('sync-workout')?.addEventListener('click', () => {
      const data = Store.exportData();
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const users = Store.getUsers();
      const user = users.find(u => u.id === Store.getCurrentUser());
      a.download = `workout-tracker-${user?.name || 'data'}-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);

      UI.showModal(`
        <div style="text-align:center">
          <h3 style="color:var(--success);margin-bottom:8px">Datos exportados</h3>
          <p style="color:var(--text-dim);margin-bottom:16px">Archivo descargado. Puedes compartirlo o guardarlo como backup.</p>
          <button class="btn btn-primary" onclick="UI.hideModal()">OK</button>
        </div>
      `);
    });
  },

  _startExTimer(exIdx, seconds) {
    this._stopExTimer(exIdx);

    const display = document.getElementById(`timer-display-${exIdx}`);
    if (!display) return;

    display.classList.remove('hidden');
    display.classList.remove('timer-warning', 'timer-go');
    let remaining = seconds;
    this._updateExTimerDisplay(display, remaining);

    this._timers[exIdx] = setInterval(() => {
      remaining--;
      this._updateExTimerDisplay(display, remaining);

      if (remaining <= 5 && remaining > 0) {
        this._beep();
        display.classList.add('timer-warning');
      }

      if (remaining <= 0) {
        this._stopExTimer(exIdx);
        this._beepFinal();
        display.textContent = 'GO!';
        display.classList.remove('timer-warning');
        display.classList.add('timer-go');
        const btn = document.querySelector(`.timer-exercise-btn[data-ex="${exIdx}"]`);
        if (btn) {
          btn.innerHTML = this._svgTimerOn;
          btn.classList.remove('timer-active');
        }
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 200, 100, 200]);
        setTimeout(() => {
          display.classList.add('hidden');
          display.classList.remove('timer-go');
        }, 3000);
      }
    }, 1000);
  },

  _stopExTimer(exIdx) {
    if (this._timers[exIdx]) {
      clearInterval(this._timers[exIdx]);
      delete this._timers[exIdx];
    }
    const display = document.getElementById(`timer-display-${exIdx}`);
    if (display) display.classList.add('hidden');
  },

  _stopAllTimers() {
    Object.keys(this._timers).forEach(k => {
      clearInterval(this._timers[k]);
    });
    this._timers = {};
  },

  _updateExTimerDisplay(display, seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    display.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  },

  _autosaveTimeout: null,
  _currentDraftId: null,

  _autosave(dayId) {
    clearTimeout(this._autosaveTimeout);
    this._autosaveTimeout = setTimeout(() => {
      const data = this._collectWorkoutData(dayId);
      if (!data) return;

      const hasData = data.exercises.some(ex => ex.sets.some(s => s.reps !== null || s.repsL !== null || s.repsR !== null || s.skipped));
      if (!hasData) return;

      const draftKey = `draft_${dayId}_${new Date().toISOString().slice(0, 10)}`;

      if (!this._currentDraftId) {
        const existing = Store.get(draftKey, null);
        if (existing) {
          this._currentDraftId = existing.id;
        }
      }

      if (this._currentDraftId) {
        const logs = Store.get('logs', []);
        const idx = logs.findIndex(l => l.id === this._currentDraftId);
        if (idx >= 0) {
          logs[idx].exercises = data.exercises;
          logs[idx].timestamp = new Date().toISOString();
          Store.set('logs', logs);
        } else {
          this._currentDraftId = null;
          this._autosave(dayId);
          return;
        }
      } else {
        const log = Store.saveWorkoutLog(dayId, data);
        this._currentDraftId = log.id;
        Store.set(draftKey, { id: log.id });
      }

      const status = document.getElementById('autosave-status');
      if (status) {
        status.textContent = 'Guardado';
        status.style.color = 'var(--success)';
        setTimeout(() => {
          if (status) {
            status.textContent = 'Autoguardado activo';
            status.style.color = 'var(--text-dim)';
          }
        }, 1500);
      }
    }, 500);
  },

  _collectWorkoutData(dayId) {
    const day = ROUTINE[dayId];
    if (!day) return null;

    const exercises = [];
    day.exercises.forEach((ex, exIdx) => {
      const activeEx = this._activeExercises[exIdx] || ex;
      const sets = [];
      const isUnilateral = activeEx.unilateral || false;
      for (let s = 0; s < activeEx.sets; s++) {
        const weightInput = document.querySelector(`[data-ex="${exIdx}"][data-set="${s}"][data-field="weight"]`);
        const skipBtn = document.querySelector(`.skip-btn[data-ex="${exIdx}"][data-set="${s}"]`);
        const faceBtn = document.querySelector(`.feeling-faces[data-ex="${exIdx}"][data-set="${s}"] .face-btn.selected`);

        const setData = {
          weight: weightInput?.value ? parseFloat(weightInput.value) : null,
          skipped: skipBtn?.classList.contains('active') || false,
          feeling: faceBtn?.dataset.feeling || null
        };

        if (isUnilateral) {
          const repsLInput = document.querySelector(`[data-ex="${exIdx}"][data-set="${s}"][data-field="repsL"]`);
          const repsRInput = document.querySelector(`[data-ex="${exIdx}"][data-set="${s}"][data-field="repsR"]`);
          setData.repsL = repsLInput?.value ? parseFloat(repsLInput.value) : null;
          setData.repsR = repsRInput?.value ? parseFloat(repsRInput.value) : null;
          setData.reps = null;
        } else {
          const repsInput = document.querySelector(`[data-ex="${exIdx}"][data-set="${s}"][data-field="reps"]`);
          setData.reps = repsInput?.value ? parseFloat(repsInput.value) : null;
        }

        sets.push(setData);
      }

      const notesInput = document.querySelector(`textarea[data-ex="${exIdx}"]`);
      exercises.push({
        id: activeEx.id,
        sets: sets,
        notes: notesInput?.value || ''
      });
    });

    return { exercises };
  },

  _getLastLogForDay(dayId) {
    const logs = Store.getWorkoutLogs();
    const dayLogs = logs.filter(l => l.dayId === dayId);
    return dayLogs.length ? dayLogs[dayLogs.length - 1] : null;
  }
};
