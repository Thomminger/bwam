/**
 * BWAM Frontend Script (Optimized for React Profile Integration)
 *
 * Handles:
 * - Language switching for non-React elements (data-lang-key)
 * - Mobile menu toggle
 * - Desktop dropdowns (e.g., Private Clients)
 * - Consent banner logic
 * - Advisor modal logic
 * - Scroll-based animations (fade-in, scroll banker)
 * - Navigation link handling (smooth scroll, section visibility)
 * - Lucide icon initialization (called from HTML)
 *
 * Excludes (Handled by React component in HTML):
 * - Login/Logout button clicks and state management
 * - Profile dropdown display and interaction
 * - Language switching *within* the profile dropdown
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State & Configuration ---
    let currentLang = document.documentElement.lang || 'de'; // Default language
    const translations = {}; // Will be populated by fetchTranslations

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
    const langButtons = document.querySelectorAll('header .lang-button'); // Language buttons in header (if any remain)
    const navLinks = document.querySelectorAll('header nav a[href^="#"], footer a[href^="#"], .service-card[href^="#"]'); // Links for sections
    const dropdownToggles = document.querySelectorAll('.group > button.nav-link'); // Desktop dropdown toggles
    const scrollBanker = document.getElementById('scroll-banker');
    const fadeElements = document.querySelectorAll('.fade-in-element');

    // --- Language Handling ---

    // Function to fetch translations (modify path if needed)
    async function fetchTranslations(lang) {
        try {
            const response = await fetch(`languages/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            translations[lang] = await response.json();
            console.log(`Translations loaded for ${lang}`);
            return translations[lang];
        } catch (error) {
            console.error(`Could not load translations for ${lang}:`, error);
            return null; // Indicate failure
        }
    }

    // Function to update text content based on current language
    function updateTextContent(langData) {
        if (!langData) return; // Don't proceed if translations failed to load

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            // Basic key traversal (e.g., "hero.title")
            const keys = key.split('.');
            let text = langData;
            try {
                keys.forEach(k => { text = text[k]; });
                if (typeof text === 'string') {
                    // Handle different element types
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        if (element.placeholder !== undefined) element.placeholder = text;
                    } else if (element.getAttribute('aria-label')) {
                         element.setAttribute('aria-label', text);
                    } else if (element.title) {
                         element.title = text;
                    } else {
                        // Use textContent for most elements, preserving child elements like icons
                        // Find the first text node and update it, or append if none exists
                        let textNodeFound = false;
                        element.childNodes.forEach(node => {
                            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                                node.textContent = ` ${text} `; // Add spacing around text
                                textNodeFound = true;
                            }
                        });
                        // If no suitable text node, just set textContent (might replace icons)
                        if (!textNodeFound) {
                             // Check if element only contains an icon before overwriting
                             const containsOnlyIcon = element.children.length === 1 && element.children[0].tagName === 'I';
                             if (!containsOnlyIcon) {
                                element.textContent = text;
                             } else {
                                // Append text after the icon if possible
                                element.appendChild(document.createTextNode(` ${text}`));
                             }
                        }
                    }
                } else {
                   // console.warn(`Translation key '${key}' not found or not a string in language '${currentLang}'.`);
                }
            } catch (e) {
               // console.warn(`Error accessing translation key '${key}':`, e);
            }
        });

         // Update consent banner text if it exists
         if (consentBanner && langData.consent) {
             const consentMsg = consentBanner.querySelector('[data-consent-text="consent.message"]');
             const consentAccept = consentBanner.querySelector('[data-consent-text="consent.accept"]');
             const consentReject = consentBanner.querySelector('[data-consent-text="consent.reject"]');
             if (consentMsg) consentMsg.textContent = langData.consent.message || consentMsg.textContent;
             if (consentAccept) consentAccept.textContent = langData.consent.accept || consentAccept.textContent;
             if (consentReject) consentReject.textContent = langData.consent.reject || consentReject.textContent;
         }

        // Update language button active state (if header buttons exist)
        langButtons.forEach(button => {
            button.classList.toggle('text-brand-red', button.getAttribute('data-lang') === currentLang);
            button.classList.toggle('font-bold', button.getAttribute('data-lang') === currentLang);
            button.classList.toggle('text-gray-500', button.getAttribute('data-lang') !== currentLang);
        });
    }

    // Function to set the language
    async function setLanguage(lang) {
        if (lang !== currentLang || !translations[lang]) {
            const langData = await fetchTranslations(lang);
            if (langData) { // Only update if fetch was successful
                currentLang = lang;
                document.documentElement.lang = lang;
                updateTextContent(langData);
                // Dispatch custom event for React component
                document.dispatchEvent(new CustomEvent('bwamLanguageChange', { detail: lang }));
                console.log(`Language set to ${lang}`);
            }
        } else {
             // If language is already current and loaded, just ensure text is updated
             updateTextContent(translations[lang]);
        }
    }

    // Event listeners for language buttons (if any remain in header)
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Initial language load
    setLanguage(currentLang);


    // --- Mobile Menu ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            // Optional: Change icon based on state (e.g., menu to x)
             const icon = mobileMenuButton.querySelector('i');
             if (icon) {
                 icon.setAttribute('data-lucide', isExpanded ? 'menu' : 'x');
                 if (typeof lucide !== 'undefined') lucide.createIcons(); // Re-render icon
             }
        });
    }

    // --- Desktop Dropdowns (e.g., Private Clients) ---
     if (dropdownToggles) {
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.nextElementSibling; // Assumes menu is the next sibling
            if (dropdown && dropdown.classList.contains('dropdown-menu')) {
                // Toggle on click
                toggle.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent body click from closing immediately
                    // Close other open dropdowns
                    closeAllDropdowns(dropdown);
                    dropdown.classList.toggle('show'); // Use a class like 'show' for visibility
                });

                // Prevent clicks inside dropdown from closing it
                dropdown.addEventListener('click', (event) => {
                     event.stopPropagation();
                });
            }
        });

        // Close dropdowns when clicking outside
        document.body.addEventListener('click', () => {
            closeAllDropdowns();
        });
     }

     function closeAllDropdowns(excludeDropdown = null) {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            if (menu !== excludeDropdown) {
                menu.classList.remove('show');
            }
        });
     }


    // --- Consent Banner ---
    const consentKey = window.CONSENT_STORAGE_KEY || 'consent_status'; // Use key from HTML if defined
    const consentStatus = localStorage.getItem(consentKey);

    if (consentBanner && !consentStatus) {
        // Show banner if no status is set
        consentBanner.classList.remove('hidden');
        consentBanner.style.transform = 'translateY(0)'; // Animate in
        consentBanner.style.transition = 'transform 0.5s ease-out';
    }

    if (consentAcceptButton) {
        consentAcceptButton.addEventListener('click', () => {
            localStorage.setItem(consentKey, 'accepted');
            hideConsentBanner();
            // Add analytics initialization or other actions here if needed
            console.log('Consent accepted');
        });
    }

    if (consentRejectButton) {
        consentRejectButton.addEventListener('click', () => {
            localStorage.setItem(consentKey, 'rejected');
            hideConsentBanner();
             // Disable non-essential cookies/scripts here if needed
            console.log('Consent rejected');
        });
    }

    function hideConsentBanner() {
        if (consentBanner) {
            consentBanner.style.transform = 'translateY(100%)';
             // Remove after transition
            setTimeout(() => consentBanner.classList.add('hidden'), 500);
        }
    }


    // --- Advisor Modal ---
    function openModal() {
        if (!advisorModal || !modalOverlay || !modalContent) return;
        advisorModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        // Animate modal appearance
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
        document.body.style.overflow = ''; // Restore background scroll
        // Animate modal disappearance
        modalOverlay.style.opacity = 0;
        modalContent.style.opacity = 0;
        modalContent.style.transform = 'scale(0.95)';
        // Hide after transition
        setTimeout(() => {
            advisorModal.classList.add('hidden');
        }, 300); // Match transition duration
    }

    if (contactCtaButton) { // Button in Hero section
        contactCtaButton.addEventListener('click', openModal);
    }
     // Add listeners for other buttons that might open the modal if needed

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal); // Close on overlay click
    }


    // --- Scroll Effects ---

    // Fade-in elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
            // Optional: remove class if element scrolls out of view
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    if (fadeElements) {
        fadeElements.forEach(el => observer.observe(el));
    }

    // Scrolling banker icon
    function handleScrollBanker() {
        if (!scrollBanker) return;
        const scrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / pageHeight) * 100;

        // Example: Move vertically based on scroll percentage
        const startOffset = 100; // Initial offset from top
        const endOffset = window.innerHeight - 100; // Final offset from bottom
        const newTop = startOffset + (scrollPercent / 100) * (endOffset - startOffset - scrollBanker.offsetHeight);

        scrollBanker.style.position = 'fixed';
        scrollBanker.style.top = `${Math.max(startOffset, Math.min(newTop, endOffset - scrollBanker.offsetHeight))}px`;
        scrollBanker.style.right = '20px'; // Adjust horizontal position
        scrollBanker.style.transition = 'top 0.1s linear'; // Smooth transition

         // Show/hide based on scroll position (optional)
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
         window.addEventListener('scroll', handleScrollBanker);
         handleScrollBanker(); // Initial position check
    }

    // --- Navigation Link Handling (Smooth Scroll & Section Visibility) ---
    function showSection(targetId) {
        // Hide all main content sections first
        document.querySelectorAll('main > section').forEach(section => {
             // Don't hide the hero section (#home)
             if (section.id !== 'home') {
                section.classList.add('hidden');
             }
        });

        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            // Scroll to the section smoothly
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

             // Re-run fade-in check for newly visible elements
             if (fadeElements) {
                fadeElements.forEach(el => {
                    if (targetSection.contains(el)) {
                        observer.unobserve(el); // Re-observe to trigger animation if needed
                        observer.observe(el);
                    }
                });
            }
        } else {
            console.warn(`Target section #${targetId} not found.`);
            // If target not found, maybe default to showing the 'home' section or another default
            const homeSection = document.getElementById('home');
            if (homeSection) homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#') && href.length > 1) {
                    e.preventDefault(); // Prevent default anchor jump
                    const targetId = href.substring(1);

                    // Special case: If clicking a link within a dropdown, close the dropdown
                    const parentDropdown = this.closest('.dropdown-menu');
                    if (parentDropdown) {
                        parentDropdown.classList.remove('show');
                    }
                    // Special case: If clicking a mobile menu link, close the mobile menu
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenuButton.click(); // Simulate click to close
                    }

                    showSection(targetId);

                    // Optional: Update URL hash without causing a page jump
                    // history.pushState(null, null, href);
                }
            });
        });
    }

     // Handle initial section display based on URL hash, if any
     if (window.location.hash && window.location.hash.length > 1) {
         const initialTargetId = window.location.hash.substring(1);
         // Use setTimeout to ensure layout is stable before scrolling
         setTimeout(() => showSection(initialTargetId), 100);
     } else {
        // Default view (show #home, hide others - handled by showSection logic)
        // Ensure #home is visible and others are hidden initially if no hash
        showSection('home'); // Explicitly show home, hide others
     }

    // --- Footer Year ---
    // Moved to the script tag in HTML after the React script for simplicity

    console.log("BWAM script initialized.");

}); // End DOMContentLoaded
