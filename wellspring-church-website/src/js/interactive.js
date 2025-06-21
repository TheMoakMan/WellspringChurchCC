// Interactive Elements for Wellspring Church
document.addEventListener('DOMContentLoaded', () => {
    initializeInteractiveElements();
});

function initializeInteractiveElements() {
    // Initialize photo grid interactions
    initializePhotoInteractions();
    
    // Initialize button interactions  
    initializeButtonInteractions();
    
    // Initialize value card interactions
    initializeValueCardInteractions();
    
    // Initialize cursor effects
    initializeCursorEffects();
}

function initializePhotoInteractions() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetSection = item.getAttribute('data-section');
            createClickEffect(item, e);
            setTimeout(() => scrollToSection(targetSection), 200);
        });
    });
}

function initializeButtonInteractions() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
        });
    });
}

function initializeValueCardInteractions() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('click', () => {
            toggleValueCard(card);
        });
    });
}

function initializeCursorEffects() {
    const interactiveElements = document.querySelectorAll('.photo-item, .btn-primary, .btn-outline, .value-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });
}

function createClickEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: rgba(135, 206, 235, 0.8);
        border-radius: 50%;
        transform: scale(0);
        animation: clickEffect 0.5s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(effect);
    
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 500);
}

function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function toggleValueCard(card) {
    const isExpanded = card.classList.contains('expanded');
    const allCards = document.querySelectorAll('.value-card');
    
    // Close all cards
    allCards.forEach(c => {
        c.classList.remove('expanded');
        c.style.background = 'white';
        c.style.border = 'none';
    });
    
    // Open clicked card if it wasn't expanded
    if (!isExpanded) {
        card.classList.add('expanded');
        card.style.background = 'linear-gradient(135deg, rgba(135, 206, 235, 0.1), rgba(255, 255, 255, 1))';
        card.style.border = '2px solid rgba(135, 206, 235, 0.3)';
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes clickEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);