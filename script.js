// script.js

// --- Constants ---
// REMOVED: const CONSENT_STORAGE_KEY = 'bwam_consent_status'; // This was declared in index.html inline script
const LOGIN_STATUS_KEY = 'bwam_logged_in_email'; // Key for sessionStorage
const SIMULATED_USER_ID = 'SIMULATED_USER_123'; // Placeholder User ID for simulation

// --- Language Data ---
const translations = { // Same as previous version...
    'de': {
        'page_title': 'BWAM - Ihr Finanzpartner',
        'nav.private_clients': 'Privatkunden',
        'nav.business_clients': 'Firmenkunden',
        'nav.institutional': 'Institutionelle',
        'nav.about_us': 'Über uns',
        'nav.events': 'Veranstaltungen',
        'nav.accounts_cards': 'Konto & Karten',
        'nav.investing': 'Anlegen',
        'nav.pensions': 'Vorsorgen',
        'nav.financing': 'Finanzieren',
        'nav.login': 'Anmelden',
        'aria.search': 'Suche',
        'aria.open_menu': 'Menü öffnen',
        'hero.title': 'Willkommen bei BWAM',
        'hero.subtitle': 'Ihr zuverlässiger Partner für umfassende Finanzlösungen in Zürich und darüber hinaus.',
        'hero.button_services': 'Dienstleistungen entdecken',
        'hero.button_contact': 'Kontakt aufnehmen',
        'service_card.accounts_cards': 'Konto & Karten',
        'service_card.investing': 'Sparen & Anlegen',
        'service_card.pensions': 'Vorsorgen',
        'service_card.financing': 'Finanzieren',
        'service_card.real_estate': 'Immobilien',
        'news.title': 'News & Insights',
        'news.card1_title': 'Marktausblick Q3 2025',
        'news.card1_desc': 'Unsere Analyse aktueller Markttrends und potenzieller Chancen für Investoren.',
        'news.card2_title': 'Planung für einen sicheren Ruhestand',
        'news.card2_desc': 'Wichtige Überlegungen zum Aufbau eines soliden Vorsorgeplans in der Schweiz.',
        'news.card3_title': 'Tipps für sicheres Digital Banking',
        'news.card3_desc': 'Wie Sie sich schützen, während Sie Ihre Finanzen online mit BWAM verwalten.',
        'news.read_more': 'Mehr lesen →',
        'news.more_news': 'Weitere News',
        'events.title': 'Kommende Veranstaltungen',
        'events.subtitle': 'Nehmen Sie an unseren aufschlussreichen Seminaren und Workshops teil. Melden Sie unten Ihr Interesse an.',
        'events.form_placeholder': '(Formular zur Veranstaltungsanmeldung kommt hier hin)',
        'contact_cta.title': 'Kontaktieren Sie BWAM',
        'contact_cta.subtitle': 'Unsere Berater helfen Ihnen gerne, Ihre finanziellen Ziele zu erreichen. Melden Sie sich noch heute.',
        'contact_cta.button': 'Berater finden',
        'footer.tagline': 'Ihr zuverlässiger Finanzpartner.',
        'footer.quicklinks': 'Schnellzugriff',
        'footer.careers': 'Karriere',
        'footer.contact': 'Kontakt',
        'footer.newsroom': 'Newsroom',
        'footer.services': 'Dienstleistungen',
        'footer.mortgages': 'Hypotheken',
        'footer.digital_banking': 'Digital Banking',
        'footer.legal': 'Rechtliches',
        'footer.privacy': 'Datenschutz',
        'footer.terms': 'Nutzungsbedingungen',
        'footer.imprint': 'Impressum',
        'footer.cookies': 'Cookie-Einstellungen',
        'footer.accessibility': 'Barrierefreiheit',
        'footer.rights': 'Alle Rechte vorbehalten.',
        'footer.location': 'Standort: Zürich, Schweiz.',
        'consent.message': 'Wir verwenden Cookies und ähnliche Technologien, um Ihr Erlebnis zu verbessern und relevante Inhalte anzuzeigen. Indem Sie auf „Alle akzeptieren“ klicken, stimmen Sie der Verwendung dieser Technologien zu. Sie können Ihre Auswahl jederzeit ändern.',
        'consent.reject': 'Alle ablehnen',
        'consent.accept': 'Alle akzeptieren'
    },
    'en': { // Same as previous version...
        'page_title': 'BWAM - Your Financial Partner',
        'nav.private_clients': 'Private Clients',
        'nav.business_clients': 'Business Clients',
        'nav.institutional': 'Institutional',
        'nav.about_us': 'About Us',
        'nav.events': 'Events',
        'nav.accounts_cards': 'Accounts & Cards',
        'nav.investing': 'Investing',
        'nav.pensions': 'Pensions',
        'nav.financing': 'Financing',
        'nav.login': 'Login',
        'aria.search': 'Search',
        'aria.open_menu': 'Open menu',
        'hero.title': 'Welcome to BWAM',
        'hero.subtitle': 'Your trusted partner for comprehensive financial solutions in Zürich and beyond.',
        'hero.button_services': 'Explore Services',
        'hero.button_contact': 'Contact Us',
        'service_card.accounts_cards': 'Accounts & Cards',
        'service_card.investing': 'Savings & Investments',
        'service_card.pensions': 'Pensions',
        'service_card.financing': 'Financing',
        'service_card.real_estate': 'Real Estate',
        'news.title': 'News & Insights',
        'news.card1_title': 'Market Outlook Q3 2025',
        'news.card1_desc': 'Our analysis of current market trends and potential opportunities for investors.',
        'news.card2_title': 'Planning for a Secure Retirement',
        'news.card2_desc': 'Key considerations for building a robust pension plan in Switzerland.',
        'news.card3_title': 'Tips for Secure Digital Banking',
        'news.card3_desc': 'How to protect yourself while managing your finances online with BWAM.',
        'news.read_more': 'Read More →',
        'news.more_news': 'More News',
        'events.title': 'Upcoming Events',
        'events.subtitle': 'Join us for insightful seminars and workshops. Register your interest below.',
        'events.form_placeholder': '(Event registration form will be here)',
        'contact_cta.title': 'Contact BWAM',
        'contact_cta.subtitle': 'Our advisors are ready to help you achieve your financial goals. Reach out today.',
        'contact_cta.button': 'Find an Advisor',
        'footer.tagline': 'Your reliable financial partner.',
        'footer.quicklinks': 'Quick Links',
        'footer.careers': 'Careers',
        'footer.contact': 'Contact Us',
        'footer.newsroom': 'Newsroom',
        'footer.services': 'Services',
        'footer.mortgages': 'Mortgages',
        'footer.digital_banking': 'Digital Banking',
        'footer.legal': 'Legal',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Use',
        'footer.imprint': 'Imprint',
        'footer.cookies': 'Cookie Settings',
        'footer.accessibility': 'Accessibility',
        'footer.rights': 'All rights reserved.',
        'footer.location': 'Location: Zürich, Switzerland.',
        'consent.message': 'We use cookies and similar technologies to enhance your experience and display relevant content. By clicking "Accept All," you agree to the use of these technologies. You can change your selection at any time.',
        'consent.reject': 'Reject All',
        'consent.accept': 'Accept All'
    }
};

// --- Language Switching Function ---
function setLanguage(lang) {
    // Check if the requested language exists in translations
    if (!translations[lang]) {
        console.error(`Language "${lang}" not found in translations.`);
        return; // Exit if language is not supported
    }

    // Set the 'lang' attribute on the HTML element
    document.documentElement.lang = lang;

    // Update text content for elements with data-lang-key or data-consent-text attributes
    document.querySelectorAll('[data-lang-key], [data-consent-text]').forEach(el => {
        const key = el.getAttribute('data-lang-key') || el.getAttribute('data-consent-text');
        const txt = translations[lang][key]; // Get translation text

        if (txt !== undefined) {
            // Handle special cases: page title and ARIA attributes
            if (key?.startsWith('aria.') || key === 'page_title') {
                if (key === 'page_title') {
                    document.title = txt; // Set page title
                } else {
                    // Set ARIA attribute (e.g., aria-label)
                    el.setAttribute(key.split('.')[0], txt);
                }
            } else {
                // Set text content for regular elements
                el.textContent = txt;
            }
        } else {
            // Warn if a translation key is missing for the selected language
            console.warn(`Translation key "${key}" missing for lang "${lang}".`);
        }
    });

    // Update active state for language switcher buttons
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Try to save the selected language preference to localStorage
    try {
        localStorage.setItem('bwam_preferred_lang', lang);
    } catch (e) {
        console.warn("Could not save language preference to localStorage.", e);
    }

    // --- REMOVED: Salesforce Language Change Tracking ---
}

// --- Simple Hash-Based Page/Section Visibility ---
function handleHashChange() {
    // Get the hash fragment from the URL (without the '#')
    const hash = window.location.hash.substring(1);
    console.log(`Hash changed to: #${hash}`);

    // Hide all main sections initially
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });

    // Determine which section to show (default to 'home')
    let sectionToShowId = 'home';
    if (hash && document.getElementById(hash)) {
        // If a valid hash exists and corresponds to an element ID, use it
        sectionToShowId = hash;
    } else if (hash) {
        // If hash exists but no corresponding element, warn and show home
        console.warn(`Section for hash #${hash} not found, showing home.`);
    }

    // Show the selected section
    const sectionToShow = document.getElementById(sectionToShowId);
    if (sectionToShow) {
        sectionToShow.classList.remove('hidden');
        console.log(`Showing section: #${sectionToShowId}`);
    } else {
        // Fallback to showing 'home' if the target section wasn't found (e.g., 'home' itself is missing)
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.classList.remove('hidden');
            console.log(`Fallback: Showing section: #home`);
        } else {
            console.error("Default section 'home' not found!");
        }
    }
    // NOTE: Page View event tracking (if any) would happen here or be triggered by this change.
    // Salesforce-specific page view tracking was removed.
}

// --- REMOVED: Salesforce Interaction Tracking Function (attachTrackingListeners) ---
// --- REMOVED: Global assignment for attachTrackingListeners ---

// --- User Identification Function (Simplified) ---
function handleSuccessfulLogin(userId, userEmail) {
    // This function now primarily serves to log the successful login attempt.
    // It no longer interacts with Salesforce.
    console.log(`User logged in (simulated): ${userId} (${userEmail || 'No email'})`);
    // Any non-Salesforce logic related to successful login could be added here.
}
window.handleSuccessfulLogin = handleSuccessfulLogin; // Make global

// --- Logout Function (Simplified) ---
function handleLogout() {
    const loggedInEmail = sessionStorage.getItem(LOGIN_STATUS_KEY);
    console.log(`Logging out user: ${loggedInEmail || 'Unknown'}`);

    // Clear the login status from sessionStorage
    sessionStorage.removeItem(LOGIN_STATUS_KEY);

    // Update the UI to reflect the logged-out state
    updateLoginUI(false);

    // --- REMOVED: Salesforce Logout Event Tracking ---
    console.log("User logged out.");
}
window.handleLogout = handleLogout; // Make global


// --- Global UI Update Function --- (Defined later in DOMContentLoaded)
// Placeholder for the function that updates login UI elements
let updateLoginUI = () => {
    console.warn("updateLoginUI called before it was defined in DOMContentLoaded.");
};

// --- Initial Page Load Logic ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const currentYearSpan = document.getElementById('current-year');
    const langButtons = document.querySelectorAll('.lang-button');
    const consentBanner = document.getElementById('consent-banner');
    const acceptBtn = document.getElementById('consent-accept');
    const rejectBtn = document.getElementById('consent-reject');
    const loginButton = document.getElementById('login-button');
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('login-email');
    const simulateLoginButton = document.getElementById('simulate-login-button');
    const loggedInStatusDiv = document.getElementById('logged-in-status');
    const loggedInEmailSpan = document.getElementById('logged-in-email');
    const logoutButton = document.getElementById('logout-button');
    // Reference to the consent storage key defined in the inline script
    const CONSENT_STORAGE_KEY = window.CONSENT_STORAGE_KEY || 'bwam_consent_status';


    // --- Consent Banner Logic ---
    // Show banner if consent not set, and attach button listeners
    if (consentBanner && acceptBtn && rejectBtn) {
        let consentStatus = null;
        try {
            // Check localStorage for existing consent status
            consentStatus = localStorage.getItem(CONSENT_STORAGE_KEY);
        } catch (e) {
            console.error("localStorage consent check failed.", e);
        }

        // Show banner only if no choice has been made previously
        if (!consentStatus) {
            console.log("Consent not set, showing banner.");
            consentBanner.classList.remove('hidden');
            // Animate banner sliding in from the bottom
            setTimeout(() => {
                consentBanner.style.transform = 'translateY(0)';
            }, 50); // Small delay to ensure transition applies
        } else {
            console.log(`Consent already set to: ${consentStatus}. Banner remains hidden.`);
        }

        // Attach listeners to consent buttons
        acceptBtn.addEventListener('click', () => {
            console.log("Consent Accepted button clicked.");
            try {
                // Store 'accepted' status in localStorage
                localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
            } catch (e) {
                console.error("localStorage consent save failed.", e);
            }
            // Animate banner sliding out
            consentBanner.style.transform = 'translateY(100%)';
            // Hide banner after animation
            setTimeout(() => {
                consentBanner.classList.add('hidden');
            }, 300); // Match transition duration

            // --- REMOVED: Salesforce Consent Accepted Event ---
            // --- REMOVED: Salesforce SDK Initialization call ---
            console.log("Consent status set to 'accepted'.");
        });

        rejectBtn.addEventListener('click', () => {
            console.log("Consent Rejected button clicked.");
            try {
                // Store 'rejected' status in localStorage
                localStorage.setItem(CONSENT_STORAGE_KEY, 'rejected');
            } catch (e) {
                console.error("localStorage consent save failed.", e);
            }
            // Animate banner sliding out
            consentBanner.style.transform = 'translateY(100%)';
            // Hide banner after animation
            setTimeout(() => {
                consentBanner.classList.add('hidden');
            }, 300); // Match transition duration

            // --- REMOVED: Salesforce Consent Rejected Event ---
            console.log("Consent status set to 'rejected'.");
        });
    } else {
        console.warn("Consent banner elements (banner, accept, reject) missing.");
    }

    // --- Login Simulation Logic ---
    // Define the UI update function within this scope
    updateLoginUI = (isLoggedIn, email = '') => {
        // Get references to UI elements involved in login state display
        const loginBtn = document.getElementById('login-button');
        const form = document.getElementById('login-form');
        const statusDiv = document.getElementById('logged-in-status');
        const emailSpan = document.getElementById('logged-in-email');
        const emailInput = document.getElementById('login-email');

        // Check if all required elements exist
        if (!loginBtn || !form || !statusDiv || !emailSpan || !emailInput) {
            console.warn("One or more login UI elements missing. Cannot update UI.");
            return;
        }

        // Update UI based on login status
        if (isLoggedIn) {
            // User is logged in: Hide login button/form, show status
            loginBtn.classList.add('hidden');
            form.classList.add('hidden');
            statusDiv.classList.remove('hidden');
            statusDiv.classList.add('flex'); // Assuming flex display for status
            emailSpan.textContent = email; // Display user email
        } else {
            // User is logged out: Show login button, hide form/status
            loginBtn.classList.remove('hidden');
            form.classList.add('hidden'); // Ensure form is hidden initially
            statusDiv.classList.add('hidden');
            statusDiv.classList.remove('flex');
            emailSpan.textContent = ''; // Clear email display
            emailInput.value = ''; // Clear email input field
        }
    }

    // Setup Login Listeners only if all necessary elements are found
    if (loginButton && loginForm && loginEmailInput && simulateLoginButton && loggedInStatusDiv && loggedInEmailSpan && logoutButton) {
        // Check initial login state from sessionStorage
        const initialEmail = sessionStorage.getItem(LOGIN_STATUS_KEY);
        updateLoginUI(!!initialEmail, initialEmail || ''); // Update UI on load

        // Listener for the main "Login" button (to show the form)
        loginButton.addEventListener('click', () => {
            loginButton.classList.add('hidden'); // Hide login button
            loginForm.classList.remove('hidden'); // Show login form
            loginEmailInput.focus(); // Focus the email input
            console.log('Clicked to show login form');
            // REMOVED: Salesforce tracking for this click
        });

        // Listener for the "Simulate Login" button
        simulateLoginButton.addEventListener('click', () => {
            const email = loginEmailInput.value.trim();
            // Basic email validation
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                console.log(`Simulating login for: ${email}`);
                // Store email in sessionStorage to persist login state
                sessionStorage.setItem(LOGIN_STATUS_KEY, email);
                // Update UI to logged-in state
                updateLoginUI(true, email);

                // --- REMOVED: Salesforce click event for simulate button ---

                // Call the simplified login handler function
                if (typeof handleSuccessfulLogin === 'function') {
                    handleSuccessfulLogin(SIMULATED_USER_ID, email);
                } else {
                    console.warn("handleSuccessfulLogin function not available.");
                }
            } else {
                // Use a more user-friendly way to show errors if possible, instead of alert()
                console.warn('Invalid email address entered.');
                alert('Please enter a valid email address.'); // Basic feedback
            }
        });

        // Listener for the "Logout" button
        logoutButton.addEventListener('click', () => {
            if (typeof handleLogout === 'function') {
                handleLogout(); // Call the logout handler
            } else {
                console.error("handleLogout function not found!");
            }
        });

    } else {
        console.warn("One or more login simulation elements missing. Login UI may be inactive or incomplete.");
    }

    // --- Other Initializations ---

    // Mobile Menu Toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded); // Toggle ARIA attribute
            mobileMenu.classList.toggle('hidden'); // Toggle menu visibility
        });
    } else {
        console.warn("Mobile menu button or menu element not found.");
    }

    // Close mobile menu when a link inside it is clicked
    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden'); // Hide menu
                mobileMenuButton?.setAttribute('aria-expanded', 'false'); // Reset button state
            }
        });
    });

    // Language Switcher Buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            if (lang) {
                console.log(`Language button clicked: ${lang}`);
                setLanguage(lang); // Call the language setting function
            } else {
                console.warn("Language button clicked, but 'data-lang' attribute is missing.");
            }
        });
    });

    // Set current year in the footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Current year span element not found.");
    }

    // Determine and set initial language (check localStorage, default to 'de')
    let preferredLang = 'de'; // Default language
    try {
        const savedLang = localStorage.getItem('bwam_preferred_lang');
        if (savedLang && translations[savedLang]) {
            preferredLang = savedLang; // Use saved language if valid
        }
    } catch (e) {
        console.warn("Could not read language preference from localStorage.", e);
    }
    setLanguage(preferredLang); // Apply the initial language

    // Handle initial hash for section display
    handleHashChange();

    // Listen for hash changes (SPA navigation)
    window.addEventListener('hashchange', handleHashChange);

    console.log("BWAM Script Loaded (Salesforce Removed). Initial language:", preferredLang);

}); // End of DOMContentLoaded
