// UI.js - Handles DOM manipulation

const grid = document.getElementById("card-grid");
const loader = document.getElementById("loader");
const errorContainer = document.getElementById("error-container");
const errorMessage = document.getElementById("error-message");
const themeToggleBtn = document.getElementById("theme-toggle");

export function showLoader() {
  loader.classList.remove("hidden");
  grid.innerHTML = "";
  errorContainer.classList.add("hidden");
}

export function hideLoader() {
  loader.classList.add("hidden");
}

export function showError(message) {
  loader.classList.add("hidden");
  grid.innerHTML = "";
  errorContainer.classList.remove("hidden");
  errorMessage.textContent = message || "An unexpected error occurred.";
}

export function renderCards(coins, favorites = []) {
  grid.innerHTML = "";

  if (coins.length === 0) {
    grid.innerHTML =
      '<p style="text-align:center; grid-column: 1/-1;">No results found.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();

  coins.forEach((coin) => {
    const isFav = favorites.includes(coin.id);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <button class="fav-btn ${isFav ? "active" : ""}" data-id="${coin.id}" aria-label="Toggle favorite">
                ${isFav ? "★" : "☆"}
            </button>
            <div class="card-header">
                <div class="card-title">
                    <img src="${coin.image}" alt="${coin.name}">
                    <div>
                        <h2>${coin.name}</h2>
                        <span>${coin.symbol}</span>
                    </div>
                </div>
            </div>
            <div class="card-price">$${coin.current_price.toLocaleString()}</div>
            <div class="card-stats">
                <div class="stat-item ${coin.price_change_percentage_24h >= 0 ? "positive" : "negative"}">
                    24h: ${coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div class="stat-item">
                    Cap: $${(coin.market_cap / 1e9).toFixed(1)}B
                </div>
            </div>
        `;
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

export function updateThemeIcon(isDark) {
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  if (isDark) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  }
}
