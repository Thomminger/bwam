/**
 * BWAM Data Layer Script (datalayer.js) - v1.1
 *
 * Initializes the dataLayer and provides functions to push
 * structured event data for analytics and tag management.
 * Ensure this script is loaded with 'defer'.
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

    // console.log('Pushing to dataLayer:', dataObject); // For debugging
    window.dataLayer.push(dataObject);
}

// --- Standard Event Functions ---
// (Keep all your trackPageView, trackLoginSuccess, etc. functions as they are)
function trackPageView(pageData) { /* ... */ }
function trackLoginSuccess(userId, method = 'email') { /* ... */ }
function trackLogout(userId) { /* ... */ } // Added optional userId
function trackNavigationClick(navData) { /* ... */ }
function trackSectionView(sectionId) { /* ... */ }
function trackProfileView(userId) { /* ... */ }
function trackModalView(modalId) { /* ... */ }
function trackConsentUpdate(consentStatus) { /* ... */ }
function trackInteraction(interactionData) { /* ... */ }


// --- Expose functions globally ---
// This allows other scripts (like script.js or React components) to call these functions
window.bwamDataLayer = {
    pushToDataLayer, // Expose the base function too
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

console.log("BWAM Data Layer script initialized (deferred).");

// Removed automatic page view tracking on load here.
// It's better triggered from your main script (script.js) or React app
// once the initial content/route is determined.
// Example trigger from script.js (inside DOMContentLoaded):
/*
 if (typeof window.bwamDataLayer?.trackPageView === 'function') {
     window.bwamDataLayer.trackPageView({
         pagePath: window.location.pathname + window.location.hash,
         pageTitle: document.title,
         language: document.documentElement.lang
     });
 }
*/
