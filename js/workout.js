const Workout = {
  _restTimer: null,
  _restSeconds: -1,
  _sessionTimer: null,
  _sessionSeconds: 0,
  _beepCtx: null,

  _currentDayId: null,
  _currentExIdx: 0,
  _currentSetIdx: 0,
  _completedData: [],
  _activeExercises: {},
  _setBuffer: {},
  _notesBuffer: {},
  _currentLogId: null,

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
      gain.gain.value = 0.5;
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  },

  _beepFinal() {
    try {
      if (!this._beepCtx) this._beepCtx = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = this._beepCtx;
      [0, 0.2, 0.4].forEach(delay => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 1200;
        osc.type = 'square';
        gain.gain.value = 0.5;
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.15);
      });
    } catch {}
  },

  _svgSwap: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8"/><path d="M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16"/></svg>',

  render() {
    const container = document.getElementById('view-workout');
    this._stopRestTimer();
    this._stopSessionTimer();
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
        this._stopRestTimer();
        this._stopSessionTimer();
        this._activeExercises = {};
        this._completedData = [];
        this._setBuffer = {};
        this._notesBuffer = {};
        this._currentExIdx = 0;
        this._currentSetIdx = 0;
        this._currentLogId = null;
        this._showSummary(btn.dataset.day);
      });
    });

    const firstBtn = container.querySelector('[data-day="dayA"]');
    firstBtn.classList.add('active');
    this._showSummary('dayA');
  },

  _showSummary(dayId) {
    this._currentDayId = dayId;
    this._currentLogId = null;
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
    html += `<button class="btn btn-primary" id="start-workout">${hasSession ? 'Continue' : 'Start'}</button>`;
    html += '</div>';

    area.innerHTML = html;

    document.getElementById('start-workout').addEventListener('click', () => {
      if (!hasSession) {
        this._completedData = [];
        this._currentExIdx = 0;
        this._currentSetIdx = 0;
        this._activeExercises = {};
        this._setBuffer = {};
        this._notesBuffer = {};
        this._currentLogId = null;
        this._enterSessionMode();
        this._showWarmup();
      } else {
        this._enterSessionMode();
        this._startSessionTimer();
        this._renderExercise();
      }
    });
  },

  _showWarmup() {
    const area = document.getElementById('workout-area');
    const day = ROUTINE[this._currentDayId];
    const total = day.exercises.length;

    let html = `<div class="card exercise-active-card">
      <div class="toolbar-row">
      <div class="toolbar-toggle">
        <button class="toggle-btn toggle-nav" id="warmup-home" title="Home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"/></svg>
        </button>
        <button class="toggle-btn toggle-nav" id="warmup-next" title="Start workout">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <a href="${WARMUP.videoUrl}" target="_blank" class="toggle-btn toggle-yt" title="Follow along on YouTube" style="text-decoration:none">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.9 31.9 0 000 12a31.9 31.9 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.9 31.9 0 0024 12a31.9 31.9 0 00-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
        </a>
      </div>
      </div>

      <div class="exercise-fixed-header">
        <div class="exercise-header-info">
          <div class="exercise-name">
            <span style="font-weight:700">0/${total}</span> Warm-up
          </div>
          <div class="exercise-target">${WARMUP.duration} | ${WARMUP.intervals}</div>
        </div>
      </div>

      <div style="margin-top:12px">`;

    WARMUP.exercises.forEach(ex => {
      html += `<div style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid var(--surface-alt);font-size:0.85rem">
        <span style="color:var(--accent);font-weight:600;min-width:36px">${ex.time}</span>
        <div>
          <div style="color:var(--text);font-weight:600">${ex.name}</div>
          <div style="color:var(--text-dim);font-size:0.8rem">${ex.desc}</div>
        </div>
      </div>`;
    });

    html += '</div></div>';
    area.innerHTML = html;

    document.getElementById('warmup-home').addEventListener('click', () => {
      this._exitSessionMode();
      this._showSummary(this._currentDayId);
    });

    document.getElementById('warmup-next').addEventListener('click', () => {
      this._startSessionTimer();
      this._renderExercise();
    });
  },

  _getSetBuffer(exIdx, totalSets) {
    if (!this._setBuffer[exIdx]) {
      this._setBuffer[exIdx] = Array.from({ length: totalSets }, () => ({
        reps: null, repsL: null, repsR: null, weight: null, feeling: null, skipped: false
      }));
    }
    return this._setBuffer[exIdx];
  },

  _saveCurrentSetToBuffer() {
    const exIdx = this._currentExIdx;
    const setIdx = this._currentSetIdx;
    const day = ROUTINE[this._currentDayId];
    const activeEx = this._activeExercises[exIdx] || day.exercises[exIdx];
    const isUnilateral = activeEx.unilateral || false;
    const buffer = this._getSetBuffer(exIdx, activeEx.sets);

    const weightInput = document.querySelector('[data-field="weight"]');
    const skipBtn = document.querySelector('.skip-btn');
    const faceBtn = document.querySelector('.face-btn.selected');

    buffer[setIdx].weight = weightInput?.value ? parseFloat(weightInput.value) : null;
    buffer[setIdx].skipped = skipBtn?.classList.contains('active') || false;
    buffer[setIdx].feeling = faceBtn?.dataset.feeling || null;

    if (isUnilateral) {
      const repsLInput = document.querySelector('[data-field="repsL"]');
      const repsRInput = document.querySelector('[data-field="repsR"]');
      buffer[setIdx].repsL = repsLInput?.value ? parseFloat(repsLInput.value) : null;
      buffer[setIdx].repsR = repsRInput?.value ? parseFloat(repsRInput.value) : null;
      buffer[setIdx].reps = null;
    } else {
      const repsInput = document.querySelector('[data-field="reps"]');
      buffer[setIdx].reps = repsInput?.value ? parseFloat(repsInput.value) : null;
    }

    const notesInput = document.querySelector('textarea[data-ex="0"]');
    if (notesInput) {
      this._notesBuffer[exIdx] = notesInput.value || '';
    }
  },

  _renderExercise() {
    const dayId = this._currentDayId;
    const day = ROUTINE[dayId];
    const exIdx = this._currentExIdx;
    const setIdx = this._currentSetIdx;
    const total = day.exercises.length;
    const originalEx = day.exercises[exIdx];
    const activeEx = this._activeExercises[exIdx] || originalEx;
    const lastLog = this._getLastLogForDay(dayId);
    const lastEx = lastLog?.exercises?.find(e => e.id === activeEx.id);

    const lastMaxWeight = lastEx?.sets
      ?.filter(s => !s.skipped)
      .reduce((max, s) => Math.max(max, s.weight || 0), 0) || 0;

    const hasAlts = originalEx.alternatives && originalEx.alternatives.length > 0;
    const isUnilateral = activeEx.unilateral || false;
    const isSeconds = activeEx.unit === 'seconds';
    const repsLabel = isSeconds ? 'Secs' : 'Reps';

    const buffer = this._getSetBuffer(exIdx, activeEx.sets);
    const setData = buffer[setIdx];
    const bufPrev = setIdx > 0 ? buffer[setIdx - 1] : null;
    const histSet = lastEx?.sets?.[setIdx];

    if (setData.weight == null && !setData.skipped) {
      if (bufPrev?.weight != null) {
        setData.weight = bufPrev.weight;
      } else if (histSet?.weight != null) {
        setData.weight = histSet.weight;
      }
    }

    const prevReps = (bufPrev?.reps ?? histSet?.reps ?? '');
    const prevRepsL = (bufPrev?.repsL ?? histSet?.repsL ?? '');
    const prevRepsR = (bufPrev?.repsR ?? histSet?.repsR ?? '');
    const prevWeight = (bufPrev?.weight ?? histSet?.weight ?? '');

    const area = document.getElementById('workout-area');

    let html = '';

    html += `<div class="card exercise-active-card">
      <div class="toolbar-row">
      <div class="toolbar-toggle">
        <button class="toggle-btn toggle-nav" id="go-home" title="Home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"/></svg>
        </button>
        <button class="toggle-btn toggle-nav" id="prev-exercise" title="Previous exercise" ${exIdx === 0 ? 'disabled' : ''}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="toggle-btn toggle-nav" id="next-exercise" title="${exIdx < total - 1 ? 'Next exercise' : 'Finish'}">
          ${exIdx < total - 1
            ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
            : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'}
        </button>
        <button class="toggle-btn toggle-info" id="info-btn" title="Info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </button>
        <button class="toggle-btn toggle-yt" id="yt-btn" title="Watch video">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.9 31.9 0 000 12a31.9 31.9 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.9 31.9 0 0024 12a31.9 31.9 0 00-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
        </button>
        ${hasAlts ? `<button class="toggle-btn toggle-swap" id="swap-btn" title="Alternatives">${this._svgSwap}</button>` : ''}
      </div>
      <span class="toolbar-timer-outside" id="session-elapsed">0:00</span>
      </div>

      <div class="exercise-fixed-header">
        <div class="exercise-header-info">
          <div class="exercise-name">
            <span style="font-weight:700">${exIdx + 1}/${total}</span> ${activeEx.name}
          </div>
          <div class="exercise-target">${activeEx.sets}x${activeEx.repsTarget} | Rest: ${activeEx.rest}s</div>
          <div class="exercise-goal">${this._computeGoal(activeEx, lastEx, buffer, setIdx)}</div>
        </div>
      </div>

      <div class="info-popover hidden" id="info-popover">
        <button class="info-popover-close" id="info-popover-close">&times;</button>
        <div class="info-popover-body">
          ${activeEx.execution ? `<div style="font-size:0.85rem;color:var(--text);line-height:1.5">${activeEx.execution}</div>` : ''}
        </div>
      </div>

      <div class="toolbar-row set-toolbar">
        <div class="toolbar-toggle">
          <button class="toggle-btn toggle-nav" id="prev-set" title="Previous set" ${setIdx === 0 && exIdx === 0 ? 'disabled' : ''}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span class="set-indicator-bar">Set ${setIdx + 1} / ${activeEx.sets}</span>
          <button class="toggle-btn toggle-nav" id="next-set" title="Next set">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
        <span class="toolbar-timer-outside" id="rest-display"></span>
      </div>

      <div class="set-grid-v2${isUnilateral ? ' unilateral' : ''}">
        <div class="set-grid-header-row">
          ${isUnilateral ? '<div class="sg-h">Reps/L</div><div class="sg-h">Reps/R</div>' : `<div class="sg-h">${repsLabel}</div>`}
          <div class="sg-h">Weight</div>
          <div class="sg-h">Status</div>
        </div>
        <div class="set-row-v2${setData.skipped ? ' skipped' : ''}">`;

    if (isUnilateral) {
      html += `<input type="number" class="set-input set-input-small" data-field="repsL" placeholder="${prevRepsL}" inputmode="numeric" min="0" ${setData.skipped ? 'disabled' : ''} ${setData.repsL != null ? `value="${setData.repsL}"` : ''}>
        <input type="number" class="set-input set-input-small" data-field="repsR" placeholder="${prevRepsR}" inputmode="numeric" min="0" ${setData.skipped ? 'disabled' : ''} ${setData.repsR != null ? `value="${setData.repsR}"` : ''}>`;
    } else {
      html += `<input type="number" class="set-input set-input-small" data-field="reps" placeholder="${prevReps}" inputmode="numeric" min="0" ${setData.skipped ? 'disabled' : ''} ${setData.reps != null ? `value="${setData.reps}"` : ''}>`;
    }

    html += `<input type="number" class="set-input set-input-small" data-field="weight" placeholder="${prevWeight}" inputmode="decimal" step="0.5" min="0" ${setData.skipped ? 'disabled' : ''} ${setData.weight != null ? `value="${setData.weight}"` : ''}>
          <div class="status-strip">
            <button class="strip-btn face-btn${setData.feeling === 'good' ? ' selected' : ''}" data-feeling="good" title="Nailed it" ${setData.skipped ? 'disabled' : ''}>&#128170;</button>
            <button class="strip-btn face-btn${setData.feeling === 'dying' ? ' selected' : ''}" data-feeling="dying" title="Dying" ${setData.skipped ? 'disabled' : ''}>&#129397;</button>
            <button class="strip-btn skip-btn${setData.skipped ? ' active' : ''}" title="Could not complete">&#128128;</button>
          </div>
        </div>
      </div>

      <textarea class="notes-input" data-ex="0" placeholder="Notes: feelings, pain, adjustments...">${this._notesBuffer[exIdx] || ''}</textarea>

    </div>`;

    html += `<div class="autosave-bar" id="autosave-bar">
      <span class="autosave-status" id="autosave-status">Progress saved on advance</span>
    </div>`;

    area.innerHTML = html;
    this._updateSessionTimerDisplay();
    this._updateRestDisplay();
    this._bindExerciseEvents();
  },

  _bindExerciseEvents() {
    const area = document.getElementById('workout-area');
    const dayId = this._currentDayId;

    area.querySelectorAll('.face-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.status-strip') || btn.parentElement;
        parent.querySelectorAll('.face-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this._saveCurrentSetToBuffer();
        this._autosave(dayId);
      });
    });

    area.querySelector('.skip-btn')?.addEventListener('click', () => {
      const skipBtn = area.querySelector('.skip-btn');
      const row = skipBtn.closest('.set-row-v2');
      const activating = !skipBtn.classList.contains('active');

      if (activating) {
        row.classList.add('skipped');
        skipBtn.classList.add('active');
        row.querySelectorAll('.set-input').forEach(inp => { inp.disabled = true; inp.value = ''; });
        row.querySelectorAll('.face-btn').forEach(fb => { fb.classList.remove('selected'); fb.disabled = true; });
      } else {
        row.classList.remove('skipped');
        skipBtn.classList.remove('active');
        row.querySelectorAll('.set-input').forEach(inp => inp.disabled = false);
        row.querySelectorAll('.face-btn').forEach(fb => fb.disabled = false);
        const activeEx = this._activeExercises[this._currentExIdx] || day.exercises[this._currentExIdx];
        const buf = this._getSetBuffer(this._currentExIdx, activeEx.sets);
        for (let i = this._currentSetIdx; i < activeEx.sets; i++) {
          buf[i].skipped = false;
        }
      }
      this._saveCurrentSetToBuffer();
      this._autosave(dayId);
    });

    document.getElementById('swap-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const day = ROUTINE[dayId];
      const exIdx = this._currentExIdx;
      const originalEx = day.exercises[exIdx];
      const alts = originalEx.alternatives || [];
      const currentActive = this._activeExercises[exIdx] || originalEx;

      const options = [originalEx, ...alts].filter(a => a.id !== currentActive.id);

      let listHtml = '<h3 style="margin-bottom:12px;color:var(--accent)">Switch exercise</h3>';
      options.forEach(alt => {
        listHtml += `<button class="btn btn-secondary alt-option" data-alt-id="${alt.id}" style="width:100%;margin-bottom:8px;text-align:left">${alt.name}</button>`;
      });
      listHtml += `<button class="btn btn-secondary" onclick="UI.hideModal()" style="width:100%;margin-top:4px">Cancel</button>`;

      UI.showModal(listHtml);

      document.querySelectorAll('.alt-option').forEach(optBtn => {
        optBtn.addEventListener('click', () => {
          const altId = optBtn.dataset.altId;
          const selected = [originalEx, ...alts].find(a => a.id === altId);
          if (selected) {
            this._activeExercises[exIdx] = selected;
            this._setBuffer[exIdx] = null;
            this._currentSetIdx = 0;
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
        this._saveCurrentSetToBuffer();
        this._autosave(dayId);
      });
    });

    area.querySelectorAll('.notes-input').forEach(input => {
      input.addEventListener('input', () => {
        this._notesBuffer[this._currentExIdx] = input.value || '';
        this._autosave(dayId);
      });
    });

    document.getElementById('info-btn')?.addEventListener('click', () => {
      document.getElementById('info-popover').classList.toggle('hidden');
    });

    document.getElementById('info-popover-close')?.addEventListener('click', () => {
      document.getElementById('info-popover').classList.add('hidden');
    });

    document.getElementById('next-set')?.addEventListener('click', () => {
      this._saveCurrentSetToBuffer();
      const day = ROUTINE[this._currentDayId];
      const activeEx = this._activeExercises[this._currentExIdx] || day.exercises[this._currentExIdx];
      const buffer = this._getSetBuffer(this._currentExIdx, activeEx.sets);
      const currentSet = buffer[this._currentSetIdx];

      if (!currentSet.skipped && !this._hasReps(currentSet, activeEx)) {
        this._flashValidation();
        return;
      }

      if (currentSet.skipped) {
        for (let i = this._currentSetIdx; i < activeEx.sets; i++) {
          buffer[i].skipped = true;
        }
        this._saveCurrentExercise();
        this._progressiveSave();
        this._goToNextExercise();
      } else if (this._currentSetIdx < activeEx.sets - 1) {
        this._saveCurrentExercise();
        this._progressiveSave();
        this._currentSetIdx++;
        this._startRestTimer();
        this._renderExercise();
      } else {
        this._saveCurrentExercise();
        this._progressiveSave();
        this._goToNextExercise();
      }
    });

    document.getElementById('prev-set')?.addEventListener('click', () => {
      this._saveCurrentSetToBuffer();

      if (this._currentSetIdx > 0) {
        this._currentSetIdx--;
        this._renderExercise();
      } else if (this._currentExIdx > 0) {
        this._saveCurrentExercise();
        this._currentExIdx--;
        const day = ROUTINE[this._currentDayId];
        const prevEx = this._activeExercises[this._currentExIdx] || day.exercises[this._currentExIdx];
        this._currentSetIdx = prevEx.sets - 1;
        this._renderExercise();
      }
    });

    document.getElementById('next-exercise')?.addEventListener('click', () => {
      this._saveCurrentSetToBuffer();
      const day = ROUTINE[this._currentDayId];
      const activeEx = this._activeExercises[this._currentExIdx] || day.exercises[this._currentExIdx];
      const buffer = this._getSetBuffer(this._currentExIdx, activeEx.sets);
      const currentSet = buffer[this._currentSetIdx];

      if (!currentSet.skipped && !this._hasReps(currentSet, activeEx)) {
        this._flashValidation();
        return;
      }

      this._saveCurrentExercise();
      this._progressiveSave();
      this._goToNextExercise();
    });

    document.getElementById('prev-exercise')?.addEventListener('click', () => {
      this._saveCurrentSetToBuffer();
      this._saveCurrentExercise();
      this._currentExIdx--;
      this._currentSetIdx = 0;
      this._renderExercise();
    });

    document.getElementById('go-home')?.addEventListener('click', () => {
      UI.showModal(`
        <h3 style="margin-bottom:12px">Leave workout?</h3>
        <p style="color:var(--text-dim);margin-bottom:16px">Your progress will be saved, but the session timer will reset.</p>
        <div class="btn-group">
          <button class="btn btn-secondary" onclick="UI.hideModal()">Cancel</button>
          <button class="btn btn-danger" id="confirm-home">Leave</button>
        </div>
      `);
      document.getElementById('confirm-home').addEventListener('click', () => {
        UI.hideModal();
        this._saveCurrentSetToBuffer();
        this._saveCurrentExercise();
        this._stopRestTimer();
        this._stopSessionTimer();
        this._exitSessionMode();
        this._showSummary(this._currentDayId);
      });
    });
  },

  _saveCurrentExercise() {
    const day = ROUTINE[this._currentDayId];
    const exIdx = this._currentExIdx;
    const activeEx = this._activeExercises[exIdx] || day.exercises[exIdx];
    const buffer = this._getSetBuffer(exIdx, activeEx.sets);

    this._completedData[exIdx] = {
      id: activeEx.id,
      sets: buffer.map(s => ({ ...s })),
      notes: this._notesBuffer[exIdx] || ''
    };
  },

  _goToNextExercise() {
    const day = ROUTINE[this._currentDayId];

    if (this._currentExIdx < day.exercises.length - 1) {
      this._currentExIdx++;
      this._currentSetIdx = 0;
      this._stopRestTimer();
      this._renderExercise();
    } else {
      this._finishWorkout();
    }
  },

  _finishWorkout() {
    this._stopRestTimer();
    this._stopSessionTimer();
    this._exitSessionMode();
    this._saveCurrentExercise();
    this._progressiveSave();

    const totalMins = Math.floor(this._sessionSeconds / 60);

    const area = document.getElementById('workout-area');
    area.innerHTML = `
      <div class="workout-complete-banner">
        <h3>Session complete</h3>
        <p style="color:var(--text-dim);margin-top:8px">Good work! ${totalMins} min total.</p>
      </div>
      <button class="btn btn-sync" id="sync-workout" style="margin-top:12px">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8"/><path d="M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16"/></svg>
        Sync
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

  // Session timer - total elapsed
  _startSessionTimer() {
    this._sessionSeconds = 0;
    this._sessionTimer = setInterval(() => {
      this._sessionSeconds++;
      this._updateSessionTimerDisplay();
    }, 1000);
  },

  _stopSessionTimer() {
    if (this._sessionTimer) {
      clearInterval(this._sessionTimer);
      this._sessionTimer = null;
    }
  },

  _updateSessionTimerDisplay() {
    const el = document.getElementById('session-elapsed');
    if (!el) return;
    const mins = Math.floor(this._sessionSeconds / 60);
    const s = this._sessionSeconds % 60;
    el.textContent = `${mins}:${s.toString().padStart(2, '0')}`;
  },

  // Rest timer - countdown, auto-starts on set change
  _startRestTimer() {
    this._stopRestTimer();
    const day = ROUTINE[this._currentDayId];
    const ex = this._activeExercises[this._currentExIdx] || day.exercises[this._currentExIdx];
    this._restSeconds = ex.rest;

    this._restTimer = setInterval(() => {
      this._restSeconds--;
      this._updateRestDisplay();

      if (this._restSeconds <= 5 && this._restSeconds > 0) {
        this._beep();
        if ('vibrate' in navigator) navigator.vibrate(100);
      }

      if (this._restSeconds <= 0) {
        this._beepFinal();
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 200, 100, 200]);
        this._stopRestTimer();
        this._restSeconds = 0;
        this._updateRestDisplay();
      }
    }, 1000);

    this._updateRestDisplay();
  },

  _stopRestTimer() {
    if (this._restTimer) {
      clearInterval(this._restTimer);
      this._restTimer = null;
    }
  },

  _updateRestDisplay() {
    const el = document.getElementById('rest-display');
    if (!el) return;

    if (this._restTimer || this._restSeconds === 0) {
      const mins = Math.floor(this._restSeconds / 60);
      const s = this._restSeconds % 60;
      const text = `${mins}:${s.toString().padStart(2, '0')}`;

      if (this._restSeconds === 0) {
        el.textContent = text;
        el.className = 'toolbar-timer-outside rest-done';
      } else if (this._restSeconds <= 5) {
        el.textContent = text;
        el.className = 'toolbar-timer-outside rest-warning';
      } else {
        el.textContent = text;
        el.className = 'toolbar-timer-outside rest-active';
      }
    } else {
      el.textContent = '';
      el.className = 'toolbar-timer-outside';
    }
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

  _autosave() {},

  _computeGoal(exercise, lastExData, currentBuffer, currentSetIdx) {
    if (!lastExData || !lastExData.sets || !lastExData.sets.length) {
      const filledSets = currentBuffer?.filter((s, i) => i < currentSetIdx && !s.skipped && (s.reps != null || s.repsL != null)) || [];
      if (!filledSets.length) {
        return '<div class="goal-line goal-first">&#9733; First session — log your baseline</div>';
      }
      const lastFilled = filledSets[filledSets.length - 1];
      const w = lastFilled.weight != null ? `${lastFilled.weight}kg` : 'No weight';
      const r = lastFilled.repsL != null
        ? `${lastFilled.repsL}L / ${lastFilled.repsR || 0}R`
        : `${lastFilled.reps || 0} reps`;
      return `<div class="goal-line goal-active">&#9650; Repeat: ${w} &times; ${r}</div>` +
             '<div class="goal-line goal-dim">&#9654; Match or beat your previous set</div>';
    }

    const validSets = lastExData.sets.filter(s => !s.skipped);
    if (!validSets.length) {
      return '<div class="goal-line goal-first">&#9733; First session — log your baseline</div>';
    }

    const isMaxReps = exercise.repsTarget?.includes('max');
    const isSeconds = exercise.unit === 'seconds';

    const lastWeight = validSets.reduce((max, s) => Math.max(max, s.weight || 0), 0);
    const allDying = validSets.every(s => s.feeling === 'dying');

    // Parse target range
    const targetMatch = exercise.repsTarget?.match(/(\d+)\s*-\s*(\d+)/);
    const targetMatch2 = exercise.repsTarget?.match(/^(\d+)$/);
    let maxTarget = null;
    if (targetMatch) maxTarget = parseInt(targetMatch[2]);
    else if (targetMatch2) maxTarget = parseInt(targetMatch2[1]);

    const lastReps = validSets.map(s => {
      if (s.repsL != null || s.repsR != null) return Math.min(s.repsL || 0, s.repsR || 0);
      return s.reps || 0;
    });
    const allAtMax = maxTarget && lastReps.every(r => r >= maxTarget);

    // Determine priority: 'weight', 'reps', or 'technique'
    let priority;
    if (isMaxReps || isSeconds) {
      priority = 'reps';
    } else if (allAtMax && !allDying) {
      priority = 'weight';
    } else if (allAtMax && allDying) {
      priority = 'technique';
    } else {
      priority = 'reps';
    }

    // Build weight line
    let weightText;
    if (isMaxReps || isSeconds) {
      weightText = lastWeight > 0 ? `${lastWeight}kg — bodyweight+` : 'Bodyweight';
    } else if (priority === 'weight') {
      const next = lastWeight + 2.5;
      weightText = `${lastWeight}kg &#8594; try ${next}kg`;
    } else {
      weightText = lastWeight > 0 ? `${lastWeight}kg — hold` : 'No weight';
    }

    // Build reps line
    let repsText;
    if (isMaxReps) {
      const totalReps = validSets.reduce((sum, s) => sum + (s.reps || 0), 0);
      const perSet = validSets.map(s => s.reps || 0).join('/');
      repsText = `${perSet} = ${totalReps} &#8594; aim ${totalReps + 2}+`;
    } else if (isSeconds) {
      const times = validSets.map(s => s.reps || 0);
      const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
      repsText = `avg ${avg}s &#8594; aim ${avg + 5}s`;
    } else if (exercise.unilateral) {
      const lrSets = validSets.map(s => `${s.repsL || 0}/${s.repsR || 0}`).join(', ');
      if (priority === 'reps') {
        repsText = `${lrSets} &#8594; +1 per set`;
      } else {
        repsText = `${lrSets} — hold`;
      }
    } else {
      const perSet = lastReps.join('/');
      if (priority === 'reps') {
        const suggested = lastReps.map(r => (maxTarget && r >= maxTarget) ? r : r + 1);
        repsText = `${perSet} &#8594; aim ${suggested.join('/')}`;
      } else {
        repsText = `${perSet} — hold`;
      }
    }

    // Build technique line
    let techText;
    if (priority === 'technique') {
      techText = 'Same load, focus on form';
    } else if (allDying) {
      techText = 'Watch form under fatigue';
    } else {
      techText = 'Ok';
    }

    const w = priority === 'weight' ? 'goal-active' : 'goal-dim';
    const r = priority === 'reps' ? 'goal-active' : 'goal-dim';
    const t = priority === 'technique' ? 'goal-active' : 'goal-dim';

    return `<div class="goal-line ${w}">&#9650; Weight: ${weightText}</div>` +
           `<div class="goal-line ${r}">&#9650; Reps: ${repsText}</div>` +
           `<div class="goal-line ${t}">&#9654; Technique: ${techText}</div>`;
  },

  _hasReps(setData, exercise) {
    if (exercise.unilateral) return setData.repsL != null || setData.repsR != null;
    return setData.reps != null;
  },

  _flashValidation() {
    const row = document.querySelector('.set-row-v2');
    if (!row) return;
    row.style.outline = '2px solid var(--danger)';
    setTimeout(() => { row.style.outline = ''; }, 800);
  },

  _progressiveSave() {
    const dayId = this._currentDayId;
    const data = { exercises: this._completedData.filter(Boolean) };
    const hasData = data.exercises.some(ex =>
      ex.sets.some(s => s.reps !== null || s.repsL !== null || s.repsR !== null || s.skipped));
    if (!hasData) return;

    if (this._currentLogId) {
      const logs = Store.get('logs', []);
      const idx = logs.findIndex(l => l.id === this._currentLogId);
      if (idx >= 0) {
        logs[idx].exercises = data.exercises;
        logs[idx].timestamp = new Date().toISOString();
        Store.set('logs', logs);
      } else {
        this._currentLogId = null;
        this._progressiveSave();
      }
    } else {
      const log = Store.saveWorkoutLog(dayId, data);
      this._currentLogId = log.id;
    }
  },

  _getLastLogForDay(dayId) {
    const logs = Store.getWorkoutLogs();
    const dayLogs = logs.filter(l => l.dayId === dayId && l.id !== this._currentLogId);
    return dayLogs.length ? dayLogs[dayLogs.length - 1] : null;
  }
};
