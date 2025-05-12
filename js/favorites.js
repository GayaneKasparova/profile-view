import { getProfiles, getFavorites } from './api.js';
import { renderProfiles } from './render.js';
import { showLoader, hideLoader } from './loader.js';
import {getUserId} from "./auth.js";

document.addEventListener('DOMContentLoaded', async () => {
    showLoader();
    const fallback = `<p>No favorites found 💔<\p>`

    try {
        const uid = await getUserId();

        const [allProfiles, favoriteIds] = await Promise.all([
            getProfiles(),
            getFavorites(uid)
        ]);

        const favoriteProfiles = allProfiles?.profiles?.filter(p => favoriteIds.includes(p.id)) || [];

        await renderProfiles(favoriteProfiles, fallback);
    } catch (error) {
        const grid = document.querySelector('.profile-grid');
        grid.innerHTML = fallback;
        console.error('Favorites view error:', error);
    }

    hideLoader();
});