// script.js

// --- Constants ---
const CONSENT_STORAGE_KEY = 'bwam_consent_status'; // Key for localStorage
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
    if (!translations[lang]) { console.error(`Lang ${lang} not found.`); return; }
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang-key], [data-consent-text]').forEach(el => {
        const key = el.getAttribute('data-lang-key') || el.getAttribute('data-consent-text');
        const txt = translations[lang][key];
        if (txt !== undefined) {
            if (key?.startsWith('aria.') || key === 'page_title') {
                if (key === 'page_title') { document.title = txt; } else { el.setAttribute(key.split('.')[0], txt); }
            } else { el.textContent = txt; }
        } else { console.warn(`Translation key "${key}" missing for lang "${lang}".`); }
    });
    document.querySelectorAll('.lang-button').forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-lang') === lang));
    try { localStorage.setItem('bwam_preferred_lang', lang); } catch (e) { console.warn("Could not save lang preference."); }

    // --- SF Language Change Tracking ---
    if (typeof salesforceSDKInitialized !== 'undefined' && salesforceSDKInitialized) {
        SalesforceInteractions.sendEvent({
            interaction: { name: 'Changed Language', attributes: { selectedLanguage: lang } },
            user: { attributes: typeof userLocationData !== 'undefined' && userLocationData && !userLocationData.error ? userLocationData : {} }
        });
        console.log(`Tracked Language Change: ${lang}`);
    }
}

// --- Simple Hash-Based Page/Section Visibility ---
function handleHashChange() {
    const hash = window.location.hash.substring(1);
    console.log(`Hash changed to: #${hash}`);
    document.querySelectorAll('main > section').forEach(section => section.classList.add('hidden'));
    let sectionToShowId = 'home';
    if (hash && document.getElementById(hash)) { sectionToShowId = hash; }
    else if (hash) { console.warn(`Section for hash #${hash} not found, showing home.`); }
    const sectionToShow = document.getElementById(sectionToShowId);
    if (sectionToShow) { sectionToShow.classList.remove('hidden'); console.log(`Showing section: #${sectionToShowId}`); }
    else { document.getElementById('home')?.classList.remove('hidden'); console.log(`Fallback: Showing section: #home`); }
    // NOTE: Page View event is now automatically handled by initSitemap on hash change
}

// --- Salesforce Interaction Tracking Function ---
function attachTrackingListeners() {
    console.log("Attaching SF interaction listeners.");

    // Helper to send interaction events
    function sendSalesforceClickInteraction(event, targetName, customAttributes = {}) {
        // Ensure SDK is ready before sending
        if (typeof salesforceSDKInitialized !== 'undefined' && salesforceSDKInitialized && typeof SalesforceInteractions !== 'undefined') {
            const targetElement = event.currentTarget;
            const payload = {
                interaction: { name: 'Web Click', targetUrl: targetElement.href || '', targetElementText: targetElement.innerText?.trim().substring(0, 255) || '', targetElementSelector: getCssSelector(targetElement), attributes: { targetName: targetName, ...customAttributes } },
                user: { attributes: typeof userLocationData !== 'undefined' && userLocationData && !userLocationData.error ? userLocationData : {} }
            };
            SalesforceInteractions.sendEvent(payload);
        } else { console.warn("SF SDK not ready, click event not sent:", targetName); }
    }

    // Helper function to generate CSS selector
    function getCssSelector(el) { if (!(el instanceof Element)) return; const path = []; while (el.nodeType === Node.ELEMENT_NODE) { let selector = el.nodeName.toLowerCase(); if (el.id) { selector += '#' + el.id; path.unshift(selector); break; } else { let sib = el, nth = 1; while (sib = sib.previousElementSibling) { if (sib.nodeName.toLowerCase() == selector) nth++; } if (nth != 1) selector += ":nth-of-type("+nth+")"; } path.unshift(selector); el = el.parentNode; } return path.join(" > "); }

    // Attach Listeners
    document.querySelector('[data-lang-key="hero.button_services"]')?.addEventListener('click', (e) => { sendSalesforceClickInteraction(e, 'Hero CTA - Explore Services', { targetSection: 'services' }); console.log('Tracked Hero CTA click'); });
    document.querySelector('[data-lang-key="hero.button_contact"]')?.addEventListener('click', (e) => { sendSalesforceClickInteraction(e, 'Hero CTA - Contact Us', { targetSection: 'contact' }); console.log('Tracked Hero Contact click'); });
    document.querySelectorAll('#news [data-lang-key="news.read_more"]').forEach(link => { link.addEventListener('click', (e) => { if (link.getAttribute('href') === '#') { e.preventDefault(); } const card = e.target.closest('.flex-col'); const title = card?.querySelector('h3[data-lang-key]')?.textContent.trim() ?? 'Unknown'; sendSalesforceClickInteraction(e, 'News Read More', { articleTitle: title, cardPosition: card?.parentNode ? Array.from(card.parentNode.children).indexOf(card) + 1 : 'Unknown' }); console.log(`Tracked News Read More: ${title}`); }); });
    document.querySelectorAll('#services .group').forEach(link => { link.addEventListener('click', (e) => { const title = link.querySelector('h3[data-lang-key]')?.textContent.trim() ?? 'Unknown'; const key = link.querySelector('h3[data-lang-key]')?.getAttribute('data-lang-key').replace('service_card.', '') ?? 'unknown'; sendSalesforceClickInteraction(e, 'Service Icon Click', { serviceName: title, serviceKey: key }); console.log(`Tracked Service Icon: ${title}`); }); });
    document.querySelector('#contact [data-lang-key="contact_cta.button"]')?.addEventListener('click', (e) => { if (e.currentTarget.getAttribute('href') === '#') { e.preventDefault(); } sendSalesforceClickInteraction(e, 'Contact CTA - Find Advisor'); console.log('Tracked Contact CTA click'); });
    // Listener for the main "Login" button (to show the form)
    document.querySelector('#login-button')?.addEventListener('click', (e) => { sendSalesforceClickInteraction(e, 'Header Login Prompt'); console.log('Tracked click to show login form'); });
    document.querySelectorAll('header .dropdown-menu a[role="menuitem"]').forEach(link => { link.addEventListener('click', (e) => { const key = link.getAttribute('data-lang-key'); const text = link.textContent.trim(); sendSalesforceClickInteraction(e, 'Private Client Submenu Click', { linkKey: key, linkText: text }); console.log(`Tracked Submenu click: ${text}`); }); });

} // --- End of attachTrackingListeners ---
window.attachTrackingListeners = attachTrackingListeners; // Make global

// --- User Identification Function ---
function handleSuccessfulLogin(userId, userEmail) {
    if (typeof salesforceSDKInitialized !== 'undefined' && salesforceSDKInitialized && userId) {
        SalesforceInteractions.identify({ identityType: SalesforceInteractions.SalesforceInteractionsConstants.IdentityType.CustomerId, id: userId });
        if (userEmail) { SalesforceInteractions.identify({ identityType: SalesforceInteractions.SalesforceInteractionsConstants.IdentityType.EmailAddress, id: userEmail }); }
        SalesforceInteractions.sendEvent({ user: { attributes: { loginStatus: "Logged In", lastLoginDate: new Date().toISOString(), email: userEmail || '', ...(typeof userLocationData !== 'undefined' && userLocationData && !userLocationData.error && { latitude: userLocationData.latitude, longitude: userLocationData.longitude }) } } });
        console.log(`SF SDK: Identified user: ${userId} (${userEmail || 'No email'})`);
    } else { console.warn(`SF SDK: Could not identify user. SDK Initialized: ${salesforceSDKInitialized}, User ID: ${!!userId}`); }
}
window.handleSuccessfulLogin = handleSuccessfulLogin; // Make global

// --- Logout Function ---
function handleLogout() {
    const loggedInEmail = sessionStorage.getItem(LOGIN_STATUS_KEY);
    console.log(`Logging out user: ${loggedInEmail || 'Unknown'}`);
    sessionStorage.removeItem(LOGIN_STATUS_KEY);
    updateLoginUI(false); // Update UI
    if (typeof salesforceSDKInitialized !== 'undefined' && salesforceSDKInitialized) {
        SalesforceInteractions.sendEvent({ interaction: { name: 'User Logout' }, user: { attributes: typeof userLocationData !== 'undefined' && userLocationData && !userLocationData.error ? userLocationData : {} } });
        console.log("Sent User Logout event to Salesforce.");
    }
}
window.handleLogout = handleLogout; // Make global


// --- Global UI Update Function --- (Defined later in DOMContentLoaded)
let updateLoginUI = () => {};

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

    // --- Consent Banner Logic ---
    // Show banner if consent not set, and attach button listeners
    if (consentBanner && acceptBtn && rejectBtn) {
        let consentStatus = null;
        try { consentStatus = localStorage.getItem(CONSENT_STORAGE_KEY); }
        catch (e) { console.error("localStorage consent check failed.", e); }

        // Show banner only if no choice has been made
        if (!consentStatus) {
            console.log("Consent not set, showing banner via DOMContentLoaded.");
            consentBanner.classList.remove('hidden');
            setTimeout(() => { consentBanner.style.transform = 'translateY(0)'; }, 50); // Animate in
        } else {
             console.log(`Consent already set to: ${consentStatus}. Banner remains hidden.`);
        }

        // Attach listeners regardless of initial state
        acceptBtn.addEventListener('click', () => {
            console.log("Consent Accepted button clicked.");
            try { localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted'); } catch (e) { console.error("localStorage consent save failed.", e); }
            consentBanner.style.transform = 'translateY(100%)';
            setTimeout(() => { consentBanner.classList.add('hidden'); }, 300);

            // Send Consent Accepted Event
             if (typeof SalesforceInteractions !== 'undefined' && typeof SalesforceInteractions.sendEvent === 'function') {
                 SalesforceInteractions.sendEvent({ interaction: { name: 'Consent Accepted', attributes: { consentType: 'All' } }, user: { attributes: typeof userLocationData !== 'undefined' && userLocationData && !userLocationData.error ? userLocationData : {} } });
             } else {
                 console.warn("SF SDK not ready to send Consent Accepted event.");
             }
             // Initialize SDK
            if (typeof initializeSalesforceSDK === 'function') {
                initializeSalesforceSDK();
            } else { console.error("initializeSalesforceSDK function not found!"); }
        });

        rejectBtn.addEventListener('click', () => {
            console.log("Consent Rejected button clicked.");
            try { localStorage.setItem(CONSENT_STORAGE_KEY, 'rejected'); } catch (e) { console.error("localStorage consent save failed.", e); }
            consentBanner.style.transform = 'translateY(100%)';
            setTimeout(() => { consentBanner.classList.add('hidden'); }, 300);
             // Send Consent Rejected Event
             if (typeof SalesforceInteractions !== 'undefined' && typeof SalesforceInteractions.sendEvent === 'function') {
                 SalesforceInteractions.sendEvent({ interaction: { name: 'Consent Rejected', attributes: { consentType: 'All' } } });
             }
        });
    } else { console.warn("Consent banner elements missing."); }

    // --- Login Simulation Logic ---
    // Define the UI update function within this scope
    updateLoginUI = (isLoggedIn, email = '') => {
        const loginBtn = document.getElementById('login-button');
        const form = document.getElementById('login-form');
        const statusDiv = document.getElementById('logged-in-status');
        const emailSpan = document.getElementById('logged-in-email');
        const emailInput = document.getElementById('login-email');
        if (!loginBtn || !form || !statusDiv || !emailSpan || !emailInput) { console.warn("Login UI elements missing for update."); return; }
        if (isLoggedIn) {
            loginBtn.classList.add('hidden');
            form.classList.add('hidden');
            statusDiv.classList.remove('hidden'); statusDiv.classList.add('flex');
            emailSpan.textContent = email;
        } else {
            loginBtn.classList.remove('hidden');
            form.classList.add('hidden');
            statusDiv.classList.add('hidden'); statusDiv.classList.remove('flex');
            emailSpan.textContent = ''; emailInput.value = '';
        }
    }

    // Setup Login Listeners only if all elements are found
    if (loginButton && loginForm && loginEmailInput && simulateLoginButton && loggedInStatusDiv && loggedInEmailSpan && logoutButton) {
        const initialEmail = sessionStorage.getItem(LOGIN_STATUS_KEY);
        updateLoginUI(!!initialEmail, initialEmail || '');

        loginButton.addEventListener('click', () => {
            loginButton.classList.add('hidden');
            loginForm.classList.remove('hidden');
            loginEmailInput.focus();
            // Tracking moved to attachTrackingListeners
        });

        simulateLoginButton.addEventListener('click', () => {
            const email = loginEmailInput.value.trim();
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                console.log(`Simulating login for: ${email}`);
                sessionStorage.setItem(LOGIN_STATUS_KEY, email);
                updateLoginUI(true, email);
                 // Send click event for the simulate login button itself
                 if (typeof salesforceSDKInitialized !== 'undefined' && salesforceSDKInitialized) {
                     SalesforceInteractions.sendEvent({ interaction: { name: 'Web Click', attributes: { targetName: 'Simulate Login Button' } } });
                 }
                 // Identify the user
                if (typeof handleSuccessfulLogin === 'function') { handleSuccessfulLogin(SIMULATED_USER_ID, email); }
                else { console.warn("handleSuccessfulLogin not available."); }
            } else { alert('Please enter a valid email address.'); }
        });

        logoutButton.addEventListener('click', () => {
            if (typeof handleLogout === 'function') { handleLogout(); }
            else { console.error("handleLogout function not found!"); }
        });

    } else { console.warn("Login simulation elements missing. Login UI inactive."); }

    // --- Other Initializations ---
    if (mobileMenuButton && mobileMenu) { mobileMenuButton.addEventListener('click', () => { mobileMenuButton.setAttribute('aria-expanded', !(mobileMenuButton.getAttribute('aria-expanded') === 'true')); mobileMenu.classList.toggle('hidden'); }); }
    mobileMenu?.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { if (!mobileMenu.classList.contains('hidden')) { mobileMenu.classList.add('hidden'); mobileMenuButton.setAttribute('aria-expanded', 'false'); } }); });
    // Ensure language buttons have listeners attached correctly
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            console.log(`Language button clicked: ${lang}`); // Debug log
            setLanguage(lang);
        });
    });
    if (currentYearSpan) { currentYearSpan.textContent = new Date().getFullYear(); }
    let preferredLang = 'de';
    try { const savedLang = localStorage.getItem('bwam_preferred_lang'); if (savedLang && translations[savedLang]) { preferredLang = savedLang; } } catch(e) { console.warn("Could not read lang preference."); }
    setLanguage(preferredLang); // Apply language (this will also translate the banner if it's visible)
    handleHashChange(); // Initial section display
    window.addEventListener('hashchange', handleHashChange); // Listen for SPA navigation

    console.log("BWAM Script Loaded. Initial language:", preferredLang);
}); // End of DOMContentLoaded

