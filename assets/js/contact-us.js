// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOptions = {
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Validate form
            let isValid = true;
            const email = document.getElementById('email').value;
            if (!isValidEmail(email)) {
                showToast('error', 'Please enter a valid email address.');
                isValid = false;
            }
            
            if (isValid) {
                // In a real implementation, this would be an AJAX request to a server endpoint
                // For demonstration, we'll simulate a server response after a brief delay
                
                // Show loading state
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Success response
                    showToast('success', 'Your message has been sent successfully! We\'ll get back to you soon.');
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Newsletter form submissions
    const newsletterForm = document.querySelector('.newsletter-form');
    const footerForm = document.querySelector('.footer-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('.newsletter-input').value;
            if (isValidEmail(email)) {
                showToast('success', 'Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                showToast('error', 'Please enter a valid email address.');
            }
        });
    }
    
    if (footerForm) {
        footerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = footerForm.querySelector('.footer-input').value;
            if (isValidEmail(email)) {
                showToast('success', 'Thank you for subscribing to our newsletter!');
                footerForm.reset();
            } else {
                showToast('error', 'Please enter a valid email address.');
            }
        });
    }
    
    // Live chat button
    const startChatBtn = document.getElementById('startChat');
    if (startChatBtn) {
        startChatBtn.addEventListener('click', function() {
            // Simulate opening a chat window
            showToast('success', 'Chat service is connecting. A representative will be with you shortly.');
            
            // In a real implementation, this would initialize a chat widget
            // For demonstration, we'll just show a notification
            setTimeout(() => {
                // Create a chat widget
                const chatWidget = document.createElement('div');
                chatWidget.className = 'chat-widget';
                chatWidget.style.position = 'fixed';
                chatWidget.style.bottom = '20px';
                chatWidget.style.right = '20px';
                chatWidget.style.width = '300px';
                chatWidget.style.height = '400px';
                chatWidget.style.backgroundColor = 'var(--card-bg)';
                chatWidget.style.borderRadius = 'var(--border-radius-lg)';
                chatWidget.style.boxShadow = 'var(--shadow-lg)';
                chatWidget.style.zIndex = '1000';
                chatWidget.style.overflow = 'hidden';
                chatWidget.style.display = 'flex';
                chatWidget.style.flexDirection = 'column';
                
                // Chat header
                const chatHeader = document.createElement('div');
                chatHeader.style.padding = '15px';
                chatHeader.style.backgroundColor = 'var(--primary)';
                chatHeader.style.color = 'var(--darker)';
                chatHeader.style.fontWeight = 'bold';
                chatHeader.style.display = 'flex';
                chatHeader.style.justifyContent = 'space-between';
                chatHeader.style.alignItems = 'center';
                chatHeader.innerHTML = 'Chat with Support <i class="fas fa-times" id="closeChat" style="cursor:pointer;"></i>';
                
                // Chat body
                const chatBody = document.createElement('div');
                chatBody.style.flex = '1';
                chatBody.style.padding = '15px';
                chatBody.style.overflowY = 'auto';
                
                // Add welcome message
                const welcomeMsg = document.createElement('div');
                welcomeMsg.style.backgroundColor = 'var(--gray-200)';
                welcomeMsg.style.color = 'var(--light)';
                welcomeMsg.style.padding = '10px';
                welcomeMsg.style.borderRadius = 'var(--border-radius)';
                welcomeMsg.style.marginBottom = '10px';
                welcomeMsg.innerHTML = '<strong>Support Agent:</strong> Hello! Thanks for reaching out. How can I assist you with your resume today?';
                chatBody.appendChild(welcomeMsg);
                
                // Chat input
                const chatInput = document.createElement('div');
                chatInput.style.padding = '10px';
                chatInput.style.borderTop = '1px solid var(--gray-200)';
                chatInput.style.display = 'flex';
                chatInput.innerHTML = '<input type="text" placeholder="Type your message..." style="flex:1; padding:8px; border-radius:var(--border-radius); border:1px solid var(--gray-300); background-color:var(--gray-100); color:var(--light);"><button style="margin-left:10px; background-color:var(--primary); color:var(--darker); border:none; border-radius:var(--border-radius); padding:0 15px; cursor:pointer;">Send</button>';
                
                // Assemble widget
                chatWidget.appendChild(chatHeader);
                chatWidget.appendChild(chatBody);
                chatWidget.appendChild(chatInput);
                
                // Add to document
                document.body.appendChild(chatWidget);
                
                // Handle close button
                document.getElementById('closeChat').addEventListener('click', function() {
                    document.body.removeChild(chatWidget);
                });
            }, 1000);
        });
    }
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast notification function
function showToast(type, message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toast.className = 'toast';
    toast.classList.add(type);
    
    // Set icon based on type
    const icon = toast.querySelector('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
    }
    
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}