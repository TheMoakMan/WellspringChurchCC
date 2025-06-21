// Epic Interactive JavaScript for Wellspring Church
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌊 Wellspring Church - Where Faith Flows Freely 🌊');
    
    // Initialize all interactive features
    initializeNavigation();
    initializePhotoGrid();
    initializeValueCards();
    initializeScrollEffects();
    initializeParticleEffects();
    initializeButtons();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Navigation Functions
function initializeNavigation() {
    const nav = document.querySelector('.nav-floating');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Enhanced mobile navigation behavior
    const isMobile = window.innerWidth <= 768;
    
    // Show/hide navigation on scroll with mobile-specific behavior
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            if (isMobile) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.backdropFilter = 'blur(25px)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.backdropFilter = 'blur(25px)';
            }
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
            if (isMobile) {
                nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }
        }
        
        // Keep navigation visible on mobile, only hide on desktop if scrolling down fast
        if (!isMobile) {
            if (currentScrollY < lastScrollY || currentScrollY < 100) {
                nav.style.transform = 'translateX(-50%) translateY(0)';
            } else if (currentScrollY > lastScrollY + 50) {
                nav.style.transform = 'translateX(-50%) translateY(-100px)';
            }
        } else {
            // Always keep navigation visible on mobile
            nav.style.transform = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            nav.style.transform = 'none';
        }, 100);
    });
}

// Photo Grid Interactive Functions
function initializePhotoGrid() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        // Mouse enter effects
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-15px) scale(1.05)';
            item.style.zIndex = '10';
            
            // Add glow effect
            item.style.boxShadow = '0 25px 80px rgba(135, 206, 235, 0.3)';
        });
        
        // Mouse leave effects
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.zIndex = '1';
            item.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.1)';
        });
        
        // Click effects
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Create click ripple effect
            createRippleEffect(item, event);
            
            // Scroll to target section
            setTimeout(() => {
                scrollToSection(targetSection);
            }, 300);
        });
    });
}

// Value Cards Interactive Functions
function initializeValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle expanded state
            const isExpanded = card.classList.contains('expanded');
            
            // Close all other cards
            valueCards.forEach(c => c.classList.remove('expanded'));
            
            // Toggle current card
            if (!isExpanded) {
                card.classList.add('expanded');
                
                // Add special effect
                card.style.background = 'linear-gradient(135deg, rgba(135, 206, 235, 0.1), rgba(255, 255, 255, 1))';
                card.style.border = '2px solid rgba(135, 206, 235, 0.3)';
            } else {
                card.style.background = 'white';
                card.style.border = 'none';
            }
        });
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('expanded')) {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('expanded')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax scrolling for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll reveal
    const elementsToObserve = document.querySelectorAll(`
        .service-card,
        .value-card,
        .photo-item,
        .section-header
    `);
    
    elementsToObserve.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// Particle Effects
function initializeParticleEffects() {
    const heroSection = document.querySelector('.hero-section');
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createFloatingParticle(heroSection);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(135, 206, 235, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 10 + 15}s linear infinite;
        pointer-events: none;
        z-index: 1;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 25000);
}

// Button Interactions
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
        });
        
        // Magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Mouse cursor effects - DISABLED
// document.addEventListener('mousemove', (e) => {
//     // Create trailing effect
//     createTrailEffect(e.clientX, e.clientY);
// });

// function createTrailEffect(x, y) {
//     const trail = document.createElement('div');
//     trail.className = 'cursor-trail';
//     trail.style.cssText = `
//         position: fixed;
//         width: 6px;
//         height: 6px;
//         background: rgba(135, 206, 235, 0.5);
//         border-radius: 50%;
//         left: ${x - 3}px;
//         top: ${y - 3}px;
//         pointer-events: none;
//         z-index: 9999;
//         animation: trailFade 0.5s ease-out forwards;
//     `;
//     
//     document.body.appendChild(trail);
//     
//     // Add trail fade animation
//     if (!document.querySelector('#trail-styles')) {
//         const style = document.createElement('style');
//         style.id = 'trail-styles';
//         style.textContent = `
//             @keyframes trailFade {
//                 to {
//                     opacity: 0;
//                     transform: scale(0.5);
//                 }
//             }
//         `;
//         document.head.appendChild(style);
//     }
//     
//     // Remove trail after animation
//     setTimeout(() => {
//         if (trail.parentNode) {
//             trail.parentNode.removeChild(trail);
//         }
//     }, 500);
// }

// Easter eggs and special effects
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    if (clickCount % 10 === 0) {
        createSpecialEffect();
    }
});

function createSpecialEffect() {
    const colors = ['#87CEEB', '#ADD8E6', '#B0E0E6', '#E0F6FF'];
    const container = document.body;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            pointer-events: none;
            z-index: 10000;
            animation: celebrationParticle 2s ease-out forwards;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
    
    // Add celebration particle animation
    if (!document.querySelector('#celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'celebration-styles';
        style.textContent = `
            @keyframes celebrationParticle {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.5) rotate(180deg);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

function applyScrollEffects(scrollPosition) {
    // Implement your scroll effects logic here
}