import { getFavorites, addFavorite, removeFavorite } from './api.js';
import { getUserId } from './auth.js';


/**
 * Renders a list of profiles into the profile grid.
 * If no profiles are provided, displays a fallback message.
 *
 * @param {Array} profiles - Array of profile objects to be rendered.
 * @param {HTMLElement|string} fallback - The fallback message element to display when there are no profiles to render.
 * Each profile object should include:
 *   - id {number}: Unique identifier for the profile.
 *   - name {string}: Name of the profile.
 *   - avatar {string}: URL to the profile's avatar image.
 *   - age {number} [optional]: Age of the profile.
 *   - city {string} [optional]: City where the profile is located.
 *   - relationship_status {string} [optional]: Relationship status of the profile.
 */

export async function renderProfiles(profiles, fallback) {
    const grid = document.querySelector('.profile-grid');

    if (!profiles.length) {
        grid.appendChild(fallback);
        return;
    }

    const uid = await getUserId();
    const favorites = uid ? await getFavorites(uid) : [];

    for (let profile of profiles) {
        const card = document.createElement('div');
        card.className = 'profile-card';
        const isFavorite = favorites.includes(profile.id);

        const ageHTML = profile.age ? `<span>(${profile.age})</span>` : '';
        const cityHTML = profile.city ? `📍 ${profile.city}` : '';
        const relationshipHTML = profile.relationship_status ? `<p>💑 ${profile.relationship_status}</p>` : '';

        grid.appendChild(card);
        card.innerHTML = `
          <div class="avatar-wrapper">
            <a href="/profile?id=${profile.id}">
                <img src="${profile.avatar}" alt="${profile.name}'s avatar" class="profile-img" loading="lazy" width="300" height="300"/>
            </a>
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                    data-id="${profile.id}"
                    title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                    ${isFavorite ? '♥' : '♡'}
            </button>
          </div>
          <a class="profile-info" href="/profile?id=${profile.id}">
            <div class="profile-name-wrapper">
              <h3 class="profile-name" title="${profile.name}">${profile.name}</h3>
              ${ageHTML}
            </div>
            <div class="profile-meta">
              <p>${cityHTML}</p>
              ${relationshipHTML}
            </div>
          </a>
        `;
    }

    attachFavoriteToggleListeners();
}

/**
 * Injects a user's profile into the container element.
 *
 * @param {Object} profile - The profile object to render.
 * @param {string} profile.id - Profile id.
 * @param {string} profile.avatar - URL of the profile avatar image.
 * @param {string} profile.name - Name of the user.
 * @param {number} profile.age - Age of the user.
 * @param {string} profile.city - City of the user.
 * @param {string} profile.relationship_status - Relationship status of the user.
 */

export async function renderProfile(profile) {
    document.getElementById('avatar').src = profile.avatar;
    document.getElementById('avatar').alt = `${profile.name}'s avatar`;

    document.getElementById('name').textContent = `${profile.name}`;
    document.getElementById('name').dataset.name = `${profile.name}`;
    document.getElementById('age').textContent = profile.age ? `(${profile.age})` : '';
    document.getElementById('city').textContent = `📍 ${profile.city}`;
    document.getElementById('status').textContent = `💑 ${profile.relationship_status}`;

    const uid = await getUserId();
    const favorites = uid ? await getFavorites(uid) : [];
    const isFavorite = favorites.includes(profile.id);
    const favoriteBtn = document.getElementById('favorite-btn');
    favoriteBtn.textContent =  isFavorite ? '♥' : '♡';
    if (isFavorite) {
        favoriteBtn.classList.add('active');
    }
    favoriteBtn.dataset.id = profile.id;
    favoriteBtn.title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
    attachFavoriteToggleListeners();
}


/**
 * Attaches event listeners to all favorite toggle buttons on the page.
 * Each button toggles the favorite status of a profile when clicked.
 *
 * Button behavior:
 * - If the profile is already a favorite (button is active), clicking will remove it from favorites.
 * - If the profile is not a favorite, clicking will add it to favorites.
 *
 * The button updates dynamically to reflect the current favorite status:
 * - Adds or removes the "active" class.
 * - Updates the button's inner HTML (♥ for active, ♡ for inactive).
 * - Adjusts the button's title attribute accordingly.
 */
export function attachFavoriteToggleListeners() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const profileId = Number(btn.dataset.id);
            const isActive = btn.classList.contains('active');

            if (isActive) {
                await removeFavorite(profileId);
                btn.classList.remove('active');
                btn.innerHTML = '♡';
                btn.title = 'Add to favorites';

                // If on favorites.html, remove the card from DOM
                if (window.location.pathname.includes('favorites')) {
                    btn.closest('.profile-card').remove();

                    // If no cards left, show empty state
                    if (document.querySelectorAll('.profile-card').length === 0) {
                        const grid = document.querySelector('.profile-grid');
                        grid.innerHTML = '<p class="fallback-message">No favorites yet 💔</p>';
                    }
                }

            } else {
                await addFavorite(profileId);
                btn.classList.add('active');
                btn.innerHTML = '♥';
                btn.title = 'Remove from favorites';
            }
        });
    });
}