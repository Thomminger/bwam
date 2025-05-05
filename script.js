/**
 * BWAM Frontend Script (v4 - Optimized for Loading & Visibility)
 *
 * Handles:
 * - Language switching for static elements (triggered by React if used)
 * - Mobile menu toggle
 * - Consent banner logic
 * - Advisor modal logic
 * - Scroll-based animations (fade-in, scroll banker visibility)
 * - Navigation link handling (smooth scroll to sections)
 * - Lucide icon initialization (if needed after dynamic changes)
 *
 * Relies on index.html for deferred loading.
 * Assumes sections #home, #about-us, #news, #events are visible initially.
 * Other sections (.main-section) should have the 'hidden' class in HTML.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State & Configuration ---
    let currentLang = document.documentElement.lang || 'de'; // Get initial language

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
    const contactCtaButton = document.getElementById('contact-cta-button');
    const navLinks = document.querySelectorAll('.nav-section-link'); // Links for sections
    const scrollBanker = document.getElementById('scroll-banker');
    const fadeElements = document.querySelectorAll('.fade-in-element');
    const staticContentWrapper = document.getElementById('static-content-wrapper');
    const reactProfileSection = document.getElementById('react-profile-section');

    // --- Language Handling ---
    // (Keep the updateStaticContentLanguage function as before)
    function updateStaticContentLanguage(lang) {
        console.log(`Updating static content language to: ${lang}`);
        const langData = window.bwamTranslations ? window.bwamTranslations[lang] : null;
        if (!langData) { /* ... error handling ... */ return; }
        currentLang = lang;

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            // Exclude React-controlled areas
            if (element.closest('#react-profile-header') || element.closest('#react-profile-section')) {
                return;
            }
            const key = element.getAttribute('data-lang-key');
            // ... (rest of the translation logic as in the original script) ...
             try {
                 const keys = key.split('.');
                 let text = langData;
                 keys.forEach(k => { text = text[k]; });
                 if (typeof text === 'string') {
                     // ... (logic to update text, placeholder, aria-label, etc.) ...
                 }
             } catch (e) { /* console.warn(...) */ }
        });

        if (typeof lucide !== 'undefined') { lucide.createIcons(); }
    }
    // Expose globally if React needs it
    if (window.bwamScripts) window.bwamScripts.updateStaticContentLanguage = updateStaticContentLanguage;
    // Initial call if translations are ready
    if (window.bwamTranslations && window.bwamTranslations[currentLang]) {
        // Use setTimeout to ensure DOM is fully ready for manipulation
        setTimeout(() => updateStaticContentLanguage(currentLang), 0);
    }

    // --- Mobile Menu ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            // ... (icon toggle logic) ...
        });
    }

    // --- Consent Banner ---
    // (Keep consent logic as before)
    const consentKey = window.CONSENT_STORAGE_KEY || 'consent_status';
    const consentStatus = localStorage.getItem(consentKey);
    if (consentBanner && !consentStatus) {
        consentBanner.classList.remove('hidden');
        requestAnimationFrame(() => { consentBanner.style.transform = 'translateY(0)'; });
    }
    // ... (event listeners for accept/reject and hideConsentBanner function) ...
    function hideConsentBanner() { /* ... */ }
    if (consentAcceptButton) consentAcceptButton.addEventListener('click', () => { localStorage.setItem(consentKey, 'accepted'); hideConsentBanner(); /* track event */ });
    if (consentRejectButton) consentRejectButton.addEventListener('click', () => { localStorage.setItem(consentKey, 'rejected'); hideConsentBanner(); /* track event */ });


    // --- Advisor Modal ---
    // (Keep modal logic as before)
    function openModal() { /* ... */ }
    function closeModal() { /* ... */ }
    if (contactCtaButton) { contactCtaButton.addEventListener('click', openModal); /* track event */ }
    if (modalCloseButton) { modalCloseButton.addEventListener('click', closeModal); }
    if (modalOverlay) { modalOverlay.addEventListener('click', closeModal); }


    // --- Scroll Effects (Fade-in & Banker) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); } });
    }, { threshold: 0.1 });
    if (fadeElements) { fadeElements.forEach(el => observer.observe(el)); }

    function handleScrollBankerVisibility() {
        if (!scrollBanker) return;
        const scrollY = window.scrollY;
        const showThreshold = 300; // Show after scrolling down 300px
        const pageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const hideBottomThreshold = pageHeight - viewportHeight - 200; // Hide near the bottom

        if (scrollY > showThreshold && scrollY < hideBottomThreshold) {
            scrollBanker.classList.add('visible');
        } else {
            scrollBanker.classList.remove('visible');
        }
    }
    if (scrollBanker) {
        window.addEventListener('scroll', handleScrollBankerVisibility, { passive: true });
        handleScrollBankerVisibility(); // Initial check
    }

    // --- Navigation Link Handling (Smooth Scroll) ---
    /**
     * Scrolls smoothly to the target section.
     * Assumes target section exists and is visible.
     * Handles hiding the React profile section if it's currently active.
     * @param {string} targetId - The ID of the section to scroll to (without '#').
     */
    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // If React profile is visible, hide it first
            if (reactProfileSection && reactProfileSection.classList.contains('visible')) {
                reactProfileSection.classList.remove('visible');
                if (staticContentWrapper) {
                    staticContentWrapper.classList.remove('hidden-by-react');
                }
                 // Ensure React section is display:none during scroll animation for performance
                 reactProfileSection.style.display = 'none';
            }

            // Make sure the static wrapper is visible if it was hidden
             if (staticContentWrapper && staticContentWrapper.classList.contains('hidden-by-react')) {
                staticContentWrapper.classList.remove('hidden-by-react');
            }

            // If the target is one of the "hidden by default" sections, make it visible
             if(targetSection.classList.contains('hidden')) {
                 // Hide *other* initially hidden sections first to avoid multiple sections being visible
                 document.querySelectorAll('.main-section.hidden').forEach(sec => {
                    if(sec !== targetSection) {
                       // Optionally add back 'hidden' if needed, but scrolling should be primary
                    }
                 });
                 targetSection.classList.remove('hidden');
             }


            // Use requestAnimationFrame for better timing before scroll
            requestAnimationFrame(() => {
                 // Small delay allows browser to potentially render the section if it was hidden
                 setTimeout(() => {
                     targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      // After scroll potentially starts/finishes, restore display property for React section
                      if (reactProfileSection) reactProfileSection.style.display = '';
                 }, 50);
            });
        } else {
            console.warn(`Target section #${targetId} not found.`);
        }
    }

    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#') && href.length > 1) {
                    const targetId = href.substring(1);

                    // Exclude profile link if handled by React router/view logic
                    if (targetId === 'profile' && window.AppContext?.changeView) { // Check if React context exists
                        // Let React handle the profile view change
                        return;
                    }

                    e.preventDefault(); // Prevent default jump only for non-profile static sections

                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) { mobileMenuButton.click(); }

                    // Scroll to the target static section
                    scrollToSection(targetId);

                    // Update URL hash (optional, can cause jumps if not careful)
                    // Consider if history.pushState is better if you don't want immediate jumps
                     try {
                          history.pushState(null, null, href);
                     } catch (error) {
                          // Fallback or just don't update hash if pushState fails (e.g., in iframe)
                          console.warn("Could not update history state:", error);
                     }
                }
            });
        });
    }

    // Handle initial scroll based on URL hash on load
    function handleInitialScroll() {
        const hash = window.location.hash;
        if (hash && hash.length > 1 && hash !== '#profile') { // Exclude profile hash
            const initialTargetId = hash.substring(1);
            // Delay scroll slightly to allow layout stabilization
            setTimeout(() => scrollToSection(initialTargetId), 150);
        }
        // No 'else' needed - default view is already visible
    }

    handleInitialScroll(); // Call on initial load

    console.log("BWAM script v4 (Optimized) initialized.");

}); // End DOMContentLoaded
