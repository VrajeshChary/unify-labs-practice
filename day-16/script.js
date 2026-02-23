// Smart Text Formatter

// 1. Title Case: Trims and capitalizes the first letter of every word
const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/) // Split by any whitespace
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// 2. Count Vowels: Counts vowels in a string
const countVowels = (str) => {
  if (!str) return 0;
  const matches = str.match(/[aeiou]/gi); // Global, case-insensitive
  return matches ? matches.length : 0;
};

// 3. Secret Message: Replaces specific words with '***'
const obscureSecrets = (str, wordToHide) => {
  if (!str) return "";
  if (!wordToHide) return str;

  // Create a regex to find the word (case-insensitive)
  const regex = new RegExp(`\\b${wordToHide}\\b`, "gi");
  return str.replace(regex, "***");
};

// 4. Text Stats: Uses Math object for statistics
const getStats = (str) => {
  if (!str) return "No text provided.";

  const charCount = str.length;
  const words = str
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const wordCount = words.length;

  if (wordCount === 0) return "Words: 0, Characters: 0";

  // Calculate average word length using Math
  const totalWordLength = words.reduce((acc, word) => acc + word.length, 0);
  const avgLength = totalWordLength / wordCount;
  const roundedAvg = Math.round(avgLength * 100) / 100; // Round to 2 decimals using Math

  return `Words: ${wordCount}\nCharacters: ${charCount}\nAvg Word Length: ${roundedAvg}`;
};

// DOM Elements
const userTextInput = document.getElementById("userText");
const secretWordInput = document.getElementById("secretWord");
const outputDiv = document.getElementById("output");

// Buttons
document.getElementById("btnTitleCase").addEventListener("click", () => {
  const text = userTextInput.value;
  outputDiv.textContent = toTitleCase(text);
});

document.getElementById("btnCountVowels").addEventListener("click", () => {
  const text = userTextInput.value;
  const count = countVowels(text);
  outputDiv.textContent = `Vowel Count: ${count}`;
});

document.getElementById("btnSecretMessage").addEventListener("click", () => {
  const text = userTextInput.value;
  const secret = secretWordInput.value;

  // Simple toggle for the secret input visibility if it's empty
  if (!secret) {
    // Checking if the prompt meant UI toggle or just functionality.
    // For a smoother UX, let's just prompt or use the input box.
    // We'll proceed with the input box value.
    // If it's empty, we might want to alert the user or just run it (no change).
    if (secretWordInput.closest(".input-group").classList.contains("hidden")) {
      secretWordInput.closest(".input-group").classList.remove("hidden");
      outputDiv.textContent =
        "Please enter the word to hide above, then click 'Secret Message' again.";
      return;
    }
  }

  outputDiv.textContent = obscureSecrets(text, secret);
  // Show the input if it was hidden, so they can see what they filtered
  secretWordInput.closest(".input-group").classList.remove("hidden");
});

document.getElementById("btnStats").addEventListener("click", () => {
  const text = userTextInput.value;
  outputDiv.textContent = getStats(text);
});
