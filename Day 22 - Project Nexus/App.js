// App.js - Main application logic

import { fetchCoins } from "./API.js";
import {
  renderCards,
  showLoader,
  hideLoader,
  showError,
  updateThemeIcon,
} from "./UI.js";

const State = {
  coins: [],
  filteredCoins: [],
  favorites: JSON.parse(localStorage.getItem("nexus_favorites")) || [],
  theme: localStorage.getItem("nexus_theme") || "light",
  filterText: "",
  sortMethod: "market_cap_desc",
};

// Initialize App
async function init() {
  // Apply initial theme
  const isSystemDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (!localStorage.getItem("nexus_theme") && isSystemDark) {
    State.theme = "dark";
  }
  updateThemeIcon(State.theme === "dark");

  // Fetch Initial Data
  await loadData();

  // Event Listeners
  setupEventListeners();
}

async function loadData() {
  showLoader();
  try {
    const data = await fetchCoins();
    State.coins = data;
    processData(); // Filter and Sort
  } catch (error) {
    showError("Failed to load crypto data. Please check your connection.");
  } finally {
    hideLoader();
  }
}

function processData() {
  // 1. Filter
  let result = State.coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(State.filterText.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(State.filterText.toLowerCase()),
  );

  // 2. Sort
  result.sort((a, b) => {
    switch (State.sortMethod) {
      case "price_desc":
        return b.current_price - a.current_price;
      case "price_asc":
        return a.current_price - b.current_price;
      case "market_cap_desc":
        return b.market_cap - a.market_cap;
      case "market_cap_asc":
        return a.market_cap - b.market_cap;
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  State.filteredCoins = result;
  renderCards(State.filteredCoins, State.favorites);
}

function setupEventListeners() {
  // Search
  document.getElementById("search-input").addEventListener("input", (e) => {
    State.filterText = e.target.value;
    processData();
  });

  // Sort
  document.getElementById("sort-select").addEventListener("change", (e) => {
    State.sortMethod = e.target.value;
    processData();
  });

  // Theme Toggle
  document.getElementById("theme-toggle").addEventListener("click", () => {
    State.theme = State.theme === "light" ? "dark" : "light";
    localStorage.setItem("nexus_theme", State.theme);
    updateThemeIcon(State.theme === "dark");
  });

  // Favorites (Event Delegation)
  document.getElementById("card-grid").addEventListener("click", (e) => {
    if (
      e.target.classList.contains("fav-btn") ||
      e.target.parentElement.classList.contains("fav-btn")
    ) {
      const btn = e.target.classList.contains("fav-btn")
        ? e.target
        : e.target.parentElement;
      const id = btn.dataset.id;

      toggleFavorite(id);
    }
  });

  // Retry Button
  const retryBtn = document.getElementById("retry-btn");
  if (retryBtn) {
    retryBtn.addEventListener("click", () => loadData());
  }
}

function toggleFavorite(id) {
  if (State.favorites.includes(id)) {
    State.favorites = State.favorites.filter((favId) => favId !== id);
  } else {
    State.favorites.push(id);
  }

  // Save to LocalStorage
  localStorage.setItem("nexus_favorites", JSON.stringify(State.favorites));

  // Re-render to update UI (Optimized: could just toggle class, but re-render ensures consistency with filter/sort state)
  // Actually, let's just update the DOM element directly for performance, then re-render if needed.
  // But since `renderCards` is fast for 50 items, re-rendering is fine and cleaner for state sync.
  renderCards(State.filteredCoins, State.favorites);
}

// Start
document.addEventListener("DOMContentLoaded", init);
