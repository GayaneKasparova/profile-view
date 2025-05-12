import { getProfile } from './api.js';
import { showLoader, hideLoader } from './loader.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const container = document.getElementById('profile-detail');

/**
 * Renders a user's profile into the container element.
 *
 * @param {Object} profile - The profile object to render.
 * @param {string} profile.avatar - URL of the profile avatar image.
 * @param {string} profile.name - Name of the user.
 * @param {number} profile.age - Age of the user.
 * @param {string} profile.city - City of the user.
 * @param {string} profile.relationship_status - Relationship status of the user.
 */
function renderProfile(profile) {
    container.innerHTML = `
    <div class="avatar-wrapper">
      <img src="${profile.avatar}" alt="${profile.name}" width="300" height="300" loading="lazy" />
    </div>
    <div class="profile-info">
      <h2 class="profile-name">${profile.name}, ${profile.age}</h2>
      <p>📍 ${profile.city}</p>
      <p>💑 ${profile.relationship_status}</p>
    </div>
  `;
}


document.addEventListener('DOMContentLoaded', async () => {
    /**
     * Handles the DOMContentLoaded event to initialize the profile detail page.
     *
     * This function performs the following actions:
     * - Displays the loader while fetching the profile data.
     * - Retrieves the profile data for the given ID from the URL parameters.
     * - If the profile is successfully fetched, it is rendered into the DOM.
     * - If no profile is found or an error occurs, an error message is displayed.
     * - Hides the loader after the operation is complete.
     *
     * The process ensures a user-friendly loading and error-handling experience.
     */
    showLoader();
    try {
        const profile = await getProfile(id);
        if (!profile) throw new Error("Not found");
        renderProfile(profile);
        container.style.display = 'block';
    } catch (err) {
        container.innerHTML = '<p class="error">Profile not found.</p>';
        container.style.display = 'block';
    }
    hideLoader();
});
