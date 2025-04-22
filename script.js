// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const currentYearSpan = document.getElementById('current-year');
    const sections = document.querySelectorAll('section[id]'); // Sections for nav highlighting
    const navLinks = document.querySelectorAll('nav a.nav-link'); // Desktop nav links
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a.nav-link-mobile'); // Mobile nav links
    const scrollIndicatorProgress = document.getElementById('scroll-indicator-progress'); // Progress bar element (optional)
    const scrollPerson = document.getElementById('scroll-person'); // Walking person emoji
    const animatedElements = document.querySelectorAll('.scroll-animate'); // Elements to animate on scroll

    // --- Mobile Menu ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });

        // Close Mobile Menu on Link Click
        const allMobileLinks = mobileMenu.querySelectorAll('a[href^="#"]'); // Select only links starting with #
        allMobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Footer Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Active Navigation Link Highlighting ---
    if (sections.length > 0 && (navLinks.length > 0 || mobileNavLinks.length > 0)) {
        const makeLinksActive = (links, id) => {
            links.forEach(link => {
                link.classList.remove('active-nav'); // active-nav class defined in HTML <style>
                // Check if the link's href matches the section ID
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active-nav');
                }
            });
        };

        const observerOptionsNav = {
            root: null, // relative to document viewport
            rootMargin: '-40% 0px -60% 0px', // Adjust margins to feel more accurate for active section
            threshold: 0 // Trigger as soon as the boundary is crossed
        };

        const observerCallbackNav = (entries) => {
            entries.forEach(entry => {
                // When a section intersects based on the rootMargin
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    makeLinksActive(navLinks, id); // Update desktop links
                    makeLinksActive(mobileNavLinks, id); // Update mobile links
                }
            });
        };

        const navObserver = new IntersectionObserver(observerCallbackNav, observerOptionsNav);
        sections.forEach(section => {
            navObserver.observe(section);
        });

        // Initial check for nav highlighting on page load
        // Find the first section and activate its link if near the top
        const firstSectionId = sections[0]?.getAttribute('id');
        if (firstSectionId && window.scrollY < window.innerHeight * 0.4) { // If scrolled less than 40% of viewport height
             makeLinksActive(navLinks, firstSectionId);
             makeLinksActive(mobileNavLinks, firstSectionId);
        }
    }


    // --- Scroll Depth Indicator ---
    if (scrollPerson) { // Only run if the indicator exists
        let scrollTimeout; // Variable to hold timeout ID for throttling

        const updateScrollIndicator = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            // Calculate scrollable height (total height - visible height)
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            // Avoid division by zero if scrollHeight is 0
            const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

            // Ensure percentage is between 0 and 100
            const clampedPercentage = Math.max(0, Math.min(100, scrollPercentage));

            // Update the position of the walking person
            scrollPerson.style.left = `${clampedPercentage}%`;

            // Optional: Update the progress bar width
            // if (scrollIndicatorProgress) {
            //     scrollIndicatorProgress.style.width = `${clampedPercentage}%`;
            // }
        };

        // Throttle function: limits how often a function can be called
        const throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        };

        // Attach the throttled function to the scroll event
        window.addEventListener('scroll', throttle(updateScrollIndicator, 100)); // Update max 10 times/sec

        // Initial position check on load
        updateScrollIndicator();
    }


    // --- Scroll Animation Observer ---
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observerOptionsAnimate = {
            root: null, // relative to the viewport
            threshold: 0.15, // Trigger when 15% of the element is visible
            rootMargin: "0px 0px -50px 0px" // Trigger slightly before it's fully in view vertically
        };

        const observerCallbackAnimate = (entries, observer) => {
            entries.forEach(entry => {
                // When element comes into view
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing this element once animated
                }
                // Optional: Remove class if it scrolls out of view (for re-animation)
                // else {
                //     entry.target.classList.remove('is-visible');
                // }
            });
        };

        const animationObserver = new IntersectionObserver(observerCallbackAnimate, observerOptionsAnimate);

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    } else {
        // Fallback for older browsers or if no elements to animate: make them visible immediately
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    console.log("BWAM One-Pager Script (Optimized) Loaded");

}); // End of DOMContentLoaded
