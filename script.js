// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Lucide Icons ---
    // Moved to the bottom script tag in HTML for potentially faster initial load
    // if (typeof lucide !== 'undefined') {
    //     lucide.createIcons();
    // } else {
    //     console.warn("Lucide icons library not loaded.");
    // }

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
    let currentSection = 'home'; // Track the currently visible static section

    // --- Helper Functions ---

    /**
     * Smoothly scrolls to a target element or vertical position.
     * @param {string|number} target - The selector of the target element or a Y-coordinate.
     */
    const smoothScrollTo = (target) => {
        let targetPosition = 0;
        if (typeof target === 'string') {
            const element = document.querySelector(target);
            if (element) {
                // Calculate position considering the sticky header height
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                targetPosition = window.scrollY + element.getBoundingClientRect().top - headerHeight - 10; // Small offset
            } else {
                console.warn(`Smooth scroll target not found: ${target}`);
                return; // Exit if target element doesn't exist
            }
        } else if (typeof target === 'number') {
            targetPosition = target;
        }

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };

    /**
     * Shows a specific main section and hides others.
     * Handles interaction with the React-controlled profile view.
     * @param {string} sectionId - The ID of the section to show (e.g., 'home', 'about-us').
     */
    const showSection = (sectionId) => {
        // If trying to show a static section, ensure React profile section is hidden
        if (sectionId !== 'profile' && reactProfileSection?.classList.contains('visible')) {
             // Let React handle hiding its section via changeView('main') triggered by popstate/link click
             console.log("Switching from profile view to static section:", sectionId);
        }

        // Hide all static sections first
        mainSections.forEach(section => {
            if (section.id && section.id !== sectionId) {
                section.classList.add('hidden');
            }
        });

        // Show the target static section
        const targetSection = document.getElementById(sectionId);
        if (targetSection && targetSection.classList.contains('main-section')) {
            targetSection.classList.remove('hidden');
            currentSection = sectionId; // Update tracked section
            // Trigger fade-in for elements within the newly shown section (if needed immediately)
             observeFadeInElements(targetSection.querySelectorAll('.fade-in-element'));
        } else if (sectionId !== 'profile') {
            console.warn(`Section with ID "${sectionId}" not found or not a main section.`);
            // Fallback: show the home section if the target is invalid
            showSection('home');
            history.replaceState(null, null, '#home'); // Update hash silently
        }
    };

    /**
     * Updates the text content of static HTML elements based on the current language.
     * Relies on `data-lang-key` attributes and the global `window.bwamTranslations`.
     * @param {string} lang - The language code ('en', 'de', etc.).
     */
    const updateStaticContentLanguage = (lang) => {
        if (!window.bwamTranslations || !window.bwamTranslations[lang]) {
            console.warn(`Translations for language "${lang}" not found.`);
            return;
        }
        const translations = window.bwamTranslations[lang];

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            const keys = key.split('.');
            let text = translations;
            let translationFound = true;

            try {
                keys.forEach(k => {
                    if (text[k] === undefined) {
                        throw new Error(`Key part "${k}" not found in key "${key}"`);
                    }
                    text = text[k];
                });
            } catch (e) {
                translationFound = false;
                // console.warn(`Translation key not found: ${key} for language ${lang}`);
                text = key; // Fallback to the key itself
            }

            if (typeof text === 'string') {
                // Handle specific attributes or innerText
                const isAriaLabel = element.hasAttribute('aria-label') && (key.startsWith('aria.') || key.endsWith('_label'));
                const isTitle = element.hasAttribute('title') && !isAriaLabel; // Prioritize aria-label if key suggests it
                const isPlaceholder = element.tagName === 'INPUT' && element.hasAttribute('placeholder');

                if (isAriaLabel) {
                    element.setAttribute('aria-label', text);
                } else if (isTitle) {
                    element.setAttribute('title', text);
                } else if (isPlaceholder) {
                     element.setAttribute('placeholder', text);
                } else {
                    // Update innerText, preserving child elements like icons
                    // Find the first text node and update it, or append if none exists
                    let textNode = null;
                    for(let node of element.childNodes) {
                        if(node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                            textNode = node;
                            break;
                        }
                    }
                    if (textNode) {
                        textNode.textContent = ' ' + text + ' '; // Add spaces for separation from icons
                    } else {
                        // If no text node, find where to insert (e.g., after an icon)
                        const icon = element.querySelector('i[data-lucide]');
                        if (icon) {
                             // Insert text after the icon
                             icon.insertAdjacentText('afterend', ' ' + text);
                        } else {
                             // Default: replace all content (might remove icons if not handled carefully)
                             element.textContent = text;
                        }
                    }
                }
            } else if (translationFound) {
                console.warn(`Translation for key "${key}" is not a string:`, text);
            }
        });

        // Re-initialize Lucide icons after text changes, as text nodes might be replaced
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    // Expose the language update function globally
    window.bwamScripts.updateStaticContentLanguage = updateStaticContentLanguage;


    // --- Navigation Handling ---

    // Handle clicks on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Check if it's an internal hash link
            if (href && href.startsWith('#')) {
                e.preventDefault(); // Prevent default jump
                const sectionId = href.substring(1);

                // If clicking a link to a static section
                if (document.getElementById(sectionId)?.classList.contains('main-section')) {
                    // If the profile section is visible, tell React to switch back to main view
                    if (reactProfileSection?.classList.contains('visible')) {
                        if (window.AppContext?.changeView) { // Check if React context function is available
                            window.AppContext.changeView('main'); // This should hide profile and show static wrapper
                        } else {
                            // Fallback if React context isn't ready/available (less ideal)
                            reactProfileSection.classList.remove('visible');
                            staticContentWrapper?.classList.remove('hidden-by-react');
                        }
                        // Need a slight delay to allow React to hide its section before showing the static one
                        setTimeout(() => {
                             showSection(sectionId);
                             smoothScrollTo(href);
                             history.pushState(null, null, href); // Update URL hash
                        }, 50); // Adjust delay if needed
                    } else {
                        // If profile section is already hidden, just show the target static section
                        showSection(sectionId);
                        smoothScrollTo(href);
                        history.pushState(null, null, href); // Update URL hash
                    }
                } else if (sectionId === 'profile') {
                    // Let React handle showing the profile via its handleViewProfile/changeView
                    // The React component's useEffect[auth.user] handles the history.pushState
                    console.log("Profile link clicked - React should handle view change.");
                    // We might manually trigger React's view change if needed, but it should happen via popstate or direct call
                } else {
                    // Handle links to non-section elements or external links if necessary
                    console.log(`Link to non-section element or external: ${href}`);
                    // Potentially just scroll if element exists but isn't a main section
                    if(document.querySelector(href)) {
                        smoothScrollTo(href);
                        history.pushState(null, null, href);
                    }
                }

                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    // Optional: Change icon back to menu if you have separate open/close icons
                }
            }
        });
    });

    // Handle browser back/forward buttons (popstate)
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        const sectionId = hash ? hash.substring(1) : 'home';

        // Let React handle the #profile hash via its own useEffect
        if (sectionId === 'profile') {
            // React's AppProvider useEffect should catch this and call changeView('profile')
            console.log("Popstate detected #profile - React should handle.");
        } else {
            // For static sections, ensure React profile is hidden and show the correct static section
            if (reactProfileSection?.classList.contains('visible')) {
                 // Assume React's changeView('main') was triggered by its popstate handler
                 console.log("Popstate switching from profile to static:", sectionId);
                 // Need a slight delay again
                 setTimeout(() => {
                    showSection(sectionId || 'home'); // Show target or default to home
                    // Optional: scroll to the section after it's shown
                    // smoothScrollTo(hash || '#home');
                 }, 50);
            } else {
                 showSection(sectionId || 'home');
                 // Optional: scroll to the section after it's shown
                 // smoothScrollTo(hash || '#home');
            }
        }
    });

    // Initial page load: Show section based on hash or default to 'home'
    const initialHash = window.location.hash;
    const initialSectionId = initialHash ? initialHash.substring(1) : 'home';

    // Let React handle the initial load if hash is #profile
    if (initialSectionId !== 'profile') {
        showSection(initialSectionId);
        // Scroll to the section on initial load if there's a hash
        if (initialHash && initialSectionId !== 'home') {
            // Use setTimeout to ensure the layout is stable after initial rendering
            setTimeout(() => smoothScrollTo(initialHash), 100);
        }
    } // React's useEffect in AppProvider handles the #profile case


    // --- Mobile Menu Toggle ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            // Optional: Toggle icon between menu and X if using separate icons
        });
    }

    // --- Consent Banner Logic ---
    const consentStatus = localStorage.getItem(window.CONSENT_STORAGE_KEY);

    if (!consentStatus && consentBanner) { // Only show if status is not set
        // Use setTimeout to allow CSS transition to work after initial render
        setTimeout(() => {
            consentBanner.classList.remove('hidden');
            consentBanner.classList.add('show'); // Add class to trigger transition
        }, 500); // Delay showing the banner slightly
    }

    const handleConsent = (status) => {
        localStorage.setItem(window.CONSENT_STORAGE_KEY, status); // 'accepted' or 'rejected'
        if (consentBanner) {
            consentBanner.classList.remove('show');
            // Optionally add a class to fade out before hiding
            setTimeout(() => consentBanner.classList.add('hidden'), 500); // Match transition duration
        }
        console.log(`Consent status set to: ${status}`);
        // Here you would typically initialize analytics based on consentStatus='accepted'
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
        // Trigger animations by adding 'show' class after a tiny delay
        setTimeout(() => advisorModal.classList.add('show'), 10);
        if (typeof window.bwamDataLayer?.trackModalOpen === 'function') {
             window.bwamDataLayer.trackModalOpen('advisor');
        }
    };

    const closeModal = () => {
        if (!advisorModal) return;
        advisorModal.classList.remove('show'); // Remove 'show' to trigger exit animations
        document.body.style.overflow = ''; // Restore background scrolling
        // Wait for animations to finish before hiding
        setTimeout(() => advisorModal.classList.add('hidden'), 300); // Adjust timing based on CSS transition duration
    };

    // Open modal when hero contact button is clicked
    if (contactCtaButton) {
        contactCtaButton.addEventListener('click', openModal);
    }
    // Close modal triggers
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal); // Close on overlay click
    }
    // Close modal with Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && advisorModal && !advisorModal.classList.contains('hidden')) {
            closeModal();
        }
    });


    // --- Fade-in Animations on Scroll ---
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
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
            // Only observe if not already visible (e.g., on initial load for elements already in view)
            if (!el.classList.contains('is-visible')) {
                 fadeInObserver.observe(el);
            } else {
                 // If already marked visible (e.g., by React), ensure styles apply immediately
                 el.style.opacity = 1;
                 el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial observation run
    observeFadeInElements(fadeInElements);


    // --- Scrolling Banker Icon Logic ---
    let lastScrollTop = 0;
    const scrollThreshold = 300; // Pixels from top to show the icon

    const handleScrollBanker = () => {
        if (!scrollBanker) return;
        let st = window.pageYOffset || document.documentElement.scrollTop;

        if (st > scrollThreshold) {
            // Show icon if scrolled down enough
            scrollBanker.classList.add('visible');
        } else {
            // Hide icon if near the top
            scrollBanker.classList.remove('visible');
        }

        // Optional: Hide on scroll up, show on scroll down (more complex)
        // if (st > lastScrollTop && st > scrollThreshold){
        //    scrollBanker.classList.add('visible'); // Show on scroll down
        // } else {
        //    scrollBanker.classList.remove('visible'); // Hide on scroll up or near top
        // }
        // lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScrollBanker, { passive: true });
    // Initial check in case the page loads already scrolled down
    handleScrollBanker();

    // --- Initial Language Update ---
    // Update static content to match the initial language set by React/HTML tag
    const initialLang = document.documentElement.lang || 'de';
    updateStaticContentLanguage(initialLang);

}); // End DOMContentLoaded
