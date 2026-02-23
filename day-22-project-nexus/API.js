// API.js - Handles all network requests

const BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Fetches the top 50 cryptocurrencies by market cap with their price and percentage change.
 * @returns {Promise<Array>} Array of coin objects
 */
export async function fetchCoins() {
  try {
    // Fetching 50 coins to ensure we have enough for robust search/sort demo
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`,
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}
