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
    return this.getGlobal('users', [
      { id: 'user1', name: 'Usuario 1' },
      { id: 'user2', name: 'Usuario 2' }
    ]);
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
