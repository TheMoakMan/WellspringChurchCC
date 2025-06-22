// Contact Form Handler
// Currently provides basic form interaction without backend functionality

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            
            // Get form data
            const formData = new FormData(contactForm);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!firstName || !lastName || !email || !message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // For now, just show a success message
            showMessage(`Thank you, ${firstName}! Your message has been received. We'll respond within 24 hours.`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Log to console for development
            console.log('Form submission data:', {
                firstName,
                lastName,
                email,
                subject,
                message
            });
        });
    }
    
    // Show message function
    function showMessage(text, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        
        // Style the message
        message.style.cssText = `
            padding: 16px;
            border-radius: 8px;
            margin-top: 16px;
            font-weight: 500;
            text-align: center;
            ${type === 'success' ? 
                'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Insert message after the form
        contactForm.parentNode.insertBefore(message, contactForm.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    // Enhanced form field interactions
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formFields.forEach(field => {
        // Add floating label effect
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on page load
        if (field.value) {
            field.parentElement.classList.add('focused');
        }
    });
});

// Console instructions for backend integration
console.log(`
=== 📝 CONTACT FORM SETUP ===

✅ CURRENT STATUS:
- Contact form HTML and CSS implemented
- Basic JavaScript validation and UI interactions
- Form prevents default submission (no backend yet)

🔧 TO ADD BACKEND FUNCTIONALITY:

1. Replace the form action="#" with your backend endpoint
2. Remove or modify the e.preventDefault() in JavaScript
3. Add server-side form processing (PHP, Node.js, etc.)

📧 RECOMMENDED BACKEND OPTIONS:
- Netlify Forms (if hosting on Netlify)
- Formspree.io (third-party service)
- Custom PHP/Node.js backend
- WordPress contact form plugin

🗺️ GOOGLE MAPS INTEGRATION:
1. Get Google Maps API key
2. Replace map placeholder with Google Maps embed
3. Add interactive map with church location marker

📱 CURRENT FEATURES:
- Responsive design (mobile-friendly)
- Form validation
- Success/error messages
- Accessible form labels
- Clean, modern styling
`);
