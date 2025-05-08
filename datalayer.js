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

// Initialize the Salesforce Data Cloud Web SDK
window.bwamDataLayer = {
    // Configuration
    config: {
        debug: true, // Set to false in production
        consentRequired: true,
        defaultLanguage: document.documentElement.lang || 'en'
    },

    // Initialize the SDK
    init: function() {
        if (typeof c360a === 'undefined') {
            console.error('Salesforce Data Cloud Web SDK not loaded');
            return;
        }

        // Initialize with debug logging
        c360a.init({
            logging: this.config.debug ? 4 : 0 // 4 = DEBUG level
        });

        // Set initial consent status
        const consentStatus = localStorage.getItem('bwam_consent_status');
        if (consentStatus) {
            this.updateConsents(consentStatus === 'accepted');
        }

        // Track initial page view
        this.trackPageView();
    },

    // Consent Management
    updateConsents: function(accepted) {
        if (typeof c360a === 'undefined') return;

        c360a.updateConsents({
            marketing: accepted,
            analytics: accepted,
            necessary: true // Always true for basic functionality
        });
    },

    // Profile Events
    trackProfileEvent: function(userData) {
        if (typeof c360a === 'undefined') return;

        c360a.sendEvent({
            eventType: 'Identity',
            category: 'Profile',
            user: {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                address: userData.address
            }
        });
    },

    // Engagement Events
    trackPageView: function() {
        if (typeof c360a === 'undefined') return;

        c360a.sendEvent({
            eventType: 'PageView',
            category: 'Engagement',
            pageView: {
                pageName: document.title,
                pageUrl: window.location.href,
                referrer: document.referrer
            }
        });
    },

    trackLoginSuccess: function(email) {
        if (typeof c360a === 'undefined') return;

        c360a.sendEvent({
            eventType: 'Login',
            category: 'Engagement',
            user: {
                email: email
            }
        });
    },

    trackLogout: function(email) {
        if (typeof c360a === 'undefined') return;

        c360a.sendEvent({
            eventType: 'Logout',
            category: 'Engagement',
            user: {
                email: email
            }
        });
    },

    trackProfileView: function(email) {
        if (typeof c360a === 'undefined') return;

        c360a.sendEvent({
            eventType: 'ProfileView',
            category: 'Engagement',
            user: {
                email: email
            }
        });
    },

    trackNavigation: function(section) {
        if (typeof c360a === 'undefined') return;

        c360a.sendEvent({
            eventType: 'Navigation',
            category: 'Engagement',
            navigation: {
                section: section,
                timestamp: new Date().toISOString()
            }
        });
    },

    trackLanguageChange: function(newLanguage) {
        if (typeof c360a === 'undefined') return;

        c360a.sendEvent({
            eventType: 'LanguageChange',
            category: 'Engagement',
            language: {
                from: this.config.defaultLanguage,
                to: newLanguage,
                timestamp: new Date().toISOString()
            }
        });
    },

    trackEventRegistration: function(eventData) {
        if (typeof c360a === 'undefined') return;

        c360a.sendEvent({
            eventType: 'EventRegistration',
            category: 'Engagement',
            event: {
                name: eventData.name,
                date: eventData.date,
                location: eventData.location,
                type: eventData.type
            }
        });
    },

    trackAdvisorInteraction: function(advisorData) {
        if (typeof c360a === 'undefined') return;

        c360a.sendEvent({
            eventType: 'AdvisorInteraction',
            category: 'Engagement',
            advisor: {
                name: advisorData.name,
                role: advisorData.role,
                interactionType: advisorData.type
            }
        });
    },

    // Utility Functions
    getDeviceId: function() {
        return c360a?.getDeviceId() || null;
    },

    getSessionId: function() {
        return c360a?.getSessionId() || null;
    }
};

// Initialize the data layer when the SDK is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if SDK is already loaded
    if (typeof c360a !== 'undefined') {
        window.bwamDataLayer.init();
    } else {
        // Wait for SDK to load
        const checkSDK = setInterval(function() {
            if (typeof c360a !== 'undefined') {
                window.bwamDataLayer.init();
                clearInterval(checkSDK);
            }
        }, 100);
    }
});
