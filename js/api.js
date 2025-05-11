//Base URL for the API endpoints used in the application.
const API_BASE = "https://fa.bdtechnologies.ch/api/v1";

/**
 * Logs an error and returns a fallback value.
 */

function handleFetchError(error, fallbackValue) {
    console.error("Error fetching data:", error);
    return fallbackValue;
}


/**
 * Fetches profiles from the API.
 * @returns {Promise<Object|Array>} The profile data or an empty array in case of an error.
 */
export async function fetchProfiles() {
    try {
        const response = await fetch(`${API_BASE}/profiles`);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        handleFetchError(error, []);
    }
}