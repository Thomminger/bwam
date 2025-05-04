// script.js

// --- Constants ---
const LOGIN_STATUS_KEY = 'bwam_logged_in_email'; // Key for sessionStorage
const SIMULATED_USER_ID = 'SIMULATED_USER_123'; // Placeholder User ID for simulation
// Consent key is now defined globally in index.html

// --- Language Data (Includes new sections) ---
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
        'hero.button_contact': 'Kontakt aufnehmen',
        // About Us Section
        'about.p1': 'Gegründet in Zürich mit tiefen Wurzeln in der Schweizer Bankentradition, verbindet BWAM (Banking & Wealth Asset Management) jahrzehntelange Finanzexpertise mit einem zukunftsorientierten Ansatz.',
        'about.p2': 'Unsere Mission ist es, personalisierte, transparente und zuverlässige Finanzdienstleistungen für Privatpersonen, Unternehmen und Institutionen anzubieten. Wir glauben an den Aufbau langfristiger Beziehungen, die auf Vertrauen und gemeinsamem Erfolg basieren.',
        'about.p3': 'Mit Sitz im Herzen des Zürcher Finanzdistrikts verpflichten wir uns zur Einhaltung höchster Integritätsstandards und leisten einen positiven Beitrag zu unserer Gemeinschaft.',
        // Business Clients Section (#business-clients)
        'services.subtitle': 'Massgeschneiderte Finanzlösungen für Ihr Unternehmen, von Start-ups bis zu etablierten Firmen in der Region Zürich.',
        'services.business.card1_title': 'Firmenkonten',
        'services.business.card1_desc': 'Flexible Geschäftskonten mit Online-Banking, Multiwährungsoptionen und dediziertem Support.',
        'services.business.card2_title': 'Unternehmensfinanzierung',
        'services.business.card2_desc': 'Kapital für Wachstum, Anschaffungen oder operative Bedürfnisse mit unseren wettbewerbsfähigen Krediten und Kreditlinien.',
        'services.business.card3_title': 'Cash Management',
        'services.business.card3_desc': 'Optimieren Sie Ihren Cashflow mit unseren Dienstleistungen für Zahlungsabwicklung, Inkasso und Liquiditätsmanagement.',
        // Institutional Clients Section (#institutional)
        'institutional.subtitle': 'Anspruchsvolle Vermögensverwaltung und Beratungsdienstleistungen für Pensionskassen, Stiftungen, Family Offices und Vermögensverwalter.',
        'institutional.card1_title': 'Vermögensverwaltung',
        'institutional.card1_desc': 'Diskretionäre und beratende Mandate über verschiedene Anlageklassen, zugeschnitten auf das Risikoprofil und die Ziele Ihrer Institution.',
        'institutional.card2_title': 'Depotbank & Ausführung',
        'institutional.card2_desc': 'Sichere Verwahrung von Vermögenswerten, effiziente Handelsausführung und umfassende Reporting-Dienstleistungen.',
        // Private Client Subsections
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
        // Business Client Subsections (NEW)
        'corporate_accounts.intro': 'Optimieren Sie Ihre Geschäftsabläufe mit unseren robusten Firmenkonten, die auf Effizienz und Wachstum im Schweizer Markt ausgelegt sind.',
        'corporate_accounts.feature1': 'Multiwährungsfähigkeit für internationale Geschäfte.',
        'corporate_accounts.feature2': 'Fortschrittliche Online- und Mobile-Banking-Plattform mit Benutzerverwaltung.',
        'corporate_accounts.feature3': 'Integrationsmöglichkeiten mit Buchhaltungssoftware.',
        'corporate_accounts.feature4': 'Dedizierter Kundenbetreuer für persönlichen Support.',
        'corporate_accounts.button_contact': 'Vertrieb kontaktieren',
        'business_financing.intro': 'Treiben Sie das Wachstum Ihres Unternehmens mit flexiblen Finanzierungslösungen voran, die auf Ihre spezifischen Bedürfnisse und Ihre Branche zugeschnitten sind.',
        'business_financing.option1_title': 'Festkredite',
        'business_financing.option1_desc': 'Strukturierte Kredite für bedeutende Investitionen wie Gerätekauf oder Expansionsprojekte.',
        'business_financing.option2_title': 'Kreditlinien',
        'business_financing.option2_desc': 'Flexibler Zugang zu Mitteln zur Verwaltung des Betriebskapitals und kurzfristiger Bedürfnisse.',
        'cash_management.intro': 'Optimieren Sie die Liquidität Ihres Unternehmens und rationalisieren Sie Zahlungsprozesse mit unseren effizienten Cash-Management-Tools.',
        'cash_management.feature1': 'Automatisierte Zahlungsabwicklung (Inland und Ausland).',
        'cash_management.feature2': 'Debitorenmanagement und Inkassodienste.',
        'cash_management.feature3': 'Liquiditätslösungen und Prognosetools.',
        'cash_management.feature4': 'Echtzeit-Reporting und Kontoübersicht.',
        'cash_management.button_explore': 'Tools entdecken',
        // News Section
        'news.title': 'News & Insights',
        'news.card1_title': 'Marktausblick Q3 2025',
        'news.card1_desc': 'Unsere Analyse aktueller Markttrends und potenzieller Chancen für Investoren.',
        'news.card2_title': 'Planung für einen sicheren Ruhestand',
        'news.card2_desc': 'Wichtige Überlegungen zum Aufbau eines soliden Vorsorgeplans in der Schweiz.',
        'news.card3_title': 'Tipps für sicheres Digital Banking',
        'news.card3_desc': 'Wie Sie sich schützen, während Sie Ihre Finanzen online mit BWAM verwalten.',
        'news.read_more': 'Mehr lesen',
        'news.more_news': 'Weitere News',
        // Events Section
        'events.title': 'Veranstaltungen', // Changed title slightly
        'events.subtitle': 'Nehmen Sie an unseren aufschlussreichen Seminaren und Workshops teil.', // Shortened subtitle
        'events.featured_title': 'Top-Event: Anlagestrategien 2025',
        'events.featured_date': 'Datum: 15. Oktober 2025',
        'events.featured_location': 'Ort: BWAM Hauptsitz, Zürich',
        'events.button_register': 'Jetzt anmelden',
        'events.form_placeholder': '(Formular zur Veranstaltungsanmeldung kommt hier hin)', // Kept for fallback
        // Contact Section (Hidden)
        'contact_cta.title': 'Kontaktieren Sie BWAM',
        'contact_cta.subtitle': 'Unsere Berater helfen Ihnen gerne, Ihre finanziellen Ziele zu erreichen. Melden Sie sich noch heute.',
        // Footer
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
        // Consent Banner
        'consent.message': 'Wir verwenden Cookies und ähnliche Technologien, um Ihr Erlebnis zu verbessern und relevante Inhalte anzuzeigen. Indem Sie auf „Alle akzeptieren“ klicken, stimmen Sie der Verwendung dieser Technologien zu. Sie können Ihre Auswahl jederzeit ändern.',
        'consent.reject': 'Alle ablehnen',
        'consent.accept': 'Alle akzeptieren',
        // Modal
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
        'hero.button_contact': 'Contact Us',
        // About Us Section
        'about.p1': 'Founded in Zurich with deep roots in Swiss banking tradition, BWAM (Banking & Wealth Asset Management) combines decades of financial expertise with a forward-thinking approach.',
        'about.p2': 'Our mission is to provide personalized, transparent, and reliable financial services to private individuals, businesses, and institutions. We believe in building long-term relationships based on trust and mutual success.',
        'about.p3': 'Located in the heart of Zurich\'s financial district, we are committed to upholding the highest standards of integrity and contributing positively to our community.',
        // Business Clients Section (#business-clients)
        'services.subtitle': 'Tailored financial solutions designed to help your business thrive, from startups to established corporations in the Zurich region.',
        'services.business.card1_title': 'Corporate Accounts',
        'services.business.card1_desc': 'Flexible business accounts with online banking, multi-currency options, and dedicated support.',
        'services.business.card2_title': 'Business Financing',
        'services.business.card2_desc': 'Access capital for growth, equipment purchase, or operational needs with our competitive loan and credit line options.',
        'services.business.card3_title': 'Cash Management',
        'services.business.card3_desc': 'Optimize your cash flow with our payment processing, collection, and liquidity management services.',
        // Institutional Clients Section (#institutional)
        'institutional.subtitle': 'Sophisticated investment management and advisory services for pension funds, foundations, family offices, and asset managers.',
        'institutional.card1_title': 'Asset Management',
        'institutional.card1_desc': 'Discretionary and advisory mandates across various asset classes, tailored to your institution\'s risk profile and objectives.',
        'institutional.card2_title': 'Custody & Execution',
        'institutional.card2_desc': 'Secure safekeeping of assets, efficient trade execution, and comprehensive reporting services.',
        // Private Client Subsections
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
         // Business Client Subsections (NEW)
        'corporate_accounts.intro': 'Streamline your business operations with our robust corporate accounts, designed for efficiency and growth in the Swiss market.',
        'corporate_accounts.feature1': 'Multi-currency capabilities for international business.',
        'corporate_accounts.feature2': 'Advanced online and mobile banking platform with user management.',
        'corporate_accounts.feature3': 'Integration options with accounting software.',
        'corporate_accounts.feature4': 'Dedicated relationship manager for personalized support.',
        'corporate_accounts.button_contact': 'Contact Sales',
        'business_financing.intro': 'Fuel your company\'s growth with flexible financing solutions tailored to your specific needs and industry.',
        'business_financing.option1_title': 'Term Loans',
        'business_financing.option1_desc': 'Structured loans for significant investments like equipment purchase or expansion projects.',
        'business_financing.option2_title': 'Lines of Credit',
        'business_financing.option2_desc': 'Flexible access to funds for managing working capital and short-term needs.',
        'cash_management.intro': 'Optimize your company\'s liquidity and streamline payment processes with our efficient cash management tools.',
        'cash_management.feature1': 'Automated payment processing (domestic and international).',
        'cash_management.feature2': 'Receivables management and collection services.',
        'cash_management.feature3': 'Liquidity solutions and forecasting tools.',
        'cash_management.feature4': 'Real-time reporting and account overview.',
        'cash_management.button_explore': 'Explore Tools',
        // News Section
        'news.title': 'News & Insights',
        'news.card1_title': 'Market Outlook Q3 2025',
        'news.card1_desc': 'Our analysis of current market trends and potential opportunities for investors.',
        'news.card2_title': 'Planning for a Secure Retirement',
        'news.card2_desc': 'Key considerations for building a robust pension plan in Switzerland.',
        'news.card3_title': 'Tips for Secure Digital Banking',
        'news.card3_desc': 'How to protect yourself while managing your finances online with BWAM.',
        'news.read_more': 'Read More',
        'news.more_news': 'More News',
        // Events Section
        'events.title': 'Events', // Changed title slightly
        'events.subtitle': 'Join us for insightful seminars and workshops.', // Shortened subtitle
        'events.featured_title': 'Featured Event: Investment Strategies 2025',
        'events.featured_date': 'Date: October 15, 2025',
        'events.featured_location': 'Location: BWAM Headquarters, Zurich',
        'events.button_register': 'Register Now',
        'events.form_placeholder': '(Event registration form will be here)', // Kept for fallback
        // Contact Section (Hidden)
        'contact_cta.title': 'Contact BWAM',
        'contact_cta.subtitle': 'Our advisors are ready to help you achieve your financial goals. Reach out today.',
        // Footer
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
        // Consent Banner
        'consent.message': 'We use cookies and similar technologies to enhance your experience and display relevant content. By clicking "Accept All," you agree to the use of these technologies. You can change your selection at any time.',
        'consent.reject': 'Reject All',
        'consent.accept': 'Accept All',
        // Modal
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
        console.error(`Language "${lang}" not found.`);
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
                if (key === 'page_title') document.title = txt; // Set page title
                else el.setAttribute(key.split('.')[0], txt); // Set ARIA attribute
            } else {
                // Set text content for regular elements, preserving child icons
                const icon = el.querySelector('i[data-lucide]');
                // Find the first text node that is not just whitespace
                const existingTextNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');

                if (icon && existingTextNode) {
                     // Update only the text node if icon exists
                     existingTextNode.textContent = ' ' + txt; // Add space before text
                } else if (icon) {
                     // Icon exists, but no text node, add text after icon
                     // Check if last child is already the icon to prevent adding text multiple times
                     if (el.lastChild !== icon) {
                        el.appendChild(document.createTextNode(' ' + txt));
                     } else {
                         // If icon is the last child, update the previous text node or add new one
                         const prevNode = icon.previousSibling;
                         if (prevNode && prevNode.nodeType === Node.TEXT_NODE) {
                             prevNode.textContent = ' ' + txt;
                         } else {
                             // Insert text before the icon if no preceding text node
                             el.insertBefore(document.createTextNode(' ' + txt), icon);
                         }
                     }
                } else {
                    // No icon, just set text content
                    el.textContent = txt;
                }
            }
        } else {
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
        console.warn("Could not save language preference.", e);
    }
    // Re-initialize Lucide icons after potential text changes affecting icons
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// --- Simple Hash-Based Page/Section Visibility ---
function handleHashChange() {
    const currentHash = window.location.hash.substring(1);
    console.log(`Hash changed to: #${currentHash}`);

    // Default sections to show on the 'homepage' view (empty hash or #home)
    const homeSections = ['home', 'about-us', 'business-clients', 'news', 'events']; // Added about-us and events here

    // Hide all main sections first
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });

    if (!currentHash || currentHash === 'home') {
        // Show all default homepage sections
        homeSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.classList.remove('hidden');
                console.log(`Showing homepage section: #${id}`);
            } else {
                console.warn(`Homepage section #${id} not found.`);
            }
        });
        // Ensure sections not part of home are hidden (redundant but safe)
        document.querySelectorAll('main > section:not(#home):not(#about-us):not(#business-clients):not(#news):not(#events)')
            .forEach(s => s.classList.add('hidden'));

    } else {
        // Show only the section matching the hash
        const sectionToShow = document.getElementById(currentHash);
        if (sectionToShow) {
            sectionToShow.classList.remove('hidden');
            console.log(`Showing specific section: #${currentHash}`);
        } else {
            // Fallback if hash is invalid - show default home sections
            console.warn(`Section for hash #${currentHash} not found, showing default home view.`);
            homeSections.forEach(id => {
                 const section = document.getElementById(id);
                 if (section) section.classList.remove('hidden');
            });
        }
    }
}


// --- User Identification Function (Simplified) ---
function handleSuccessfulLogin(userId, userEmail) {
    console.log(`User logged in (simulated): ${userId} (${userEmail || 'No email'})`);
}
window.handleSuccessfulLogin = handleSuccessfulLogin; // Make global

// --- Logout Function (Simplified) ---
function handleLogout() {
    const loggedInEmail = sessionStorage.getItem(LOGIN_STATUS_KEY);
    console.log(`Logging out user: ${loggedInEmail || 'Unknown'}`);
    sessionStorage.removeItem(LOGIN_STATUS_KEY);
    updateLoginUI(false);
    console.log("User logged out.");
}
window.handleLogout = handleLogout; // Make global

// --- Global UI Update Function ---
let updateLoginUI = () => { console.warn("updateLoginUI called early."); };

// --- Advisor Modal Functions ---
function openAdvisorModal() {
    const modal = document.getElementById('advisor-modal');
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    if (!modal || !overlay || !content) return;
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0'); overlay.classList.add('opacity-100');
        content.classList.remove('opacity-0', 'scale-95'); content.classList.add('opacity-100', 'scale-100');
    });
    const currentLang = document.documentElement.lang || 'de';
    setLanguage(currentLang);
}

function closeAdvisorModal() {
    const modal = document.getElementById('advisor-modal');
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
     if (!modal || !overlay || !content || modal.classList.contains('hidden')) return;
    overlay.classList.remove('opacity-100'); overlay.classList.add('opacity-0');
    content.classList.remove('opacity-100', 'scale-100'); content.classList.add('opacity-0', 'scale-95');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

// --- Scroll Animation Logic ---
function setupScrollAnimation() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
            // else entry.target.classList.remove('is-visible'); // Optional: Repeat animation
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('.fade-in-element').forEach(target => observer.observe(target));
}

// --- Scrolling Banker Animation ---
function handleBankerScroll() {
    const bankerIcon = document.getElementById('scroll-banker');
    if (!bankerIcon) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    // Prevent division by zero if docHeight equals winHeight
    const scrollPercent = (docHeight - winHeight > 0) ? scrollTop / (docHeight - winHeight) : 0;

    // Calculate max vertical movement (e.g., 80% of viewport height minus icon height and initial bottom offset)
    const iconHeight = bankerIcon.offsetHeight; // Get actual height
    const initialBottomOffset = 32; // Corresponds to 'bottom: 2rem' (1rem = 16px)
    // Ensure maxMove is not negative if window is very short
    const maxMove = Math.max(0, winHeight - iconHeight - initialBottomOffset - (winHeight * 0.1)); // Leave some margin at top
    const moveDistance = Math.min(maxMove, maxMove * scrollPercent); // Move up based on scroll %

    // Apply the transform to move the icon up from its initial bottom position
    bankerIcon.style.transform = `translateY(-${moveDistance}px)`;

    // Optional: Fade out near the top/bottom or based on scroll speed
    if (scrollPercent > 0.95 || scrollPercent < 0.05) {
        bankerIcon.style.opacity = '0.3';
    } else {
        bankerIcon.style.opacity = '0.8';
    }
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
    const contactCtaButton = document.getElementById('contact-cta-button');
    const advisorModal = document.getElementById('advisor-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalOverlay = document.getElementById('modal-overlay');
    const scrollBankerIcon = document.getElementById('scroll-banker'); // Get banker icon

    const CONSENT_STORAGE_KEY = window.CONSENT_STORAGE_KEY || 'bwam_consent_status';

    // --- Consent Banner Logic ---
    if (consentBanner && acceptBtn && rejectBtn) {
        let consentStatus = null;
        try { consentStatus = localStorage.getItem(CONSENT_STORAGE_KEY); }
        catch (e) { console.error("localStorage consent check failed.", e); }
        if (!consentStatus) {
            consentBanner.classList.remove('hidden');
            setTimeout(() => { consentBanner.style.transform = 'translateY(0)'; }, 100);
        } else { console.log(`Consent already set: ${consentStatus}.`); }
        acceptBtn.addEventListener('click', () => {
            try { localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted'); } catch (e) { console.error("localStorage save failed.", e); }
            consentBanner.style.transform = 'translateY(100%)'; setTimeout(() => { consentBanner.classList.add('hidden'); }, 300);
            console.log("Consent accepted."); // TODO: Init tracking
        });
        rejectBtn.addEventListener('click', () => {
            try { localStorage.setItem(CONSENT_STORAGE_KEY, 'rejected'); } catch (e) { console.error("localStorage save failed.", e); }
            consentBanner.style.transform = 'translateY(100%)'; setTimeout(() => { consentBanner.classList.add('hidden'); }, 300);
            console.log("Consent rejected.");
        });
    } else { console.warn("Consent banner elements missing."); }

    // --- Login Simulation Logic ---
    updateLoginUI = (isLoggedIn, email = '') => {
        const loginBtn = document.getElementById('login-button'); const form = document.getElementById('login-form');
        const statusDiv = document.getElementById('logged-in-status'); const emailSpan = document.getElementById('logged-in-email');
        const emailInput = document.getElementById('login-email');
        if (!loginBtn || !form || !statusDiv || !emailSpan || !emailInput) { console.warn("Login UI elements missing."); return; }
        if (isLoggedIn) { loginBtn.classList.add('hidden'); form.classList.add('hidden'); statusDiv.classList.remove('hidden'); statusDiv.classList.add('flex'); emailSpan.textContent = email; }
        else { loginBtn.classList.remove('hidden'); form.classList.add('hidden'); statusDiv.classList.add('hidden'); statusDiv.classList.remove('flex'); emailSpan.textContent = ''; emailInput.value = ''; }
    }
    if (loginButton && loginForm && loginEmailInput && simulateLoginButton && loggedInStatusDiv && loggedInEmailSpan && logoutButton) {
        const initialEmail = sessionStorage.getItem(LOGIN_STATUS_KEY); updateLoginUI(!!initialEmail, initialEmail || '');
        loginButton.addEventListener('click', () => { loginButton.classList.add('hidden'); loginForm.classList.remove('hidden'); loginEmailInput.focus(); });
        simulateLoginButton.addEventListener('click', () => {
            const email = loginEmailInput.value.trim();
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                sessionStorage.setItem(LOGIN_STATUS_KEY, email); updateLoginUI(true, email);
                if (typeof handleSuccessfulLogin === 'function') handleSuccessfulLogin(SIMULATED_USER_ID, email);
            } else { alert('Please enter a valid email address.'); }
        });
        logoutButton.addEventListener('click', () => { if (typeof handleLogout === 'function') handleLogout(); });
    } else { console.warn("Login elements missing."); }

    // --- Advisor Modal Listeners ---
    if (contactCtaButton && advisorModal && modalCloseButton && modalOverlay) {
        contactCtaButton.addEventListener('click', (e) => { e.preventDefault(); openAdvisorModal(); });
        modalCloseButton.addEventListener('click', closeAdvisorModal);
        modalOverlay.addEventListener('click', closeAdvisorModal);
        const modalContent = advisorModal.querySelector('#modal-content');
        if (modalContent) modalContent.addEventListener('click', (e) => e.stopPropagation());
        const connectButtons = advisorModal.querySelectorAll('[data-lang-key="modal.button_connect"]');
        connectButtons.forEach(button => button.addEventListener('click', (e) => {
            const name = e.target.closest('.text-center')?.querySelector('[data-lang-key$="_name"]')?.textContent || 'Advisor';
            alert(`Connecting with ${name}...`); closeAdvisorModal();
        }));
    } else { console.warn("Advisor modal elements missing."); }

    // --- Other Initializations ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuButton.setAttribute('aria-expanded', mobileMenu.classList.toggle('hidden'));
        });
    } else { console.warn("Mobile menu elements missing."); }
    mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('hidden')) { mobileMenu.classList.add('hidden'); mobileMenuButton?.setAttribute('aria-expanded', 'false'); }
        const targetId = link.getAttribute('href');
        if (targetId?.startsWith('#')) setTimeout(() => { document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }));
    langButtons.forEach(button => button.addEventListener('click', () => { const lang = button.getAttribute('data-lang'); if (lang) setLanguage(lang); }));
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    // --- Language & Initial View ---
    let preferredLang = 'de';
    try { const savedLang = localStorage.getItem('bwam_preferred_lang'); if (savedLang && translations[savedLang]) preferredLang = savedLang; }
    catch (e) { console.warn("Could not read lang preference.", e); }
    setLanguage(preferredLang); // Includes initial Lucide icon rendering
    handleHashChange(); // Show initial section(s)

    // --- Animations & Scroll Listeners ---
    setupScrollAnimation(); // Setup fade-in animations
    // Add scroll listener for banker icon if it exists
    if (scrollBankerIcon) {
        window.addEventListener('scroll', handleBankerScroll, { passive: true });
        handleBankerScroll(); // Set initial position
    }

    // Add hashchange listener AFTER initial setup
    window.addEventListener('hashchange', handleHashChange);

    console.log("BWAM Script Loaded (Visibility Fixed). Initial language:", preferredLang);

}); // End of DOMContentLoaded
