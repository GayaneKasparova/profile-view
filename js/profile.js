import {getProfile} from './api.js';
import {showLoader, hideLoader} from './loader.js';
import {renderProfile} from "./render.js";

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const container = document.getElementById('profile-detail');

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
        if (!profile) {
            container.innerHTML = `<p class="error">Profile not found.</p>`;
            container.style.display = 'block';
            hideLoader();
            return;
        }
        await renderProfile(profile);
        const name = document.getElementById('name')?.dataset?.name;
        document.getElementById('flirt-btn').addEventListener('click', () => {
            alert('You flirted with ' + name);
        })
    } catch (err) {
        container.innerHTML = '<p class="error">Profile not found.</p>';
        container.style.display = 'block';
    }
    hideLoader();
});
