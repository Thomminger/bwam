// script.js

// --- Constants ---
const LOGIN_STATUS_KEY = 'bwam_logged_in_email'; // Key for sessionStorage
const SIMULATED_USER_ID = 'SIMULATED_USER_123'; // Placeholder User ID for simulation
// Consent key is now defined globally in index.html

// --- Language Data ---
const translations = {
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
        'hero.button_contact': 'Kontakt aufnehmen', // Button text in Hero
        'services.subtitle': 'Massgeschneiderte Finanzlösungen für Ihr Unternehmen, von Start-ups bis zu etablierten Firmen in der Region Zürich.',
        'services.business.card1_title': 'Firmenkonten',
        'services.business.card1_desc': 'Flexible Geschäftskonten mit Online-Banking, Multiwährungsoptionen und dediziertem Support.',
        'services.business.card2_title': 'Unternehmensfinanzierung',
        'services.business.card2_desc': 'Kapital für Wachstum, Anschaffungen oder operative Bedürfnisse mit unseren wettbewerbsfähigen Krediten und Kreditlinien.',
        'services.business.card3_title': 'Cash Management',
        'services.business.card3_desc': 'Optimieren Sie Ihren Cashflow mit unseren Dienstleistungen für Zahlungsabwicklung, Inkasso und Liquiditätsmanagement.',
        'institutional.subtitle': 'Anspruchsvolle Vermögensverwaltung und Beratungsdienstleistungen für Pensionskassen, Stiftungen, Family Offices und Vermögensverwalter.',
        'institutional.card1_title': 'Vermögensverwaltung',
        'institutional.card1_desc': 'Diskretionäre und beratende Mandate über verschiedene Anlageklassen, zugeschnitten auf das Risikoprofil und die Ziele Ihrer Institution.',
        'institutional.card2_title': 'Depotbank & Ausführung',
        'institutional.card2_desc': 'Sichere Verwahrung von Vermögenswerten, effiziente Handelsausführung und umfassende Reporting-Dienstleistungen.',
        'accounts.intro': 'Verwalten Sie Ihre täglichen Finanzen mühelos mit unserem Angebot an Kontokorrentkonten und Zahlungskarten. Profitieren Sie von sicherem Online-Banking, mobilem Zugriff und persönlichem Service.',
        'accounts.feature1': 'Wettbewerbsfähige Zinssätze auf Sparkonten.',
        'accounts.feature2': 'Verschiedene Kreditkartenoptionen mit Prämien und Vorteilen.',
        'accounts.feature3': 'Einfache internationale Zahlungen und Währungsumtausch.',
        'accounts.feature4': 'Engagierte Unterstützung für alle Ihre Bankbedürfnisse.',
        'accounts.button_open': 'Konto eröffnen',
        'investing.intro': 'Vermehren Sie Ihr Vermögen mit unseren umfassenden Anlagelösungen. Egal, ob Sie Anfänger oder erfahrener Investor sind, wir bieten Strategien, die auf Ihre Ziele und Risikobereitschaft zugeschnitten sind.',
        'investing.option1_title': 'Verwaltete Portfolios',
        'investing.option1_desc': 'Lassen Sie unsere Experten Ihre Anlagen basierend auf vordefinierten Strategien verwalten.',
        'investing.option2_title': 'Beratungsdienste',
        'investing.option2_desc': 'Erhalten Sie personalisierte Anlageberatung und treffen Sie fundierte Entscheidungen.',
        'investing.disclaimer': 'Anlagen sind mit Risiken verbunden, einschliesslich des möglichen Verlusts des eingesetzten Kapitals. Die Wertentwicklung in der Vergangenheit ist kein Hinweis auf zukünftige Ergebnisse.',
        'pensions.intro': 'Sichern Sie Ihre Zukunft mit unseren flexiblen Vorsorgelösungen. Wir helfen Ihnen, sich im Schweizer Vorsorgesystem (Säulen 1, 2 und 3) zurechtzufinden, um einen komfortablen Ruhestand aufzubauen.',
        'pensions.pillar3a': 'Steuerbegünstigte Säule 3a Vorsorgekonten.',
        'pensions.vested_benefits': 'Freizügigkeitskonten zur Verwaltung von Geldern der 2. Säule bei Berufswechsel.',
        'pensions.planning': 'Umfassende Ruhestandsplanung und -analyse.',
        'pensions.button_learn': 'Mehr erfahren',
        'financing.intro': 'Erreichen Sie Ihre Ziele mit unseren flexiblen Finanzierungsoptionen. Von Hypotheken bis zu Privatkrediten bieten wir wettbewerbsfähige Konditionen und fachkundige Beratung.',
        'financing.option1_title': 'Hypotheken',
        'financing.option1_desc': 'Massgeschneiderte Hypothekenlösungen für den Kauf oder die Refinanzierung von Immobilien in der Schweiz.',
        'financing.option2_title': 'Privatkredite',
        'financing.option2_desc': 'Flexible Privatkreditoptionen für geplante oder unerwartete Ausgaben.',
        'financing.credit_check': 'Kreditgenehmigung vorbehaltlich Bonitätsprüfung und Vergabekriterien der Bank.',
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
        'contact_cta.title': 'Kontaktieren Sie BWAM', // Title in dedicated contact section (now hidden by default)
        'contact_cta.subtitle': 'Unsere Berater helfen Ihnen gerne, Ihre finanziellen Ziele zu erreichen. Melden Sie sich noch heute.',
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
        'consent.accept': 'Alle akzeptieren',
        'modal.title': 'Finden Sie Ihren Berater',
        'modal.advisor1_name': 'Anna Müller',
        'modal.advisor1_title': 'Senior Vermögensverwalterin',
        'modal.advisor2_name': 'Lukas Baumann',
        'modal.advisor2_title': 'Anlagespezialist',
        'modal.advisor3_name': 'Sophie Dubois',
        'modal.advisor3_title': 'Expertin für Ruhestandsplanung',
        'modal.button_connect': 'Verbinden',
        'modal.schedule_message': 'Vereinbaren Sie einen Termin mit Ihrem Berater.'
    },
    'en': {
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
        'hero.button_contact': 'Contact Us', // Button text in Hero
        'services.subtitle': 'Tailored financial solutions designed to help your business thrive, from startups to established corporations in the Zurich region.',
        'services.business.card1_title': 'Corporate Accounts',
        'services.business.card1_desc': 'Flexible business accounts with online banking, multi-currency options, and dedicated support.',
        'services.business.card2_title': 'Business Financing',
        'services.business.card2_desc': 'Access capital for growth, equipment purchase, or operational needs with our competitive loan and credit line options.',
        'services.business.card3_title': 'Cash Management',
        'services.business.card3_desc': 'Optimize your cash flow with our payment processing, collection, and liquidity management services.',
        'institutional.subtitle': 'Sophisticated investment management and advisory services for pension funds, foundations, family offices, and asset managers.',
        'institutional.card1_title': 'Asset Management',
        'institutional.card1_desc': 'Discretionary and advisory mandates across various asset classes, tailored to your institution\'s risk profile and objectives.',
        'institutional.card2_title': 'Custody & Execution',
        'institutional.card2_desc': 'Secure safekeeping of assets, efficient trade execution, and comprehensive reporting services.',
        'accounts.intro': 'Manage your daily finances effortlessly with our range of current accounts and payment cards. Enjoy secure online banking, mobile access, and personalized service.',
        'accounts.feature1': 'Competitive interest rates on savings accounts.',
        'accounts.feature2': 'Various credit card options with rewards and benefits.',
        'accounts.feature3': 'Easy international payments and currency exchange.',
        'accounts.feature4': 'Dedicated support for all your banking needs.',
        'accounts.button_open': 'Open Account',
        'investing.intro': 'Grow your wealth with our comprehensive investment solutions. Whether you\'re starting out or an experienced investor, we offer strategies tailored to your goals and risk tolerance.',
        'investing.option1_title': 'Managed Portfolios',
        'investing.option1_desc': 'Let our experts manage your investments based on predefined strategies.',
        'investing.option2_title': 'Advisory Services',
        'investing.option2_desc': 'Receive personalized investment advice and make informed decisions.',
        'investing.disclaimer': 'Investments involve risks, including the possible loss of principal. Past performance is not indicative of future results.',
        'pensions.intro': 'Secure your future with our flexible pension solutions. We help you navigate the Swiss pension system (Pillars 1, 2, and 3) to build a comfortable retirement.',
        'pensions.pillar3a': 'Tax-advantaged Pillar 3a retirement savings accounts.',
        'pensions.vested_benefits': 'Vested benefits accounts for managing Pillar 2 funds during career changes.',
        'pensions.planning': 'Comprehensive retirement planning and analysis.',
        'pensions.button_learn': 'Learn More',
        'financing.intro': 'Achieve your goals with our flexible financing options. From mortgages to personal loans, we offer competitive rates and expert advice.',
        'financing.option1_title': 'Mortgages',
        'financing.option1_desc': 'Tailored mortgage solutions for purchasing or refinancing property in Switzerland.',
        'financing.option2_title': 'Personal Loans',
        'financing.option2_desc': 'Flexible personal credit options for planned or unexpected expenses.',
        'financing.credit_check': 'Loan approval is subject to credit check and bank\'s lending criteria.',
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
        'contact_cta.title': 'Contact BWAM', // Title in dedicated contact section (now hidden by default)
        'contact_cta.subtitle': 'Our advisors are ready to help you achieve your financial goals. Reach out today.',
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
        'consent.accept': 'Accept All',
        'modal.title': 'Find Your Advisor',
        'modal.advisor1_name': 'Anna Müller',
        'modal.advisor1_title': 'Senior Wealth Manager',
        'modal.advisor2_name': 'Lukas Baumann',
        'modal.advisor2_title': 'Investment Specialist',
        'modal.advisor3_name': 'Sophie Dubois',
        'modal.advisor3_title': 'Retirement Planning Expert',
        'modal.button_connect': 'Connect',
        'modal.schedule_message': 'Schedule an appointment with your advisor.'
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
}


// --- User Identification Function (Simplified) ---
function handleSuccessfulLogin(userId, userEmail) {
    // This function now primarily serves to log the successful login attempt.
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

    console.log("User logged out.");
}
window.handleLogout = handleLogout; // Make global


// --- Global UI Update Function --- (Defined later in DOMContentLoaded)
// Placeholder for the function that updates login UI elements
let updateLoginUI = () => {
    console.warn("updateLoginUI called before it was defined in DOMContentLoaded.");
};

// --- Advisor Modal Functions ---
function openAdvisorModal() {
    const modal = document.getElementById('advisor-modal');
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    if (!modal || !overlay || !content) return;

    modal.classList.remove('hidden');
    // Trigger fade-in and scale-up animations
    requestAnimationFrame(() => { // Use requestAnimationFrame for smoother animation start
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
        content.classList.remove('opacity-0', 'scale-95');
        content.classList.add('opacity-100', 'scale-100');
    });
    // Apply current language to modal content
    const currentLang = document.documentElement.lang || 'de';
    setLanguage(currentLang); // Ensure modal text is translated
}

function closeAdvisorModal() {
    const modal = document.getElementById('advisor-modal');
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    if (!modal || !overlay || !content) return;

    // Trigger fade-out and scale-down animations
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    content.classList.remove('opacity-100', 'scale-100');
    content.classList.add('opacity-0', 'scale-95');

    // Hide modal after transition
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // Match transition duration in CSS/style
}


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
    const contactCtaButton = document.getElementById('contact-cta-button'); // Button in Hero
    const advisorModal = document.getElementById('advisor-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalOverlay = document.getElementById('modal-overlay');

    // Reference to the consent storage key defined in the inline script
    const CONSENT_STORAGE_KEY = window.CONSENT_STORAGE_KEY || 'bwam_consent_status';


    // --- Consent Banner Logic ---
    if (consentBanner && acceptBtn && rejectBtn) {
        let consentStatus = null;
        try {
            consentStatus = localStorage.getItem(CONSENT_STORAGE_KEY);
        } catch (e) { console.error("localStorage consent check failed.", e); }

        if (!consentStatus) {
            console.log("Consent not set, showing banner.");
            consentBanner.classList.remove('hidden');
            setTimeout(() => { consentBanner.style.transform = 'translateY(0)'; }, 50);
        } else { console.log(`Consent already set to: ${consentStatus}. Banner remains hidden.`); }

        acceptBtn.addEventListener('click', () => {
            console.log("Consent Accepted button clicked.");
            try { localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted'); }
            catch (e) { console.error("localStorage consent save failed.", e); }
            consentBanner.style.transform = 'translateY(100%)';
            setTimeout(() => { consentBanner.classList.add('hidden'); }, 300);
            console.log("Consent status set to 'accepted'.");
            // Potentially initialize analytics/tracking here if needed after consent
        });

        rejectBtn.addEventListener('click', () => {
            console.log("Consent Rejected button clicked.");
            try { localStorage.setItem(CONSENT_STORAGE_KEY, 'rejected'); }
            catch (e) { console.error("localStorage consent save failed.", e); }
            consentBanner.style.transform = 'translateY(100%)';
            setTimeout(() => { consentBanner.classList.add('hidden'); }, 300);
            console.log("Consent status set to 'rejected'.");
        });
    } else { console.warn("Consent banner elements (banner, accept, reject) missing."); }

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

    // --- Advisor Modal Listeners ---
    if (contactCtaButton && advisorModal && modalCloseButton && modalOverlay) {
        // Listener for the button that opens the modal
        contactCtaButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent potential navigation if it were an anchor
            console.log("Contact CTA button clicked, opening modal.");
            openAdvisorModal();
        });

        // Listener for the explicit close button (X)
        modalCloseButton.addEventListener('click', () => {
            console.log("Modal close button clicked.");
            closeAdvisorModal();
        });

        // Close modal if clicking on the overlay (outside the content)
        modalOverlay.addEventListener('click', () => {
             console.log("Modal overlay clicked.");
             closeAdvisorModal();
        });

        // Prevent clicks inside the modal content from closing it via the overlay listener
        // Get the modal content div specifically
        const modalContent = advisorModal.querySelector('#modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop the click from bubbling up to the overlay
            });
        } else {
            console.warn("Modal content element (#modal-content) not found for stopPropagation listener.");
        }

        // Add listeners to the "Connect" buttons inside the modal (optional - for future actions)
        const connectButtons = advisorModal.querySelectorAll('[data-lang-key="modal.button_connect"]');
        connectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const advisorCard = e.target.closest('.text-center'); // Find the parent card
                const advisorNameElement = advisorCard?.querySelector('[data-lang-key$="_name"]');
                const advisorName = advisorNameElement?.textContent || 'Unknown Advisor';
                console.log(`Connect button clicked for: ${advisorName}`);
                // Add logic here for what happens when "Connect" is clicked
                // e.g., redirect to a scheduling page, show another form, etc.
                alert(`Connecting with ${advisorName}... (Implement actual connection logic)`);
                closeAdvisorModal(); // Close modal after clicking connect (optional)
            });
        });


    } else {
        console.warn("Advisor modal elements (button, modal, close, overlay) missing. Modal functionality disabled.");
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

    console.log("BWAM Script Loaded (Content Added & Modal Logic). Initial language:", preferredLang);

}); // End of DOMContentLoaded
