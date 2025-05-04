/**
 * BWAM Frontend Script (v2 - For Enhanced React Integration)
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
 * Excludes (Handled by React component in HTML):
 * - Login/Logout state and UI in header
 * - Profile dropdown display and interaction
 * - Language state management and header language buttons
 * - Rendering of the profile page content
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
        const langData = window.bwamTranslations ? window.bwamTranslations[lang] : null;

        if (!langData) {
            console.error(`Translations not found for language: ${lang}`);
            return; // Don't proceed if translations aren't available
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
                // Traverse the translation object using the key parts
                keys.forEach(k => {
                    if (text && typeof text === 'object' && k in text) {
                        text = text[k];
                    } else {
                        // If any part of the key path is missing, throw error to skip update
                        throw new Error(`Key part "${k}" not found`);
                    }
                });

                if (typeof text === 'string') {
                    // Update appropriate attribute or text content
                    if (element.hasAttribute('aria-label') && key.startsWith('aria.')) {
                         element.setAttribute('aria-label', text);
                    } else if (element.hasAttribute('title') && key.startsWith('aria.')) { // Assuming title is used like aria labels
                         element.title = text;
                    } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        if (element.placeholder !== undefined) element.placeholder = text;
                    } else if (element.dataset.consentText) { // Handle consent banner text specifically
                        element.textContent = text;
                    }
                     else {
                        // Update text content, trying to preserve icons
                        const iconElement = element.querySelector('i[data-lucide]');
                        if (iconElement) {
                            // Find the text node next to the icon or create one
                            let textNode = null;
                            for (let node of element.childNodes) {
                                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                                    textNode = node;
                                    break;
                                }
                            }
                            if (textNode) {
                                textNode.textContent = ` ${text} `; // Add spacing
                            } else {
                                // Append text after icon if no text node exists
                                element.appendChild(document.createTextNode(` ${text}`));
                            }
                        } else {
                            // If no icon, just set textContent
                            element.textContent = text;
                        }
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
    updateStaticContentLanguage(currentLang);


    // --- Mobile Menu ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuButton.querySelector('i');
             if (icon) {
                 icon.setAttribute('data-lucide', isExpanded ? 'menu' : 'x');
                 if (typeof lucide !== 'undefined') lucide.createIcons(); // Re-render icon
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
                    closeAllDropdowns(); // Close others first
                    if (!isCurrentlyShown) {
                       dropdown.classList.add('show'); // Toggle show
                    }
                });
                dropdown.addEventListener('click', (event) => {
                     event.stopPropagation(); // Clicks inside don't close
                });
            }
        });
        // Close dropdowns when clicking outside
        document.body.addEventListener('click', () => closeAllDropdowns());
     }

     function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
     }

    // --- Consent Banner ---
    const consentKey = window.CONSENT_STORAGE_KEY || 'consent_status';
    const consentStatus = localStorage.getItem(consentKey);

    if (consentBanner && !consentStatus) {
        consentBanner.classList.remove('hidden');
        // Animate in (ensure initial state is set via CSS if needed)
        requestAnimationFrame(() => {
             consentBanner.style.transform = 'translateY(0)';
             consentBanner.style.transition = 'transform 0.5s ease-out';
        });
    }

    if (consentAcceptButton) {
        consentAcceptButton.addEventListener('click', () => {
            localStorage.setItem(consentKey, 'accepted');
            hideConsentBanner();
            console.log('Consent accepted');
        });
    }

    if (consentRejectButton) {
        consentRejectButton.addEventListener('click', () => {
            localStorage.setItem(consentKey, 'rejected');
            hideConsentBanner();
            console.log('Consent rejected');
        });
    }

    function hideConsentBanner() {
        if (consentBanner) {
            consentBanner.style.transform = 'translateY(100%)';
            setTimeout(() => consentBanner.classList.add('hidden'), 500);
        }
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
        setTimeout(() => {
            advisorModal.classList.add('hidden');
        }, 300);
    }

    if (contactCtaButton) {
        contactCtaButton.addEventListener('click', openModal);
    }
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // --- Scroll Effects ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    if (fadeElements) {
        fadeElements.forEach(el => observer.observe(el));
    }

    function handleScrollBanker() {
        // ... (scroll banker logic remains the same as previous version)
         if (!scrollBanker) return;
        const scrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = pageHeight > 0 ? (scrollY / pageHeight) * 100 : 0;

        const startOffset = 100;
        const endOffset = window.innerHeight - 100;
        const availableScrollHeight = endOffset - startOffset - scrollBanker.offsetHeight;
        const newTop = startOffset + (scrollPercent / 100) * availableScrollHeight;

        scrollBanker.style.position = 'fixed';
        scrollBanker.style.top = `${Math.max(startOffset, Math.min(newTop, endOffset - scrollBanker.offsetHeight))}px`;
        scrollBanker.style.right = '20px';

         if (scrollY > 200 && scrollY < pageHeight - 200) {
             scrollBanker.style.opacity = '1';
             scrollBanker.style.visibility = 'visible';
         } else {
             scrollBanker.style.opacity = '0';
             scrollBanker.style.visibility = 'hidden';
         }
         scrollBanker.style.transition = 'opacity 0.3s ease, visibility 0.3s ease, top 0.1s linear';
    }

    if (scrollBanker) {
         window.addEventListener('scroll', handleScrollBanker, { passive: true }); // Use passive listener
         handleScrollBanker(); // Initial check
    }

    // --- Navigation Link Handling (Smooth Scroll & Section Visibility) ---
    /**
     * Shows a specific static content section and hides others,
     * including the React profile section.
     * @param {string} targetId - The ID of the section to show (without '#').
     */
    function showStaticSection(targetId) {
        // Hide React profile section if visible
        if (reactProfileSection && reactProfileSection.classList.contains('visible')) {
            reactProfileSection.classList.remove('visible');
        }
        // Ensure static content wrapper is visible
        if (staticContentWrapper) {
            staticContentWrapper.classList.remove('hidden-by-react');
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
             setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }, 50); // Delay allows layout adjustments

             // Re-run fade-in check for newly visible elements
             if (fadeElements) {
                targetSection.querySelectorAll('.fade-in-element').forEach(el => {
                   observer.unobserve(el); // Re-observe to trigger animation if needed
                   observer.observe(el);
                });
            }
        } else {
            console.warn(`Target static section #${targetId} not found or invalid.`);
            // Default to showing #home if target is invalid
             const homeSection = document.getElementById('home');
             if (homeSection) {
                 homeSection.classList.remove('hidden');
                 setTimeout(() => homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
             }
        }
    }

    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                // Check if it's an internal section link
                if (href && href.startsWith('#') && href.length > 1) {
                    e.preventDefault(); // Prevent default anchor jump
                    const targetId = href.substring(1);

                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenuButton.click();
                    }
                    // Close desktop dropdowns if click originated from one
                     const parentDropdown = this.closest('.dropdown-menu');
                     if (parentDropdown) {
                         parentDropdown.classList.remove('show');
                     }

                    // Show the target static section (this also hides React profile)
                    showStaticSection(targetId);

                    // Optional: Update URL hash without causing page jump/reload
                    // but only if it's not the profile hash handled by React
                    if (targetId !== 'profile') {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

     // Handle initial section display based on URL hash, if any
     // Exclude #profile as it's handled by React state
     if (window.location.hash && window.location.hash.length > 1 && window.location.hash !== '#profile') {
         const initialTargetId = window.location.hash.substring(1);
         // Use setTimeout to ensure layout is stable before scrolling
         setTimeout(() => showStaticSection(initialTargetId), 100);
     } else if (!window.location.hash || window.location.hash === '#') {
         // Default view: ensure #home is shown and others are hidden initially
         showStaticSection('home');
     }
     // Note: If the hash is #profile on load, the React component's useEffect
     // should handle showing the profile view via changeView('profile').

    console.log("BWAM script v2 initialized.");

}); // End DOMContentLoaded
