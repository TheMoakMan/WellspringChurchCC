// This file contains the main JavaScript functionality for the website, including event listeners and DOM manipulation.

document.addEventListener('DOMContentLoaded', function() {
    // Example of a simple event listener for a button click
    const contactButton = document.getElementById('contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            alert('Thank you for reaching out! We will get back to you soon.');
        });
    }

    // Function to toggle the visibility of the service times section
    const serviceToggle = document.getElementById('service-toggle');
    if (serviceToggle) {
        serviceToggle.addEventListener('click', function() {
            const serviceTimes = document.getElementById('service-times');
            if (serviceTimes) {
                serviceTimes.classList.toggle('hidden');
            }
        });
    }
});