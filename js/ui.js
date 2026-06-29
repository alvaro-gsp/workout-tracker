const UI = {
  showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');
    document.querySelector(`[data-view="${viewId}"]`).classList.add('active');
  },

  showModal(html) {
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');
  },

  hideModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  },

  renderUserSelector() {
    const users = Store.getUsers();
    const current = Store.getCurrentUser();
    const container = document.getElementById('user-selector');

    const select = document.createElement('select');
    select.id = 'user-select';
    users.forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id;
      opt.textContent = u.name;
      opt.selected = u.id === current;
      select.appendChild(opt);
    });

    select.addEventListener('change', () => {
      Store.setCurrentUser(select.value);
      App.refresh();
    });

    container.innerHTML = '';
    container.appendChild(select);
  },

  formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};
