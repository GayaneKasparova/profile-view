import { getProfiles, getAccountInfo } from './api.js';
import { renderProfiles } from './render.js';
import { showLoader, hideLoader } from './loader.js';

/**
 * Initializes the application after the DOM content is fully loaded.
 * Displays a loader, fetches the profiles, renders them, and hides the loader after completion.
 */
document.addEventListener('DOMContentLoaded', async () => {
    showLoader();
    const data = await getProfiles();
    const fallback =  `<p>Oooops! No profiles available at the moment.</p>`;
    await renderProfiles(data.profiles || [], fallback);
    hideLoader();
});

/**
 * Retrieves the user ID by fetching account information.
 * If the account information is unavailable or lacks a UID, returns null.
 *
 * @returns {Promise<string|null>} A promise that resolves to the user ID (UID) or null if not available.
 */
export async function getUserId() {
    const accountData = await getAccountInfo();
    return accountData?.UID || null;
}