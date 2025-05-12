/**
 * Displays the loader by setting its visibility to 'block'.
 * This function targets an element with the ID 'loader'.
 * If the element does not exist, no action is taken.
 */
export function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'block';
}

/**
 * Hides the loader by setting its visibility to 'none'.
 * This function targets an element with the ID 'loader'.
 * If the element does not exist, no action is taken.
 */
export function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
}