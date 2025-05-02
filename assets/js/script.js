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

// Fix header alignment on document load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure mobile menu position is correct
    const setMobileMenuPosition = () => {
        if (window.innerWidth <= 991) {
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            navMenu.style.paddingTop = `${headerHeight + 20}px`;
        } else {
            navMenu.style.paddingTop = '0';
        }
    };

    // Call initially and on window resize
    setMobileMenuPosition();
    window.addEventListener('resize', setMobileMenuPosition);

    // Fix button size in mobile view
    const adjustButtonSize = () => {
        const buttons = document.querySelectorAll('.btn');
        if (window.innerWidth <= 768) {
            buttons.forEach(button => {
                if (button.classList.contains('btn-lg')) {
                    button.style.padding = '8px 20px';
                    button.style.fontSize = '0.9rem';
                } else {
                    button.style.padding = '6px 16px';
                    button.style.fontSize = '0.85rem';
                }
            });
        } else {
            buttons.forEach(button => {
                if (button.classList.contains('btn-lg')) {
                    button.style.padding = '10px 24px';
                    button.style.fontSize = '1rem';
                } else {
                    button.style.padding = '8px 20px';
                    button.style.fontSize = '0.9rem';
                }
            });
        }
    };

    adjustButtonSize();
    window.addEventListener('resize', adjustButtonSize);
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

// Resume Preview Animation - Subtle version
const resumePreview = document.querySelector('.resume-preview');

let animationActive = true;
let angle = 0;

function animateResume() {
    if (!animationActive) return;
    
    angle += 0.004; // Slower animation for subtlety
    const translateY = Math.sin(angle) * 4; // Reduced movement
    const rotateX = 2 + (Math.sin(angle) * 0.8); // Reduced rotation
    const rotateY = -2 + (Math.cos(angle) * 0.8); // Reduced rotation
    
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
// const forms = document.querySelectorAll('form');
// forms.forEach(form => {
//     form.addEventListener('submit', e => {
//         e.preventDefault();
//         const button = form.querySelector('button[type="submit"]');
//         const originalText = button.innerHTML;
        
//         button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
//         setTimeout(() => {
//             button.innerHTML = '<i class="fas fa-check"></i>';
            
//             if (form.classList.contains('newsletter-form')) {
//                 const input = form.querySelector('input');
//                 input.value = '';
//                 input.blur();
//             }
            
//             setTimeout(() => {
//                 button.innerHTML = originalText;
//             }, 1500);
//         }, 1000);
//     });
// });

// Fix feature cards to have same height in each row
window.addEventListener('load', () => {
    const equalizeCardHeights = () => {
        // For feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        let maxHeight = 0;
        
        // Reset heights first
        featureCards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Find max height
        featureCards.forEach(card => {
            if (card.offsetHeight > maxHeight) {
                maxHeight = card.offsetHeight;
            }
        });
        
        // Apply max height to all cards
        if (maxHeight > 0 && window.innerWidth > 768) {
            featureCards.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        }
        
        // Same for pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card:not(.popular)');
        maxHeight = 0;
        
        pricingCards.forEach(card => {
            card.style.height = 'auto';
        });
        
        pricingCards.forEach(card => {
            if (card.offsetHeight > maxHeight) {
                maxHeight = card.offsetHeight;
            }
        });
        
        if (maxHeight > 0 && window.innerWidth > 768) {
            pricingCards.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        }
    };
    
    // Run on load and resize
    equalizeCardHeights();
    window.addEventListener('resize', equalizeCardHeights);
});

// Enhanced Resume Preview Animation
document.addEventListener('DOMContentLoaded', () => {
    // Get the resume elements
    const resumePreview = document.querySelector('.resume-preview');
    const resumeHeader = document.querySelector('.resume-header');
    const resumeDivider = document.querySelector('.resume-divider');
    const resumeSections = document.querySelectorAll('.resume-section');
    const resumeItems = document.querySelectorAll('.resume-item');
    const resumeSkills = document.querySelectorAll('.resume-skill');
    const decorations = document.querySelectorAll('.resume-decoration');
    
    // Base floating animation for the entire preview
    let animationActive = true;
    let angle = 0;
    
    function animateResumeFloat() {
        if (!animationActive) return;
        
        angle += 0.003; // Very slow subtle movement
        const translateY = Math.sin(angle) * 4; // Small vertical movement
        const rotateX = 2 + (Math.sin(angle) * 0.8); 
        const rotateY = -2 + (Math.cos(angle) * 0.8);
        
        resumePreview.style.transform = `perspective(1000px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        requestAnimationFrame(animateResumeFloat);
    }
    
    // Hover effect with enhanced details
    resumePreview.addEventListener('mouseenter', () => {
        animationActive = false;
        resumePreview.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)';
        resumePreview.style.boxShadow = '0 20px 40px rgba(0,0,0,0.8)';
        resumePreview.style.transition = 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        // Add subtle glow effect
        resumePreview.style.border = '1px solid rgba(100, 255, 218, 0.3)';
        
        // Animate decorations
        decorations.forEach(decoration => {
            decoration.style.transform = 'scale(1.1)';
            decoration.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        });
    });
    
    resumePreview.addEventListener('mouseleave', () => {
        animationActive = true;
        resumePreview.style.boxShadow = 'var(--shadow-lg)';
        resumePreview.style.border = '1px solid rgba(255, 255, 255, 0.05)';
        
        // Reset decorations
        decorations.forEach(decoration => {
            decoration.style.transform = 'scale(1)';
        });
        
        animateResumeFloat();
    });
    
    // Initial content reveal animation
    function animateResumeContent() {
        // Animate name and title with delay
        resumeHeader.style.opacity = '0';
        resumeHeader.style.transform = 'translateY(-10px)';
        resumeHeader.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        setTimeout(() => {
            resumeHeader.style.opacity = '1';
            resumeHeader.style.transform = 'translateY(0)';
        }, 300);
        
        // Animate divider with delay
        resumeDivider.style.width = '0';
        resumeDivider.style.transition = 'width 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        setTimeout(() => {
            resumeDivider.style.width = '100%';
        }, 500);
        
        // Animate sections with cascade effect
        resumeSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(15px)';
            section.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 700 + (index * 200));
        });
        
        // Animate items with subtle delay
        resumeItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
            item.style.transition = 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 900 + (index * 120));
        });
        
        // Animate skills with popping effect
        resumeSkills.forEach((skill, index) => {
            skill.style.opacity = '0';
            skill.style.transform = 'scale(0.8)';
            skill.style.transition = 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            setTimeout(() => {
                skill.style.opacity = '1';
                skill.style.transform = 'scale(1)';
            }, 1200 + (index * 150));
        });
        
        // Add subtle pulse animation to skills after initial reveal
        setTimeout(() => {
            resumeSkills.forEach(skill => {
                skill.style.animation = 'skillPulse 3s infinite alternate';
            });
            
            // Add the keyframe animation to the document
            const styleSheet = document.createElement('style');
            styleSheet.innerHTML = `
                @keyframes skillPulse {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.05); box-shadow: 0 0 8px rgba(100, 255, 218, 0.4); }
                }
            `;
            document.head.appendChild(styleSheet);
        }, 2000);
    }
    
    // Add decoration animation
    function animateDecorations() {
        decorations.forEach(decoration => {
            decoration.style.animation = 'decorationFloat 12s infinite alternate ease-in-out';
        });
        
        // Add different timing to each decoration for variation
        if (decorations[0]) decorations[0].style.animationDelay = '0s';
        if (decorations[1]) decorations[1].style.animationDelay = '-6s';
        
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            @keyframes decorationFloat {
                0% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
                50% { transform: translateY(-15px) rotate(5deg); opacity: 0.7; }
                100% { transform: translateY(15px) rotate(-5deg); opacity: 0.5; }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Start all animations
    animateResumeFloat();
    
    // Add a slight delay before starting content animations
    // to ensure they happen after the page loads
    setTimeout(() => {
        animateResumeContent();
        animateDecorations();
    }, 500);
    
    // Add interactive highlight effect on mousemove
    resumePreview.addEventListener('mousemove', (e) => {
        if (!animationActive) {
            const rect = resumePreview.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate percentages of mouse position
            const percentX = mouseX / rect.width;
            const percentY = mouseY / rect.height;
            
            // Calculate rotation based on mouse position (subtle effect)
            const rotateY = (percentX - 0.5) * 5; // -2.5 to 2.5 degrees
            const rotateX = (0.5 - percentY) * 5; // -2.5 to 2.5 degrees
            
            // Apply transform with smooth transition
            resumePreview.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            
            // Create highlight effect based on mouse position
            const gradientX = mouseX / rect.width * 100;
            const gradientY = mouseY / rect.height * 100;
            
            // Add subtle light reflection effect
            resumePreview.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, 
                                              rgba(100, 255, 218, 0.03) 0%, 
                                              rgba(36, 38, 41, 1) 60%)`;
        }
    });
});

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

// Fix header alignment on document load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure mobile menu position is correct
    const setMobileMenuPosition = () => {
        if (window.innerWidth <= 991) {
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            navMenu.style.paddingTop = `${headerHeight + 20}px`;
        } else {
            navMenu.style.paddingTop = '0';
        }
    };

    // Call initially and on window resize
    setMobileMenuPosition();
    window.addEventListener('resize', setMobileMenuPosition);

    // Fix button size in mobile view
    const adjustButtonSize = () => {
        const buttons = document.querySelectorAll('.btn');
        if (window.innerWidth <= 768) {
            buttons.forEach(button => {
                if (button.classList.contains('btn-lg')) {
                    button.style.padding = '8px 20px';
                    button.style.fontSize = '0.9rem';
                } else {
                    button.style.padding = '6px 16px';
                    button.style.fontSize = '0.85rem';
                }
            });
        } else {
            buttons.forEach(button => {
                if (button.classList.contains('btn-lg')) {
                    button.style.padding = '10px 24px';
                    button.style.fontSize = '1rem';
                } else {
                    button.style.padding = '8px 20px';
                    button.style.fontSize = '0.9rem';
                }
            });
        }
    };

    adjustButtonSize();
    window.addEventListener('resize', adjustButtonSize);
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

// Enhanced Resume Preview Animation
function initResumeAnimation() {
    // Get the resume elements
    const resumePreview = document.querySelector('.resume-preview');
    if (!resumePreview) return; // Exit if the resume preview doesn't exist on this page
    
    const resumeHeader = document.querySelector('.resume-header');
    const resumeDivider = document.querySelector('.resume-divider');
    const resumeSections = document.querySelectorAll('.resume-section');
    const resumeItems = document.querySelectorAll('.resume-item');
    const resumeSkills = document.querySelectorAll('.resume-skill');
    const decorations = document.querySelectorAll('.resume-decoration');
    
    // Base floating animation for the entire preview
    let animationActive = true;
    let angle = 0;
    
    function animateResumeFloat() {
        if (!animationActive) return;
        
        angle += 0.003; // Very slow subtle movement
        const translateY = Math.sin(angle) * 4; // Small vertical movement
        const rotateX = 2 + (Math.sin(angle) * 0.8); 
        const rotateY = -2 + (Math.cos(angle) * 0.8);
        
        resumePreview.style.transform = `perspective(1000px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        requestAnimationFrame(animateResumeFloat);
    }
    
    // Hover effect with enhanced details
    resumePreview.addEventListener('mouseenter', () => {
        animationActive = false;
        resumePreview.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)';
        resumePreview.style.boxShadow = '0 20px 40px rgba(0,0,0,0.8)';
        resumePreview.style.transition = 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        // Add subtle glow effect
        resumePreview.style.border = '1px solid rgba(100, 255, 218, 0.3)';
        
        // Animate decorations
        decorations.forEach(decoration => {
            decoration.style.transform = 'scale(1.1)';
            decoration.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        });
    });
    
    resumePreview.addEventListener('mouseleave', () => {
        animationActive = true;
        resumePreview.style.boxShadow = 'var(--shadow-lg)';
        resumePreview.style.border = '1px solid rgba(255, 255, 255, 0.05)';
        
        // Reset decorations
        decorations.forEach(decoration => {
            decoration.style.transform = 'scale(1)';
        });
        
        animateResumeFloat();
    });
    
    // Initial content reveal animation
    function animateResumeContent() {
        // Animate name and title with delay
        resumeHeader.style.opacity = '0';
        resumeHeader.style.transform = 'translateY(-10px)';
        resumeHeader.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        setTimeout(() => {
            resumeHeader.style.opacity = '1';
            resumeHeader.style.transform = 'translateY(0)';
        }, 300);
        
        // Animate divider with delay
        resumeDivider.style.width = '0';
        resumeDivider.style.transition = 'width 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        setTimeout(() => {
            resumeDivider.style.width = '100%';
        }, 500);
        
        // Animate sections with cascade effect
        resumeSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(15px)';
            section.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 700 + (index * 200));
        });
        
        // Animate items with subtle delay
        resumeItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
            item.style.transition = 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 900 + (index * 120));
        });
        
        // Animate skills with popping effect
        resumeSkills.forEach((skill, index) => {
            skill.style.opacity = '0';
            skill.style.transform = 'scale(0.8)';
            skill.style.transition = 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            setTimeout(() => {
                skill.style.opacity = '1';
                skill.style.transform = 'scale(1)';
            }, 1200 + (index * 150));
        });
        
        // Add subtle pulse animation to skills after initial reveal
        setTimeout(() => {
            resumeSkills.forEach(skill => {
                skill.style.animation = 'skillPulse 3s infinite alternate';
            });
            
            // Add the keyframe animation to the document
            const styleSheet = document.createElement('style');
            styleSheet.innerHTML = `
                @keyframes skillPulse {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.05); box-shadow: 0 0 8px rgba(100, 255, 218, 0.4); }
                }
            `;
            document.head.appendChild(styleSheet);
        }, 2000);
    }
    
    // Add decoration animation
    function animateDecorations() {
        decorations.forEach(decoration => {
            decoration.style.animation = 'decorationFloat 12s infinite alternate ease-in-out';
        });
        
        // Add different timing to each decoration for variation
        if (decorations[0]) decorations[0].style.animationDelay = '0s';
        if (decorations[1]) decorations[1].style.animationDelay = '-6s';
        
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            @keyframes decorationFloat {
                0% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
                50% { transform: translateY(-15px) rotate(5deg); opacity: 0.7; }
                100% { transform: translateY(15px) rotate(-5deg); opacity: 0.5; }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Start all animations
    animateResumeFloat();
    
    // Add a slight delay before starting content animations
    // to ensure they happen after the page loads
    setTimeout(() => {
        animateResumeContent();
        animateDecorations();
    }, 500);
    
    // Add interactive highlight effect on mousemove
    resumePreview.addEventListener('mousemove', (e) => {
        if (!animationActive) {
            const rect = resumePreview.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate percentages of mouse position
            const percentX = mouseX / rect.width;
            const percentY = mouseY / rect.height;
            
            // Calculate rotation based on mouse position (subtle effect)
            const rotateY = (percentX - 0.5) * 5; // -2.5 to 2.5 degrees
            const rotateX = (0.5 - percentY) * 5; // -2.5 to 2.5 degrees
            
            // Apply transform with smooth transition
            resumePreview.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            
            // Create highlight effect based on mouse position
            const gradientX = mouseX / rect.width * 100;
            const gradientY = mouseY / rect.height * 100;
            
            // Add subtle light reflection effect
            resumePreview.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, 
                                              rgba(100, 255, 218, 0.03) 0%, 
                                              rgba(36, 38, 41, 1) 60%)`;
        }
    });
}

// Resource Card Hover Effects
function initResourceCardEffects() {
    const resourceCards = document.querySelectorAll('.resource-card');
    if (!resourceCards.length) return; // Exit if no resource cards on this page
    
    resourceCards.forEach(card => {
        const icon = card.querySelector('.resource-icon i');
        const link = card.querySelector('.resource-link');
        
        card.addEventListener('mouseenter', () => {
            // Subtle icon animation
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s var(--ease)';
            
            // Link arrow animation
            const arrow = link.querySelector('i');
            arrow.style.transform = 'translateX(4px)';
            arrow.style.transition = 'transform 0.3s var(--ease)';
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset animations
            icon.style.transform = 'scale(1)';
            
            const arrow = link.querySelector('i');
            arrow.style.transform = 'translateX(0)';
        });
    });
}

// Fix feature cards to have same height in each row
function equalizeCardHeights() {
    // For feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length) {
        let maxHeight = 0;
        
        // Reset heights first
        featureCards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Find max height
        featureCards.forEach(card => {
            if (card.offsetHeight > maxHeight) {
                maxHeight = card.offsetHeight;
            }
        });
        
        // Apply max height to all cards
        if (maxHeight > 0 && window.innerWidth > 768) {
            featureCards.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        }
    }
    
    // Same for pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card:not(.popular)');
    if (pricingCards.length) {
        let maxHeight = 0;
        
        pricingCards.forEach(card => {
            card.style.height = 'auto';
        });
        
        pricingCards.forEach(card => {
            if (card.offsetHeight > maxHeight) {
                maxHeight = card.offsetHeight;
            }
        });
        
        if (maxHeight > 0 && window.innerWidth > 768) {
            pricingCards.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        }
    }
    
    // And for resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    if (resourceCards.length) {
        let maxHeight = 0;
        
        resourceCards.forEach(card => {
            card.style.height = 'auto';
        });
        
        resourceCards.forEach(card => {
            if (card.offsetHeight > maxHeight) {
                maxHeight = card.offsetHeight;
            }
        });
        
        if (maxHeight > 0 && window.innerWidth > 768) {
            resourceCards.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        }
    }
}

// Initialize all components
window.addEventListener('load', () => {
    fadeInOnScroll(); // Initial fade check on load
    initResumeAnimation(); // Start resume animations
    initResourceCardEffects(); // Initialize resource card hover effects
    equalizeCardHeights(); // Fix card heights
    
    // Run equalizer on resize as well
    window.addEventListener('resize', equalizeCardHeights);
});

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
            }, 1500);
        }, 1000);
    });
});