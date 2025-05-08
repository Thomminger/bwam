/* style.css */

/* Import base Tailwind styles (optional if you fully rely on CDN) */
/* @tailwind base; */
/* @tailwind components; */
/* @tailwind utilities; */

/* Define custom properties for brand colors */
:root {
    --brand-red: #A6001A; /* Example BWAM Red */
    --brand-red-dark: #850015; /* Darker shade for hover */
    --gray-light: #f9fafb; /* bg-gray-light equivalent */
}

body {
    font-family: 'Inter', sans-serif;
    color: #374151; /* text-gray-700 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Mountain Background Effect */
.has-mountain-bg {
    position: relative;
    /* Add other body styles if needed */
}

/* You might use a pseudo-element for the background if needed,
   or apply background directly. Example using pseudo-element: */
/*
body.has-mountain-bg::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('path/to/your/mountain-bg.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
    opacity: 0.1; // Adjust opacity as needed
}
*/

/* Custom Tailwind Component Styles (Example) */
@layer components {
    .nav-link {
        @apply inline-flex items-center py-3 transition-colors duration-200;
        /* Add any specific non-Tailwind styles here */
    }
    .service-card {
        @apply group block bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2;
    }
    .service-icon {
         @apply text-brand-red w-10 h-10 mb-4 block mx-auto transition-transform duration-300 group-hover:scale-110;
    }
}

/* Brand Color Utilities (if not defined via Tailwind config) */
.text-brand-red { color: var(--brand-red); }
.bg-brand-red { background-color: var(--brand-red); }
.hover\:text-brand-red:hover { color: var(--brand-red); }
.hover\:bg-brand-red-dark:hover { background-color: var(--brand-red-dark); }
.focus-visible\:ring-brand-red:focus-visible {
    --tw-ring-color: var(--brand-red);
    /* Tailwind applies the ring offset and width */
}
.bg-gray-light { background-color: var(--gray-light); }


/* Desktop Navigation Dropdown */
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
    min-width: 200px; /* Ensure minimum width */
    padding: 0.5rem; /* Add some padding */
}

.dropdown-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

/* Mobile Menu Transition (Example - Tailwind handles hidden/block) */
#mobile-menu {
    transition: transform 0.3s ease-in-out;
    /* Add transform origin if needed */
}

/* Fade-in Animation */
.fade-in-element {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-element.is-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Modal Styles */
#advisor-modal .modal-overlay {
    transition: opacity 0.3s ease;
}
#advisor-modal .modal-content {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Consent Banner Transition */
#consent-banner {
    transition: transform 0.5s ease-out;
}

/* Scrolling Banker Icon Styles */
#scroll-banker {
    position: fixed;
    right: 20px; /* Initial position */
    top: 100px; /* Initial position */
    z-index: 45; /* Below header */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease, top 0.1s linear;
    /* Ensure SVG inside has pointer-events none if needed */
}

#scroll-banker .banker-svg {
    /* Styles for the SVG itself if needed */
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
}

/* Text Shadow for Hero */
.text-shadow {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* Header Container Styles */
#react-profile-header {
    position: relative;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 1rem;
}

/* Language Switcher Styles */
.language-switcher {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 9999px;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.language-switcher button {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 9999px;
    transition: all 0.2s ease;
}

.language-switcher button.active {
    background-color: var(--brand-red);
    color: white;
}

.language-switcher button:not(.active):hover {
    background-color: #f3f4f6;
}

/* Login Form Container Styles */
.login-form-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: white;
    border-radius: 0.375rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    z-index: 50;
}

.login-form-container input[type="email"] {
    padding: 0.5rem 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    min-width: 200px;
    transition: all 0.2s ease;
}

.login-form-container input[type="email"]:focus {
    outline: none;
    border-color: var(--brand-red);
    box-shadow: 0 0 0 2px rgba(166, 0, 26, 0.1);
}

.login-form-container input[type="email"].error {
    border-color: #ef4444;
}

.login-form-container button[type="submit"] {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: var(--brand-red);
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.login-form-container button[type="submit"]:hover {
    background-color: var(--brand-red-dark);
}

.login-form-container button[type="submit"]:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(166, 0, 26, 0.2);
}

.login-error-message {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.25rem;
    color: #ef4444;
    font-size: 0.75rem;
    background-color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
