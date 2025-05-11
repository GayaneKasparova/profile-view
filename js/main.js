import {fetchProfiles} from './api.js';

/**
 * Dynamically populates a grid element with profile cards or displays
 * a fallback message if no profiles are available. It fetches profile data from
 * an API and renders it to the DOM once the page content has fully loaded.
 **/
document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.querySelector('.profile-grid');
    const data = await fetchProfiles();

    if (!data?.profiles || data.profiles.length === 0) {
        const fallbackMessage = document.createElement('div');
        fallbackMessage.className = 'fallback-message';
        fallbackMessage.textContent = 'Oooops! No profiles available at the moment.';
        grid.appendChild(fallbackMessage);
    } else {
        for (let profile of data?.profiles) {
            const card = document.createElement('div');
            card.className = 'profile-card';
            grid.appendChild(card);
            card.innerHTML = `<div class="avatar-wrapper">
                                <img src="${profile.avatar}"
                                     alt="${profile.name}'s avatar"
                                     class="profile-img"
                                     loading="lazy"/>
                                <button class="favorite-btn" aria-label="Add to favorites">♡</button>
                              </div>
                              <div class="profile-info">
                                <div class="profile-name-wrapper">
                                    <h3 class="profile-name" title="${profile.name}">${profile.name}</h3>
                                     ${profile.age && `<h3>   (${profile.age})</h3>`}
                                </div>
                                <div class="profile-meta">
                                  <p> ${ profile.city && `📍${profile.city}`}</p>
                                   ${ profile.relationship_status && `<p>💑 ${profile.relationship_status}</p>`}
                                </div>
                              </div>`;
        }
    }
});