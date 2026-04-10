let products = [
{
  id: 1,
  name: "Silk Knit Dress",
  category: "Clothing",
  price: 2850000,
  badge: "Best Seller",
  image: "img/silkknitdress.jpg",
  description: "Soft silk knit dress with a fluid and elegant silhouette."
},
{
  id: 2,
  name: "Tailored Wool Coat",
  category: "Clothing",
  price: 4200000,
  badge: "Editor’s Pick",
  image: "img/woolcoat.jpg",
  description: "Structured wool coat with a clean and timeless design."
},
{
  id: 3,
  name: "Fur Jacket",
  category: "Clothing",
  price: 4500000,
  badge: "New",
  image: "img/furjacket.jpg",
  description: "Luxurious fur jacket with a soft and refined finish."
},
{
  id: 4,
  name: "Signature Leather Tote Bag",
  category: "Bags",
  price: 7600000,
  badge: "Luxury",
  image: "img/leathertotebag.jpg",
  description: "Premium leather tote with a sleek and spacious design."
},
{
  id: 5,
  name: "Classy Hand Bag",
  category: "Bags",
  price: 5450000,
  badge: "Best Seller",
  image: "img/handbag.jpg",
  description: "Elegant handbag with a clean and modern silhouette."
},
{
  id: 6,
  name: "Elegant Black Heels",
  category: "Footwear",
  price: 3950000,
  badge: "Elegant",
  image: "img/blackheels.jpg",
  description: "Classic black heels with subtle gold accents."
},
{
  id: 7,
  name: "Modern Beige Sandals",
  category: "Footwear",
  price: 2850000,
  badge: "Classic",
  image: "img/beigesandals.jpg",
  description: "Minimal beige sandals for a refined everyday look."
},
{
  id: 8,
  name: "Silk Statement Scarf",
  category: "Accessories",
  price: 1050000,
  badge: "Refined",
  image: "img/silkscarfs.jpg",
  description: "Lightweight silk scarf with a soft elegant touch."
},
{
  id: 9,
  name: "Elegant Waist Belt",
  category: "Accessories",
  price: 1520000,
  badge: "Essential",
  image: "img/belt.jpg",
  description: "Slim waist belt to define and refine your look."
},
{
  id: 10,
  name: "Luxury Gold Earrings",
  category: "Accessories",
  price: 2850000,
  badge: "Luxury",
  image: "img/earings.jpg",
  description: "Delicate gold earrings with a timeless finish."
}
];

let currentCategory = "All";

const productGrid = document.getElementById("productGrid");
const productSelect = document.getElementById("productSelect");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

const quantityInput = document.getElementById("quantity");
const summaryProduct = document.getElementById("summaryProduct");
const summaryQuantity = document.getElementById("summaryQuantity");
const summaryTotal = document.getElementById("summaryTotal");

const orderForm = document.getElementById("orderForm");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

const progressBar = document.getElementById("progressBar");
const backTop = document.getElementById("backTop");

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

function formatPrice(value) {
  return "Rp" + value.toLocaleString("id-ID");
}

function renderProducts(list) {
  productGrid.innerHTML = "";

  if (list.length === 0) {
    productGrid.innerHTML = `
      <div class="glass" style="padding: 28px; border-radius: 22px; text-align: center; grid-column: 1 / -1;">
        <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 2rem; margin-bottom: 8px;">No products found</h3>
        <p style="color: #7a6a67;">Try another keyword or category.</p>
      </div>
    `;
    return;
  }

  list.forEach((item) => {
    const card = document.createElement("article");
    card.className = "product-card reveal visible";
    card.innerHTML = `
      <div class="product-image">
        <img src="${item.image || 'img/default.jpg'}" alt="${item.name}">
        <span class="product-badge">${item.badge}</span>
      </div>
      <div class="product-body">
        <p class="product-category">${item.category}</p>
        <h3 class="product-name">${item.name}</h3>
        <p class="product-desc">${item.description}</p>
        <div class="product-bottom">
  <span class="product-price">${formatPrice(item.price)}</span>

  <div style="display:flex; gap:8px;">
    <button class="order-product-btn" data-name="${item.name}">Order</button>

    <button onclick="deleteProduct(${item.id})"
      style="
        background:#5e2d35;
        color:white;
        border:none;
        padding:8px 10px;
        border-radius:999px;
        cursor:pointer;
      ">
      ✕
    </button>
  </div>
</div>
      </div>
    `;
    productGrid.appendChild(card);
  });

  document.querySelectorAll(".order-product-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      productSelect.value = btn.dataset.name;
      updateSummary();
      document.getElementById("order").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function fillProductSelect() {
  productSelect.innerHTML = `<option value="">-- Choose a product --</option>`;
  products.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = `${item.name} (${item.category})`;
    productSelect.appendChild(option);
  });
}

function applyFilters() {
  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = products.filter((item) => {
    const matchesCategory = currentCategory === "All" || item.category === currentCategory;
    const matchesKeyword =
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword);

    return matchesCategory && matchesKeyword;
  });

  renderProducts(filtered);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.dataset.category;
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

function getSelectedProduct() {
  return products.find((item) => item.name === productSelect.value);
}

function updateSummary() {
  const selectedProduct = getSelectedProduct();
  const qty = Number(quantityInput.value) || 1;

  summaryProduct.textContent = selectedProduct ? selectedProduct.name : "-";
  summaryQuantity.textContent = qty;

  if (selectedProduct) {
    summaryTotal.textContent = formatPrice(selectedProduct.price * qty);
  } else {
    summaryTotal.textContent = "Rp0";
  }
}

productSelect.addEventListener("change", updateSummary);
quantityInput.addEventListener("input", updateSummary);

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "Hide" : "Show";
});

function showError(inputId, message) {
  const field = document.getElementById(inputId);
  const errorElement = field.parentElement.querySelector(".error");
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearError(inputId) {
  const field = document.getElementById(inputId);
  const errorElement = field.parentElement.querySelector(".error");
  if (errorElement) {
    errorElement.textContent = "";
  }
}

function validateForm() {
  let isValid = true;

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const selectedProduct = document.getElementById("productSelect");
  const quantity = document.getElementById("quantity");
  const size = document.getElementById("size");
  const deliveryDate = document.getElementById("deliveryDate");
  const payment = document.querySelector('input[name="payment"]:checked');
  const terms = document.getElementById("terms");

  ["fullName", "email", "phone", "password", "productSelect", "quantity", "size", "deliveryDate"].forEach(clearError);
  document.querySelector(".radio-error").textContent = "";
  document.querySelector(".terms-error").textContent = "";

  if (fullName.value.trim() === "") {
    showError("fullName", "Full name is required.");
    isValid = false;
  }

  if (email.value.trim() === "") {
    showError("email", "Email is required.");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError("email", "Please enter a valid email address.");
    isValid = false;
  }

  if (phone.value.trim() === "") {
    showError("phone", "Phone number is required.");
    isValid = false;
}   else if (!/^[0-9]{6,15}$/.test(phone.value.trim())) {
    showError("phone", "Enter a valid phone number.");
    isValid = false;
}

  if (password.value.trim() === "") {
    showError("password", "Password is required.");
    isValid = false;
  } else if (password.value.trim().length < 8) {
    showError("password", "Password must be at least 8 characters.");
    isValid = false;
  }

  if (selectedProduct.value === "") {
    showError("productSelect", "Please select a product.");
    isValid = false;
  }

  if (quantity.value.trim() === "") {
    showError("quantity", "Quantity is required.");
    isValid = false;
  } else if (Number(quantity.value) <= 0) {
    showError("quantity", "Quantity must be greater than zero.");
    isValid = false;
  }

  if (size.value === "") {
    showError("size", "Please select a size.");
    isValid = false;
  }

  if (deliveryDate.value === "") {
    showError("deliveryDate", "Please choose a delivery date.");
    isValid = false;
  }

  if (!payment) {
    document.querySelector(".radio-error").textContent = "Please choose a payment method.";
    isValid = false;
  }

  if (!terms.checked) {
    document.querySelector(".terms-error").textContent = "You must agree to the terms and conditions.";
    isValid = false;
  }

  return isValid;
}

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    updateSummary();
    alert("Order confirmed successfully. Thank you for shopping with Key's Atelier.");
    orderForm.reset();
    togglePassword.textContent = "Show";
    passwordInput.type = "password";
    updateSummary();
  }
});

orderForm.addEventListener("reset", () => {
  setTimeout(() => {
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
    togglePassword.textContent = "Show";
    passwordInput.type = "password";
    updateSummary();
  }, 0);
});

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (scrollTop > 400) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
}

window.addEventListener("scroll", updateScrollProgress);

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el) => observer.observe(el));
}

function addProduct() {
  const name = document.getElementById("newName").value;
  const price = document.getElementById("newPrice").value;
  const category = document.getElementById("newCategory").value;

  if (!name || !price || !category) {
    alert("Isi semua field!");
    return;
  }

  const newItem = {
    id: Date.now(),
    name,
    category,
    price: Number(price),
    badge: "New",
    image: "img/default.jpg", 
    description: "New product"
  };

  products.push(newItem);

  applyFilters(); 
  fillProductSelect();

  document.getElementById("newName").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newCategory").value = "";
}

function deleteProduct(id) {
  products = products.filter(item => item.id !== id);
  renderProducts(products);
  fillProductSelect();
}

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

renderProducts(products);
fillProductSelect();
updateSummary();
setupReveal();
updateScrollProgress();