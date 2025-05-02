// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// Fade-in Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Resume Preview Animation
const resumePreview = document.querySelector('.resume-preview');

let animationActive = true;
let angle = 0;

function animateResume() {
    if (!animationActive) return;
    
    angle += 0.01;
    const translateY = Math.sin(angle) * 10;
    const rotateX = 5 + (Math.sin(angle) * 2);
    const rotateY = -5 + (Math.cos(angle) * 2);
    
    resumePreview.style.transform = `perspective(1000px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    requestAnimationFrame(animateResume);
}

resumePreview.addEventListener('mouseenter', () => {
    animationActive = false;
    resumePreview.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
});

resumePreview.addEventListener('mouseleave', () => {
    animationActive = true;
    animateResume();
});

animateResume();

// Form Submission (Prevent Default)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i>';
            
            if (form.classList.contains('newsletter-form')) {
                const input = form.querySelector('input');
                input.value = '';
                input.blur();
            }
            
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        }, 1500);
    });
});