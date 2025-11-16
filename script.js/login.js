const loginForm = document.getElementById('loginForm');

function showAlert(message, type = 'error') {
  const alertBox = document.getElementById('customAlert');
  const textBox = document.getElementById('alertText');

  textBox.textContent = message;

  if (type === 'success') {
    alertBox.style.background = '#05be30ff';
    alertBox.querySelector('button').style.color = '#05be30ff';
  } else {
    alertBox.style.background = '#616161ff';
    alertBox.querySelector('button').style.color = '#616161ff';
  }
  alertBox.classList.remove('hidden');
  setTimeout(() => {
    closeAlert();
  }, 3000);
}

function closeAlert() {
  document.getElementById('customAlert').classList.add('hidden');
}

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = this.email.value.trim();
  const password = this.password.value.trim();
  const nim = "24090099";

  if (!email || !password) {
    showAlert('Email dan Password harus diisi!', 'error');
    return;
  }

  if (password !== nim) {
    showAlert('Password salah!', 'error');
    return;
  }
  
  showAlert('Login berhasil!', 'success');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
});
