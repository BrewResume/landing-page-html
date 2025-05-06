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
    
    // Initialize template data
    initializeTemplates();
});

// Template data
const templateData = [
    {
        id: 'cambridge-modern',
        name: 'Cambridge Modern',
        category: 'Professional',
        image: '/api/placeholder/300/400',
        previewImage: '/api/placeholder/400/600',
        description: 'A professional resume template with a modern touch. Perfect for job seekers in corporate environments who want to make a lasting impression while maintaining professionalism.',
        features: [
            'ATS-friendly structure that passes through applicant tracking systems',
            'Clean, minimalist layout with effective use of white space',
            'Customizable color accents to match your personal brand',
            'Skill bars to visually represent your competency levels'
        ],
        tags: ['ATS-Friendly', 'Customizable', 'Modern'],
        price: 'Pro',
        rating: 4.5,
        ratingCount: 428,
        isPopular: true,
        isNew: false,
        isFree: false
    },
    {
        id: 'stockholm-minimal',
        name: 'Stockholm Minimal',
        category: 'Minimal',
        image: '/api/placeholder/300/400',
        previewImage: '/api/placeholder/400/600',
        description: 'A clean, minimalist template that puts focus on your content. Perfect for professionals who prefer a straightforward, elegant presentation of their qualifications.',
        features: [
            'Ultra-clean design with perfect content hierarchy',
            'Optimized for ATS systems with standard section headings',
            'Excellent readability with carefully selected typography',
            'Minimal design elements to keep focus on your achievements'
        ],
        tags: ['Clean', 'Simple', 'ATS-Friendly'],
        price: 'Free',
        rating: 5,
        ratingCount: 612,
        isPopular: false,
        isNew: false,
        isFree: true
    },
    {
        id: 'barcelona-creative',
        name: 'Barcelona Creative',
        category: 'Creative',
        image: '/api/placeholder/300/400',
        previewImage: '/api/placeholder/400/600',
        description: 'A bold, artistic template for creative professionals. Showcase your portfolio and creative achievements with this visually striking design.',
        features: [
            'Eye-catching design with unique visual elements',
            'Portfolio section to showcase your creative work',
            'Bold typography and layout to stand out from the crowd',
            'Balanced design that remains professional while being creative'
        ],
        tags: ['Portfolio', 'Visual', 'Colorful'],
        price: 'Pro',
        rating: 4,
        ratingCount: 186,
        isPopular: false,
        isNew: true,
        isFree: false
    },
    {
        id: 'manhattan-executive',
        name: 'Manhattan Executive',
        category: 'Executive',
        image: '/api/placeholder/300/400',
        previewImage: '/api/placeholder/400/600',
        description: 'A sophisticated, premium template designed for executives and senior professionals. Project authority and experience with this elegant, refined design.',
        features: [
            'Sophisticated layout emphasizing leadership and achievements',
            'Executive summary section to highlight your career narrative',
            'Elegant typographic hierarchy that commands attention',
            'Subtle design elements that convey professionalism and authority'
        ],
        tags: ['Professional', 'Leadership', 'Elegant'],
        price: 'Pro',
        rating: 4.5,
        ratingCount: 347,
        isPopular: false,
        isNew: false,
        isFree: false
    },
    {
        id: 'silicon-valley-tech',
        name: 'Silicon Valley Tech',
        category: 'Technical',
        image: '/api/placeholder/300/400',
        previewImage: '/api/placeholder/400/600',
        description: 'A technical resume template designed for IT professionals, developers, and engineers. Showcase your technical skills and projects effectively.',
        features: [
            'Technical skills section with visual skill level indicators',
            'Project showcase with space for technologies used',
            'GitHub and portfolio links integration',
            'Clean code-inspired design aesthetic'
        ],
        tags: ['IT Focus', 'Skills Graph', 'Modern'],
        price: 'Pro',
        rating: 4,
        ratingCount: 289,
        isPopular: false,
        isNew: false,
        isFree: false
    },
    {
        id: 'oxford-classic',
        name: 'Oxford Classic',
        category: 'Traditional',
        image: '/api/placeholder/300/400',
        previewImage: '/api/placeholder/400/600',
        description: 'A timeless, traditional resume template. Professional and conservative, perfect for industries that value convention and formality.',
        features: [
            'Classic design that never goes out of style',
            'Traditional section ordering familiar to all recruiters',
            'Formal typography and layout for conservative industries',
            'ATS-optimized structure for maximum compatibility'
        ],
        tags: ['Timeless', 'ATS-Friendly', 'Conservative'],
        price: 'Free',
        rating: 4.5,
        ratingCount: 524,
        isPopular: false,
        isNew: false,
        isFree: true
    }
];

// Initialize template cards with data
function initializeTemplates() {
    const templateCards = document.querySelectorAll('.template-card');
    
    // Add preview functionality to all template cards
    templateCards.forEach((card, index) => {
        // Get the corresponding template data
        const template = templateData[index % templateData.length];
        
        // Find preview buttons in the card
        const previewBtn = card.querySelector('.template-overlay .btn-outline');
        const useTemplateBtn = card.querySelector('.template-overlay .btn-primary');
        const cardUseBtn = card.querySelector('.template-footer .btn');
        
        // Add click event for preview button
        if (previewBtn) {
            previewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openTemplateModal(template);
            });
        }
        
        // Add click event for use template buttons
        if (useTemplateBtn) {
            useTemplateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (template.isFree) {
                    window.location.href = '/editor?template=' + template.id;
                } else {
                    openTemplateModal(template);
                }
            });
        }
        
        if (cardUseBtn) {
            cardUseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (template.isFree) {
                    window.location.href = '/editor?template=' + template.id;
                } else {
                    openTemplateModal(template);
                }
            });
        }
    });
}

// Function to open the template preview modal
function openTemplateModal(template) {
    const modal = document.getElementById('templateModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalPreviewImg = modal.querySelector('#previewImage');
    const modalFeatures = modal.querySelector('.modal-features');
    const modalUseBtn = modal.querySelector('.modal-actions .btn-primary');
    
    // Update modal content with template data
    modalTitle.textContent = template.name;
    modalDescription.textContent = template.description;
    modalPreviewImg.src = template.previewImage;
    modalPreviewImg.alt = template.name;
    
    // Update features list
    let featuresHTML = '<h3 class="customize-title">Key Features</h3>';
    template.features.forEach(feature => {
        featuresHTML += `
        <div class="modal-feature-item">
            <span class="modal-feature-icon"><i class="fas fa-check"></i></span>
            <span>${feature}</span>
        </div>`;
    });
    modalFeatures.innerHTML = featuresHTML;
    
    // Update use button text based on template type
    if (template.isFree) {
        modalUseBtn.textContent = 'Use This Free Template';
    } else {
        modalUseBtn.textContent = 'Get Pro & Use Template';
    }
    
    // Set click handler for use button
    modalUseBtn.onclick = (e) => {
        e.preventDefault();
        if (template.isFree) {
            window.location.href = '/editor?template=' + template.id;
        } else {
            window.location.href = '/pricing?template=' + template.id;
        }
    };
    
    // Show the modal
    modal.classList.add('active');
}

// Close modal when clicking close button or outside the modal
document.addEventListener('click', (e) => {
    const modal = document.getElementById('templateModal');
    const modalContent = document.querySelector('.template-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (e.target === modal || e.target === closeBtn || e.target === closeBtn.querySelector('i')) {
        modal.classList.remove('active');
    }
});

// Color customization in modal
const colorOptions = document.querySelectorAll('.color-option');
const previewImage = document.getElementById('previewImage');

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        colorOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Get the color and name
        const color = option.getAttribute('data-color');
        const colorName = option.getAttribute('data-color-name');
        
        // Update CSS variable for the template preview
        document.documentElement.style.setProperty('--template-primary', color);
        
        // For this demo, we'll simulate changing the image by adding a color overlay
        previewImage.style.filter = `hue-rotate(${getHueRotation(color)}deg)`;
        
        // Show color name in a toast notification
        showToast(`Color changed to ${colorName}`);
    });
});

// Font customization in modal
const fontOptions = document.querySelectorAll('.font-option');

fontOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        fontOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Get the font name
        const font = option.getAttribute('data-font');
        
        // Update preview (in a real app, this would change the actual template preview)
        // For this demo, we'll just show a toast notification
        showToast(`Font changed to ${font}`);
    });
});

// Helper function to calculate hue rotation based on color
function getHueRotation(hexColor) {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16) / 255;
    const g = parseInt(hexColor.slice(3, 5), 16) / 255;
    const b = parseInt(hexColor.slice(5, 7), 16) / 255;
    
    // Calculate hue
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h = 0;
    
    if (max === min) {
        h = 0; // achromatic
    } else {
        let d = max - min;
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    
    // Map hue to appropriate rotation value
    // This is a simple approximation for demonstration
    return h;
}

// Toast notification function
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

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const templateCards = document.querySelectorAll('.template-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get the filter value
        const filter = button.textContent.trim().toLowerCase();
        
        // Filter templates
        templateCards.forEach((card, index) => {
            const template = templateData[index % templateData.length];
            const templateCategory = template.category.toLowerCase();
            const templateTags = template.tags.map(tag => tag.toLowerCase());
            
            if (filter === 'all templates') {
                // Show all templates
                card.style.display = 'block';
            } else if (filter === 'free' && template.isFree) {
                // Show only free templates
                card.style.display = 'block';
            } else if (filter === templateCategory || templateTags.includes(filter)) {
                // Show templates that match the category or tags
                card.style.display = 'block';
            } else {
                // Hide templates that don't match
                card.style.display = 'none';
            }
        });
        
        // Show message if no templates match the filter
        const visibleTemplates = Array.from(templateCards).filter(card => card.style.display !== 'none');
        if (visibleTemplates.length === 0) {
            showToast('No templates match this filter. Try another category.');
        }
    });
});

// Load more templates functionality
const loadMoreBtn = document.querySelector('.load-more-btn');

loadMoreBtn.addEventListener('click', () => {
    // Change button state
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        // Function to create new template cards
        function createTemplateCard(template) {
            const templateCard = document.createElement('div');
            templateCard.className = 'template-card fade-in';
            
            // Add badge if applicable
            if (template.isNew) {
                templateCard.innerHTML += `<div class="template-badge badge-new">New</div>`;
            } else if (template.isPopular) {
                templateCard.innerHTML += `<div class="template-badge badge-popular">Popular</div>`;
            } else if (template.isFree) {
                templateCard.innerHTML += `<div class="template-badge badge-free">Free</div>`;
            }
            
            // Template image
            templateCard.innerHTML += `
            <div class="template-image">
                <img src="${template.image}" alt="${template.name}">
                <div class="template-overlay">
                    <div class="template-actions">
                        <a href="#" class="btn btn-primary">Use Template</a>
                        <a href="#" class="btn btn-outline">Preview</a>
                    </div>
                </div>
            </div>
            `;
            
            // Template info
            templateCard.innerHTML += `
            <div class="template-info">
                <h3 class="template-name">${template.name}</h3>
                <div class="template-meta">
                    <span class="template-category">${template.category}</span>
                    <div class="template-rating">
                        <div class="stars">
                            ${generateStars(template.rating)}
                        </div>
                        <span class="rating-count">(${template.ratingCount})</span>
                    </div>
                </div>
                <div class="template-features">
                    ${template.tags.map(tag => `<span class="template-feature">${tag}</span>`).join('')}
                </div>
                <div class="template-footer">
                    <div class="template-price ${template.isFree ? 'price-free' : 'price-pro'}">${template.isFree ? 'Free' : 'Pro'}</div>
                    <a href="#" class="btn ${template.isFree ? 'btn-primary' : 'btn-outline'}">Use Template</a>
                </div>
            </div>
            `;
            
            return templateCard;
        }
        
        // Function to generate star ratings
        function generateStars(rating) {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(rating)) {
                    stars += '<i class="fas fa-star"></i>';
                } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                    stars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            return stars;
        }
        
        // New templates to add
        const newTemplates = [
            {
                id: 'tokyo-tech',
                name: 'Tokyo Tech',
                category: 'Modern',
                image: '/api/placeholder/300/400',
                previewImage: '/api/placeholder/400/600',
                description: 'A sleek, modern template with Japanese-inspired aesthetics. Clean lines and intelligent spacing make your experience stand out.',
                features: [
                    'Modern, tech-inspired design elements',
                    'Structured sections with minimalist separators',
                    'Adaptable layout for various content amounts',
                    'Bold yet professional typography'
                ],
                tags: ['Modern', 'Tech', 'Sleek'],
                price: 'Pro',
                rating: 4.8,
                ratingCount: 105,
                isPopular: false,
                isNew: true,
                isFree: false
            },
            {
                id: 'berlin-bold',
                name: 'Berlin Bold',
                category: 'Creative',
                image: '/api/placeholder/300/400',
                previewImage: '/api/placeholder/400/600',
                description: 'A bold, attention-grabbing template that uses strong typography and accents to create a memorable impression.',
                features: [
                    'Striking typography to command attention',
                    'Bold color accents for strategic highlighting',
                    'Unique section styling that remains readable',
                    'Perfect for creatives who want to stand out'
                ],
                tags: ['Bold', 'Distinctive', 'Creative'],
                price: 'Pro',
                rating: 4.3,
                ratingCount: 67,
                isPopular: false,
                isNew: true,
                isFree: false
            },
            {
                id: 'dublin-academic',
                name: 'Dublin Academic',
                category: 'Academic',
                image: '/api/placeholder/300/400',
                previewImage: '/api/placeholder/400/600',
                description: 'A professional template designed specifically for academics, researchers, and educators, with space for publications and research.',
                features: [
                    'Publications section with citation formatting',
                    'Research projects and grants highlights',
                    'Teaching experience specialized section',
                    'Conference presentations and academic achievements'
                ],
                tags: ['Academic', 'Professional', 'Research'],
                price: 'Pro',
                rating: 4.7,
                ratingCount: 89,
                isPopular: false,
                isNew: false,
                isFree: false
            },
            {
                id: 'paris-elegant',
                name: 'Paris Elegant',
                category: 'Elegant',
                image: '/api/placeholder/300/400',
                previewImage: '/api/placeholder/400/600',
                description: 'A sophisticated, elegant template with refined typography and subtle design elements. Perfect for luxury industries and executive roles.',
                features: [
                    'Refined typography with careful attention to detail',
                    'Subtle gold accents (customizable to other colors)',
                    'Elegant spacing and proportions throughout',
                    'Perfect for fashion, luxury goods, and executive roles'
                ],
                tags: ['Elegant', 'Sophisticated', 'Luxury'],
                price: 'Pro',
                rating: 4.9,
                ratingCount: 124,
                isPopular: true,
                isNew: false,
                isFree: false
            },
            {
                id: 'sydney-starter',
                name: 'Sydney Starter',
                category: 'Simple',
                image: '/api/placeholder/300/400',
                previewImage: '/api/placeholder/400/600',
                description: 'A perfect template for entry-level professionals and recent graduates. Clear, straightforward, and professional.',
                features: [
                    'Clean design focused on readability',
                    'Education and skills sections emphasized',
                    'Space for projects and internships',
                    'Optional sections for volunteer work and activities'
                ],
                tags: ['Simple', 'Entry-Level', 'Graduate'],
                price: 'Free',
                rating: 4.6,
                ratingCount: 215,
                isPopular: false,
                isNew: false,
                isFree: true
            },
            {
                id: 'vienna-classic',
                name: 'Vienna Classic',
                category: 'Traditional',
                image: '/api/placeholder/300/400',
                previewImage: '/api/placeholder/400/600',
                description: 'A timeless, classic template with tasteful design elements. Perfect for professionals in traditional industries.',
                features: [
                    'Timeless design that never goes out of style',
                    'Subtle decorative elements for elegant touches',
                    'Perfect balance of white space and content',
                    'Ideal for legal, finance, and consulting roles'
                ],
                tags: ['Classic', 'Timeless', 'Traditional'],
                price: 'Pro',
                rating: 4.5,
                ratingCount: 176,
                isPopular: false,
                isNew: false,
                isFree: false
            }
        ];
        
        // Get the template grid
        const templatesGrid = document.querySelector('.templates-grid');
        
        // Add new templates
        newTemplates.forEach(template => {
            // Create template card and add to grid
            const card = createTemplateCard(template);
            templatesGrid.appendChild(card);
            
            // Add animation class
            setTimeout(() => {
                card.classList.add('active');
            }, 100);
            
            // Add to template data array
            templateData.push(template);
        });
        
        // Update filter for new templates
        const currentFilter = document.querySelector('.filter-btn.active').textContent.trim().toLowerCase();
        if (currentFilter !== 'all templates') {
            const newCards = Array.from(templatesGrid.querySelectorAll('.template-card:nth-child(n+7)'));
            
            newCards.forEach((card, index) => {
                const template = newTemplates[index];
                const templateCategory = template.category.toLowerCase();
                const templateTags = template.tags.map(tag => tag.toLowerCase());
                
                if (currentFilter === 'free' && template.isFree) {
                    card.style.display = 'block';
                } else if (currentFilter === templateCategory || templateTags.includes(currentFilter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // Add preview functionality to new cards
        const newTemplateCards = document.querySelectorAll('.template-card:nth-child(n+7)');
        newTemplateCards.forEach((card, index) => {
            const template = newTemplates[index];
            
            // Find preview buttons in the card
            const previewBtn = card.querySelector('.template-overlay .btn-outline');
            const useTemplateBtn = card.querySelector('.template-overlay .btn-primary');
            const cardUseBtn = card.querySelector('.template-footer .btn');
            
            // Add click event for preview button
            if (previewBtn) {
                previewBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    openTemplateModal(template);
                });
            }
            
            // Add click event for use template buttons
            if (useTemplateBtn) {
                useTemplateBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (template.isFree) {
                        window.location.href = '/editor?template=' + template.id;
                    } else {
                        openTemplateModal(template);
                    }
                });
            }
            
            if (cardUseBtn) {
                cardUseBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (template.isFree) {
                        window.location.href = '/editor?template=' + template.id;
                    } else {
                        openTemplateModal(template);
                    }
                });
            }
        });
        
        // Update load more button
        loadMoreBtn.style.display = 'none';
        
        // Show all templates loaded message
        showToast('All templates loaded successfully!');
    }, 1500);
});

// Add custom color theme selector
const templates = document.getElementById('templates');

// Check if we need to add the color theme customizer
if (templates) {
    // Create color theme customizer section
    const customizerSection = document.createElement('div');
    customizerSection.className = 'container';
    customizerSection.innerHTML = `
        <div class="customizer-header fade-in">
            <h2 class="customizer-title">Try Different <span class="text-gradient">Color Themes</span></h2>
            <p class="customizer-subtitle">Preview how our templates look with different color schemes. Find the perfect palette for your personal brand.</p>
        </div>
        
        <div class="color-theme-container fade-in">
            <div class="color-theme" data-theme="mint">
                <div class="color-preview active">
                    <div class="color-primary" style="background-color: #64FFDA;"></div>
                    <div class="color-secondary" style="background-color: #7F5AF0;"></div>
                    <div class="color-accent" style="background-color: #FF6B6B;"></div>
                </div>
                <span>Mint Breeze</span>
            </div>
            
            <div class="color-theme" data-theme="azure">
                <div class="color-preview">
                    <div class="color-primary" style="background-color: #5E8BFF;"></div>
                    <div class="color-secondary" style="background-color: #FF965B;"></div>
                    <div class="color-accent" style="background-color: #7C5CFF;"></div>
                </div>
                <span>Azure Sky</span>
            </div>
            
            <div class="color-theme" data-theme="rose">
                <div class="color-preview">
                    <div class="color-primary" style="background-color: #FF5584;"></div>
                    <div class="color-secondary" style="background-color: #5E8BFF;"></div>
                    <div class="color-accent" style="background-color: #FFBD59;"></div>
                </div>
                <span>Rose Petal</span>
            </div>
            
            <div class="color-theme" data-theme="emerald">
                <div class="color-preview">
                    <div class="color-primary" style="background-color: #50C878;"></div>
                    <div class="color-secondary" style="background-color: #4A8FE7;"></div>
                    <div class="color-accent" style="background-color: #9D50BB;"></div>
                </div>
                <span>Emerald Forest</span>
            </div>
            
            <div class="color-theme" data-theme="sunset">
                <div class="color-preview">
                    <div class="color-primary" style="background-color: #FF965B;"></div>
                    <div class="color-secondary" style="background-color: #FF5584;"></div>
                    <div class="color-accent" style="background-color: #5E8BFF;"></div>
                </div>
                <span>Sunset Glow</span>
            </div>
        </div>
    `;
    
    // Add customizer section before the industry templates section
    const industryTemplates = document.querySelector('.industry-templates');
    if (industryTemplates) {
        industryTemplates.parentNode.insertBefore(customizerSection, industryTemplates);
    }
    
    // Color theme functionality
    setTimeout(() => {
        const colorThemes = document.querySelectorAll('.color-theme');
        const allTemplateImages = document.querySelectorAll('.template-card .template-image img');
        
        colorThemes.forEach(theme => {
            theme.addEventListener('click', () => {
                // Remove active class from all themes
                colorThemes.forEach(t => t.querySelector('.color-preview').classList.remove('active'));
                
                // Add active class to clicked theme
                theme.querySelector('.color-preview').classList.add('active');
                
                // Get the theme colors
                const primary = theme.querySelector('.color-primary').style.backgroundColor;
                const secondary = theme.querySelector('.color-secondary').style.backgroundColor;
                const accent = theme.querySelector('.color-accent').style.backgroundColor;
                
                // Update CSS variables
                document.documentElement.style.setProperty('--template-primary', primary);
                document.documentElement.style.setProperty('--template-secondary', secondary);
                document.documentElement.style.setProperty('--template-accent', accent);
                
                // Apply subtle filter to template images to simulate color change
                const themeName = theme.getAttribute('data-theme');
                let filterValue = '';
                
                switch (themeName) {
                    case 'mint':
                        filterValue = 'hue-rotate(0deg)';
                        break;
                    case 'azure':
                        filterValue = 'hue-rotate(210deg)';
                        break;
                    case 'rose':
                        filterValue = 'hue-rotate(320deg)';
                        break;
                    case 'emerald':
                        filterValue = 'hue-rotate(120deg)';
                        break;
                    case 'sunset':
                        filterValue = 'hue-rotate(30deg)';
                        break;
                }
                
                allTemplateImages.forEach(img => {
                    img.style.filter = filterValue;
                });
                
                // Show toast notification
                showToast(`Theme changed to ${theme.querySelector('span').textContent}`);
            });
        });
    }, 1000);
}

// Initialize search functionality
const searchBar = document.createElement('div');
searchBar.className = 'search-bar fade-in';
searchBar.innerHTML = `
    <input type="text" id="template-search" placeholder="Search templates...">
    <button class="search-btn"><i class="fas fa-search"></i></button>
`;

// Add search bar to filters container
const templateFilters = document.querySelector('.template-filters');
if (templateFilters) {
    templateFilters.parentNode.insertBefore(searchBar, templateFilters);
    
    // Style the search bar
    searchBar.style.margin = '0 auto 30px';
    searchBar.style.maxWidth = '600px';
    searchBar.style.display = 'flex';
    searchBar.style.position = 'relative';
    
    const searchInput = document.getElementById('template-search');
    if (searchInput) {
        searchInput.style.width = '100%';
        searchInput.style.padding = '12px 20px';
        searchInput.style.borderRadius = 'var(--border-radius)';
        searchInput.style.backgroundColor = 'var(--gray-100)';
        searchInput.style.border = '2px solid var(--gray-200)';
        searchInput.style.color = 'var(--light)';
        searchInput.style.fontSize = '15px';
        
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.style.position = 'absolute';
            searchBtn.style.right = '10px';
            searchBtn.style.top = '50%';
            searchBtn.style.transform = 'translateY(-50%)';
            searchBtn.style.backgroundColor = 'transparent';
            searchBtn.style.border = 'none';
            searchBtn.style.color = 'var(--gray-400)';
            searchBtn.style.fontSize = '18px';
            searchBtn.style.cursor = 'pointer';
            
            // Search functionality
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
            
            function performSearch() {
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                if (searchTerm === '') {
                    // If search is empty, reset to show all templates
                    document.querySelector('.filter-btn[data-filter="all"]').click();
                    return;
                }
                
                // Filter templates based on search term
                let foundCount = 0;
                templateCards.forEach((card, index) => {
                    const template = templateData[index % templateData.length];
                    const name = template.name.toLowerCase();
                    const category = template.category.toLowerCase();
                    const description = template.description ? template.description.toLowerCase() : '';
                    const tags = template.tags.join(' ').toLowerCase();
                    
                    if (name.includes(searchTerm) || 
                        category.includes(searchTerm) || 
                        description.includes(searchTerm) || 
                        tags.includes(searchTerm)) {
                        // Show matching templates
                        card.style.display = 'block';
                        foundCount++;
                    } else {
                        // Hide non-matching templates
                        card.style.display = 'none';
                    }
                });
                
                // Reset filter buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Show results message
                if (foundCount === 0) {
                    showToast(`No templates match "${searchTerm}". Try another search term.`);
                } else {
                    showToast(`Found ${foundCount} templates matching "${searchTerm}"`);
                }
            }
        }
    }
}