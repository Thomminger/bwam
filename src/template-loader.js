// Template loader for subpages
const templateLoader = {
    // Load the subpage template
    loadTemplate() {
        const template = document.createElement('template');
        template.id = 'subpage-template';
        
        // Fetch the template content
        fetch('/bwam/src/templates/subpage.html')
            .then(response => response.text())
            .then(html => {
                template.innerHTML = html;
                document.body.appendChild(template);
            })
            .catch(error => {
                console.error('Error loading template:', error);
            });
    },

    // Initialize the template loader
    init() {
        this.loadTemplate();
    }
};

// Initialize template loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    templateLoader.init();
}); 