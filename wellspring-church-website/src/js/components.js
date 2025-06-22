// Component Loader for Wellspring Church Website
class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.currentPage = this.getCurrentPage();
        this.debugMode = true; // Enable for debugging
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        const pageName = page.replace('.html', '') || 'index';
        if (this.debugMode) {
            console.log('Current page detected:', pageName);
        }
        return pageName;
    }

    async loadComponent(componentName, targetSelector) {
        try {
            if (this.debugMode) {
                console.log(`Loading component: ${componentName} into ${targetSelector}`);
            }

            if (!this.components.has(componentName)) {
                const componentPath = `components/${componentName}.html`;
                if (this.debugMode) {
                    console.log(`Fetching: ${componentPath}`);
                }
                
                const response = await fetch(componentPath);
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${componentName} (${response.status}: ${response.statusText})`);
                }
                const html = await response.text();
                this.components.set(componentName, html);
                
                if (this.debugMode) {
                    console.log(`Component ${componentName} loaded successfully`);
                }
            }

            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = this.components.get(componentName);
                
                if (this.debugMode) {
                    console.log(`Component ${componentName} inserted into DOM`);
                }
                
                // Special handling for navigation
                if (componentName === 'navigation') {
                    // Add a small delay to ensure DOM is updated
                    setTimeout(() => {
                        this.setActiveNavLink();
                    }, 50);
                }
            } else {
                console.error(`Target element not found: ${targetSelector}`);
            }
        } catch (error) {
            console.error('Error loading component:', error);
            
            // Fallback: If components fail to load via fetch, show a message
            const targetElement = document.querySelector(targetSelector);
            if (targetElement && componentName === 'navigation') {
                targetElement.innerHTML = `
                    <nav class="nav-floating unselectable">
                        <div class="nav-logo">
                            <img src="assets/images/wc_logo.avif" alt="Wellspring Church" style="height: 24px;">
                        </div>
                        <div class="nav-menu">
                            <span class="logo-text">WELLSPRING</span>
                            <a href="index.html" class="nav-link">Home</a>
                            <a href="about.html" class="nav-link">About</a>
                            <a href="messages.html" class="nav-link">Messages</a>
                            <a href="ministries.html" class="nav-link">Ministries</a>
                            <a href="contact.html" class="nav-link">Contact</a>
                            <a href="giving.html" class="nav-link">Giving</a>
                        </div>
                    </nav>
                `;
                this.setActiveNavLink();
            }
        }
    }    setActiveNavLink() {
        if (this.debugMode) {
            console.log('Setting active nav link for page:', this.currentPage);
        }
        
        // Remove all active classes
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page
        const currentLink = document.querySelector(`.nav-link[data-page="${this.currentPage}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
            if (this.debugMode) {
                console.log('Active link set for:', this.currentPage);
            }
        } else {
            // Fallback: try to match by href
            const fallbackLink = document.querySelector(`.nav-link[href="${this.currentPage}.html"], .nav-link[href="index.html"]`);
            if (fallbackLink && (this.currentPage === 'index' || fallbackLink.href.includes(this.currentPage))) {
                fallbackLink.classList.add('active');
                if (this.debugMode) {
                    console.log('Active link set via fallback for:', this.currentPage);
                }
            }
        }

        // Special handling for dropdown items
        if (this.currentPage === 'about' || this.currentPage === 'team') {
            const aboutLink = document.querySelector('.dropdown-toggle[data-page="about"], .dropdown-toggle[href*="about"]');
            if (aboutLink) {
                aboutLink.classList.add('active');
                if (this.debugMode) {
                    console.log('Dropdown active state set for about section');
                }
            }
        }
    }

    async loadAllComponents() {
        if (this.debugMode) {
            console.log('Starting to load all components...');
        }
        
        const componentsToLoad = [
            { name: 'navigation', selector: '#nav-placeholder' },
            { name: 'footer', selector: '#footer-placeholder' }
        ];

        const loadPromises = componentsToLoad.map(({ name, selector }) => 
            this.loadComponent(name, selector)
        );

        await Promise.all(loadPromises);
        
        if (this.debugMode) {
            console.log('All components loaded, initializing...');
        }
        
        // Initialize any JavaScript that depends on the loaded components
        this.initializeLoadedComponents();
    }

    initializeLoadedComponents() {
        // Re-initialize any navigation JavaScript
        if (window.initializeNavigation) {
            if (this.debugMode) {
                console.log('Reinitializing navigation...');
            }
            window.initializeNavigation();
        }
    }
}

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, starting component loader...');
    const loader = new ComponentLoader();
    await loader.loadAllComponents();
    console.log('Component loading complete!');
});

// Export for use in other scripts
window.ComponentLoader = ComponentLoader;
