import {fetchProfiles} from './api.js';
/**
 * Fetches profile data from the API and initializes rendering.
 * Show loader while content is loading.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const data = await fetchProfiles();
    renderProfiles(data.profiles || []);

    loader.style.display = 'none';
});

/**
 * Renders profile cards into the DOM.
 * Falls back to a message if no profiles are available.
 */

function renderProfiles(profiles) {
    const grid = document.querySelector('.profile-grid');

    if (profiles.length === 0) {
        const fallbackMessage = document.createElement('div');
        fallbackMessage.className = 'fallback-message';
        fallbackMessage.textContent = 'Oooops! No profiles available at the moment.';
        grid.appendChild(fallbackMessage);
    } else {
        for (let profile of profiles) {
            const card = document.createElement('div');
            card.className = 'profile-card';
            const isFavorite = getFavoriteStatus(profile.id);

            const ageHTML = profile.age ? `<h3>(${profile.age})</h3>` : '';
            const cityHTML = profile.city ? `📍 ${profile.city}` : '';
            const relationshipHTML = profile.relationship_status ? `<p>💑 ${profile.relationship_status}</p>` : '';

            grid.appendChild(card);
            card.innerHTML = `<div class="avatar-wrapper">
                                <img src="${profile.avatar}"
                                     alt="${profile.name}'s avatar"
                                     class="profile-img"
                                     loading="lazy"
                                     width="300"
                                     height="300"/>
                                <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                                        data-id="${profile.id}"
                                        title="Add to favorites">
                                        ${isFavorite ? '♥' : '♡'}
                                </button>
                              </div>
                              <div class="profile-info">
                                <div class="profile-name-wrapper">
                                    <h3 class="profile-name" title="${profile.name}">${profile.name}</h3>
                                     ${ageHTML}
                                </div>
                                <div class="profile-meta">
                                  <p>${cityHTML}</p>
                                  ${relationshipHTML}
                                </div>
                              </div>`;
        }

        // Attach favorite toggle logic after rendering cards
        attachFavoriteToggleListeners();
    }
}

/**
 * Retrieves whether a profile is marked as favorite from localStorage.
 */
function getFavoriteStatus(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    return !!favorites[id];
}

/**
 * Save or remove a profile's favorite status in localStorage.
 */
function saveFavoriteStatus(id, status) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    if (status) {
        favorites[id] = true;
    } else {
        delete favorites[id];
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

/**
 * Adds click event listeners to favorite buttons.
 * Toggles active class and updates localStorage.
 */
function attachFavoriteToggleListeners() {
    const buttons = document.querySelectorAll('.favorite-btn');

    for(let btn of buttons)  {
        btn.addEventListener('click', () => {
            const profileId = btn.dataset.id;
            const isActive = btn.classList.toggle('active');
            btn.innerHTML = isActive ? '♥' : '♡';
            btn.title = isActive ? 'Remove from favorites' : 'Add to favorites';

            saveFavoriteStatus(profileId, isActive);
        });
    }
}


