const App = {
  init() {
    Store.migrateUserIds();
    Store.migrateExerciseIds();
    Store.migrateBandWeightToSets();
    const pin = Store.getPin();
    if (pin && !Store.isAuthenticated()) {
      this._showLogin();
      return;
    }
    this._start();
  },

  _showLogin() {
    document.getElementById('app').style.display = 'none';

    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('hidden');
    document.getElementById('modal-content').innerHTML = `
      <div style="text-align:center">
        <h2 style="color:var(--accent);margin-bottom:16px">Workout Tracker</h2>
        <p style="color:var(--text-dim);margin-bottom:16px">Enter your PIN to access</p>
        <input type="password" class="set-input" id="login-pin" style="width:140px;font-size:1.2rem;text-align:center" maxlength="4" inputmode="numeric" autofocus>
        <div style="margin-top:16px">
          <button class="btn btn-primary" id="login-btn">Enter</button>
        </div>
        <p id="login-error" style="color:var(--danger);margin-top:8px;font-size:0.85rem;display:none">Wrong PIN</p>
      </div>
    `;

    const tryLogin = () => {
      const input = document.getElementById('login-pin');
      if (input.value === Store.getPin()) {
        Store.authenticate();
        overlay.classList.add('hidden');
        document.getElementById('app').style.display = 'block';
        this._start();
      } else {
        document.getElementById('login-error').style.display = 'block';
        input.value = '';
        input.focus();
      }
    };

    document.getElementById('login-btn').addEventListener('click', tryLogin);
    document.getElementById('login-pin').addEventListener('keyup', (e) => {
      if (e.key === 'Enter') tryLogin();
    });
  },

  _start() {
    UI.renderUserSelector();

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        UI.showView(view);
        this._renderView(view);
      });
    });

    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) UI.hideModal();
    });

    this._renderView('workout');
  },

  _renderView(view) {
    switch(view) {
      case 'workout': Workout.render(); break;
      case 'history': History.render(); break;
      case 'progress': Progress.render(); break;
      case 'settings': Settings.render(); break;
    }
  },

  refresh() {
    UI.renderUserSelector();
    const activeView = document.querySelector('.nav-btn.active')?.dataset.view || 'workout';
    this._renderView(activeView);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
