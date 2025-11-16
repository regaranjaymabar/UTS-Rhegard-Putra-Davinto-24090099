const products = [
  { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
  { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
  { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];

function formatRupiah(number) {
  return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

let editingIndex = null;

const alertBox = document.getElementById("customAlert");
const alertText = document.getElementById("alertText");
const alertConfirmBtn = document.getElementById("alertConfirmBtn");
const alertCancelBtn = document.getElementById("alertCancelBtn");

let alertCallback = null;

function showCustomAlert(message, callback) {
  alertText.textContent = message;
  alertBox.classList.remove("hidden");
  alertCallback = callback;
}

alertConfirmBtn.onclick = () => {
  alertBox.classList.add("hidden");
  if (alertCallback) alertCallback();
};

alertCancelBtn.onclick = () => {
  alertBox.classList.add("hidden");
  alertCallback = null;
};

function displayProducts() {
  const tbody = document.getElementById("productBody");
  tbody.innerHTML = "";

  products.forEach((product, index) => {
    const tr = document.createElement("tr");

    if (index === editingIndex) {
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td><input type="text" id="editName" value="${product.name}" /></td>
        <td><input type="number" id="editPrice" value="${product.price}" min="0" /></td>
        <td><input type="number" id="editStock" value="${product.stock}" min="0" /></td>
        <td>
            <button class="action-btn" title="Save" onclick="saveEdit(${index})">
            <img src="https://cdn-icons-png.flaticon.com/128/2874/2874091.png" class="icon-btn">
            </button>
            <button class="action-btn" title="Cancel" onclick="cancelEdit()">
            <img src="https://cdn-icons-png.flaticon.com/128/4347/4347434.png" class="icon-btn">
            </button>
        </td>
      `;
    } else {
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${formatRupiah(product.price)}</td>
        <td>${product.stock}</td>
        <td>
            <button class="action-btn edit-btn" title="Edit" onclick="startEdit(${index})">
            <img src="https://cdn-icons-png.flaticon.com/128/2985/2985043.png" class="icon-btn">
            </button>
            <button class="action-btn delete-btn" title="Delete" onclick="deleteProduct(${index})">
            <img src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png" class="icon-btn">
            </button>
        </td>
      `;
    }

    tbody.appendChild(tr);
  });
}

function startEdit(index) {
  if (editingIndex !== null) {
    showCustomAlert("Selesaikan edit produk sebelumnya dahulu!");
    return;
  }
  editingIndex = index;
  displayProducts();
}

function cancelEdit() {
  editingIndex = null;
  displayProducts();
}

function saveEdit(index) {
  const nameInput = document.getElementById("editName").value.trim();
  const priceInput = document.getElementById("editPrice").value.trim();
  const stockInput = document.getElementById("editStock").value.trim();

  if (!nameInput) {
    showCustomAlert("Nama produk tidak boleh kosong.");
    return;
  }

  const priceNumber = Number(priceInput);
  const stockNumber = Number(stockInput);

  if (isNaN(priceNumber) || priceNumber < 0) {
    showCustomAlert("Harga harus angka positif.");
    return;
  }

  if (isNaN(stockNumber) || stockNumber < 0) {
    showCustomAlert("Stok harus angka positif.");
    return;
  }

  products[index].name = nameInput;
  products[index].price = priceNumber;
  products[index].stock = stockNumber;

  editingIndex = null;
  displayProducts();
}

function deleteProduct(index) {
  showCustomAlert(`Yakin hapus produk "${products[index].name}"?`, () => {
    if (editingIndex === index) editingIndex = null;
    products.splice(index, 1);
    displayProducts();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();

  const menuBtn = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  const desktopLogout = document.getElementById('logoutLink');
  if (desktopLogout) {
    desktopLogout.addEventListener('click', (e) => {
      e.preventDefault();
      showCustomAlert("Apakah Anda yakin ingin logout?", () => {
        window.location.href = "login.html";
      });
    });
  }

  const mobileLogout = document.getElementById('mobileLogoutLink');
  if (mobileLogout) {
    mobileLogout.addEventListener('click', (e) => {
      e.preventDefault();
      showCustomAlert("Apakah Anda yakin ingin logout?", () => {
        window.location.href = "login.html";
      });
    });
  }
});
