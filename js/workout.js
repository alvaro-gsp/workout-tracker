const Workout = {
  _timer: null,
  _timerSeconds: 0,
  _timerMode: null,
  _timerRestTarget: 0,
  _beepCtx: null,

  _currentDayId: null,
  _currentExIdx: 0,
  _completedData: [],
  _activeExercises: {},

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

  _svgSwap: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8"/><path d="M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16"/></svg>',

  render() {
    const container = document.getElementById('view-workout');
    this._stopTimer();
    container.innerHTML = '';

    container.innerHTML += `<div class="day-selector">
      ${Object.values(ROUTINE).map((day) => `
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
        this._stopTimer();
        this._activeExercises = {};
        this._completedData = [];
        this._currentExIdx = 0;
        this._showSummary(btn.dataset.day);
      });
    });

    const firstBtn = container.querySelector('[data-day="dayA"]');
    firstBtn.classList.add('active');
    this._showSummary('dayA');
  },

  _showSummary(dayId) {
    this._currentDayId = dayId;
    this._currentDraftId = null;
    const day = ROUTINE[dayId];
    const area = document.getElementById('workout-area');
    const total = day.exercises.length;
    const hasSession = this._completedData && this._completedData.some(Boolean);

    let html = '<div class="card">';
    html += `<div class="card-title">${day.name} — ${day.subtitle}</div>`;
    html += '<div style="margin:12px 0">';
    day.exercises.forEach((ex, i) => {
      const done = this._completedData[i];
      const icon = done ? '<span style="color:var(--success);margin-right:4px">&#10003;</span>' : '';
      html += `<div style="padding:6px 0;font-size:0.9rem;color:var(--text)">
        <span style="color:var(--accent);font-weight:600">${i + 1}/${total}</span> ${icon}${ex.name}
      </div>`;
    });
    html += '</div>';
    html += `<button class="btn btn-primary" id="start-workout">${hasSession ? 'Continuar' : 'Start'}</button>`;
    html += '</div>';

    area.innerHTML = html;

    document.getElementById('start-workout').addEventListener('click', () => {
      if (!hasSession) {
        this._completedData = [];
        this._currentExIdx = 0;
        this._activeExercises = {};
      }
      this._enterSessionMode();
      this._renderExercise();
    });
  },

  _renderExercise() {
    const dayId = this._currentDayId;
    const day = ROUTINE[dayId];
    const exIdx = this._currentExIdx;
    const total = day.exercises.length;
    const originalEx = day.exercises[exIdx];
    const activeEx = this._activeExercises[exIdx] || originalEx;
    const lastLog = this._getLastLogForDay(dayId);
    const lastEx = lastLog?.exercises?.find(e => e.id === activeEx.id);
    const area = document.getElementById('workout-area');

    const lastMaxWeight = lastEx?.sets
      ?.filter(s => !s.skipped)
      .reduce((max, s) => Math.max(max, s.weight || 0), 0) || 0;
    const suggestedLoad = lastMaxWeight > 0
      ? `Carga sugerida: ${lastMaxWeight} kg`
      : 'Elige una carga que puedas manejar con buena tecnica';

    const hasAlts = originalEx.alternatives && originalEx.alternatives.length > 0;

    const isUnilateral = activeEx.unilateral || false;
    const isSeconds = activeEx.unit === 'seconds';
    const repsLabel = isSeconds ? 'Segs' : 'Reps';

    let html = '';

    html += `<div class="card exercise-active-card">
      <div class="toolbar-toggle">
        <button class="toggle-btn toggle-nav" id="go-home" title="Inicio">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"/></svg>
        </button>
        <button class="toggle-btn toggle-nav" id="prev-exercise" title="Anterior" ${exIdx === 0 ? 'disabled' : ''}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="toggle-btn toggle-nav" id="next-exercise" title="${exIdx < total - 1 ? 'Siguiente' : 'Finalizar'}">
          ${exIdx < total - 1
            ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
            : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'}
        </button>
        <button class="toggle-btn toggle-info" id="info-btn" title="Informacion">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </button>
        <button class="toggle-btn toggle-yt" id="yt-btn" title="Ver video">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.9 31.9 0 000 12a31.9 31.9 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.9 31.9 0 0024 12a31.9 31.9 0 00-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
        </button>
        ${hasAlts ? `<button class="toggle-btn toggle-swap" id="swap-btn" title="Alternativas">${this._svgSwap}</button>` : ''}
      </div>
      <div class="exercise-fixed-header">
        <div class="exercise-header-row">
          <div class="exercise-header-info">
            <div class="exercise-name">
              <span style="font-weight:700">${exIdx + 1}/${total}</span> ${activeEx.name}
            </div>
            <div class="exercise-target">${activeEx.sets}x${activeEx.repsTarget} | Descanso: ${activeEx.rest}s</div>
            <div class="exercise-material">${suggestedLoad}</div>
            ${activeEx.notes ? `<div style="font-size:0.75rem;color:var(--text-dim);margin-top:4px;font-style:italic">${activeEx.notes}</div>` : ''}
          </div>
          <div class="timer-box" id="global-timer">
            <div class="timer-toggle" id="timer-toggle">
              <button class="toggle-btn toggle-work" id="timer-work" title="Work">
                <svg class="toggle-icon-play" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><polygon points="10.5,9.5 16,13 10.5,16.5" fill="currentColor" stroke="none"/><path d="M9 2h6"/><path d="M12 2v2"/></svg>
                <svg class="toggle-icon-pause hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><rect x="9.5" y="9.5" width="2" height="7" rx="0.5" fill="currentColor" stroke="none"/><rect x="12.5" y="9.5" width="2" height="7" rx="0.5" fill="currentColor" stroke="none"/><path d="M9 2h6"/><path d="M12 2v2"/></svg>
              </button>
              <button class="toggle-btn toggle-rest" id="timer-rest" title="Rest">
                <svg class="toggle-icon-play" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><polygon points="10.5,9.5 16,13 10.5,16.5" fill="currentColor" stroke="none"/><path d="M9 2h6"/><path d="M12 2v2"/></svg>
                <svg class="toggle-icon-pause hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><rect x="9.5" y="9.5" width="2" height="7" rx="0.5" fill="currentColor" stroke="none"/><rect x="12.5" y="9.5" width="2" height="7" rx="0.5" fill="currentColor" stroke="none"/><path d="M9 2h6"/><path d="M12 2v2"/></svg>
              </button>
            </div>
            <div class="global-timer-display" id="global-timer-display">0:00</div>
          </div>
        </div>
      </div>`;

    html += `<div class="sets-scroll-area">
      <div class="set-grid-v2">
        <div class="set-grid-header-row">
          <div class="sg-h"></div>
          ${isUnilateral ? '<div class="sg-h">Reps/L</div><div class="sg-h">Reps/R</div>' : `<div class="sg-h">${repsLabel}</div>`}
          <div class="sg-h">Peso</div>
          <div class="sg-h">Estado</div>
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
        html += `<input type="number" class="set-input set-input-small" data-ex="0" data-set="${s}" data-field="repsL" placeholder="${placeholder_rl}" inputmode="numeric" min="0">
        <input type="number" class="set-input set-input-small" data-ex="0" data-set="${s}" data-field="repsR" placeholder="${placeholder_rr}" inputmode="numeric" min="0">`;
      } else {
        html += `<input type="number" class="set-input set-input-small" data-ex="0" data-set="${s}" data-field="reps" placeholder="${placeholder_r}" inputmode="numeric" min="0">`;
      }

      html += `<input type="number" class="set-input set-input-small" data-ex="0" data-set="${s}" data-field="weight" placeholder="${placeholder_w}" inputmode="decimal" step="0.5" min="0">
        <div class="status-strip" data-ex="0" data-set="${s}">
          <button class="strip-btn face-btn" data-feeling="good" title="Bien">&#128578;</button>
          <button class="strip-btn face-btn" data-feeling="meh" title="Regular">&#128528;</button>
          <button class="strip-btn face-btn" data-feeling="dying" title="Moribundo">&#129397;</button>
          <button class="strip-btn skip-btn" data-ex="0" data-set="${s}" title="No pude completarla">&#128128;</button>
        </div>
      </div>`;
    }

    html += `</div></div>`;

    html += `<textarea class="notes-input" data-ex="0" placeholder="Notas: sensaciones, dolor, ajustes..."></textarea>`;

    html += `</div>`;

    html += `<div class="autosave-bar" id="autosave-bar">
      <span class="autosave-status" id="autosave-status">Autoguardado activo</span>
    </div>`;

    area.innerHTML = html;
    this._bindExerciseEvents();
  },

  _bindExerciseEvents() {
    const area = document.getElementById('workout-area');
    const dayId = this._currentDayId;

    document.getElementById('timer-work')?.addEventListener('click', () => {
      if (this._timerMode === 'work' && this._timer) {
        this._pauseTimer();
      } else if (this._timerMode === 'work' && !this._timer) {
        this._resumeWorkTimer();
      } else {
        this._startWorkTimer();
      }
    });

    document.getElementById('timer-rest')?.addEventListener('click', () => {
      if (this._timerMode === 'rest' && this._timer) {
        this._pauseTimer();
      } else if (this._timerMode === 'rest' && !this._timer) {
        this._resumeRestTimer();
      } else {
        this._startRestTimer();
      }
    });

    area.querySelectorAll('.face-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.status-strip');
        parent.querySelectorAll('.face-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this._autosave(dayId);
      });
    });

    area.querySelectorAll('.skip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const allRows = Array.from(area.querySelectorAll('.set-row-v2'));
        const clickedRow = btn.closest('.set-row-v2');
        const clickedIdx = allRows.indexOf(clickedRow);
        const activating = !btn.classList.contains('active');

        if (activating) {
          allRows.forEach((row, i) => {
            if (i >= clickedIdx) {
              row.classList.add('skipped');
              row.querySelector('.skip-btn').classList.add('active');
              row.querySelectorAll('.set-input').forEach(inp => { inp.disabled = true; inp.value = ''; });
              row.querySelectorAll('.face-btn').forEach(fb => { fb.classList.remove('selected'); fb.disabled = true; });
            }
          });
        } else {
          allRows.forEach((row, i) => {
            if (i >= clickedIdx) {
              row.classList.remove('skipped');
              row.querySelector('.skip-btn').classList.remove('active');
              row.querySelectorAll('.set-input').forEach(inp => inp.disabled = false);
              row.querySelectorAll('.face-btn').forEach(fb => fb.disabled = false);
            }
          });
        }
        this._autosave(dayId);
      });
    });

    document.getElementById('swap-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const day = ROUTINE[dayId];
      const exIdx = this._currentExIdx;
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
            this._renderExercise();
          }
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

    document.getElementById('next-exercise')?.addEventListener('click', () => {
      this._saveCurrentExercise();
      this._goToNextExercise();
    });

    document.getElementById('prev-exercise')?.addEventListener('click', () => {
      this._saveCurrentExercise();
      this._stopTimer();
      this._currentExIdx--;
      this._renderExercise();
    });

    document.getElementById('go-home')?.addEventListener('click', () => {
      this._saveCurrentExercise();
      this._stopTimer();
      this._exitSessionMode();
      this._showSummary(this._currentDayId);
    });
  },

  _saveCurrentExercise() {
    const day = ROUTINE[this._currentDayId];
    const exIdx = this._currentExIdx;
    const activeEx = this._activeExercises[exIdx] || day.exercises[exIdx];
    const isUnilateral = activeEx.unilateral || false;

    const sets = [];
    for (let s = 0; s < activeEx.sets; s++) {
      const weightInput = document.querySelector(`[data-ex="0"][data-set="${s}"][data-field="weight"]`);
      const skipBtn = document.querySelector(`.skip-btn[data-ex="0"][data-set="${s}"]`);
      const faceBtn = document.querySelector(`.status-strip[data-ex="0"][data-set="${s}"] .face-btn.selected`);

      const setData = {
        weight: weightInput?.value ? parseFloat(weightInput.value) : null,
        skipped: skipBtn?.classList.contains('active') || false,
        feeling: faceBtn?.dataset.feeling || null
      };

      if (isUnilateral) {
        const repsLInput = document.querySelector(`[data-ex="0"][data-set="${s}"][data-field="repsL"]`);
        const repsRInput = document.querySelector(`[data-ex="0"][data-set="${s}"][data-field="repsR"]`);
        setData.repsL = repsLInput?.value ? parseFloat(repsLInput.value) : null;
        setData.repsR = repsRInput?.value ? parseFloat(repsRInput.value) : null;
        setData.reps = null;
      } else {
        const repsInput = document.querySelector(`[data-ex="0"][data-set="${s}"][data-field="reps"]`);
        setData.reps = repsInput?.value ? parseFloat(repsInput.value) : null;
      }

      sets.push(setData);
    }

    const notesInput = document.querySelector(`textarea[data-ex="0"]`);
    this._completedData[this._currentExIdx] = {
      id: activeEx.id,
      sets: sets,
      notes: notesInput?.value || ''
    };
  },

  _goToNextExercise() {
    const day = ROUTINE[this._currentDayId];
    this._stopTimer();

    if (this._currentExIdx < day.exercises.length - 1) {
      this._currentExIdx++;
      this._renderExercise();
    } else {
      this._finishWorkout();
    }
  },

  _finishWorkout() {
    this._stopTimer();
    this._exitSessionMode();
    const dayId = this._currentDayId;
    const data = { exercises: this._completedData.filter(Boolean) };

    const hasData = data.exercises.some(ex => ex.sets.some(s => s.reps !== null || s.repsL !== null || s.repsR !== null || s.skipped));
    if (hasData) {
      Store.saveWorkoutLog(dayId, data);
    }

    const area = document.getElementById('workout-area');
    area.innerHTML = `
      <div class="workout-complete-banner">
        <h3>Sesion completada</h3>
        <p style="color:var(--text-dim);margin-top:8px">Buen trabajo!</p>
      </div>
      <button class="btn btn-sync" id="sync-workout" style="margin-top:12px">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8"/><path d="M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16"/></svg>
        Sincronizar
      </button>
    `;

    document.getElementById('sync-workout')?.addEventListener('click', () => {
      const exportData = Store.exportData();
      const json = JSON.stringify(exportData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const users = Store.getUsers();
      const user = users.find(u => u.id === Store.getCurrentUser());
      a.download = `workout-tracker-${user?.name || 'data'}-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  },

  _startWorkTimer() {
    this._stopTimer();
    this._timerMode = 'work';
    this._timerSeconds = 0;
    this._updateTimerUI();

    this._timer = setInterval(() => {
      this._timerSeconds++;
      this._updateTimerUI();
    }, 1000);
  },

  _startRestTimer() {
    this._stopTimer();
    const day = ROUTINE[this._currentDayId];
    const ex = this._activeExercises[this._currentExIdx] || day.exercises[this._currentExIdx];
    this._timerMode = 'rest';
    this._timerRestTarget = ex.rest;
    this._timerSeconds = ex.rest;
    this._updateTimerUI();

    this._timer = setInterval(() => {
      this._timerSeconds--;
      this._updateTimerUI();

      if (this._timerSeconds <= 5 && this._timerSeconds > 0) {
        this._beep();
      }

      if (this._timerSeconds <= 0) {
        this._beepFinal();
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 200, 100, 200]);
        this._startWorkTimer();
      }
    }, 1000);
  },

  _resumeWorkTimer() {
    this._timer = setInterval(() => {
      this._timerSeconds++;
      this._updateTimerUI();
    }, 1000);
    this._updateTimerUI();
  },

  _resumeRestTimer() {
    this._timer = setInterval(() => {
      this._timerSeconds--;
      this._updateTimerUI();

      if (this._timerSeconds <= 5 && this._timerSeconds > 0) {
        this._beep();
      }

      if (this._timerSeconds <= 0) {
        this._beepFinal();
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 200, 100, 200]);
        this._startWorkTimer();
      }
    }, 1000);
    this._updateTimerUI();
  },

  _pauseTimer() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    this._updateToggleIcons();
  },

  _stopTimer() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    this._timerMode = null;
  },

  _updateTimerUI() {
    const display = document.getElementById('global-timer-display');
    const container = document.getElementById('global-timer');
    if (!display) return;

    const secs = Math.abs(this._timerSeconds);
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    display.textContent = `${mins}:${s.toString().padStart(2, '0')}`;

    container.classList.remove('timer-rest', 'timer-work', 'timer-warning');

    if (this._timerMode === 'rest') {
      if (this._timerSeconds <= 5) {
        container.classList.add('timer-warning');
      } else {
        container.classList.add('timer-rest');
      }
    } else if (this._timerMode === 'work') {
      container.classList.add('timer-work');
    }

    this._updateToggleIcons();
  },

  _updateToggleIcons() {
    const workBtn = document.getElementById('timer-work');
    const restBtn = document.getElementById('timer-rest');
    if (!workBtn || !restBtn) return;

    const workRunning = this._timerMode === 'work' && this._timer;
    const restRunning = this._timerMode === 'rest' && this._timer;

    workBtn.querySelector('.toggle-icon-play').classList.toggle('hidden', workRunning);
    workBtn.querySelector('.toggle-icon-pause').classList.toggle('hidden', !workRunning);
    workBtn.classList.toggle('toggle-active', workRunning);

    restBtn.querySelector('.toggle-icon-play').classList.toggle('hidden', restRunning);
    restBtn.querySelector('.toggle-icon-pause').classList.toggle('hidden', !restRunning);
    restBtn.classList.toggle('toggle-active', restRunning);
  },

  _enterSessionMode() {
    document.querySelector('header').classList.add('hidden-session');
    document.getElementById('main-nav').classList.add('hidden-session');
    document.querySelector('.day-selector')?.classList.add('hidden-session');
  },

  _exitSessionMode() {
    document.querySelector('header').classList.remove('hidden-session');
    document.getElementById('main-nav').classList.remove('hidden-session');
    document.querySelector('.day-selector')?.classList.remove('hidden-session');
  },

  _autosaveTimeout: null,
  _currentDraftId: null,

  _autosave(dayId) {
    clearTimeout(this._autosaveTimeout);
    this._autosaveTimeout = setTimeout(() => {
      this._saveCurrentExercise();

      const data = { exercises: this._completedData.filter(Boolean) };
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

  _getLastLogForDay(dayId) {
    const logs = Store.getWorkoutLogs();
    const dayLogs = logs.filter(l => l.dayId === dayId);
    return dayLogs.length ? dayLogs[dayLogs.length - 1] : null;
  }
};
