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
          <button class="btn btn-secondary btn-small" id="import-json">Import JSON</button>
          <input type="file" id="import-file" accept=".json" style="display:none">
        </div>
        <div style="margin-top:12px">
          <button class="btn btn-danger btn-small" id="clear-data">Delete all my data</button>
        </div>
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


    document.getElementById('import-json')?.addEventListener('click', () => {
      document.getElementById('import-file').click();
    });

    document.getElementById('import-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!data.logs || !Array.isArray(data.logs)) {
            UI.showModal(`<h3 style="color:var(--danger);margin-bottom:12px">Invalid file</h3>
              <p style="color:var(--text-dim);margin-bottom:16px">The file does not contain valid workout data.</p>
              <button class="btn btn-secondary" onclick="UI.hideModal()">OK</button>`);
            return;
          }
          const incoming = data.logs.length;
          const importName = data.user || 'Imported';
          const importId = data.userId || Store.generateId();
          const users = Store.getUsers();
          const existingUser = users.find(u => u.id === importId) || users.find(u => u.name === importName);
          const currentUser = Store.getCurrentUser();

          let options = `<button class="btn btn-primary btn-small" id="import-as-new">Create user "${importName}" (${incoming} sessions)</button>`;
          if (existingUser) {
            options = `<button class="btn btn-primary btn-small" id="import-merge-user">Merge into "${existingUser.name}" (${incoming} sessions)</button>`;
          }

          UI.showModal(`<h3 style="color:var(--accent);margin-bottom:12px">Import data</h3>
            <p style="color:var(--text-dim);margin-bottom:16px">${importName} &middot; ${incoming} sessions &middot; ${data.exportDate ? data.exportDate.slice(0, 10) : ''}</p>
            <div class="btn-group" style="flex-direction:column;gap:8px">
              ${options}
              <button class="btn btn-secondary btn-small" id="import-into-current">Merge into current user</button>
              <button class="btn btn-secondary btn-small" onclick="UI.hideModal()">Cancel</button>
            </div>`);

          document.getElementById('import-as-new')?.addEventListener('click', () => {
            const newId = importId;
            users.push({ id: newId, name: importName });
            Store.setUsers(users);
            Store.setCurrentUser(newId);
            Store.set('logs', data.logs);
            UI.hideModal();
            UI.showModal(`<div style="text-align:center">
              <h3 style="color:var(--success);margin-bottom:12px">User "${importName}" created</h3>
              <p style="color:var(--text-dim);margin-bottom:12px">${incoming} sessions imported. Switched to new user.</p>
              <button class="btn btn-primary" id="import-done-btn">OK</button></div>`);
            document.getElementById('import-done-btn')?.addEventListener('click', () => {
              UI.hideModal(); App.refresh();
            });
          });

          document.getElementById('import-merge-user')?.addEventListener('click', () => {
            const prevUser = currentUser;
            Store.setCurrentUser(existingUser.id);
            const existing = Store.getWorkoutLogs();
            const importMap = new Map(data.logs.map(l => [l.id, l]));
            const merged = existing.map(l => { if (importMap.has(l.id)) { const v = importMap.get(l.id); importMap.delete(l.id); return v; } return l; });
            const brand_new = [...importMap.values()];
            const final_logs = [...merged, ...brand_new].sort((a, b) =>
              new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
            Store.set('logs', final_logs);
            UI.hideModal();
            UI.showModal(`<div style="text-align:center">
              <h3 style="color:var(--success);margin-bottom:12px">Merged into "${importName}"</h3>
              <p style="color:var(--text-dim);margin-bottom:12px">Total: ${final_logs.length} sessions.</p>
              <button class="btn btn-primary" id="import-done-btn">OK</button></div>`);
            document.getElementById('import-done-btn')?.addEventListener('click', () => {
              UI.hideModal(); App.refresh();
            });
          });

          document.getElementById('import-into-current')?.addEventListener('click', () => {
            const existing = Store.getWorkoutLogs();
            const importMap = new Map(data.logs.map(l => [l.id, l]));
            const merged = existing.map(l => { if (importMap.has(l.id)) { const v = importMap.get(l.id); importMap.delete(l.id); return v; } return l; });
            const brand_new = [...importMap.values()];
            const final_logs = [...merged, ...brand_new].sort((a, b) =>
              new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
            Store.set('logs', final_logs);
            UI.hideModal();
            const currentName = users.find(u => u.id === currentUser)?.name || currentUser;
            UI.showModal(`<div style="text-align:center">
              <h3 style="color:var(--success);margin-bottom:12px">Merged into "${currentName}"</h3>
              <p style="color:var(--text-dim);margin-bottom:12px">Total: ${final_logs.length} sessions.</p>
              <button class="btn btn-primary" id="import-done-btn">OK</button></div>`);
            document.getElementById('import-done-btn')?.addEventListener('click', () => {
              UI.hideModal(); App.refresh();
            });
          });
        } catch {
          UI.showModal(`<h3 style="color:var(--danger);margin-bottom:12px">Error reading file</h3>
            <p style="color:var(--text-dim);margin-bottom:16px">The file could not be parsed.</p>
            <button class="btn btn-secondary" onclick="UI.hideModal()">OK</button>`);
        }
      };
      reader.readAsText(file);
      e.target.value = '';
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
