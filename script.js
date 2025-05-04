/**
 * BWAM Frontend Script (v3 - For Enhanced React Integration)
 *
 * Handles:
 * - Language switching for non-React elements (triggered by React)
 * - Mobile menu toggle
 * - Desktop dropdowns (e.g., Private Clients)
 * - Consent banner logic
 * - Advisor modal logic
 * - Scroll-based animations (fade-in, scroll banker)
 * - Navigation link handling (smooth scroll, section visibility, hiding React profile)
 * - Lucide icon initialization (called from HTML)
 *
 * Relies on React component in HTML for:
 * - Login/Logout state and UI in header
 * - Profile dropdown display and interaction
 * - Language state management and header language buttons
 * - Rendering of the profile page content (#react-profile-section)
 * - Showing/hiding static content vs profile section (#static-content-wrapper vs #react-profile-section)
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State & Configuration ---
    let currentLang = document.documentElement.lang || 'de'; // Get initial language from HTML

    // --- Selectors ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const consentBanner = document.getElementById('consent-banner');
    const consentAcceptButton = document.getElementById('consent-accept');
    const consentRejectButton = document.getElementById('consent-reject');
    const advisorModal = document.getElementById('advisor-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalCloseButton = document.getElementById('modal-close-button');
    const contactCtaButton = document.getElementById('contact-cta-button'); // Button to open modal
    const navLinks = document.querySelectorAll('.nav-section-link'); // Links for sections (nav, footer, cards)
    const dropdownToggles = document.querySelectorAll('header .group > button.nav-link'); // Desktop dropdown toggles
    const scrollBanker = document.getElementById('scroll-banker');
    const fadeElements = document.querySelectorAll('.fade-in-element');
    const staticContentWrapper = document.getElementById('static-content-wrapper');
    const reactProfileSection = document.getElementById('react-profile-section');

    // --- Language Handling ---

    /**
     * Updates text content of static elements based on the selected language.
     * Called by the React component when the language changes.
     * @param {string} lang - The new language code ('en' or 'de').
     */
    function updateStaticContentLanguage(lang) {
        console.log(`Updating static content language to: ${lang}`);
        // Use translations embedded in HTML by React
        const langData = window.bwamTranslations ? window.bwamTranslations[lang] : null;

        if (!langData) {
            console.error(`Translations not found for language: ${lang}. Make sure 'window.bwamTranslations' is populated.`);
            return;
        }
        currentLang = lang; // Update script's current language knowledge

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            // Exclude elements within the React-controlled areas
            if (element.closest('#react-profile-header') || element.closest('#react-profile-section')) {
                return;
            }

            const key = element.getAttribute('data-lang-key');
            const keys = key.split('.');
            let text = langData;
            try {
                keys.forEach(k => {
                    if (text && typeof text === 'object' && k in text) {
                        text = text[k];
                    } else {
                        throw new Error(`Key part "${k}" not found in ${key}`);
                    }
                });

                if (typeof text === 'string') {
                    // Update appropriate attribute or text content
                    if (element.hasAttribute('aria-label') && key.startsWith('aria.')) {
                         element.setAttribute('aria-label', text);
                    } else if (element.hasAttribute('title') && key.startsWith('aria.')) {
                         element.title = text;
                    } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        if (element.placeholder !== undefined) element.placeholder = text;
                    } else if (element.dataset.consentText) {
                        element.textContent = text;
                    }
                     else {
                        // Update text content, trying to preserve icons
                        const iconElement = element.querySelector('i[data-lucide]');
                        if (iconElement) {
                            let textNode = null;
                            for (let node of element.childNodes) {
                                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                                    textNode = node; break;
                                }
                            }
                            if (textNode) { textNode.textContent = ` ${text} `; }
                            else { element.appendChild(document.createTextNode(` ${text}`)); }
                        } else { element.textContent = text; }
                    }
                } else {
                   // console.warn(`Translation key '${key}' not found or not a string in language '${lang}'.`);
                }
            } catch (e) {
               // console.warn(`Error accessing translation key '${key}':`, e.message);
            }
        });

        // Re-initialize Lucide icons if needed after text changes
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Expose the function globally for React to call
    window.bwamScripts.updateStaticContentLanguage = updateStaticContentLanguage;

    // Initial language update for static content on load
    // Use setTimeout to ensure React has populated window.bwamTranslations
    setTimeout(() => {
        updateStaticContentLanguage(currentLang);
        console.log(`Initial static language set to: ${currentLang}`);
    }, 100); // Small delay


    // --- Mobile Menu ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuButton.querySelector('i');
             if (icon) {
                 icon.setAttribute('data-lucide', isExpanded ? 'menu' : 'x');
                 if (typeof lucide !== 'undefined') lucide.createIcons();
             }
        });
    }

    // --- Desktop Dropdowns ---
     if (dropdownToggles) {
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown-menu')) {
                toggle.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const isCurrentlyShown = dropdown.classList.contains('show');
                    closeAllDropdowns();
                    if (!isCurrentlyShown) { dropdown.classList.add('show'); }
                });
                dropdown.addEventListener('click', (event) => { event.stopPropagation(); });
            }
        });
        document.body.addEventListener('click', () => closeAllDropdowns());
     }
     function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
     }

    // --- Consent Banner ---
    const consentKey = window.CONSENT_STORAGE_KEY || 'consent_status';
    const consentStatus = localStorage.getItem(consentKey);
    if (consentBanner && !consentStatus) {
        consentBanner.classList.remove('hidden');
        requestAnimationFrame(() => {
             consentBanner.style.transform = 'translateY(0)';
             consentBanner.style.transition = 'transform 0.5s ease-out';
        });
    }
    if (consentAcceptButton) {
        consentAcceptButton.addEventListener('click', () => { localStorage.setItem(consentKey, 'accepted'); hideConsentBanner(); console.log('Consent accepted'); });
    }
    if (consentRejectButton) {
        consentRejectButton.addEventListener('click', () => { localStorage.setItem(consentKey, 'rejected'); hideConsentBanner(); console.log('Consent rejected'); });
    }
    function hideConsentBanner() {
        if (consentBanner) { consentBanner.style.transform = 'translateY(100%)'; setTimeout(() => consentBanner.classList.add('hidden'), 500); }
    }

    // --- Advisor Modal ---
    function openModal() {
        if (!advisorModal || !modalOverlay || !modalContent) return;
        advisorModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            modalOverlay.style.opacity = 1;
            modalContent.style.opacity = 1;
            modalContent.style.transform = 'scale(1)';
        });
        modalOverlay.style.transition = 'opacity 0.3s ease';
        modalContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
    function closeModal() {
        if (!advisorModal || !modalOverlay || !modalContent) return;
        document.body.style.overflow = '';
        modalOverlay.style.opacity = 0;
        modalContent.style.opacity = 0;
        modalContent.style.transform = 'scale(0.95)';
        setTimeout(() => advisorModal.classList.add('hidden'), 300);
    }
    if (contactCtaButton) { contactCtaButton.addEventListener('click', openModal); }
    if (modalCloseButton) { modalCloseButton.addEventListener('click', closeModal); }
    if (modalOverlay) { modalOverlay.addEventListener('click', closeModal); }

    // --- Scroll Effects ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); } });
    }, { threshold: 0.1 });
    if (fadeElements) { fadeElements.forEach(el => observer.observe(el)); }

    function handleScrollBanker() {
         if (!scrollBanker) return;
        const scrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = pageHeight > 0 ? (scrollY / pageHeight) * 100 : 0;
        const startOffset = 100; const endOffset = window.innerHeight - 100;
        const availableScrollHeight = endOffset - startOffset - scrollBanker.offsetHeight;
        const newTop = startOffset + (scrollPercent / 100) * availableScrollHeight;
        scrollBanker.style.position = 'fixed';
        scrollBanker.style.top = `${Math.max(startOffset, Math.min(newTop, endOffset - scrollBanker.offsetHeight))}px`;
        scrollBanker.style.right = '20px';
         if (scrollY > 200 && scrollY < pageHeight - 200) { scrollBanker.style.opacity = '1'; scrollBanker.style.visibility = 'visible'; }
         else { scrollBanker.style.opacity = '0'; scrollBanker.style.visibility = 'hidden'; }
         scrollBanker.style.transition = 'opacity 0.3s ease, visibility 0.3s ease, top 0.1s linear';
    }
    if (scrollBanker) { window.addEventListener('scroll', handleScrollBanker, { passive: true }); handleScrollBanker(); }

    // --- Navigation Link Handling ---
    /**
     * Shows a specific static content section and hides others,
     * including the React profile section. Ensures smooth scrolling.
     * @param {string} targetId - The ID of the section to show (without '#').
     */
    function showStaticSection(targetId) {
        // Ensure static content is visible and profile is hidden
        if (reactProfileSection && reactProfileSection.classList.contains('visible')) {
            reactProfileSection.classList.remove('visible');
            // Add display: none immediately to prevent layout shifts during scroll
            reactProfileSection.style.display = 'none';
        }
        if (staticContentWrapper) {
            staticContentWrapper.classList.remove('hidden-by-react');
            staticContentWrapper.style.display = ''; // Restore default display
        }

        // Hide all main static sections first
        document.querySelectorAll('#static-content-wrapper > .main-section').forEach(section => {
             section.classList.add('hidden');
        });

        // Show the target static section
        const targetSection = document.getElementById(targetId);
        if (targetSection && targetSection.classList.contains('main-section')) {
            targetSection.classList.remove('hidden');
             // Scroll to the section smoothly after a short delay
             // Use requestAnimationFrame for smoother rendering before scroll
             requestAnimationFrame(() => {
                 setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Re-enable display for profile section after scroll potentially finishes
                    if (reactProfileSection) reactProfileSection.style.display = '';
                 }, 50);
             });

             // Re-run fade-in check for newly visible elements
             if (fadeElements) {
                targetSection.querySelectorAll('.fade-in-element').forEach(el => {
                   observer.unobserve(el); observer.observe(el);
                });
            }
        } else {
            console.warn(`Target static section #${targetId} not found or invalid.`);
             const homeSection = document.getElementById('home');
             if (homeSection) {
                 homeSection.classList.remove('hidden');
                 requestAnimationFrame(() => {
                     setTimeout(() => homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
                 });
             }
             // Re-enable display for profile section even if target fails
             if (reactProfileSection) reactProfileSection.style.display = '';
        }
    }

    // Add listeners to all navigation links with href starting with #
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    const targetId = href.substring(1);

                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) { mobileMenuButton.click(); }
                    // Close desktop dropdowns if click originated from one
                     const parentDropdown = this.closest('.dropdown-menu');
                     if (parentDropdown) { parentDropdown.classList.remove('show'); }

                    // Show the target static section (this also hides React profile)
                    showStaticSection(targetId);

                    // Update URL hash
                    history.pushState(null, null, href);
                }
            });
        });
    }

     // Handle initial section display based on URL hash
     // Exclude #profile as it's handled by React state/popstate
     function handleInitialLoadView() {
         const hash = window.location.hash;
         if (hash && hash.length > 1 && hash !== '#profile') {
             const initialTargetId = hash.substring(1);
             // Use setTimeout to ensure layout is stable before scrolling
             setTimeout(() => showStaticSection(initialTargetId), 150); // Slightly longer delay on load
         } else if (!hash || hash === '#' || hash === '#home') {
             // Default view: ensure #home is shown and others are hidden initially
             showStaticSection('home');
         }
         // If hash is #profile, React's useEffect will handle showing the profile section
     }

     handleInitialLoadView(); // Call on initial load

    console.log("BWAM script v3 initialized.");

}); // End DOMContentLoaded
