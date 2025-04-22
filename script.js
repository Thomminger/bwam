// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Language Data ---
    // Store translations here. Add more keys and text as needed.
    const translations = {
        'de': {
            'page_title': 'BWAM - Ihr Finanzpartner',
            'nav.private_clients': 'Privatkunden',
            'nav.business_clients': 'Firmenkunden',
            'nav.institutional': 'Institutionelle',
            'nav.about_us': 'Über uns',
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

    // --- Element Selectors ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const currentYearSpan = document.getElementById('current-year');
    const langButtons = document.querySelectorAll('.lang-button'); // Select all language buttons

    // --- Language Switching Function ---
    function setLanguage(lang) {
        // Check if the selected language exists in our translations
        if (!translations[lang]) {
            console.error(`Language ${lang} not found in translations.`);
            return; // Exit if language is not supported
        }

        // Update the lang attribute on the main <html> tag
        document.documentElement.lang = lang;

        // Find all elements that have a data-lang-key attribute
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key'); // Get the key (e.g., 'hero.title')
            const translation = translations[lang][key]; // Find the translation for the current language

            if (translation !== undefined) {
                // Check if the key indicates an attribute needs updating (like title or aria-label)
                if (key.startsWith('aria.') || key.startsWith('title.')) {
                    const attrName = key.split('.')[0]; // Get the attribute name (e.g., 'aria-label')
                    element.setAttribute(attrName, translation); // Set the attribute value
                } else {
                    // Otherwise, update the text content of the element
                    element.textContent = translation;
                }
            } else {
                // Log a warning if a translation key is missing for the selected language
                console.warn(`Translation key "${key}" not found for language "${lang}".`);
                // Optionally leave default text or show the key as fallback
                // element.textContent = key;
            }
        });

        // Update the page title in the browser tab
        document.title = translations[lang]['page_title'] || 'BWAM'; // Use default if title key is missing

        // Update the active class on language buttons
        langButtons.forEach(button => {
            if (button.getAttribute('data-lang') === lang) {
                // Add 'active' class to the currently selected language button
                button.classList.add('active');
            } else {
                // Remove 'active' class from other language buttons
                button.classList.remove('active');
            }
        });

        // Save the selected language preference to localStorage for persistence
        try {
            localStorage.setItem('bwam_preferred_lang', lang);
        } catch (e) {
            // Log warning if localStorage is unavailable (e.g., private browsing)
            console.warn("Could not save language preference to localStorage.");
        }
    }

    // --- Event Listeners ---

    // Mobile Menu Toggle Logic
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden'); // Toggle visibility of the mobile menu
        });
    }

    // Optional: Close Mobile Menu when a link inside it is clicked
    const mobileNavLinks = mobileMenu?.querySelectorAll('a');
    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close the menu only if it's currently open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Add click event listeners to all language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang'); // Get the language code (e.g., 'de', 'en')
            setLanguage(selectedLang); // Call the function to update the page language
        });
    });

    // --- Initial Setup ---

    // Update Footer Year dynamically
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Set initial language: Check localStorage first, otherwise default to German ('de')
    let preferredLang = 'de'; // Default language
    try {
        const savedLang = localStorage.getItem('bwam_preferred_lang');
        // Check if a language was saved and if it exists in our translations object
        if (savedLang && translations[savedLang]) {
            preferredLang = savedLang; // Use the saved language
        }
    } catch(e) {
        console.warn("Could not read language preference from localStorage.");
    }
    // Apply the determined language when the page loads
    setLanguage(preferredLang);

    // Log that the script has loaded and the initial language set
    console.log("BWAM Homepage Multilingual Script Loaded. Initial language:", preferredLang);

}); // End of DOMContentLoaded event listener
