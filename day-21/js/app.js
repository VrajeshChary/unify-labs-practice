import { saveSettings, loadSettings } from "./settings.js";

// DOM Elements
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");
const languageSelect = document.getElementById("language-select");
const statusMessage = document.getElementById("status-message");

// State
let currentSettings = loadSettings();

/**
 * Applies the current settings to the UI.
 */
function applySettings() {
  // Apply Theme
  if (currentSettings.theme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "🌙";
    themeText.textContent = "Dark Mode";
  } else {
    document.body.classList.remove("dark-mode");
    themeIcon.textContent = "☀️";
    themeText.textContent = "Light Mode";
  }

  // Apply Language
  languageSelect.value = currentSettings.language;
}

/**
 * Updates the settings and saves them.
 * @param {string} key - The setting key to update.
 * @param {any} value - The new value.
 */
function updateSetting(key, value) {
  currentSettings[key] = value;
  if (saveSettings(currentSettings)) {
    showStatus("Settings saved!");
  }
  applySettings();
}

/**
 * Shows a temporary status message.
 * @param {string} message
 */
function showStatus(message) {
  statusMessage.textContent = message;
  statusMessage.classList.add("visible");
  setTimeout(() => {
    statusMessage.classList.remove("visible");
  }, 2000);
}

// Event Listeners
themeToggleBtn.addEventListener("click", () => {
  const newTheme = currentSettings.theme === "dark" ? "light" : "dark";
  updateSetting("theme", newTheme);
});

languageSelect.addEventListener("change", (e) => {
  updateSetting("language", e.target.value);
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  applySettings();
});
