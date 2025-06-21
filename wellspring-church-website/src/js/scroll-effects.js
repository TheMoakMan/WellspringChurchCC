// Advanced Scroll Effects for Wellspring Church
class ScrollEffects {
    constructor() {
        this.init();
        this.bindEvents();
    }

    init() {
        this.lastScrollY = 0;
        this.ticking = false;
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.requestTick();
        });
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollEffects();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateScrollEffects() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Apply navigation effects
        this.updateNavigation(scrollY);
        
        this.lastScrollY = scrollY;
    }

    updateNavigation(scrollY) {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize scroll effects
document.addEventListener('DOMContentLoaded', () => {
    new ScrollEffects();
});