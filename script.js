/**
 * BWAM Frontend Script (v5 - Static Version)
 *
 * Handles:
 * - Language switching for static elements (EN/DE) using localStorage.
 * - Mobile menu toggle.
 * - Consent banner logic.
 * - Advisor modal logic.
 * - Scroll-based animations (fade-in, scroll banker visibility).
 * - Navigation link handling (smooth scroll to sections).
 * - Lucide icon initialization.
 *
 * Works with index.html that uses static elements for login/language.
 * NO LONGER relies on React components.
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration ---
    const DEFAULT_HOMEPAGE_SECTIONS = ['home', 'about-us', 'events', 'news']; // Sections visible on the main landing page
    const SCROLL_OFFSET_FOR_NAV = 80; // Adjust px offset below sticky header for scroll-to
    const CONSENT_STORAGE_KEY = window.CONSENT_STORAGE_KEY || 'bwam_consent_status'; // Use key defined in HTML
    const LANG_STORAGE_KEY = 'bwam_lang'; // Key for storing selected language

    // --- Cache DOM Elements ---
    const htmlElement = document.documentElement;
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-section-link');
    const mainSectionsNodeList = document.querySelectorAll('.main-section');
    const mainSections = Array.from(mainSectionsNodeList);
    const staticContentWrapper = document.getElementById('static-content-wrapper');
    // const reactProfileSection = document.getElementById('react-profile-section'); // Removed - No longer exists
    const consentBanner = document.getElementById('consent-banner');
    const consentAcceptButton = document.getElementById('consent-accept');
    const consentRejectButton = document.getElementById('consent-reject');
    const contactCtaButton = document.getElementById('contact-cta-button');
    const advisorModal = document.getElementById('advisor-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseButton = document.getElementById('modal-close-button');
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    const scrollBanker = document.getElementById('scroll-banker');
    const langEnButton = document.getElementById('lang-en');
    const langDeButton = document.getElementById('lang-de');
    const langButtons = document.querySelectorAll('.lang-switch-button'); // Select all language buttons
    const yearSpan = document.getElementById('current-year');
    const footerContactLink = document.getElementById('footer-contact-link');
    const cookieSettingsLink = document.getElementById('cookie-settings-link');

    // --- State ---
    let currentStaticSectionId = 'home'; // Track the currently visible *primary* static section ID
    let isConsentChecked = false; // Track if consent has been handled this session
    let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || htmlElement.lang || 'en'; // Get initial language

    // --- Helper Functions ---

    /**
     * Smoothly scrolls to a target element or vertical position.
     */
    const smoothScrollTo = (target) => {
        let targetPosition = 0;
        const headerHeight = document.querySelector('header')?.offsetHeight || 70;

        if (typeof target === 'string' && target.startsWith('#')) {
            const element = document.querySelector(target);
            if (element) {
                targetPosition = window.scrollY + element.getBoundingClientRect().top - headerHeight - (SCROLL_OFFSET_FOR_NAV - headerHeight);
            } else {
                console.warn(`Smooth scroll target not found: ${target}`); return;
            }
        } else if (typeof target === 'number') {
            targetPosition = target;
        } else {
            console.warn(`Invalid smooth scroll target: ${target}`); return;
        }
        window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
    };

    /**
     * Sets up IntersectionObserver for fade-in elements.
     */
    const observeFadeInElements = (elements) => {
        const observerOptions = { threshold: 0.1 };
        const intersectionCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };
        const fadeInObserver = new IntersectionObserver(intersectionCallback, observerOptions);
        elements.forEach(el => {
             if (!el.classList.contains('is-visible')) { fadeInObserver.observe(el); }
             else { el.style.opacity = '1'; el.style.transform = 'translateY(0)';} // Ensure already visible are styled
        });
    };

    /**
     * Shows the relevant static section(s) and hides others.
     */
    const showStaticSection = (sectionIdToShow) => {
        const isHomepageTarget = DEFAULT_HOMEPAGE_SECTIONS.includes(sectionIdToShow) || sectionIdToShow === '' || sectionIdToShow === 'home';
        const targetId = isHomepageTarget ? 'home' : sectionIdToShow;
        console.log(`Showing static section. Target: ${targetId}, IsHomepage: ${isHomepageTarget}`);

        let sectionFound = false;
        mainSections.forEach(section => {
            if (!section.id) return;
            let shouldShow = isHomepageTarget ? DEFAULT_HOMEPAGE_SECTIONS.includes(section.id) : (section.id === targetId);

            if (shouldShow) {
                section.classList.remove('hidden');
                observeFadeInElements(section.querySelectorAll('.fade-in-element')); // Observe elements within shown section
                if (section.id === targetId) sectionFound = true;
            } else {
                section.classList.add('hidden');
            }
        });

        if (!isHomepageTarget && !sectionFound) {
            console.warn(`Static section "${targetId}" not found. Defaulting to home.`);
            showStaticSection('home'); // Default to home view
            currentStaticSectionId = 'home';
        } else {
             currentStaticSectionId = targetId;
        }
        // Track section view
        if (typeof window.bwamDataLayer?.trackSectionView === 'function') {
            window.bwamDataLayer.trackSectionView(currentStaticSectionId);
        }
    };

    /**
     * Updates static content text based on the selected language.
     */
    const updateStaticContentLanguage = (lang) => {
        if (!window.bwamTranslations || !window.bwamTranslations[lang]) {
            console.warn(`Translations for language "${lang}" not found.`); return;
        }
        const translations = window.bwamTranslations[lang];
        const getTranslation = (key) => key.split('.').reduce((obj, k) => obj && obj[k], translations);

        // Update text content using data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            const translation = getTranslation(key);
            if (translation && typeof translation === 'string') {
                // Simple text update for now, assumes elements don't contain complex children like icons
                element.textContent = translation;
            }
        });

        // Update attributes like aria-label, title, placeholder
        const attributeMappings = {
            'data-lang-key-aria': 'aria-label',
            'data-lang-key-title': 'title',
            'data-lang-key-placeholder': 'placeholder',
        };
        for (const dataAttr in attributeMappings) {
            document.querySelectorAll(`[${dataAttr}]`).forEach(element => {
                const key = element.getAttribute(dataAttr);
                const translation = getTranslation(key);
                const targetAttr = attributeMappings[dataAttr];
                if (translation && typeof translation === 'string') {
                    element.setAttribute(targetAttr, translation);
                } else {
                    element.removeAttribute(targetAttr); // Remove if no translation
                }
            });
        }

        // Update language button active state and labels/titles
        langButtons.forEach(button => {
            const buttonLang = button.dataset.lang;
            if (buttonLang === lang) {
                button.classList.add('bg-brand-red', 'text-white'); // Active state styles
                button.classList.remove('text-gray-600', 'hover:bg-gray-200');
            } else {
                button.classList.remove('bg-brand-red', 'text-white');
                button.classList.add('text-gray-600', 'hover:bg-gray-200');
            }
            // Update aria-label and title for accessibility
            const ariaKey = `aria.set_lang_${buttonLang}`;
            const titleKey = `aria.set_lang_${buttonLang}`; // Use same key for title
            const ariaLabel = getTranslation(ariaKey);
            const titleText = getTranslation(titleKey);
            if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
            if (titleText) button.setAttribute('title', titleText);
        });

        // Re-initialize Lucide icons as text changes might affect them
        if (typeof lucide !== 'undefined') {
            try { lucide.createIcons(); } catch (e) { console.error("Lucide re-init error:", e); }
        }
    };
    // Expose globally (though not strictly needed if called internally)
    window.bwamScripts.updateStaticContentLanguage = updateStaticContentLanguage;

    /**
     * Sets the application language.
     */
    const setLanguage = (lang) => {
        if (lang !== currentLang && window.bwamTranslations[lang]) {
            console.log(`Setting language to: ${lang}`);
            currentLang = lang;
            htmlElement.lang = lang; // Update HTML lang attribute
            localStorage.setItem(LANG_STORAGE_KEY, lang); // Store preference
            updateStaticContentLanguage(lang); // Update all text/attributes
        }
    };

    /**
     * Handles SPA navigation based on URL hash for static sections.
     */
    const handleNavigation = (hash) => {
        const sectionId = hash ? hash.substring(1) : 'home';
        console.log(`Handling navigation for hash: "${hash}", sectionId: "${sectionId}"`);

        // Show the target static section (or homepage sections)
        showStaticSection(sectionId);
        // Scroll to the section (use timeout to allow rendering)
        setTimeout(() => smoothScrollTo(`#${currentStaticSectionId}`), 50);

        // Update URL only if necessary (avoid redundant pushes)
        const expectedHash = `#${currentStaticSectionId}`;
        if(window.location.hash !== expectedHash) {
             // Use replaceState for initial load or corrections, pushState for user clicks
             // Since this is called from popstate too, replaceState might be safer here
             // to avoid polluting history on back/forward.
             history.replaceState({ section: currentStaticSectionId }, '', expectedHash);
        }

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton?.setAttribute('aria-expanded', 'false');
        }
    };

    // --- Event Listeners ---

    // Language Buttons
    if (langEnButton) langEnButton.addEventListener('click', () => setLanguage('en'));
    if (langDeButton) langDeButton.addEventListener('click', () => setLanguage('de'));

    // Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSectionId = href.substring(1);

                // Track Navigation Click
                if (typeof window.bwamDataLayer?.trackNavigationClick === 'function') {
                    window.bwamDataLayer.trackNavigationClick({
                        link_url: href,
                        link_text: link.textContent?.trim() || 'N/A',
                        link_location: link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'body'
                    });
                }

                // Update history and handle navigation
                if (window.location.hash !== href) {
                    history.pushState({ section: targetSectionId }, '', href);
                    handleNavigation(href);
                } else {
                    // Already on the section, just scroll smoothly to top of it
                    smoothScrollTo(href);
                }
            }
            // Allow default behavior for external links
        });
    });

    // Browser Back/Forward
    window.addEventListener('popstate', (event) => {
        console.log("Popstate event:", window.location.hash);
        handleNavigation(window.location.hash || '#home'); // Handle empty hash as home
    });

    // Mobile Menu Toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
             // Track interaction
             if (typeof window.bwamDataLayer?.trackInteraction === 'function') {
                 window.bwamDataLayer.trackInteraction({ element_text: !isExpanded ? 'Open Menu' : 'Close Menu', element_location: 'header', element_id: 'mobile-menu-button' });
             }
        });
    }

    // Consent Banner Logic
    const handleConsent = (status) => { /* ... (Keep consent handling logic) ... */ };
    const initialConsentStatus = localStorage.getItem(CONSENT_STORAGE_KEY);
    const showConsentBanner = () => { // Expose function to show banner
        if (consentBanner) {
             consentBanner.classList.remove('hidden');
             void consentBanner.offsetWidth; // Reflow
             consentBanner.classList.add('show');
         }
    };
    window.showConsentBanner = showConsentBanner; // Make globally available

    if (!initialConsentStatus && consentBanner) { setTimeout(showConsentBanner, 500); }
    else if (initialConsentStatus) { isConsentChecked = true; }
    if (consentAcceptButton) consentAcceptButton.addEventListener('click', () => handleConsent('accepted'));
    if (consentRejectButton) consentRejectButton.addEventListener('click', () => handleConsent('rejected'));
    if (cookieSettingsLink) cookieSettingsLink.addEventListener('click', (e) => { e.preventDefault(); showConsentBanner(); });

    // Advisor Modal Logic
    const openModal = () => { /* ... (Keep modal open logic) ... */ };
    const closeModal = () => { /* ... (Keep modal close logic) ... */ };
    window.openModal = openModal; // Expose globally if needed by other scripts/inline handlers

    if (contactCtaButton) contactCtaButton.addEventListener('click', openModal);
    if (modalCloseButton) modalCloseButton.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); }); // Close only on overlay click
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && advisorModal && !advisorModal.classList.contains('hidden')) closeModal(); });
    if (footerContactLink) footerContactLink.addEventListener('click', (e) => { e.preventDefault(); openModal(); });


    // Scrolling Banker Icon Logic
    const handleScrollBanker = () => { /* ... (Keep scroll banker logic) ... */ };
    window.addEventListener('scroll', handleScrollBanker, { passive: true });

    // --- Initialization ---
    console.log("Running Initializations...");

    // Set initial language based on stored pref or HTML tag
    setLanguage(currentLang); // This calls updateStaticContentLanguage internally

    // Initial setup for fade-in elements
    observeFadeInElements(fadeInElements);

    // Initial check for scroll banker visibility
    handleScrollBanker();

    // Set footer year
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Initial page load: Handle navigation based on the initial hash AFTER setting language
    setTimeout(() => {
        console.log("Initial page navigation check. Hash:", window.location.hash);
        handleNavigation(window.location.hash); // Handle initial hash after setup
        // Track initial page view
        if (typeof window.bwamDataLayer?.trackPageView === 'function') {
            window.bwamDataLayer.trackPageView({
                pagePath: window.location.pathname + window.location.hash,
                pageTitle: document.title,
                language: currentLang
            });
        }
    }, 50); // Small delay to ensure language is set first

    // Initialize Lucide icons last, after potential text changes
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            try { lucide.createIcons(); console.log("Lucide icons initialized."); }
            catch (e) { console.error("Lucide final init error:", e); }
        }
    }, 100);


    console.log("BWAM Static Script Initialized.");

}); // End DOMContentLoaded
