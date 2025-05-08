// Function to get the current page path
function getCurrentPagePath() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(part => part);
    return {
        section: parts[0],
        subsection: parts[1]
    };
}

// Function to load page content
function loadPageContent() {
    const { section, subsection } = getCurrentPagePath();
    const currentLang = localStorage.getItem('language') || 'en';
    
    if (!section || !subsection) {
        console.error('Invalid page path');
        return;
    }

    const page = window.bwamPages[section];
    if (!page) {
        console.error('Section not found');
        return;
    }

    const subpage = page.sections[subsection];
    if (!subpage) {
        console.error('Subsection not found');
        return;
    }

    const content = subpage.content[currentLang];
    if (!content) {
        console.error('Content not found for language:', currentLang);
        return;
    }

    // Update page title
    document.title = `BWAM - ${content.title}`;
    document.querySelector('[data-lang-key="page.title"]').textContent = content.title;
    document.querySelector('[data-lang-key="page.description"]').textContent = content.description;

    // Render features
    const featuresContainer = document.querySelector('.grid.md\\:grid-cols-3');
    featuresContainer.innerHTML = content.features.map(feature => `
        <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-brand-red mb-4">
                <i data-lucide="${feature.icon}" class="w-8 h-8"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">${feature.title}</h3>
            <p class="text-gray-600">${feature.description}</p>
        </div>
    `).join('');

    // Initialize Lucide icons
    lucide.createIcons();
}

// Function to handle mobile menu
function initMobileMenu() {
    const menuButton = document.querySelector('button[aria-label="Menu"]');
    const mobileMenu = document.querySelector('.md\\:hidden.hidden');
    const dropdownButtons = mobileMenu.querySelectorAll('button');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.nextElementSibling;
            dropdown.classList.toggle('hidden');
        });
    });
}

// Function to handle language switching
function initLanguageSwitcher() {
    const languageSelect = document.getElementById('languageSelect');
    const currentLang = localStorage.getItem('language') || 'en';
    
    languageSelect.value = currentLang;
    
    languageSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        localStorage.setItem('language', newLang);
        loadPageContent();
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadPageContent();
    initMobileMenu();
    initLanguageSwitcher();
}); 