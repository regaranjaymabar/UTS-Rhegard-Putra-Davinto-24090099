const summary = {
  totalProducts: 120,
  totalSales: 85,
  totalRevenue: 12500000,
};

function formatRupiah(number) {
  return 'Rp ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function renderSummaryCards() {
  const container = document.getElementById('summaryCards');

  const cardsData = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/9083/9083261.png',
      title: 'Total Products',
      value: summary.totalProducts,
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/3358/3358799.png',
      title: 'Total Sales',
      value: summary.totalSales,
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/8879/8879595.png',
      title: 'Total Revenue',
      value: formatRupiah(summary.totalRevenue),
    },
  ];

  container.innerHTML = '';

  cardsData.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

    cardEl.innerHTML = `
      <img class="icon-img" src="${card.icon}" alt="icon">
      <div class="title">${card.title}</div>
      <div class="value">${card.value}</div>
    `;

    container.appendChild(cardEl);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSummaryCards();

  const btnViewProducts = document.getElementById('btnViewProducts');
  btnViewProducts.addEventListener('click', () => {
    window.location.href = 'products.html';
  });

  const btnMenu = document.getElementById("btnMenu");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  function toggleSidebar() {
    mobileSidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    btnMenu.classList.toggle("active");
  }

  btnMenu.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);
});

document.addEventListener('DOMContentLoaded', function() {
  const desktopLogout = document.getElementById('logoutLink');
  const mobileLogout = document.getElementById('mobileLogoutLink');
  const alertBox = document.getElementById('customAlert');
  const alertText = document.getElementById('alertText');
  const alertConfirmBtn = document.getElementById('alertConfirmBtn');
  const alertCancelBtn = document.getElementById('alertCancelBtn');

  function showLogoutAlert(message, onConfirm) {
    alertText.textContent = message;
    alertBox.classList.remove('hidden');

    alertConfirmBtn.onclick = () => {
      alertBox.classList.add('hidden');
      if (onConfirm) onConfirm();
    };

    alertCancelBtn.onclick = () => {
      alertBox.classList.add('hidden');
    };
  }

  function handleLogoutClick(event) {
    event.preventDefault();
    showLogoutAlert("Apakah Anda yakin ingin logout?", () => {
      window.location.href = "login.html";
    });
  }

  if (desktopLogout) desktopLogout.addEventListener('click', handleLogoutClick);
  if (mobileLogout) mobileLogout.addEventListener('click', handleLogoutClick);
});
