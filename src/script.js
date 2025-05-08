// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

// Language switching functionality
const languageSelect = document.getElementById('languageSelect');
if (languageSelect) {
    const currentLang = localStorage.getItem('language') || 'en';
    languageSelect.value = currentLang;

    languageSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        localStorage.setItem('language', newLang);
        updatePageLanguage(newLang);
    });
}

// Function to update page language
function updatePageLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (window.bwamTranslations[lang] && window.bwamTranslations[lang][key]) {
            element.textContent = window.bwamTranslations[lang][key];
        }
    });

    // Update ARIA labels
    const ariaElements = document.querySelectorAll('[data-lang-key-aria]');
    ariaElements.forEach(element => {
        const key = element.getAttribute('data-lang-key-aria');
        if (window.bwamTranslations[lang] && window.bwamTranslations[lang][key]) {
            element.setAttribute('aria-label', window.bwamTranslations[lang][key]);
        }
    });

    // Update titles
    const titleElements = document.querySelectorAll('[data-lang-key-title]');
    titleElements.forEach(element => {
        const key = element.getAttribute('data-lang-key-title');
        if (window.bwamTranslations[lang] && window.bwamTranslations[lang][key]) {
            element.setAttribute('title', window.bwamTranslations[lang][key]);
        }
    });
}

// Mobile menu functionality
const mobileMenuButton = document.querySelector('button[aria-label="Menu"]');
const mobileMenu = document.querySelector('.md\\:hidden.hidden');
const dropdownButtons = mobileMenu?.querySelectorAll('button');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isExpanded = mobileMenu.classList.contains('hidden') ? 'false' : 'true';
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);
    });
}

if (dropdownButtons) {
    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.nextElementSibling;
            dropdown.classList.toggle('hidden');
        });
    });
}

// Consent banner functionality
const consentBanner = document.getElementById('consent-banner');
const consentAccept = document.getElementById('consent-accept');
const consentReject = document.getElementById('consent-reject');

if (consentBanner && consentAccept && consentReject) {
    const consentStatus = localStorage.getItem('consent_status');
    if (!consentStatus) {
        consentBanner.classList.remove('hidden');
    }

    consentAccept.addEventListener('click', () => {
        localStorage.setItem('consent_status', 'accepted');
        consentBanner.classList.add('hidden');
    });

    consentReject.addEventListener('click', () => {
        localStorage.setItem('consent_status', 'rejected');
        consentBanner.classList.add('hidden');
    });
}

// Advisor modal functionality
const advisorModal = document.getElementById('advisor-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalCloseButton = document.getElementById('modal-close-button');
const contactButtons = document.querySelectorAll('[data-lang-key="hero.button_contact"]');

function openAdvisorModal() {
    if (advisorModal) {
        advisorModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeAdvisorModal() {
    if (advisorModal) {
        advisorModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

if (advisorModal && modalOverlay && modalCloseButton) {
    modalOverlay.addEventListener('click', closeAdvisorModal);
    modalCloseButton.addEventListener('click', closeAdvisorModal);
}

if (contactButtons) {
    contactButtons.forEach(button => {
        button.addEventListener('click', openAdvisorModal);
    });
}

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-element').forEach(element => {
    observer.observe(element);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 