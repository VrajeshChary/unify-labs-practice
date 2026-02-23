/**
 * Settings Logic Module
 * Handles persistence of user preferences using localStorage.
 */

const STORAGE_KEY = "user_preferences";

/**
 * Saves the settings object to localStorage.
 * @param {Object} settings - The settings object to save.
 */
export function saveSettings(settings) {
  try {
    const settingsJSON = JSON.stringify(settings);
    localStorage.setItem(STORAGE_KEY, settingsJSON);
    console.log("Settings saved:", settings);
    return true;
  } catch (error) {
    console.error("Error saving settings:", error);
    return false;
  }
}

/**
 * Loads the settings object from localStorage.
 * @returns {Object} The settings object, or default settings if none exist.
 */
export function loadSettings() {
  try {
    const settingsJSON = localStorage.getItem(STORAGE_KEY);
    if (settingsJSON) {
      return JSON.parse(settingsJSON);
    }
  } catch (error) {
    console.error("Error loading settings:", error);
  }

  // Default settings
  return {
    theme: "light",
    language: "en",
  };
}
