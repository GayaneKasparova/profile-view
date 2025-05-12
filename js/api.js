const API_BASE = "https://fa.bdtechnologies.ch/api/v1";

/**
 * Universal error logger with fallback return.
 */
function handleFetchError(error, fallbackValue) {
    console.error("API error:", error);
    return fallbackValue;
}

/**
 * Standard GET request helper.
 */
async function getJSON(url, fallback) {
    try {
        const res = await fetch(url);
        if (!res.ok) return fallback;
        return await res.json();
    } catch (err) {
        return handleFetchError(err, fallback);
    }
}

/**
 * Standard POST/DELETE request helper.
 */
async function sendJSON(url, method, body) {
    try {
        return await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    } catch (err) {
        return handleFetchError(err, null);
    }
}

// === API Calls ===

export async function getProfiles() {
    return getJSON(`${API_BASE}/profiles`, []);
}

export async function getProfile(id) {
    return getJSON(`${API_BASE}/profiles/${id}`, null);
}

export async function getAccountInfo() {
    return getJSON(`${API_BASE}/account`, null);
}

export async function getFavorites(userId) {
    const data = await getJSON(`${API_BASE}/favorites`, {});
    return data.favorites?.[userId] || [];
}

export async function addFavorite(profileId) {
    return sendJSON(`${API_BASE}/favorites`, "POST", { profileId });
}

export async function removeFavorite(profileId) {
    return sendJSON(`${API_BASE}/favorites`, "DELETE", { profileId });
}