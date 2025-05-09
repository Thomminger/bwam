// Router for handling subpages
class Router {
    constructor() {
        this.routes = {
            '': this.loadHomePage.bind(this),
            'privateclients': this.loadTemplate.bind(this, 'privateclients'),
            'businessclients': this.loadTemplate.bind(this, 'businessclients'),
            'institutional': this.loadTemplate.bind(this, 'institutional'),
            'about': this.scrollToSection.bind(this, 'about'),
            'events': this.scrollToSection.bind(this, 'events')
        };

        this.mainContent = document.querySelector('main');
        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.handleRoute.bind(this));
        this.handleRoute();
        this.initSalesforce();
    }

    initSalesforce() {
        if (typeof SalesforceInteractions !== 'undefined') {
            SalesforceInteractions.setLoggingLevel(4);
            console.log('Salesforce Interactions initialized with DEBUG level');
        }
    }

    handleRoute() {
        const hash = window.location.hash.slice(1);
        const route = hash.split('/')[0];
        
        if (this.routes[route]) {
            this.routes[route]();
        } else {
            this.loadHomePage();
        }
    }

    loadHomePage() {
        document.getElementById('home').style.display = 'flex';
        document.getElementById('about').style.display = 'block';
        document.getElementById('events').style.display = 'block';
    }

    loadTemplate(template) {
        document.getElementById('home').style.display = 'none';
        document.getElementById('about').style.display = 'none';
        document.getElementById('events').style.display = 'none';
        
        const mainContent = document.querySelector('main');
        fetch(`src/templates/${template}.html`)
            .then(response => response.text())
            .then(html => {
                mainContent.innerHTML = html;
                this.initComponents();
            })
            .catch(error => {
                console.error('Error loading template:', error);
                mainContent.innerHTML = '<div class="container mx-auto px-4 py-16"><h1 class="text-4xl font-bold text-center">Page Not Found</h1></div>';
            });
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    initComponents() {
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Initialize newsletter sticky behavior
        const newsletter = document.getElementById('stickyNewsletter');
        if (newsletter) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    newsletter.style.transform = 'translateY(0)';
                } else {
                    newsletter.style.transform = 'translateY(100%)';
                }
            });
        }

        // Initialize newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                this.handleNewsletterSubscription(email);
            });
        }
    }

    handleNewsletterSubscription(email) {
        if (typeof SalesforceInteractions !== 'undefined') {
            SalesforceInteractions.sendEvent({
                eventName: 'NewsletterSubscription',
                eventType: 'custom',
                payload: {
                    email: email,
                    timestamp: new Date().toISOString()
                }
            });
            console.log('Newsletter subscription event sent to Salesforce');
        }
        alert('Thank you for subscribing to our newsletter!');
    }

    connectAdvisor(advisorName) {
        if (typeof SalesforceInteractions !== 'undefined') {
            SalesforceInteractions.sendEvent({
                eventName: 'AdvisorConnect',
                eventType: 'custom',
                payload: {
                    advisor: advisorName,
                    timestamp: new Date().toISOString()
                }
            });
            console.log('Advisor connect event sent to Salesforce');
        }
        alert(`Thank you for your interest in connecting with ${advisorName}. We will contact you shortly.`);
    }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Router();
}); 