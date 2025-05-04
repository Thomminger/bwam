// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Cache DOM Elements ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-section-link'); // Includes header, footer, and body links
    const mainSections = document.querySelectorAll('.main-section');
    const staticContentWrapper = document.getElementById('static-content-wrapper');
    const reactProfileSection = document.getElementById('react-profile-section');
    const consentBanner = document.getElementById('consent-banner');
    const consentAcceptButton = document.getElementById('consent-accept');
    const consentRejectButton = document.getElementById('consent-reject');
    const contactCtaButton = document.getElementById('contact-cta-button'); // Hero contact button
    const advisorModal = document.getElementById('advisor-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalCloseButton = document.getElementById('modal-close-button');
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    const scrollBanker = document.getElementById('scroll-banker');
    const logoLink = document.getElementById('logo-link');

    // --- State ---
    let currentStaticSectionId = 'home'; // Track the currently visible static section ID

    // --- Helper Functions ---

    /**
     * Smoothly scrolls to a target element or vertical position.
     * @param {string|number} target - The selector of the target element or a Y-coordinate.
     */
    const smoothScrollTo = (target) => {
        let targetPosition = 0;
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;

        if (typeof target === 'string') {
            const element = document.querySelector(target);
            if (element) {
                targetPosition = window.scrollY + element.getBoundingClientRect().top - headerHeight - 20; // Increased offset slightly
            } else {
                console.warn(`Smooth scroll target not found: ${target}`);
                return; // Exit if target element doesn't exist
            }
        } else if (typeof target === 'number') {
            targetPosition = target;
        }

        window.scrollTo({
            top: Math.max(0, targetPosition), // Ensure not scrolling to negative position
            behavior: 'smooth'
        });
    };

    /**
     * Shows a specific static main section and hides others.
     * Does NOT interact with React visibility directly; React handles its own section.
     * @param {string} sectionId - The ID of the static section to show (e.g., 'home', 'about-us').
     */
    const showStaticSection = (sectionId) => {
        let sectionFound = false;
        mainSections.forEach(section => {
            if (section.id && section.id === sectionId) {
                section.classList.remove('hidden');
                sectionFound = true;
                currentStaticSectionId = sectionId; // Update tracked section
                // Trigger fade-in for elements within the newly shown section
                observeFadeInElements(section.querySelectorAll('.fade-in-element'));
            } else if (section.id) {
                section.classList.add('hidden');
            }
        });

        if (!sectionFound) {
            console.warn(`Static section with ID "${sectionId}" not found.`);
            // Fallback: Show the home section if the target is invalid
            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.classList.remove('hidden');
                currentStaticSectionId = 'home';
                observeFadeInElements(homeSection.querySelectorAll('.fade-in-element'));
            }
        }
    };

    /**
     * Updates the text content and specific attributes of static HTML elements based on the current language.
     * Relies on `data-lang-key`, `data-lang-key-*` attributes and the global `window.bwamTranslations`.
     * Targets specific `.translatable-text` spans where necessary.
     * @param {string} lang - The language code ('en', 'de', etc.).
     */
    const updateStaticContentLanguage = (lang) => {
        if (!window.bwamTranslations || !window.bwamTranslations[lang]) {
            console.warn(`Translations for language "${lang}" not found.`);
            return;
        }
        const translations = window.bwamTranslations[lang];

        // Helper to get nested translation value
        const getTranslation = (key) => {
            const keys = key.split('.');
            let text = translations;
            try {
                keys.forEach(k => {
                    if (text[k] === undefined) {
                        throw new Error(`Key part "${k}" not found in key "${key}"`);
                    }
                    text = text[k];
                });
                return typeof text === 'string' ? text : null; // Return only if string
            } catch (e) {
                console.warn(`Translation key not found: ${key} for language ${lang}`);
                return null; // Return null if key not found
            }
        };

        // --- Update Text Content ---
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            const translation = getTranslation(key);

            if (translation !== null) {
                // Check if the element itself is a designated translatable span
                if (element.classList.contains('translatable-text')) {
                    element.textContent = translation;
                } else {
                    // Otherwise, look for a child translatable span
                    const translatableSpan = element.querySelector('.translatable-text[data-lang-key="' + key + '"]');
                    if (translatableSpan) {
                        translatableSpan.textContent = translation;
                    } else if (element.children.length === 0 || element.closest('ul, div.grid')) {
                         // If no children (likely simple text) OR it's a list item/grid item where direct update is safe
                         // Avoid replacing content of complex elements like nav dropdown buttons entirely
                        element.textContent = translation;
                    } else {
                         // Fallback for elements with children but no specific span (might be risky)
                         // Attempt to replace only the first text node if it exists
                         let replaced = false;
                         for (let node of element.childNodes) {
                             if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                                 node.textContent = translation;
                                 replaced = true;
                                 break;
                             }
                         }
                         if (!replaced) {
                             console.warn(`Could not find specific text node to update for key "${key}" in element:`, element);
                         }
                    }
                }
            }
        });

        // --- Update Attributes (aria-label, title, placeholder) ---
        document.querySelectorAll('[data-lang-key-aria]').forEach(element => {
            const key = element.dataset.langKeyAria;
            const translation = getTranslation(key);
            if (translation !== null) element.setAttribute('aria-label', translation);
        });
        document.querySelectorAll('[data-lang-key-title]').forEach(element => {
            const key = element.dataset.langKeyTitle;
            const translation = getTranslation(key);
            if (translation !== null) element.setAttribute('title', translation);
        });
         document.querySelectorAll('[data-lang-key-placeholder]').forEach(element => {
            const key = element.dataset.langKeyPlaceholder;
            const translation = getTranslation(key);
            if (translation !== null) element.setAttribute('placeholder', translation);
        });


        // Re-initialize Lucide icons after text changes, as icons might be inside updated elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    // Expose the language update function globally for React to call
    window.bwamScripts.updateStaticContentLanguage = updateStaticContentLanguage;


    // --- Navigation Handling ---

    // Function to handle view switching logic
    const handleNavigation = (hash) => {
        const sectionId = hash ? hash.substring(1) : 'home';
        const isProfileTarget = (sectionId === 'profile');
        const isStaticTarget = document.getElementById(sectionId)?.classList.contains('main-section');

        // Get current view state from React if possible (via exposed context)
        const currentReactView = window.AppContext?.view || (reactProfileSection?.classList.contains('visible') ? 'profile' : 'main');

        console.log(`Navigating. Hash: ${hash}, Target Section ID: ${sectionId}, Is Profile Target: ${isProfileTarget}, Is Static Target: ${isStaticTarget}, Current React View: ${currentReactView}`);

        if (isProfileTarget) {
            // Target is #profile
            // Let React handle this. It should check login status and call changeView('profile') or redirect.
            // If React context is available, explicitly tell it to change view.
             if (window.AppContext?.changeView) {
                 window.AppContext.changeView('profile'); // React handles showing profile/hiding static
             } else {
                 console.warn("React AppContext.changeView not available to handle #profile navigation.");
                 // As a fallback (less ideal), manually manage visibility if React isn't ready
                 // This assumes the user *should* see the profile (e.g., they are logged in)
                 // staticContentWrapper?.classList.add('hidden-by-react');
                 // reactProfileSection?.classList.add('visible');
             }
        } else if (isStaticTarget) {
            // Target is a valid static section
            // If React profile is currently visible, tell React to switch back to main
            if (currentReactView === 'profile' && window.AppContext?.changeView) {
                 window.AppContext.changeView('main'); // React hides profile/shows static wrapper
                 // Need a delay for React render before showing the specific static section
                 setTimeout(() => {
                     showStaticSection(sectionId);
                     smoothScrollTo(hash);
                 }, 50); // Adjust delay if needed
            } else {
                 // React profile is not visible, just show the static section
                 staticContentWrapper?.classList.remove('hidden-by-react'); // Ensure static wrapper is visible
                 reactProfileSection?.classList.remove('visible'); // Ensure profile section is hidden
                 showStaticSection(sectionId);
                 smoothScrollTo(hash);
            }
        } else {
            // Target is invalid or not a main section (e.g., #, #nonexistent)
            // Default to showing the home section
            console.log(`Invalid or non-main section target: "${sectionId}". Defaulting to home.`);
            if (currentReactView === 'profile' && window.AppContext?.changeView) {
                window.AppContext.changeView('main');
                setTimeout(() => {
                    showStaticSection('home');
                    smoothScrollTo('#home');
                }, 50);
            } else {
                staticContentWrapper?.classList.remove('hidden-by-react');
                reactProfileSection?.classList.remove('visible');
                showStaticSection('home');
                smoothScrollTo('#home');
            }
            // Update hash to #home if it wasn't already
            if (window.location.hash !== '#home') {
                history.replaceState(null, null, '#home'); // Use replaceState to avoid polluting history
            }
        }

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton?.setAttribute('aria-expanded', 'false');
        }
    };


    // Handle clicks on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault(); // Prevent default jump
                const currentHash = window.location.hash;
                // Only push state if the hash is actually changing
                if (href !== currentHash) {
                    history.pushState({ section: href.substring(1) }, null, href); // Push new state
                }
                handleNavigation(href); // Handle showing the section/view
            }
        });
    });

    // Handle browser back/forward buttons (popstate)
    window.addEventListener('popstate', (event) => {
        console.log("Popstate event triggered. New hash:", window.location.hash);
        handleNavigation(window.location.hash);
    });

    // Initial page load: Handle navigation based on the initial hash
    console.log("Initial page load. Hash:", window.location.hash);
    // Let React handle the initial #profile check via its useEffect.
    // For other hashes, handleNavigation will show the correct static section.
    // If React determines user isn't logged in for #profile, it should redirect to #home, triggering popstate/handleNavigation again.
    handleNavigation(window.location.hash);


    // --- Mobile Menu Toggle ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded)); // Use String()
        });
    }

    // --- Consent Banner Logic ---
    const consentStatus = localStorage.getItem(window.CONSENT_STORAGE_KEY);

    if (!consentStatus && consentBanner) { // Only show if status is not set
        setTimeout(() => {
            consentBanner.classList.remove('hidden');
            consentBanner.classList.add('show'); // Add class to trigger transition
        }, 500);
    }

    const handleConsent = (status) => {
        localStorage.setItem(window.CONSENT_STORAGE_KEY, status); // 'accepted' or 'rejected'
        if (consentBanner) {
            consentBanner.classList.remove('show');
            setTimeout(() => consentBanner.classList.add('hidden'), 500); // Match transition duration
        }
        console.log(`Consent status set to: ${status}`);
        if (status === 'accepted' && typeof window.bwamDataLayer?.initializeTracking === 'function') {
             window.bwamDataLayer.initializeTracking();
        }
    };

    if (consentAcceptButton) {
        consentAcceptButton.addEventListener('click', () => handleConsent('accepted'));
    }
    if (consentRejectButton) {
        consentRejectButton.addEventListener('click', () => handleConsent('rejected'));
    }

    // --- Advisor Modal Logic ---
    const openModal = () => {
        if (!advisorModal) return;
        advisorModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        setTimeout(() => advisorModal.classList.add('show'), 10);
        if (typeof window.bwamDataLayer?.trackModalOpen === 'function') {
             window.bwamDataLayer.trackModalOpen('advisor');
        }
    };

    const closeModal = () => {
        if (!advisorModal) return;
        advisorModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore background scrolling
        setTimeout(() => advisorModal.classList.add('hidden'), 300); // Match CSS transition
    };

    if (contactCtaButton) {
        contactCtaButton.addEventListener('click', openModal);
    }
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && advisorModal && !advisorModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // --- Fade-in Animations on Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% visible
    };

    const intersectionCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const fadeInObserver = new IntersectionObserver(intersectionCallback, observerOptions);

    const observeFadeInElements = (elements) => {
        elements.forEach(el => {
            if (!el.classList.contains('is-visible')) {
                 fadeInObserver.observe(el);
            } else {
                 // Ensure styles apply immediately if already marked visible
                 el.style.opacity = 1;
                 el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial observation run for elements potentially visible on load
    observeFadeInElements(fadeInElements);

    // --- Scrolling Banker Icon Logic ---
    const scrollThreshold = 300; // Pixels from top to show the icon

    const handleScrollBanker = () => {
        if (!scrollBanker) return;
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > scrollThreshold) {
            scrollBanker.classList.add('visible');
        } else {
            scrollBanker.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScrollBanker, { passive: true });
    handleScrollBanker(); // Initial check

    // --- Initial Language Update ---
    // Update static content based on the initial HTML lang attribute
    const initialLang = document.documentElement.lang || 'de';
    console.log(`Initial language detected: ${initialLang}. Updating static content.`);
    updateStaticContentLanguage(initialLang);

    // Set footer year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded
