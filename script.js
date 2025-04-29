// script.js

// --- Language Data (Updated with subpage keys if needed, though nav keys might suffice) ---
const translations = {
    'de': {
        'page_title': 'BWAM - Ihr Finanzpartner',
        'nav.private_clients': 'Privatkunden',
        'nav.business_clients': 'Firmenkunden',
        'nav.institutional': 'Institutionelle',
        'nav.about_us': 'Über uns',
        'nav.events': 'Veranstaltungen',
        'nav.accounts_cards': 'Konto & Karten', // Used for dropdown and potentially subpage title
        'nav.investing': 'Anlegen', // Used for dropdown and potentially subpage title
        'nav.pensions': 'Vorsorgen', // Used for dropdown and potentially subpage title
        'nav.financing': 'Finanzieren', // Used for dropdown and potentially subpage title
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
        'footer.location': 'Standort: Zürich, Schweiz.'
    },
    'en': {
        'page_title': 'BWAM - Your Financial Partner',
        'nav.private_clients': 'Private Clients',
        'nav.business_clients': 'Business Clients',
        'nav.institutional': 'Institutional',
        'nav.about_us': 'About Us',
        'nav.events': 'Events',
        'nav.accounts_cards': 'Accounts & Cards', // Used for dropdown and potentially subpage title
        'nav.investing': 'Investing', // Used for dropdown and potentially subpage title
        'nav.pensions': 'Pensions', // Used for dropdown and potentially subpage title
        'nav.financing': 'Financing', // Used for dropdown and potentially subpage title
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
        'footer.location': 'Location: Zürich, Switzerland.'
    }
};

// --- Language Switching Function ---
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Language ${lang} not found.`);
        return;
    }
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        const translation = translations[lang][key];
        if (translation !== undefined) {
            if (key.startsWith('aria.') || key === 'page_title') {
                if (key === 'page_title') { document.title = translation; }
                 else { element.setAttribute(key.split('.')[0], translation); }
            } else { element.textContent = translation; }
        } else { console.warn(`Translation key "${key}" not found for lang "${lang}".`); }
    });
    document.querySelectorAll('.lang-button').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem('bwam_preferred_lang', lang); }
    catch (e) { console.warn("Could not save lang preference."); }

    // --- Salesforce Language Change Tracking ---
    if (typeof salesforceSDKInitialized !== 'undefined' && salesforceSDKInitialized) {
        SalesforceInteractions.sendEvent({
            interaction: { name: 'Changed Language', attributes: { selectedLanguage: lang } },
            user: { // Include location if available
                attributes: typeof userLocationData !== 'undefined' && userLocationData && !userLocationData.error ? {
                   latitude: userLocationData.latitude, longitude: userLocationData.longitude
                } : {}
            }
        });
        console.log(`Tracked Language Change to: ${lang}`);
    }
}

// --- Simple Hash-Based Page/Section Visibility ---
function handleHashChange() {
    const hash = window.location.hash.substring(1);
    // Hide all main sections first
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });

    // Determine which section to show
    let sectionToShowId = 'home'; // Default to home
    if (hash) {
        // Check if it's a direct section or a subpage hash
        if (document.getElementById(hash)) {
            sectionToShowId = hash;
        } else {
            // If it's a subpage hash like 'accounts-cards', show the parent 'services' section for this example
            // A real SPA would load different content here.
            if (['accounts-cards', 'investing', 'pensions', 'financing'].includes(hash)) {
                 // For this demo, we'll just show the corresponding placeholder section
                 sectionToShowId = hash;
                 // Alternatively, always show the main 'services' section:
                 // sectionToShowId = 'services';
            } else if (document.getElementById(hash)) {
                 sectionToShowId = hash; // Show other main sections like news, events, contact
            }
        }
    }

    // Show the target section
    const sectionToShow = document.getElementById(sectionToShowId);
    if (sectionToShow) {
        sectionToShow.classList.remove('hidden');
        // Scroll to the section smoothly (browser handles smooth scroll via CSS)
        // sectionToShow.scrollIntoView(); // Optional: force scroll if needed
    } else {
        // Fallback to home if the target doesn't exist
        document.getElementById('home')?.classList.remove('hidden');
    }

    // --- Trigger Salesforce Page View on Hash Change ---
    // Check if SDK is ready
     if (typeof salesforceSDKInitialized !== 'undefined' && salesforceSDKInitialized && typeof SalesforceInteractions !== 'undefined') {
        // Recalculate context based on the new hash
        const newPageContext = getPageContext(); // Assumes getPageContext is accessible

        const pageViewPayload = {
            interaction: {
                name: SalesforceInteractions.SalesforceInteractionsConstants.InteractionType.ViewPage,
                locale: document.documentElement.lang || "en_US"
            },
            page: {
                url: window.location.href, // The new URL with hash
                title: document.title,
                type: newPageContext.type,
                category: newPageContext.category,
            },
            user: { // Include location if available
                attributes: typeof userLocationData !== 'undefined' && userLocationData && !userLocationData.error ? {
                    latitude: userLocationData.latitude, longitude: userLocationData.longitude
                } : {}
            }
        };
        SalesforceInteractions.sendEvent(pageViewPayload);
        console.log(`Tracked viewPage (Hash Change) for type: ${newPageContext.type}, category: ${newPageContext.category}`);
     }
}

// --- Helper to get Page Context (needs to be accessible for hash change) ---
function getPageContext() {
    let pageType = "Homepage";
    let pageCategory = "General Banking";
    const hash = window.location.hash.substring(1);

    switch (hash) {
        case 'home': pageType = "Homepage"; pageCategory = "General Banking"; break;
        case 'services': pageType = "Services Overview"; pageCategory = "Financial Services"; break;
        case 'news': pageType = "News Overview"; pageCategory = "Insights & News"; break;
        case 'events': pageType = "Events Information"; pageCategory = "Community & Events"; break;
        case 'contact': pageType = "Contact Information"; pageCategory = "Support & Contact"; break;
        case 'accounts-cards': pageType = "Service Detail"; pageCategory = "Accounts & Cards"; break;
        case 'investing': pageType = "Service Detail"; pageCategory = "Investing"; break;
        case 'pensions': pageType = "Service Detail"; pageCategory = "Pensions"; break;
        case 'financing': pageType = "Service Detail"; pageCategory = "Financing"; break;
        default:
            if (hash === "") { pageType = "Homepage"; pageCategory = "General Banking"; }
            else { pageType = "Other"; pageCategory = "General Banking"; }
            break;
    }
    return { type: pageType, category: pageCategory };
}


// --- Salesforce Interaction Tracking Function ---
function attachTrackingListeners(currentPageContext) {
    console.log("Attaching Salesforce tracking listeners. Current context:", currentPageContext);
    if (!currentPageContext) { console.error("Cannot attach tracking listeners: currentPageContext missing."); return; }

    // Helper function to send interaction events, including location
    function sendSalesforceInteraction(interactionPayload) {
        if (typeof salesforceSDKInitialized !== 'undefined' && salesforceSDKInitialized) {
            // Merge current page context and location data
            const eventPayload = {
                ...interactionPayload, // The specific interaction data
                page: { // Always include current page context
                    type: currentPageContext.type,
                    category: currentPageContext.category,
                    url: window.location.href // Ensure current URL is included
                },
                 user: { // Include location if available
                    attributes: typeof userLocationData !== 'undefined' && userLocationData && !userLocationData.error ? {
                        latitude: userLocationData.latitude, longitude: userLocationData.longitude
                    } : {}
                }
            };
            SalesforceInteractions.sendEvent(eventPayload);
        } else {
            console.warn("Salesforce SDK not ready, event not sent:", interactionPayload?.interaction?.name);
        }
    }

    // 1: Tracking "Explore Services" button
    const exploreServicesBtn = document.querySelector('[data-lang-key="hero.button_services"]');
    if (exploreServicesBtn) {
        exploreServicesBtn.addEventListener('click', () => {
            sendSalesforceInteraction({
                interaction: { name: 'Clicked Hero CTA', attributes: { buttonText: exploreServicesBtn.textContent.trim(), targetSection: 'services' } }
            });
            console.log('Tracked Hero CTA click: Explore Services');
        });
    } else { console.warn("Tracking listener not attached: Explore Services button not found."); }

    // 2: Tracking "Read More" links in News
    const readMoreLinks = document.querySelectorAll('#news [data-lang-key="news.read_more"]');
    if (readMoreLinks.length > 0) {
        readMoreLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                 if (link.getAttribute('href') === '#') { event.preventDefault(); }
                 const card = event.target.closest('.flex-col');
                 const titleElement = card ? card.querySelector('h3[data-lang-key]') : null;
                 const articleTitle = titleElement ? titleElement.textContent.trim() : 'Unknown';
                 sendSalesforceInteraction({
                    interaction: { name: 'Clicked News Read More', attributes: { articleTitle: articleTitle, articleUrl: link.href, cardPosition: card && card.parentNode ? Array.from(card.parentNode.children).indexOf(card) + 1 : 'Unknown' } }
                 });
                 console.log(`Tracked News Read More click for: ${articleTitle}`);
            });
        });
    } else { console.warn("Tracking listener not attached: No 'Read More' links found."); }

    // 3: Tracking Service Icons/Links in Services section
    const serviceLinks = document.querySelectorAll('#services .group');
     if (serviceLinks.length > 0) {
        serviceLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                 // Use hash for SPA navigation, prevent default only if truly placeholder
                 // if (link.getAttribute('href') === '#') { event.preventDefault(); }
                 const titleElement = link.querySelector('h3[data-lang-key]');
                 const serviceName = titleElement ? titleElement.textContent.trim() : 'Unknown';
                 const serviceKey = titleElement ? titleElement.getAttribute('data-lang-key').replace('service_card.', '') : 'unknown';
                 sendSalesforceInteraction({
                    interaction: { name: 'Clicked Service Icon', attributes: { serviceName: serviceName, serviceKey: serviceKey, targetUrl: link.href } }
                 });
                 console.log(`Tracked Service Icon click for: ${serviceName}`);
            });
        });
    } else { console.warn("Tracking listener not attached: No service links found."); }

    // 4: Tracking "Find an Advisor" button
    const findAdvisorBtn = document.querySelector('#contact [data-lang-key="contact_cta.button"]');
    if (findAdvisorBtn) {
        findAdvisorBtn.addEventListener('click', (event) => {
            if (findAdvisorBtn.getAttribute('href') === '#') { event.preventDefault(); }
            sendSalesforceInteraction({
                interaction: { name: 'Clicked Contact CTA', attributes: { buttonText: findAdvisorBtn.textContent.trim(), targetUrl: findAdvisorBtn.href } }
            });
            console.log('Tracked Contact CTA click: Find an Advisor');
        });
    } else { console.warn("Tracking listener not attached: Find an Advisor button not found."); }

    // 5: Tracking Header Login button click
    const loginBtn = document.querySelector('header [data-lang-key="nav.login"]');
     if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            sendSalesforceInteraction({
                interaction: { name: 'Clicked Header Login', attributes: { buttonText: loginBtn.textContent.trim() } }
            });
            console.log('Tracked Header Login click.');
            // IMPORTANT: Call handleSuccessfulLogin after actual authentication success
            // handleSuccessfulLogin('USER_ID_HERE', 'USER_EMAIL_HERE');
        });
    } else { console.warn("Tracking listener not attached: Header Login button not found."); }

    // 6. Tracking Clicks on Private Client Sub-menu items
    const privateClientLinks = document.querySelectorAll('header .dropdown-menu a[role="menuitem"]');
    if (privateClientLinks.length > 0) {
        privateClientLinks.forEach(link => {
            link.addEventListener('click', () => {
                const linkKey = link.getAttribute('data-lang-key');
                const linkText = link.textContent.trim();
                const targetHash = link.getAttribute('href'); // e.g., #accounts-cards

                sendSalesforceInteraction({
                    interaction: {
                        name: 'Clicked Private Client Submenu',
                        attributes: {
                            linkKey: linkKey,
                            linkText: linkText,
                            targetHash: targetHash
                        }
                    }
                });
                console.log(`Tracked Private Client Submenu click: ${linkText}`);
            });
        });
    } else { console.warn("Tracking listener not attached: No Private Client submenu links found."); }


} // --- End of attachTrackingListeners ---
window.attachTrackingListeners = attachTrackingListeners; // Make global

// --- User Identification Function (Example) ---
function handleSuccessfulLogin(userId, userEmail) {
    if (typeof salesforceSDKInitialized !== 'undefined' && salesforceSDKInitialized && userId) {
        SalesforceInteractions.identify({ identityType: SalesforceInteractions.SalesforceInteractionsConstants.IdentityType.CustomerId, id: userId });
        if (userEmail) { SalesforceInteractions.identify({ identityType: SalesforceInteractions.SalesforceInteractionsConstants.IdentityType.EmailAddress, id: userEmail }); }
        SalesforceInteractions.sendEvent({
            user: {
                attributes: {
                    loginStatus: "Logged In", lastLoginDate: new Date().toISOString(),
                     // Include location if available
                    ...(typeof userLocationData !== 'undefined' && userLocationData && !userLocationData.error && {
                        latitude: userLocationData.latitude, longitude: userLocationData.longitude
                    })
                }
            }
        });
        console.log(`Salesforce SDK: Identified user: ${userId}`);
    } else { console.warn(`Salesforce SDK: Could not identify user. SDK Initialized: ${salesforceSDKInitialized}, User ID Provided: ${!!userId}`); }
}
window.handleSuccessfulLogin = handleSuccessfulLogin; // Make global


// --- Initial Page Load Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const currentYearSpan = document.getElementById('current-year');
    const langButtons = document.querySelectorAll('.lang-button');

    // Mobile Menu Toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });
    }
    // Close Mobile Menu on link click
    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Language Button Listeners
    langButtons.forEach(button => {
        button.addEventListener('click', () => setLanguage(button.getAttribute('data-lang')));
    });

    // Footer Year
    if (currentYearSpan) { currentYearSpan.textContent = new Date().getFullYear(); }

    // Initial Language Set
    let preferredLang = 'de';
    try { const savedLang = localStorage.getItem('bwam_preferred_lang'); if (savedLang && translations[savedLang]) { preferredLang = savedLang; } }
    catch(e) { console.warn("Could not read lang preference."); }
    setLanguage(preferredLang);

    // Initial Page/Section Display based on Hash
    handleHashChange();

    // Listen for hash changes to update view and trigger page view event
    window.addEventListener('hashchange', handleHashChange);

    console.log("BWAM Script Loaded. Initial language:", preferredLang);
});
