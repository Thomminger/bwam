// Simple router for handling subpage navigation
class Router {
    constructor() {
        this.routes = new Map();
        this.init();
    }

    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            this.handleRoute(window.location.pathname);
        });

        // Handle initial route
        this.handleRoute(window.location.pathname);

        // Handle link clicks
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link && link.href.startsWith(window.location.origin)) {
                event.preventDefault();
                this.navigate(link.pathname);
            }
        });
    }

    addRoute(path, handler) {
        this.routes.set(path, handler);
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute(path);
    }

    handleRoute(path) {
        const { section, subsection } = this.parsePath(path);
        
        if (section && subsection) {
            // Load subpage content
            const template = document.querySelector('template#subpage-template');
            if (template) {
                document.body.innerHTML = template.content.cloneNode(true);
                // Reinitialize scripts
                this.loadScripts();
            }
        } else if (path === '/') {
            // Load home page
            window.location.href = '/';
        }
    }

    parsePath(path) {
        const parts = path.split('/').filter(part => part);
        return {
            section: parts[0],
            subsection: parts[1]
        };
    }

    loadScripts() {
        // Load required scripts
        const scripts = [
            '../translations.js',
            '../pages.js',
            '../subpage.js'
        ];

        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            document.body.appendChild(script);
        });
    }
}

// Initialize router
const router = new Router();

// Add routes
router.addRoute('/', () => {
    window.location.href = '/';
});

// Export router
window.router = router; 