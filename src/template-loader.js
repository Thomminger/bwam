// Function to load the subpage template
async function loadSubpageTemplate() {
    try {
        const response = await fetch('src/templates/subpage.html');
        if (!response.ok) {
            throw new Error('Failed to load template');
        }
        const templateContent = await response.text();
        const template = document.getElementById('subpage-template');
        template.innerHTML = templateContent;
    } catch (error) {
        console.error('Error loading template:', error);
    }
}

// Load template when DOM is loaded
document.addEventListener('DOMContentLoaded', loadSubpageTemplate); 