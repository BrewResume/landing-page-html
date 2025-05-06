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
});

// Category tabs filtering
const categoryTabs = document.querySelectorAll('.category-tab');
const resourceCards = document.querySelectorAll('.resource-card');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get category from data attribute
        const category = tab.getAttribute('data-category');
        
        // Filter resource cards based on category
        resourceCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current FAQ item
        item.classList.toggle('active');
    });
});

// Load more functionality (simulation)
const loadMoreBtn = document.querySelector('.btn-load-more');

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // Show loading state
        loadMoreBtn.innerHTML = 'Loading... <i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate loading delay
        setTimeout(() => {
            // Here you would normally fetch more resources from the server
            // For simulation, we'll just disable the button
            loadMoreBtn.innerHTML = 'No More Resources <i class="fas fa-check"></i>';
            loadMoreBtn.disabled = true;
        }, 1500);
    });
}

// Newsletter form submission (prevent default)
const newsletterForm = document.querySelector('.newsletter-form');
const footerForm = document.querySelector('.footer-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add success message
        const input = newsletterForm.querySelector('.newsletter-input');
        const value = input.value;
        
        if (value && value.includes('@')) {
            newsletterForm.innerHTML = '<p style="color: var(--primary); font-weight: 600;">Thank you for subscribing! Check your email for confirmation.</p>';
        } else {
            input.style.borderColor = 'var(--accent)';
        }
    });
}

if (footerForm) {
    footerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add success message
        const input = footerForm.querySelector('.footer-input');
        const value = input.value;
        
        if (value && value.includes('@')) {
            footerForm.innerHTML = '<p style="color: var(--primary); font-size: 14px;">Subscribed successfully!</p>';
        } else {
            input.style.borderColor = 'var(--accent)';
        }
    });
}

// Show toast notification function (for potential promos or notices)
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = 'var(--primary)';
        toast.style.color = 'var(--darker)';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = 'var(--border-radius)';
        toast.style.boxShadow = 'var(--shadow)';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        toast.style.zIndex = '1001';
        document.body.appendChild(toast);
    }
    
    // Set message and show toast
    toast.textContent = message;
    toast.style.opacity = '1';
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

// Optional: Show a promo on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        showToast("New resource: AI-Powered Resume Analysis Tool now available!");
    }, 2000);
});