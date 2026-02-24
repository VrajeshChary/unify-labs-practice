// Global State
let allProducts = [];
let cart = JSON.parse(localStorage.getItem("unify_cart")) || [];

// DOM Elements
const grid = document.getElementById("productGrid");
const loader = document.getElementById("loader");
const emptyState = document.getElementById("emptyState");
const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalPrice = document.getElementById("cartTotalPrice");

// Initialize
async function init() {
  updateCartIcon();
  await fetchProducts();
}

// Fetch Products from API (with optional query)
async function fetchProducts(query = "") {
  showLoader();
  try {
    const res = await fetch(`/api/products${query}`);
    allProducts = await res.json();
    renderProducts(allProducts);
  } catch (err) {
    console.error("Failed to load products", err);
    grid.innerHTML =
      '<p style="text-align:center; color:red; grid-column:1/-1;">Error loading products.</p>';
  } finally {
    hideLoader();
  }
}

// Render Products to Grid
function renderProducts(products) {
  grid.innerHTML = "";

  if (products.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  products.forEach((product) => {
    // Check if item is already in cart to style button
    const inCart = cart.find((item) => item._id === product._id);
    const btnClass = inCart ? "add-btn added" : "add-btn";
    const btnText = inCart ? "In Cart ✓" : "Add to Cart";

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="${btnClass}" onclick="addToCart('${product._id}', this)">${btnText}</button>
            </div>
        `;
    grid.appendChild(card);
  });
}

// Search Feature
function searchProducts() {
  const term = document.getElementById("searchInput").value;
  // Reset active category styles
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.querySelector(".filter-btn").classList.add("active"); // Set 'All'

  fetchProducts(`?search=${term}`);
}

// Category Filter Feature
function filterCategory(category) {
  // UI Update
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // API Call
  document.getElementById("searchInput").value = "";
  if (category === "All") {
    fetchProducts();
  } else {
    fetchProducts(`?category=${category}`);
  }
}

// ==========================================
// CART ENGINE LOGIC
// ==========================================

function addToCart(productId, btnElement) {
  const product = allProducts.find((p) => p._id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item._id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Add new item with quantity 1
    cart.push({ ...product, quantity: 1 });

    // Micro-animation for UI
    if (btnElement) {
      btnElement.classList.add("added");
      btnElement.innerText = "In Cart ✓";
    }
  }

  saveCart();
  updateCartIcon();
  renderCart(); // Update sidebar if it's open
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item._id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    renderCart();
    updateCartIcon();
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item._id !== productId);
  saveCart();
  renderCart();
  updateCartIcon();

  // Refresh product grid to reset 'In Cart' button if needed
  renderProducts(allProducts);
}

function saveCart() {
  localStorage.setItem("unify_cart", JSON.stringify(cart));
}

function updateCartIcon() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.innerText = totalItems;

  // Small animation
  cartCount.style.transform = "scale(1.3)";
  setTimeout(() => (cartCount.style.transform = "scale(1)"), 200);
}

// ==========================================
// CART UI INTERACTION
// ==========================================

function openCart() {
  renderCart();
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeCart() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-msg">Your cart is empty.</p>';
    cartTotalPrice.innerText = "$0.00";
    return;
  }

  let html = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQuantity('${item._id}', -1)">-</button>
                        <span class="item-qty">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item._id}', 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart('${item._id}')">Remove</button>
                    </div>
                </div>
            </div>
        `;
  });

  cartItemsContainer.innerHTML = html;
  cartTotalPrice.innerText = `$${total.toFixed(2)}`;
}

// ==========================================
// SECURE CHECKOUT
// ==========================================

async function checkout(event) {
  event.preventDefault();
  if (cart.length === 0) return alert("Your cart is empty!");

  const customerName = document.getElementById("customerName").value;
  const customerEmail = document.getElementById("customerEmail").value;
  const customerAddress = document.getElementById("customerAddress").value;

  // Calculate total on frontend for body payload
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const orderData = {
    customer: customerName,
    email: customerEmail,
    address: customerAddress,
    items: cart.map((item) => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    total: totalAmount,
  };

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (data.success) {
      alert(
        `Thanks ${customerName}! Order placed successfully. Order ID: ${data.orderId}`,
      );
      // Clear cart
      cart = [];
      saveCart();
      closeCart();
      updateCartIcon();
      renderProducts(allProducts); // Reset add buttons
      document.getElementById("checkoutForm").reset(); // clear the form
    } else {
      alert("Checkout failed. Please try again.");
    }
  } catch (err) {
    console.error("Checkout error", err);
    alert("An error occurred during checkout.");
  }
}

// Utility Loaders
function showLoader() {
  loader.style.display = "block";
  grid.style.display = "none";
}
function hideLoader() {
  loader.style.display = "none";
  grid.style.display = "grid";
}

// Run
init();
