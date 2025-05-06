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

// Pricing toggle
const billingToggle = document.getElementById('billingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const yearlyLabel = document.getElementById('yearlyLabel');
const proPrice = document.getElementById('proPrice');
const proPeriod = document.getElementById('proPeriod');
const teamPrice = document.getElementById('teamPrice');
const teamPeriod = document.getElementById('teamPeriod');

// Initialize pricing for monthly (default)
let isYearly = false;

billingToggle.addEventListener('click', () => {
    isYearly = !isYearly;
    
    // Toggle active class on labels
    monthlyLabel.classList.toggle('active');
    yearlyLabel.classList.toggle('active');
    
    // Toggle switch position
    billingToggle.classList.toggle('yearly');
    
    // Update prices
    if (isYearly) {
        proPrice.innerHTML = '<span class="pricing-currency">$</span>115';
        proPeriod.textContent = 'Per year (20% off)';
        teamPrice.innerHTML = '<span class="pricing-currency">$</span>470';
        teamPeriod.textContent = 'Per year (20% off)';
    } else {
        proPrice.innerHTML = '<span class="pricing-currency">$</span>12';
        proPeriod.textContent = 'Per month';
        teamPrice.innerHTML = '<span class="pricing-currency">$</span>49';
        teamPeriod.textContent = 'Per month';
    }
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

// Set the first FAQ item as active by default
if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
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
        showToast("Special Offer: Use code NEWCAREER for 15% off Pro plans!");
    }, 2000);
});