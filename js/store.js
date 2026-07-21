const Store = {
  _prefix: 'wt_',

  _key(key) {
    const user = this.getCurrentUser();
    return `${this._prefix}${user}_${key}`;
  },

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(this._key(key));
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    localStorage.setItem(this._key(key), JSON.stringify(value));
  },

  getGlobal(key, fallback = null) {
    try {
      const raw = localStorage.getItem(`${this._prefix}${key}`);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  setGlobal(key, value) {
    localStorage.setItem(`${this._prefix}${key}`, JSON.stringify(value));
  },

  getCurrentUser() {
    return localStorage.getItem(`${this._prefix}current_user`) || 'user1';
  },

  setCurrentUser(userId) {
    localStorage.setItem(`${this._prefix}current_user`, userId);
  },

  getUsers() {
    const users = this.getGlobal('users', null);
    if (!users) {
      const defaults = [
        { id: this.generateId(), name: 'Usuario 1' },
        { id: this.generateId(), name: 'Usuario 2' }
      ];
      this.setGlobal('users', defaults);
      this.setCurrentUser(defaults[0].id);
      return defaults;
    }
    return users;
  },

  migrateUserIds() {
    const users = this.getGlobal('users', null);
    if (!users) return;
    let migrated = false;
    users.forEach(u => {
      if (/^user\d+$/.test(u.id) || u.id.startsWith('user_')) {
        const oldId = u.id;
        const newId = this.generateId();
        const oldKey = `${this._prefix}${oldId}_logs`;
        const data = localStorage.getItem(oldKey);
        if (data) {
          localStorage.setItem(`${this._prefix}${newId}_logs`, data);
          localStorage.removeItem(oldKey);
        }
        const oldSession = `${this._prefix}${oldId}_activeSession`;
        const sessionData = localStorage.getItem(oldSession);
        if (sessionData) {
          localStorage.setItem(`${this._prefix}${newId}_activeSession`, sessionData);
          localStorage.removeItem(oldSession);
        }
        if (this.getCurrentUser() === oldId) {
          this.setCurrentUser(newId);
        }
        u.id = newId;
        migrated = true;
      }
    });
    if (migrated) this.setGlobal('users', users);
  },

  migrateExerciseIds() {
    const ID_MAP = {
      sentadilla_bulgara: 'bulgarian_split_squat',
      dominadas_prono: 'pullups_pronated',
      peso_muerto_rumano_1p: 'single_leg_rdl',
      remo_1_mano: 'single_arm_row',
      plancha_a: 'plank',
      sentadilla_goblet: 'goblet_squat',
      press_suelo: 'floor_press',
      flexiones: 'pushups',
      zancada_inversa: 'reverse_lunge',
      zancada_estatica: 'reverse_lunge',
      flexiones_elevadas: 'decline_pushups',
      press_hombro: 'shoulder_press',
      crunch_banda: 'banded_crunch',
      peso_muerto_bilateral: 'bilateral_rdl',
      dominadas_supino: 'chinups',
      zancada_estatica_c: 'static_lunge',
      remo_bilateral: 'bilateral_row',
      fondos_sillas: 'chair_dips',
      elevacion_piernas: 'hanging_leg_raises',
    };
    const users = this.getGlobal('users', []);
    users.forEach(u => {
      const logsKey = `${this._prefix}${u.id}_logs`;
      const raw = localStorage.getItem(logsKey);
      if (!raw) return;
      let changed = false;
      const logs = JSON.parse(raw);
      logs.forEach(log => {
        if (!log.exercises) return;
        log.exercises.forEach(ex => {
          if (ID_MAP[ex.id]) { ex.id = ID_MAP[ex.id]; changed = true; }
        });
      });
      if (changed) localStorage.setItem(logsKey, JSON.stringify(logs));
    });
  },

  migrateBandWeightToSets() {
    const users = this.getGlobal('users', []);
    users.forEach(u => {
      const logsKey = `${this._prefix}${u.id}_logs`;
      const raw = localStorage.getItem(logsKey);
      if (!raw) return;
      let changed = false;
      const logs = JSON.parse(raw);
      logs.forEach(log => {
        if (!log.exercises) return;
        log.exercises.forEach(ex => {
          if (ex.bandWeight != null && ex.sets) {
            ex.sets.forEach(s => {
              if (s.bandWeight == null && !s.skipped) s.bandWeight = ex.bandWeight;
            });
            delete ex.bandWeight;
            changed = true;
          }
        });
      });
      if (changed) localStorage.setItem(logsKey, JSON.stringify(logs));
    });
  },

  setUsers(users) {
    this.setGlobal('users', users);
  },

  getPin() {
    return localStorage.getItem(`${this._prefix}pin`) || null;
  },

  setPin(pin) {
    localStorage.setItem(`${this._prefix}pin`, pin);
  },

  isAuthenticated() {
    return sessionStorage.getItem(`${this._prefix}auth`) === 'true';
  },

  authenticate() {
    sessionStorage.setItem(`${this._prefix}auth`, 'true');
  },

  logout() {
    sessionStorage.removeItem(`${this._prefix}auth`);
  },

  saveWorkoutLog(dayId, log) {
    const logs = this.get('logs', []);
    log.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    log.dayId = dayId;
    log.timestamp = new Date().toISOString();
    log.date = new Date().toLocaleDateString('en-US');
    log.week = this._getWeekNumber();
    logs.push(log);
    this.set('logs', logs);
    return log;
  },

  getWorkoutLogs() {
    return this.get('logs', []);
  },

  deleteWorkoutLog(logId) {
    const logs = this.get('logs', []);
    this.set('logs', logs.filter(l => l.id !== logId));
  },

  _getWeekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 604800000;
    return Math.ceil(diff / oneWeek);
  },

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  },

  exportData() {
    const user = this.getCurrentUser();
    const users = this.getUsers();
    const userName = users.find(u => u.id === user)?.name || user;
    const logs = this.getWorkoutLogs();
    return {
      exportDate: new Date().toISOString(),
      user: userName,
      userId: user,
      totalWorkouts: logs.length,
      logs: logs
    };
  }
};
