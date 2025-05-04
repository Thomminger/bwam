/**
 * BWAM Data Layer Script (datalayer.js)
 *
 * Initializes the dataLayer and provides functions to push
 * structured event data for analytics and tag management.
 */

// Initialize dataLayer if it doesn't exist
window.dataLayer = window.dataLayer || [];

/**
 * Pushes an event to the dataLayer.
 * @param {string} eventName - The name of the event.
 * @param {object} [eventData={}] - Additional data associated with the event.
 */
function pushToDataLayer(eventName, eventData = {}) {
    // Basic validation
    if (!eventName || typeof eventName !== 'string') {
        console.error('DataLayer Error: Invalid event name provided.');
        return;
    }

    // Construct the object to push
    const dataObject = {
        event: eventName, // Standard GTM event key
        ...eventData     // Spread additional data
    };

    console.log('Pushing to dataLayer:', dataObject); // For debugging
    window.dataLayer.push(dataObject);
}

// --- Standard Event Functions ---

/**
 * Pushes a page view event. Typically called once on initial page load.
 * @param {object} pageData - Data about the page being viewed.
 * @param {string} pageData.pagePath - The path of the page (e.g., '/home', '/profile').
 * @param {string} pageData.pageTitle - The title of the page.
 * @param {string} [pageData.language] - The current language ('en', 'de').
 */
function trackPageView(pageData) {
    pushToDataLayer('page_view', {
        page_location: window.location.href, // Full URL
        page_path: pageData.pagePath || window.location.pathname + window.location.hash,
        page_title: pageData.pageTitle || document.title,
        language: pageData.language || document.documentElement.lang,
        // Add other relevant page data if needed
    });
}

/**
 * Pushes a login success event.
 * @param {string} userId - A unique (non-personally identifiable if possible) ID for the user.
 * @param {string} [method='email'] - The login method used.
 */
function trackLoginSuccess(userId, method = 'email') {
    pushToDataLayer('login', {
        method: method,
        user_id: userId // Be mindful of PII regulations
        // Add other relevant login data if needed
    });
}

/**
 * Pushes a logout event.
 */
function trackLogout() {
    pushToDataLayer('logout', {});
}

/**
 * Pushes a navigation click event.
 * @param {object} navData - Data about the navigation click.
 * @param {string} navData.link_url - The URL of the clicked link.
 * @param {string} navData.link_text - The text of the clicked link.
 * @param {string} navData.link_location - Where the link was located (e.g., 'header', 'footer', 'mobile_menu').
 */
function trackNavigationClick(navData) {
    pushToDataLayer('navigation_click', {
        link_url: navData.link_url || '#',
        link_text: navData.link_text || 'N/A',
        link_location: navData.link_location || 'unknown',
        // Add other relevant navigation data if needed
    });
}

/**
 * Pushes a section view event when a specific static section becomes visible.
 * @param {string} sectionId - The ID of the section being viewed (e.g., 'about-us', 'events').
 */
function trackSectionView(sectionId) {
    pushToDataLayer('section_view', {
        section_id: sectionId,
        // Add other relevant section data if needed
    });
}

/**
 * Pushes an event when the user profile section is viewed.
 * @param {string} userId - The user ID.
 */
function trackProfileView(userId) {
    pushToDataLayer('profile_view', {
        user_id: userId
        // Add other relevant profile data if needed
    });
}

/**
 * Pushes a modal view event.
 * @param {string} modalId - The ID or name of the modal being viewed (e.g., 'advisor-modal').
 */
function trackModalView(modalId) {
    pushToDataLayer('modal_view', {
        modal_id: modalId,
        // Add other relevant modal data if needed
    });
}

/**
 * Pushes a consent update event.
 * @param {string} consentStatus - The status of the consent ('accepted' or 'rejected').
 */
function trackConsentUpdate(consentStatus) {
    pushToDataLayer('consent_update', {
        consent_status: consentStatus,
        // Add other relevant consent data if needed (e.g., categories consented to)
    });
}

/**
 * Pushes a generic interaction event (e.g., button click).
 * @param {object} interactionData - Data about the interaction.
 * @param {string} interactionData.element_text - Text of the clicked element.
 * @param {string} interactionData.element_location - Location/section where the element is.
 * @param {string} [interactionData.element_id] - ID of the element, if available.
 */
function trackInteraction(interactionData) {
    pushToDataLayer('user_interaction', {
        element_text: interactionData.element_text || 'N/A',
        element_location: interactionData.element_location || 'unknown',
        element_id: interactionData.element_id || 'N/A',
        // Add other relevant interaction data if needed
    });
}


// --- Expose functions globally (optional, but can be useful) ---
// Alternatively, modify script.js and React components to call these directly.
window.bwamDataLayer = {
    trackPageView,
    trackLoginSuccess,
    trackLogout,
    trackNavigationClick,
    trackSectionView,
    trackProfileView,
    trackModalView,
    trackConsentUpdate,
    trackInteraction
};

console.log("BWAM Data Layer script initialized.");

// Example: Trigger initial page view on load
// This might be better placed in your main script after DOM is ready
// and language/initial state is potentially set.
/*
document.addEventListener('DOMContentLoaded', () => {
    trackPageView({
        pagePath: window.location.pathname + window.location.hash,
        pageTitle: document.title,
        language: document.documentElement.lang
    });
});
*/
