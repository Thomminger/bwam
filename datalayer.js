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

// Initialize Salesforce Data Cloud
window.sfdc = window.sfdc || {};
window.sfdc.beacon = window.sfdc.beacon || {};

// Track page views
function trackPageView(pageData = {}) {
    if (window.sfdc && window.sfdc.beacon) {
        window.sfdc.beacon.track('pageView', {
            pageName: document.title,
            pageUrl: window.location.href,
            pageType: 'content',
            language: document.documentElement.lang,
            ...pageData
        });
    }
}

// Track user interactions
function trackUserInteraction(interactionType, interactionData = {}) {
    if (window.sfdc && window.sfdc.beacon) {
        window.sfdc.beacon.track('userInteraction', {
            interactionType,
            timestamp: new Date().toISOString(),
            ...interactionData
        });
    }
}

// Track form submissions
function trackFormSubmission(formId, formData = {}) {
    if (window.sfdc && window.sfdc.beacon) {
        window.sfdc.beacon.track('formSubmission', {
            formId,
            timestamp: new Date().toISOString(),
            ...formData
        });
    }
}

// Track language changes
function trackLanguageChange(oldLang, newLang) {
    if (window.sfdc && window.sfdc.beacon) {
        window.sfdc.beacon.track('languageChange', {
            oldLanguage: oldLang,
            newLanguage: newLang,
            timestamp: new Date().toISOString()
        });
    }
}

// Track consent changes
function trackConsentChange(consentType, consentValue) {
    if (window.sfdc && window.sfdc.beacon) {
        window.sfdc.beacon.track('consentChange', {
            consentType,
            consentValue,
            timestamp: new Date().toISOString()
        });
    }
}

// Track navigation clicks
function trackNavigationClick(navItem, navType) {
    if (window.sfdc && window.sfdc.beacon) {
        window.sfdc.beacon.track('navigationClick', {
            navItem,
            navType,
            timestamp: new Date().toISOString()
        });
    }
}

// Track modal interactions
function trackModalInteraction(modalId, action) {
    if (window.sfdc && window.sfdc.beacon) {
        window.sfdc.beacon.track('modalInteraction', {
            modalId,
            action,
            timestamp: new Date().toISOString()
        });
    }
}

// Initialize tracking
document.addEventListener('DOMContentLoaded', () => {
    // Track initial page view
    trackPageView();

    // Track navigation clicks
    document.querySelectorAll('.nav-section-link').forEach(link => {
        link.addEventListener('click', () => {
            trackNavigationClick(link.textContent.trim(), 'section');
        });
    });

    // Track language changes
    const languageSelect = document.querySelector('select[value="currentLanguage"]');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            trackLanguageChange(document.documentElement.lang, e.target.value);
        });
    }

    // Track consent changes
    const consentAccept = document.getElementById('consent-accept');
    const consentReject = document.getElementById('consent-reject');
    if (consentAccept) {
        consentAccept.addEventListener('click', () => {
            trackConsentChange('cookies', 'accepted');
        });
    }
    if (consentReject) {
        consentReject.addEventListener('click', () => {
            trackConsentChange('cookies', 'rejected');
        });
    }

    // Track modal interactions
    const advisorModal = document.getElementById('advisor-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    const contactCtaButton = document.getElementById('contact-cta-button');

    if (advisorModal && modalCloseButton && contactCtaButton) {
        contactCtaButton.addEventListener('click', () => {
            trackModalInteraction('advisor-modal', 'open');
        });
        modalCloseButton.addEventListener('click', () => {
            trackModalInteraction('advisor-modal', 'close');
        });
    }
});
