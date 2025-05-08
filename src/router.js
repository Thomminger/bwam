// Router for handling subpages
const router = {
    // Page content definitions
    pages: {
        'private-clients': {
            title: 'Private Clients',
            content: `
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-3xl font-bold mb-8">Personal Banking Solutions</h2>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-12">
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold mb-4">Personal Accounts</h3>
                            <p class="text-gray-600 mb-4">Access a range of personal banking accounts designed to meet your individual needs.</p>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Checking accounts with no monthly fees</li>
                                <li>• High-yield savings accounts</li>
                                <li>• Premium banking packages</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold mb-4">Investment Services</h3>
                            <p class="text-gray-600 mb-4">Grow your wealth with our comprehensive investment solutions.</p>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Portfolio management</li>
                                <li>• Retirement planning</li>
                                <li>• Wealth advisory services</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-8 rounded-lg">
                        <h3 class="text-2xl font-semibold mb-4">Why Choose BWAM?</h3>
                        <div class="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 class="font-semibold mb-2">Expert Guidance</h4>
                                <p class="text-gray-600">Personalized advice from experienced financial advisors</p>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-2">Digital Banking</h4>
                                <p class="text-gray-600">24/7 access to your accounts through our secure platform</p>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-2">Competitive Rates</h4>
                                <p class="text-gray-600">Attractive interest rates on savings and investments</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'business-clients': {
            title: 'Business Clients',
            content: `
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-3xl font-bold mb-8">Business Banking Solutions</h2>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-12">
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold mb-4">Business Accounts</h3>
                            <p class="text-gray-600 mb-4">Comprehensive banking solutions for businesses of all sizes.</p>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Business checking accounts</li>
                                <li>• Merchant services</li>
                                <li>• Cash management solutions</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold mb-4">Business Services</h3>
                            <p class="text-gray-600 mb-4">Support your business growth with our specialized services.</p>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Business loans and credit lines</li>
                                <li>• International trade services</li>
                                <li>• Treasury management</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-8 rounded-lg">
                        <h3 class="text-2xl font-semibold mb-4">Business Benefits</h3>
                        <div class="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 class="font-semibold mb-2">Dedicated Support</h4>
                                <p class="text-gray-600">Personal relationship manager for your business</p>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-2">Online Banking</h4>
                                <p class="text-gray-600">Advanced digital tools for business management</p>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-2">Global Reach</h4>
                                <p class="text-gray-600">International banking and trade solutions</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'institutional': {
            title: 'Institutional',
            content: `
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-3xl font-bold mb-8">Institutional Banking</h2>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-12">
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold mb-4">Asset Management</h3>
                            <p class="text-gray-600 mb-4">Professional investment management for institutional clients.</p>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Portfolio management</li>
                                <li>• Risk management</li>
                                <li>• Investment advisory</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold mb-4">Institutional Services</h3>
                            <p class="text-gray-600 mb-4">Specialized banking solutions for institutions.</p>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Custody services</li>
                                <li>• Securities lending</li>
                                <li>• Fund administration</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-8 rounded-lg">
                        <h3 class="text-2xl font-semibold mb-4">Why Partner With Us</h3>
                        <div class="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 class="font-semibold mb-2">Expertise</h4>
                                <p class="text-gray-600">Deep market knowledge and experience</p>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-2">Technology</h4>
                                <p class="text-gray-600">Advanced trading and reporting platforms</p>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-2">Global Network</h4>
                                <p class="text-gray-600">Access to international markets and opportunities</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    },

    // Initialize the router
    init() {
        // Handle navigation
        window.addEventListener('popstate', this.handleRoute.bind(this));
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="/bwam/"]')) {
                e.preventDefault();
                const path = e.target.getAttribute('href').replace('/bwam', '');
                this.navigate(path);
            }
        });

        // Handle initial route
        this.handleRoute();
    },

    // Handle route changes
    handleRoute() {
        const path = window.location.pathname.replace('/bwam', '') || '/';
        const page = this.pages[path.slice(1)];

        if (page) {
            this.renderPage(page);
        } else {
            // Handle 404
            this.render404();
        }
    },

    // Navigate to a new route
    navigate(path) {
        window.history.pushState(null, '', `/bwam${path}`);
        this.handleRoute();
    },

    // Render a page
    renderPage(page) {
        const template = document.querySelector('#subpage-template');
        if (!template) return;

        const content = template.content.cloneNode(true);
        
        // Update title
        document.title = `${page.title} - BWAM`;
        content.querySelector('h1').textContent = page.title;
        
        // Update breadcrumb
        content.querySelector('nav ol li:last-child').textContent = page.title;
        
        // Update content
        content.querySelector('section:nth-child(2) .container').innerHTML = page.content;
        
        // Replace main content
        document.querySelector('main').replaceWith(content.querySelector('main'));
    },

    // Render 404 page
    render404() {
        const content = `
            <div class="max-w-4xl mx-auto text-center py-16">
                <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p class="text-gray-600 mb-8">The page you are looking for does not exist.</p>
                <a href="/bwam/" class="inline-block bg-brand-red text-white px-6 py-3 rounded-lg hover:bg-brand-red-dark transition-colors">
                    Return to Home
                </a>
            </div>
        `;
        
        document.querySelector('main').innerHTML = content;
    }
};

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    router.init();
}); 