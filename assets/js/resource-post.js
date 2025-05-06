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
    
    // Table of Contents highlighting on scroll
    const articleHeadings = document.querySelectorAll('.content h2, .content h3');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    // Create a map of heading IDs to TOC links
    const headingMap = {};
    
    // Add IDs to headings if they don't have them
    articleHeadings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }
    });
    
    // Set href attributes for TOC links
    tocLinks.forEach((link, index) => {
        if (index < articleHeadings.length) {
            link.setAttribute('href', '#' + articleHeadings[index].id);
            headingMap[articleHeadings[index].id] = link;
        }
    });
    
    // Highlight active TOC link on scroll
    window.addEventListener('scroll', () => {
        let activeHeading = null;
        
        articleHeadings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                activeHeading = heading.id;
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        if (activeHeading && headingMap[activeHeading]) {
            headingMap[activeHeading].classList.add('active');
        }
    });
});

// Smooth scroll for TOC links
document.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

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

// Comment form submission (prevent default)
const commentForm = document.querySelector('.comment-form form');

if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show a message that comment is under review
        commentForm.innerHTML = '<p style="color: var(--primary); font-weight: 600;">Thank you for your comment! It is currently under review and will appear soon.</p>';
    });
}

// Like comment action
document.querySelectorAll('.comment-action').forEach(action => {
    action.addEventListener('click', function() {
        if (this.querySelector('i').classList.contains('far')) {
            this.querySelector('i').classList.remove('far');
            this.querySelector('i').classList.add('fas');
            this.style.color = 'var(--primary)';
        } else {
            this.querySelector('i').classList.remove('fas');
            this.querySelector('i').classList.add('far');
            this.style.color = 'var(--gray-400)';
        }
    });
});

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

// Optional: Show a related content suggestion on scroll
let hasShownSuggestion = false;

window.addEventListener('scroll', () => {
    if (!hasShownSuggestion && window.scrollY > document.body.scrollHeight * 0.7) {
        showToast("Try our Achievement Bullet Generator Tool to create perfect resume bullets!");
        hasShownSuggestion = true;
    }
});