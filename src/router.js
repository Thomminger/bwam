// Router for handling subpages
class Router {
    constructor() {
        this.routes = {
            '': this.loadHomePage.bind(this),
            'privateclients': this.loadTemplate.bind(this, 'privateclients-template'),
            'businessclients': this.loadTemplate.bind(this, 'businessclients-template'),
            'institutional': this.loadTemplate.bind(this, 'institutional-template'),
            'about': this.loadTemplate.bind(this, 'about-template'),
            'events': this.loadTemplate.bind(this, 'events-template')
        };

        this.mainContent = document.querySelector('main');
        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.handleRoute.bind(this));
        window.addEventListener('load', this.handleRoute.bind(this));
    }

    handleRoute() {
        const hash = window.location.hash.slice(2) || '';
        const route = this.routes[hash] || this.routes[''];
        route();
    }

    loadHomePage() {
        this.mainContent.innerHTML = document.querySelector('main').innerHTML;
        this.initializeComponents();
    }

    loadTemplate(templateId) {
        const template = document.getElementById(templateId);
        if (template) {
            this.mainContent.innerHTML = template.innerHTML;
            this.initializeComponents();
        } else {
            console.error(`Template ${templateId} not found`);
        }
    }

    initializeComponents() {
        // Reinitialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }

        // Initialize any other components that need to be reinitialized
        this.initializeNewsletterSticky();
    }

    initializeNewsletterSticky() {
        const newsletterSticky = document.getElementById('newsletter-sticky');
        if (newsletterSticky) {
            // Show newsletter sticky after scrolling
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    newsletterSticky.classList.add('visible');
                } else {
                    newsletterSticky.classList.remove('visible');
                }
            });
        }
    }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Router();
}); 