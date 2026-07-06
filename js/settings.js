const Settings = {
  render() {
    const container = document.getElementById('view-settings');
    const users = Store.getUsers();
    const pin = Store.getPin();

    let html = `
      <div class="settings-section">
        <h3>Users</h3>
        ${users.map((u, i) => `
          <div class="setting-row">
            <input type="text" class="set-input" style="width:160px;text-align:left" value="${u.name}" data-user-idx="${i}">
          </div>
        `).join('')}
        <button class="btn btn-secondary btn-small" id="save-users" style="margin-top:8px">Save names</button>
      </div>

      <div class="settings-section">
        <h3>Access PIN</h3>
        <p style="font-size:0.85rem;color:var(--text-dim);margin-bottom:8px">
          ${pin ? 'PIN configured. Change:' : 'No PIN. Anyone can access.'}
        </p>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="password" class="set-input" style="width:120px" id="pin-input" placeholder="4 digits" maxlength="4" inputmode="numeric">
          <button class="btn btn-secondary btn-small" id="save-pin">Save PIN</button>
          ${pin ? '<button class="btn btn-small btn-danger" id="remove-pin">Remove</button>' : ''}
        </div>
      </div>

      <div class="settings-section">
        <h3>Data</h3>
        <div class="btn-group">
          <button class="btn btn-secondary btn-small" id="export-all-json">Export JSON</button>
        </div>
        <div style="margin-top:12px">
          <button class="btn btn-danger btn-small" id="clear-data">Delete all my data</button>
        </div>
      </div>

      <div class="settings-section">
        <h3>Routine</h3>
        <p style="font-size:0.85rem;color:var(--text-dim);margin-bottom:8px">Summary of your current routine:</p>
        ${Object.values(ROUTINE).map(day => `
          <div class="card">
            <div class="card-title">${day.name} — ${day.subtitle}</div>
            ${day.exercises.map(ex => `
              <div style="font-size:0.85rem;padding:3px 0">
                ${ex.name} — ${ex.sets}x${ex.repsTarget}
                <span style="color:var(--warning);font-size:0.75rem"> ${ex.material}</span>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;

    container.innerHTML = html;
    this._bindEvents();
  },

  _bindEvents() {
    document.getElementById('save-users')?.addEventListener('click', () => {
      const users = Store.getUsers();
      document.querySelectorAll('[data-user-idx]').forEach(input => {
        const idx = parseInt(input.dataset.userIdx);
        if (users[idx]) users[idx].name = input.value.trim() || users[idx].name;
      });
      Store.setUsers(users);
      UI.renderUserSelector();
      UI.showModal(`
        <div style="text-align:center">
          <h3 style="color:var(--success);margin-bottom:12px">Names saved</h3>
          <button class="btn btn-primary" onclick="UI.hideModal()">OK</button>
        </div>
      `);
    });

    document.getElementById('save-pin')?.addEventListener('click', () => {
      const input = document.getElementById('pin-input');
      const pin = input.value.trim();
      if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        UI.showModal(`
          <h3 style="margin-bottom:12px">Invalid PIN</h3>
          <p style="color:var(--text-dim);margin-bottom:16px">PIN must be 4 numeric digits.</p>
          <button class="btn btn-secondary" onclick="UI.hideModal()">OK</button>
        `);
        return;
      }
      Store.setPin(pin);
      UI.showModal(`
        <div style="text-align:center">
          <h3 style="color:var(--success);margin-bottom:12px">PIN saved</h3>
          <button class="btn btn-primary" onclick="UI.hideModal()">OK</button>
        </div>
      `);
      Settings.render();
    });

    document.getElementById('remove-pin')?.addEventListener('click', () => {
      Store.setPin('');
      localStorage.removeItem('wt_pin');
      Settings.render();
    });

    document.getElementById('export-all-json')?.addEventListener('click', () => {
      const data = Store.exportData();
      const users = Store.getUsers();
      const user = users.find(u => u.id === Store.getCurrentUser());
      History._download(JSON.stringify(data, null, 2), `workout-tracker-${user?.name || 'data'}-${new Date().toISOString().slice(0,10)}.json`, 'application/json');
    });


    document.getElementById('clear-data')?.addEventListener('click', () => {
      UI.showModal(`
        <h3 style="color:var(--danger);margin-bottom:12px">Delete all data?</h3>
        <p style="color:var(--text-dim);margin-bottom:16px">All workouts for the current user will be deleted. This action cannot be undone.</p>
        <div class="btn-group">
          <button class="btn btn-secondary" onclick="UI.hideModal()">Cancel</button>
          <button class="btn btn-danger" id="confirm-clear">Delete all</button>
        </div>
      `);
      document.getElementById('confirm-clear')?.addEventListener('click', () => {
        Store.set('logs', []);
        UI.hideModal();
        Settings.render();
      });
    });
  }
};
