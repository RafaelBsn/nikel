const myModal = new bootstrap.Modal('#registerModal');
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

checkLogged();

//LOGIN
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;
  const session = document.getElementById('session-check').checked;

  const account = getAccount(email);

  if (!account) {
    alert('Opps! Verifique o usuário ou a senha.');
    return;
  }
  if (account) {
    if (account.password !== password) {
      alert('Opps! Verifique o usuário ou a senha.');
      return;
    }

    saveSession(email, session);
  }
  window.location.href = 'home.html';
});
//CRIAÇÃO DE CONTA
document.getElementById('create-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('registerInputEmail1').value;
  const password = document.getElementById('registerInputPassword1').value;

  if (email.length < 6) {
    alert('Email inválido');
    return;
  }
  if (password.length < 6) {
    alert('Senha deve ter no mínimo 6 caracteres');
    return;
  }

  saveAccount({ login: email, password: password, transactions: [] });
  myModal.hide();

  alert('Conta criada com sucesso!');
});

function checkLogged() {
  if (session) {
    sessionStorage.setItem('logged', session);
    logged = session;
  }
  if (logged) {
    saveSession(logged, session);

    window.location.href = 'home.html';
  }
}

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem('session', data);
  }

  sessionStorage.setItem('logged', data);
}

function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return null;
}
