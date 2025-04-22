    // script.js

    document.addEventListener('DOMContentLoaded', () => {
        // --- Mobile Menu Toggle ---
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
                mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
                mobileMenu.classList.toggle('hidden');
            });
        }

        // --- Close Mobile Menu on Link Click (Optional) ---
        // If you want the menu to close when a link inside it is clicked
        if (mobileMenu) {
            const mobileMenuLinks = mobileMenu.querySelectorAll('a');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Only close if the menu is actually open
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        }

        // --- Update Footer Year ---
        const currentYearSpan = document.getElementById('current-year');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }

        // --- Add other JavaScript interactions below ---
        // For example:
        // - Handling search input/modal
        // - Login modal/redirect logic
        // - Language switching logic
        // - Form validation
        // - Image sliders/carousels
        // - Interactive charts (using a library)
        // - Specific animations on scroll

        console.log("BWAM Website Script V2 Loaded");

    }); // End of DOMContentLoaded
    