const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const errorMessage = document.getElementById("error-message");
const loadingSpinner = document.getElementById("loading-spinner");
const weatherDisplay = document.getElementById("weather-display");
const emptyState = document.getElementById("empty-state");

// Weather Elements
const cityNameEl = document.getElementById("city-name");
const currentDateEl = document.getElementById("current-date");
const tempEl = document.getElementById("temperature");
const weatherDescEl = document.getElementById("weather-desc");
const windSpeedEl = document.getElementById("wind-speed");
const windDirEl = document.getElementById("wind-dir");
const elevationEl = document.getElementById("elevation");
const coordinatesEl = document.getElementById("coordinates");

searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

async function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) return;

  // Reset UI
  showLoading(true);
  showError(null);
  weatherDisplay.classList.add("hidden");
  emptyState.classList.add("hidden");

  try {
    // Step 1: Geocoding (Get Lat/Long from City Name)
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) throw new Error("Failed to fetch location data");

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City '${city}' not found.`);
    }

    const { latitude, longitude, name, country, elevation } =
      geoData.results[0];

    // Step 2: Get Weather Data
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");

    const weatherData = await weatherResponse.json();

    // Step 3: Update UI
    updateUI({
      name,
      country,
      elevation,
      latitude,
      longitude,
      current: weatherData.current_weather,
    });
  } catch (error) {
    showError(error.message);
    emptyState.classList.remove("hidden"); // Show empty state again on error or keep it hidden?
    // Maybe better to just show error.
  } finally {
    showLoading(false);
  }
}

function updateUI(data) {
  // Reveal weather card
  weatherDisplay.classList.remove("hidden");

  // Update Text Content
  cityNameEl.textContent = `${data.name}, ${data.country}`;

  // Date
  const now = new Date();
  const options = { weekday: "long", month: "short", day: "numeric" };
  currentDateEl.textContent = now.toLocaleDateString("en-US", options);

  // Weather Data
  tempEl.textContent = Math.round(data.current.temperature);
  windSpeedEl.textContent = `${data.current.windspeed} km/h`;
  windDirEl.textContent = `${data.current.winddirection}°`;
  elevationEl.textContent = `${data.elevation} m`;
  coordinatesEl.textContent = `${data.latitude.toFixed(2)}, ${data.longitude.toFixed(2)}`;

  // Interpret Weather Code (WMO Code)
  const code = data.current.weathercode;
  const weatherInfo = getWeatherDescription(code);
  weatherDescEl.textContent = weatherInfo.description;

  // Set icon/background based on weather (simplified)
  // You could dynamically change icons here if you had them
}

function showLoading(isLoading) {
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
    searchBtn.disabled = true;
  } else {
    loadingSpinner.classList.add("hidden");
    searchBtn.disabled = false;
  }
}

function showError(message) {
  if (message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
  }
}

// Helper to interpret WMO codes
function getWeatherDescription(code) {
  // Simple WMO code mapping
  const codes = {
    0: { description: "Clear sky" },
    1: { description: "Mainly clear" },
    2: { description: "Partly cloudy" },
    3: { description: "Overcast" },
    45: { description: "Fog" },
    48: { description: "Depositing rime fog" },
    51: { description: "Light drizzle" },
    53: { description: "Moderate drizzle" },
    55: { description: "Dense drizzle" },
    61: { description: "Slight rain" },
    63: { description: "Moderate rain" },
    65: { description: "Heavy rain" },
    71: { description: "Slight snow fall" },
    73: { description: "Moderate snow fall" },
    75: { description: "Heavy snow fall" },
    80: { description: "Slight rain showers" },
    81: { description: "Moderate rain showers" },
    82: { description: "Violent rain showers" },
    95: { description: "Thunderstorm" },
    96: { description: "Thunderstorm with slight hail" },
    99: { description: "Thunderstorm with heavy hail" },
  };

  return codes[code] || { description: "Unknown" };
}
