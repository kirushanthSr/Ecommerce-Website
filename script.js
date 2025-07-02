// Navigation toggle
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Utility: Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Utility: Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to Cart Handler
function addToCart(product) {
  let cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
}

// Add to cart button listener
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const product = {
      id: this.dataset.id,
      name: this.dataset.name,
      price: parseFloat(this.dataset.price),
      image: this.dataset.image
    };
    addToCart(product);
    window.location.href = 'cart.html';
  });
});

// Render cart on cart.html
function renderCart() {
  if (!document.getElementById('cart-container')) return;

  const cart = getCart();
  const container = document.getElementById('cart-container');

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;
  const rows = cart.map((item, idx) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    return `
      <tr data-id="${item.id}">
        <td>
          <a href="#" class="remove-cart-item" data-idx="${idx}">
            <i class="far fa-times-circle" style="color: red;"></i>
          </a>
        </td>
        <td><img src="${item.image}" width="50"></td>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td><input type="number" min="1" value="${item.quantity}" class="cart-qty" data-idx="${idx}"></td>
        <td>$${subtotal.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <table width="100%">
      <thead>
        <tr>
          <td>Remove</td>
          <td>Image</td>
          <td>Product</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Subtotal</td>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  // Quantity change handler
  container.querySelectorAll('.cart-qty').forEach(input => {
    input.addEventListener('change', function () {
      let cart = getCart();
      const idx = parseInt(this.dataset.idx);
      const qty = Math.max(1, parseInt(this.value));
      cart[idx].quantity = qty;
      saveCart(cart);
      renderCart();
    });
  });

  // Remove item handler
  container.querySelectorAll('.remove-cart-item').forEach(btn => {
    btn.addEventListener('click', function () {
      let cart = getCart();
      const idx = parseInt(this.dataset.idx);
      cart.splice(idx, 1);
      saveCart(cart);
      renderCart();
    });
  });
}

// Auto-render on cart page
if (window.location.pathname.endsWith('cart.html')) {
  document.addEventListener('DOMContentLoaded', renderCart);
}

// Cart count badge (optional)
function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = count > 0 ? count : '';
}
updateCartCount();
window.addEventListener('storage', updateCartCount);

// After total is calculated in renderCart()
const subtotalElem = document.getElementById('cart-subtotal');
const totalElem = document.getElementById('cart-total');

// Update subtotal and total UI
if (subtotalElem) subtotalElem.textContent = `$${total.toFixed(2)}`;
if (totalElem) totalElem.textContent = `$${total.toFixed(2)}`;

function renderCart() {
  if (!document.getElementById('cart-container')) return;

  const cart = getCart();
  const container = document.getElementById('cart-container');

  if (cart.length === 0) {
    container.innerHTML = '<p><strong>Your cart is empty. </strong></p>';
    return;
  }

  let total = 0;
  const rows = cart.map((item, idx) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    return `
      <tr data-id="${item.id}">
        <td>
          <a href="#" class="remove-cart-item" data-idx="${idx}">
            <i class="far fa-times-circle" style="color: red;"></i>
          </a>
        </td>
        <td><img src="${item.image}" width="50"></td>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td><input type="number" min="1" value="${item.quantity}" class="cart-qty" data-idx="${idx}"></td>
        <td>$${subtotal.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <table width="100%">
      <thead>
        <tr>
          <td>Remove</td>
          <td>Image</td>
          <td>Product</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Subtotal</td>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  // ✅ Update subtotal and total below
  const subtotalElem = document.getElementById('cart-subtotal');
  const totalElem = document.getElementById('cart-total');
  if (subtotalElem) subtotalElem.textContent = `$${total.toFixed(2)}`;
  if (totalElem) totalElem.textContent = `$${total.toFixed(2)}`;

  // Quantity change handler
  container.querySelectorAll('.cart-qty').forEach(input => {
    input.addEventListener('change', function () {
      let cart = getCart();
      const idx = parseInt(this.dataset.idx);
      const qty = Math.max(1, parseInt(this.value));
      cart[idx].quantity = qty;
      saveCart(cart);
      renderCart();
    });
  });

  // Remove item handler
  container.querySelectorAll('.remove-cart-item').forEach(btn => {
    btn.addEventListener('click', function () {
      let cart = getCart();
      const idx = parseInt(this.dataset.idx);
      cart.splice(idx, 1);
      saveCart(cart);
      renderCart();
    });
  });
}
