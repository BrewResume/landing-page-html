// Template data - normally this would come from a backend API
const templateData = [
    {
        id: 1,
        name: "Stockholm",
        description: "Clean and professional template ideal for corporate roles",
        image: "/api/placeholder/280/360",
        categories: ["Professional", "Modern"],
        featured: true,
        pro: false,
        colors: ["teal", "blue", "purple", "green"]
    },
    {
        id: 2,
        name: "Berlin",
        description: "Bold, modern design with standout section headers",
        image: "/api/placeholder/280/360",
        categories: ["Creative", "Modern"],
        featured: false,
        pro: false,
        colors: ["blue", "teal", "red", "purple"]
    },
    {
        id: 3,
        name: "Tokyo",
        description: "Minimal and elegant with a subtle sidebar accent",
        image: "/api/placeholder/280/360",
        categories: ["Minimal", "Elegant"],
        featured: false,
        pro: true,
        colors: ["purple", "blue", "teal", "green"]
    },
    {
        id: 4,
        name: "Madrid",
        description: "Traditional layout with a modern twist, perfect for any field",
        image: "/api/placeholder/280/360",
        categories: ["Professional", "Classic"],
        featured: false,
        pro: false,
        colors: ["green", "blue", "teal", "red"]
    },
    {
        id: 5,
        name: "Sydney",
        description: "Creative and unique two-column layout with stylish accents",
        image: "/api/placeholder/280/360",
        categories: ["Creative", "Bold"],
        featured: false,
        pro: true,
        colors: ["red", "purple", "blue", "teal"]
    },
    {
        id: 6,
        name: "Paris",
        description: "Elegant template with sophisticated typography",
        image: "/api/placeholder/280/360",
        categories: ["Elegant", "Executive"],
        featured: true,
        pro: false,
        colors: ["teal", "blue", "purple", "green"]
    },
    {
        id: 7,
        name: "New York",
        description: "Bold and confident design for high-impact professionals",
        image: "/api/placeholder/280/360",
        categories: ["Bold", "Modern"],
        featured: false,
        pro: false,
        colors: ["blue", "teal", "red", "purple"]
    },
    {
        id: 8,
        name: "Oslo",
        description: "Minimalist design with focus on readability and content",
        image: "/api/placeholder/280/360",
        categories: ["Simple", "Clean"],
        featured: false,
        pro: true,
        colors: ["green", "blue", "teal", "purple"]
    },
    // Additional templates for pagination
    {
        id: 9,
        name: "Montreal",
        description: "Modern template with a creative edge for creative professionals",
        image: "/api/placeholder/280/360",
        categories: ["Creative", "Modern"],
        featured: false,
        pro: false,
        colors: ["purple", "teal", "blue", "red"]
    },
    {
        id: 10,
        name: "Vienna",
        description: "Classic template with traditional formatting for conservative fields",
        image: "/api/placeholder/280/360",
        categories: ["Classic", "Professional"],
        featured: false,
        pro: false,
        colors: ["blue", "teal", "green", "purple"]
    },
    {
        id: 11,
        name: "Singapore",
        description: "Clean, minimalist design with a focus on skills and experience",
        image: "/api/placeholder/280/360",
        categories: ["Minimal", "Clean"],
        featured: false,
        pro: true,
        colors: ["teal", "blue", "purple", "green"]
    },
    {
        id: 12,
        name: "Amsterdam",
        description: "Creative design with unique visual elements for standing out",
        image: "/api/placeholder/280/360",
        categories: ["Creative", "Bold"],
        featured: false,
        pro: true,
        colors: ["red", "blue", "teal", "purple"]
    },
    {
        id: 13,
        name: "Toronto",
        description: "Professional template with a modern twist",
        image: "/api/placeholder/280/360",
        categories: ["Professional", "Modern"],
        featured: false,
        pro: false,
        colors: ["blue", "teal", "red", "green"]
    },
    {
        id: 14,
        name: "Barcelona",
        description: "Bold design with creative layout for design professionals",
        image: "/api/placeholder/280/360",
        categories: ["Creative", "Bold"],
        featured: true,
        pro: false,
        colors: ["purple", "teal", "blue", "red"]
    },
    {
        id: 15,
        name: "Prague",
        description: "Elegant template with classic typography and subtle accents",
        image: "/api/placeholder/280/360",
        categories: ["Elegant", "Classic"],
        featured: false,
        pro: true,
        colors: ["green", "blue", "teal", "red"]
    },
    {
        id: 16,
        name: "Dublin",
        description: "Simple and clean template for a straightforward approach",
        image: "/api/placeholder/280/360",
        categories: ["Simple", "Clean"],
        featured: false,
        pro: false,
        colors: ["teal", "blue", "purple", "green"]
    }
];

// Global state
let state = {
    currentPage: 1,
    templatesPerPage: 8,
    currentCategory: "All Templates",
    searchTerm: "",
    filterIndustry: "All Industries",
    filterExperience: "All Levels",
    filterStyle: "All Styles"
};

// DOM Elements
const templatesGrid = document.querySelector('.templates-grid');
const templateTabs = document.querySelectorAll('.template-tab');
const searchInput = document.querySelector('.search-box input');
const loadMoreBtn = document.querySelector('.load-more-btn');
const pageItems = document.querySelectorAll('.page-item');
const filterButtons = document.querySelectorAll('.filter-btn');

// Functions
function renderTemplates() {
    // Clear current templates
    templatesGrid.innerHTML = '';
    
    // Filter templates based on current state
    let filteredTemplates = templateData.filter(template => {
        // Filter by category
        if (state.currentCategory !== "All Templates" && 
            !template.categories.includes(state.currentCategory)) {
            return false;
        }
        
        // Filter by search term
        if (state.searchTerm && 
            !template.name.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
            !template.description.toLowerCase().includes(state.searchTerm.toLowerCase())) {
            return false;
        }
        
        return true;
    });
    
    // Calculate pagination
    const startIndex = (state.currentPage - 1) * state.templatesPerPage;
    const endIndex = startIndex + state.templatesPerPage;
    const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);
    
    // Generate HTML for templates
    paginatedTemplates.forEach(template => {
        const templateCard = document.createElement('div');
        templateCard.className = 'template-card';
        templateCard.setAttribute('data-id', template.id);
        
        // Add badges if needed
        if (template.featured) {
            const featuredBadge = document.createElement('div');
            featuredBadge.className = 'featured-badge';
            featuredBadge.textContent = 'Featured';
            templateCard.appendChild(featuredBadge);
        }
        
        if (template.pro) {
            const proBadge = document.createElement('div');
            proBadge.className = 'pro-badge';
            proBadge.textContent = 'PRO';
            templateCard.appendChild(proBadge);
        }
        
        // Template image and overlay
        templateCard.innerHTML += `
            <div class="template-img">
                <img src="${template.image}" alt="${template.name} Template">
                <div class="template-overlay">
                    <div class="template-actions">
                        <button class="template-btn primary" onclick="useTemplate(${template.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Use Template
                        </button>
                        <button class="template-btn secondary" onclick="previewTemplate(${template.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Preview
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Template info
        const templateInfo = document.createElement('div');
        templateInfo.className = 'template-info';
        
        // Template name and description
        const templateName = document.createElement('div');
        templateName.className = 'template-name';
        templateName.textContent = template.name;
        
        const templateDescription = document.createElement('div');
        templateDescription.className = 'template-description';
        templateDescription.textContent = template.description;
        
        templateInfo.appendChild(templateName);
        templateInfo.appendChild(templateDescription);
        
        // Color options
        const templateColors = document.createElement('div');
        templateColors.className = 'template-colors';
        
        template.colors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = `color-option color-${color}`;
            colorOption.addEventListener('click', function() {
                changeTemplateColor(template.id, color);
            });
            templateColors.appendChild(colorOption);
        });
        
        templateInfo.appendChild(templateColors);
        
        // Template tags
        const templateMeta = document.createElement('div');
        templateMeta.className = 'template-meta';
        
        const templateTags = document.createElement('div');
        templateTags.className = 'template-tags';
        
        template.categories.forEach(category => {
            const templateTag = document.createElement('div');
            templateTag.className = 'template-tag';
            templateTag.textContent = category;
            templateTags.appendChild(templateTag);
        });
        
        templateMeta.appendChild(templateTags);
        templateInfo.appendChild(templateMeta);
        
        templateCard.appendChild(templateInfo);
        templatesGrid.appendChild(templateCard);
    });

    // Initialize color options
    initColorOptions();
    
    // Update load more button visibility
    if (filteredTemplates.length > endIndex) {
        loadMoreBtn.style.display = 'flex';
    } else {
        loadMoreBtn.style.display = 'none';
    }
    
    // Update pagination
    updatePagination(filteredTemplates.length);
}

function initColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Find parent template card
            const templateCard = this.closest('.template-card');
            // Remove active class from all color options in this card
            templateCard.querySelectorAll('.color-option').forEach(opt => {
                opt.style.border = '2px solid var(--card-bg)';
            });
            // Add active class to selected option
            this.style.border = '2px solid white';
        });
    });
}

function updatePagination(totalTemplates) {
    const totalPages = Math.ceil(totalTemplates / state.templatesPerPage);
    
    // Handle previous button
    const prevButton = document.querySelector('.page-item.prev');
    if (state.currentPage <= 1) {
        prevButton.classList.add('disabled');
        prevButton.style.opacity = '0.5';
        prevButton.style.cursor = 'not-allowed';
    } else {
        prevButton.classList.remove('disabled');
        prevButton.style.opacity = '1';
        prevButton.style.cursor = 'pointer';
    }
    
    // Handle next button
    const nextButton = document.querySelector('.page-item.next');
    if (state.currentPage >= totalPages) {
        nextButton.classList.add('disabled');
        nextButton.style.opacity = '0.5';
        nextButton.style.cursor = 'not-allowed';
    } else {
        nextButton.classList.remove('disabled');
        nextButton.style.opacity = '1';
        nextButton.style.cursor = 'pointer';
    }
    
    // Update page numbers
    const pageItems = document.querySelectorAll('.page-item:not(.prev):not(.next)');
    pageItems.forEach((item, index) => {
        const pageNum = index + 1;
        
        if (pageNum <= totalPages) {
            item.style.display = 'flex';
            if (pageNum === state.currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        } else {
            item.style.display = 'none';
        }
    });
}

// Event Handlers
function changeCategory(category) {
    state.currentCategory = category;
    state.currentPage = 1;
    renderTemplates();
}

function changePage(pageNum) {
    state.currentPage = pageNum;
    renderTemplates();
    
    // Scroll to top of templates grid
    templatesGrid.scrollIntoView({ behavior: 'smooth' });
}

function prevPage() {
    if (state.currentPage > 1) {
        state.currentPage--;
        renderTemplates();
        templatesGrid.scrollIntoView({ behavior: 'smooth' });
    }
}

function nextPage() {
    const totalTemplates = templateData.filter(template => {
        if (state.currentCategory !== "All Templates" && 
            !template.categories.includes(state.currentCategory)) {
            return false;
        }
        
        if (state.searchTerm && 
            !template.name.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
            !template.description.toLowerCase().includes(state.searchTerm.toLowerCase())) {
            return false;
        }
        
        return true;
    }).length;
    
    const totalPages = Math.ceil(totalTemplates / state.templatesPerPage);
    
    if (state.currentPage < totalPages) {
        state.currentPage++;
        renderTemplates();
        templatesGrid.scrollIntoView({ behavior: 'smooth' });
    }
}

function searchTemplates(event) {
    state.searchTerm = event.target.value.trim();
    state.currentPage = 1;
    renderTemplates();
}

function loadMoreTemplates() {
    loadMoreBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="animate-spin" width="16" height="16">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Loading...
    `;
    
    setTimeout(() => {
        state.templatesPerPage += 8;
        renderTemplates();
        
        loadMoreBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Load More Templates
        `;
    }, 800);
}

function changeTemplateColor(templateId, color) {
    console.log(`Changed template ${templateId} to color ${color}`);
    // This would typically update the template preview with the selected color
    // For demonstration, we'll just change the border color of the template card
    const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
    
    // Update the template card border
    switch(color) {
        case 'teal':
            templateCard.style.borderTop = '3px solid var(--primary)';
            break;
        case 'purple':
            templateCard.style.borderTop = '3px solid var(--secondary)';
            break;
        case 'red':
            templateCard.style.borderTop = '3px solid var(--accent)';
            break;
        case 'blue':
            templateCard.style.borderTop = '3px solid #2563EB';
            break;
        case 'green':
            templateCard.style.borderTop = '3px solid #10B981';
            break;
    }
}

function useTemplate(templateId) {
    const template = templateData.find(t => t.id === templateId);
    if (template.pro) {
        alert(`The ${template.name} template is a PRO template. Please upgrade to use this template.`);
    } else {
        alert(`Starting with the ${template.name} template!`);
        window.location.href = 'resume-builder.html?template=' + templateId;
    }
}

function previewTemplate(templateId) {
    const template = templateData.find(t => t.id === templateId);
    
    // Create modal container
    const previewModal = document.createElement('div');
    previewModal.className = 'modal-overlay preview-modal';
    previewModal.id = 'templatePreviewModal';
    previewModal.style.display = 'flex';
    
    // Create modal content
    previewModal.innerHTML = `
        <div class="modal preview-modal-content">
            <div class="modal-header">
                <h3>Preview: ${template.name}</h3>
                <button class="modal-close" onclick="closePreviewModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="preview-controls">
                    <div class="preview-colors">
                        ${template.colors.map(color => `
                            <div class="color-option color-${color}" data-color="${color}" onclick="changePreviewColor('${color}')"></div>
                        `).join('')}
                    </div>
                    <div class="preview-options">
                        <select class="form-control" id="previewFontStyle" onchange="changePreviewFont()">
                            <option value="inter">Inter (Default)</option>
                            <option value="roboto">Roboto</option>
                            <option value="opensans">Open Sans</option>
                            <option value="montserrat">Montserrat</option>
                            <option value="playfair">Playfair Display</option>
                        </select>
                    </div>
                </div>
                <div class="preview-container-frame">
                    <div class="resume-preview" id="previewFrame" data-template-id="${template.id}">
                        <!-- Header -->
                        <div class="resume-header">
                            <h1 id="previewName">John Smith</h1>
                            <h2 id="previewJobTitle">Software Engineer</h2>
                            
                            <div class="contact-info">
                                <div class="contact-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span id="previewEmail">john.smith@example.com</span>
                                </div>
                                <div class="contact-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span id="previewPhone">(123) 456-7890</span>
                                </div>
                                <div class="contact-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span id="previewLocation">San Francisco, CA</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Summary -->
                        <div class="resume-section">
                            <h3>Summary</h3>
                            <p id="previewSummary">Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about creating efficient, scalable solutions and collaborating in cross-functional teams.</p>
                        </div>
                        
                        <!-- Experience -->
                        <div class="resume-section">
                            <h3>Experience</h3>
                            
                            <div class="experience-item">
                                <div class="experience-header">
                                    <div>
                                        <div class="experience-title" id="previewPosition1">Senior Software Engineer</div>
                                        <div class="experience-company" id="previewCompany1">Tech Solutions Inc.</div>
                                    </div>
                                    <div class="experience-date" id="previewExpDate1">Jan 2021 - Present</div>
                                </div>
                                <div class="experience-description" id="previewExpDescription1">
                                    Led a team of 5 developers building a cloud-based SaaS platform. Implemented CI/CD pipelines reducing deployment time by 40%. Architected microservices infrastructure using Node.js and React.
                                </div>
                            </div>
                            
                            <div class="experience-item">
                                <div class="experience-header">
                                    <div>
                                        <div class="experience-title" id="previewPosition2">Software Developer</div>
                                        <div class="experience-company" id="previewCompany2">Digital Innovations</div>
                                    </div>
                                    <div class="experience-date" id="previewExpDate2">Mar 2018 - Dec 2020</div>
                                </div>
                                <div class="experience-description" id="previewExpDescription2">
                                    Developed and maintained web applications for enterprise clients. Collaborated with UX designers to implement responsive interfaces. Optimized database queries improving application performance by 25%.
                                </div>
                            </div>
                        </div>
                        
                        <!-- Education -->
                        <div class="resume-section">
                            <h3>Education</h3>
                            
                            <div class="education-item">
                                <div class="education-header">
                                    <div>
                                        <div class="education-degree" id="previewDegree1">Master of Computer Science</div>
                                        <div class="education-institution" id="previewInstitution1">University of Technology</div>
                                    </div>
                                    <div class="education-date" id="previewEduDate1">Sep 2016 - May 2018</div>
                                </div>
                                <div class="education-description" id="previewEduDescription1">
                                    Specialized in Artificial Intelligence and Machine Learning. GPA: 3.8/4.0
                                </div>
                            </div>
                        </div>
                        
                        <!-- Skills -->
                        <div class="resume-section">
                            <h3>Skills</h3>
                            <div class="skills-list" id="previewSkills">
                                <div class="skill-tag">JavaScript</div>
                                <div class="skill-tag">React</div>
                                <div class="skill-tag">Node.js</div>
                                <div class="skill-tag">Python</div>
                                <div class="skill-tag">SQL</div>
                                <div class="skill-tag">AWS</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closePreviewModal()">Close</button>
                <button class="btn btn-primary" onclick="useSelectedTemplate(${template.id})">Use This Template</button>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(previewModal);
    
    // Initialize preview color
    const firstColorOption = previewModal.querySelector('.color-option');
    if (firstColorOption) {
        const defaultColor = firstColorOption.getAttribute('data-color');
        changePreviewColor(defaultColor);
        firstColorOption.style.border = '2px solid white';
    }
    
    // Prevent scrolling of background
    document.body.style.overflow = 'hidden';
    
    // Apply template-specific styling based on ID
    applyTemplateStyle(template.id);
}

function closePreviewModal() {
    const modal = document.getElementById('templatePreviewModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function changePreviewColor(color) {
    const previewFrame = document.getElementById('previewFrame');
    const colorOptions = document.querySelectorAll('.preview-colors .color-option');
    
    // Reset all color options
    colorOptions.forEach(option => {
        option.style.border = '2px solid var(--card-bg)';
    });
    
    // Select the clicked color option
    const selectedOption = document.querySelector(`.preview-colors .color-${color}`);
    if (selectedOption) {
        selectedOption.style.border = '2px solid white';
    }
    
    // Apply the selected color to the preview
    const templateId = previewFrame.getAttribute('data-template-id');
    applyTemplateColor(templateId, color);
}

function changePreviewFont() {
    const fontSelect = document.getElementById('previewFontStyle');
    const selectedFont = fontSelect.value;
    const previewFrame = document.getElementById('previewFrame');
    
    // Apply the selected font to the preview
    switch(selectedFont) {
        case 'inter':
            previewFrame.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
            break;
        case 'roboto':
            previewFrame.style.fontFamily = "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
            break;
        case 'opensans':
            previewFrame.style.fontFamily = "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
            break;
        case 'montserrat':
            previewFrame.style.fontFamily = "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
            break;
        case 'playfair':
            previewFrame.style.fontFamily = "'Playfair Display', Georgia, serif";
            break;
    }
}

function applyTemplateStyle(templateId) {
    const previewFrame = document.getElementById('previewFrame');
    
    // Reset styles
    previewFrame.classList.remove('template-stockholm', 'template-berlin', 'template-tokyo', 'template-madrid', 'template-sydney', 'template-paris', 'template-newyork', 'template-oslo');
    
    // Apply template-specific class
    switch(parseInt(templateId)) {
        case 1: // Stockholm
            previewFrame.classList.add('template-stockholm');
            break;
        case 2: // Berlin
            previewFrame.classList.add('template-berlin');
            break;
        case 3: // Tokyo
            previewFrame.classList.add('template-tokyo');
            break;
        case 4: // Madrid
            previewFrame.classList.add('template-madrid');
            break;
        case 5: // Sydney
            previewFrame.classList.add('template-sydney');
            break;
        case 6: // Paris
            previewFrame.classList.add('template-paris');
            break;
        case 7: // New York
            previewFrame.classList.add('template-newyork');
            break;
        case 8: // Oslo
            previewFrame.classList.add('template-oslo');
            break;
        default:
            // Default template style
            previewFrame.classList.add('template-stockholm');
    }
}

function applyTemplateColor(templateId, color) {
    const previewFrame = document.getElementById('previewFrame');
    
    // Remove previous color classes
    previewFrame.classList.remove('color-teal', 'color-purple', 'color-red', 'color-blue', 'color-green');
    
    // Add selected color class
    previewFrame.classList.add(`color-${color}`);
    
    // Apply color-specific styles
    const root = document.documentElement;
    switch(color) {
        case 'teal':
            previewFrame.style.setProperty('--resume-primary', '#64FFDA');
            previewFrame.style.setProperty('--resume-primary-dark', '#4ED8BB');
            break;
        case 'purple':
            previewFrame.style.setProperty('--resume-primary', '#7F5AF0');
            previewFrame.style.setProperty('--resume-primary-dark', '#6A48D7');
            break;
        case 'red':
            previewFrame.style.setProperty('--resume-primary', '#FF6B6B');
            previewFrame.style.setProperty('--resume-primary-dark', '#FF3333');
            break;
        case 'blue':
            previewFrame.style.setProperty('--resume-primary', '#2563EB');
            previewFrame.style.setProperty('--resume-primary-dark', '#1D4ED8');
            break;
        case 'green':
            previewFrame.style.setProperty('--resume-primary', '#10B981');
            previewFrame.style.setProperty('--resume-primary-dark', '#059669');
            break;
    }
    
    // Update template-specific elements based on color
    updateTemplateColorElements(templateId, color);
}

function updateTemplateColorElements(templateId, color) {
    const previewFrame = document.getElementById('previewFrame');
    
    // Get template-specific elements that need color updates
    const jobTitle = previewFrame.querySelector('#previewJobTitle');
    const sectionHeaders = previewFrame.querySelectorAll('.resume-section h3');
    const companyNames = previewFrame.querySelectorAll('.experience-company, .education-institution');
    const skillTags = previewFrame.querySelectorAll('.skill-tag');
    
    // Apply color to job title
    if (jobTitle) {
        jobTitle.style.color = `var(--resume-primary)`;
    }
    
    // Apply color to company names
    companyNames.forEach(company => {
        company.style.color = `var(--resume-primary)`;
    });
    
    // Apply template-specific styling
    switch(parseInt(templateId)) {
        case 1: // Stockholm - Clean and professional
            sectionHeaders.forEach(header => {
                header.style.borderBottom = `1px solid #e0e0e0`;
                header.style.color = '#1a1a1a';
            });
            
            skillTags.forEach(tag => {
                tag.style.backgroundColor = `var(--resume-primary-light, rgba(100, 255, 218, 0.1))`;
                tag.style.color = `var(--resume-primary)`;
            });
            break;
        
        case 2: // Berlin - Bold, modern design
            sectionHeaders.forEach(header => {
                header.style.color = `var(--resume-primary)`;
                header.style.borderBottom = `2px solid var(--resume-primary)`;
                header.style.fontWeight = '700';
            });
            
            skillTags.forEach(tag => {
                tag.style.backgroundColor = `var(--resume-primary)`;
                tag.style.color = `white`;
            });
            break;
        
        case 3: // Tokyo - Minimal and elegant
            previewFrame.style.borderLeft = `4px solid var(--resume-primary)`;
            previewFrame.style.paddingLeft = '20px';
            
            sectionHeaders.forEach(header => {
                header.style.borderBottom = 'none';
                header.style.color = `var(--resume-primary)`;
                header.style.fontSize = '1.1rem';
            });
            
            skillTags.forEach(tag => {
                tag.style.backgroundColor = 'transparent';
                tag.style.color = '#333';
                tag.style.border = `1px solid var(--resume-primary)`;
            });
            break;
        
        case 4: // Madrid - Traditional with modern twist
            sectionHeaders.forEach(header => {
                header.style.textTransform = 'uppercase';
                header.style.letterSpacing = '1px';
                header.style.fontSize = '0.95rem';
                header.style.color = `var(--resume-primary)`;
                header.style.borderBottom = `1px solid #e0e0e0`;
            });
            
            skillTags.forEach(tag => {
                tag.style.backgroundColor = `#f5f5f5`;
                tag.style.color = '#333';
                tag.style.border = `1px solid #e0e0e0`;
            });
            break;
        
        case 5: // Sydney - Creative and unique
            previewFrame.style.backgroundColor = `var(--resume-primary-light, rgba(100, 255, 218, 0.05))`;
            
            sectionHeaders.forEach(header => {
                header.style.color = `var(--resume-primary)`;
                header.style.borderBottom = 'none';
                header.style.position = 'relative';
                header.style.paddingLeft = '15px';
            });
            
            sectionHeaders.forEach(header => {
                // Add a pseudo-element for creative styling
                header.style.position = 'relative';
                const pseudoElement = document.createElement('span');
                pseudoElement.style.position = 'absolute';
                pseudoElement.style.left = '0';
                pseudoElement.style.top = '50%';
                pseudoElement.style.transform = 'translateY(-50%)';
                pseudoElement.style.width = '8px';
                pseudoElement.style.height = '8px';
                pseudoElement.style.backgroundColor = `var(--resume-primary)`;
                pseudoElement.style.borderRadius = '50%';
                
                // Check if we already added the pseudo element
                if (!header.querySelector('.pseudo-bullet')) {
                    pseudoElement.className = 'pseudo-bullet';
                    header.prepend(pseudoElement);
                }
            });
            
            skillTags.forEach(tag => {
                tag.style.backgroundColor = `var(--resume-primary)`;
                tag.style.color = 'white';
                tag.style.borderRadius = '20px';
            });
            break;
        
        case 6: // Paris - Elegant with sophisticated typography
            previewFrame.querySelector('.resume-header h1').style.fontFamily = "'Playfair Display', Georgia, serif";
            
            sectionHeaders.forEach(header => {
                header.style.fontFamily = "'Playfair Display', Georgia, serif";
                header.style.fontStyle = 'italic';
                header.style.color = `var(--resume-primary)`;
                header.style.borderBottom = `1px solid #e0e0e0`;
            });
            
            skillTags.forEach(tag => {
                tag.style.backgroundColor = 'transparent';
                tag.style.border = `1px solid var(--resume-primary)`;
                tag.style.color = `var(--resume-primary)`;
            });
            break;
        
        case 7: // New York - Bold and confident
            sectionHeaders.forEach(header => {
                header.style.backgroundColor = `var(--resume-primary)`;
                header.style.color = 'white';
                header.style.padding = '8px 15px';
                header.style.borderRadius = '4px';
                header.style.textTransform = 'uppercase';
            });
            
            skillTags.forEach(tag => {
                tag.style.backgroundColor = '#f5f5f5';
                tag.style.color = '#333';
                tag.style.fontWeight = '600';
            });
            break;
        
        case 8: // Oslo - Minimalist design
            previewFrame.style.maxWidth = '700px';
            
            sectionHeaders.forEach(header => {
                header.style.borderBottom = 'none';
                header.style.fontSize = '0.8rem';
                header.style.textTransform = 'uppercase';
                header.style.letterSpacing = '2px';
                header.style.color = '#999';
            });
            
            skillTags.forEach(tag => {
                tag.style.backgroundColor = 'transparent';
                tag.style.padding = '0';
                tag.style.marginRight = '20px';
                tag.style.color = '#333';
            });
            break;
        
        default:
            // Default styling
            sectionHeaders.forEach(header => {
                header.style.borderBottom = `1px solid #f0f0f0`;
                header.style.color = '#1a1a1a';
            });
            
            skillTags.forEach(tag => {
                tag.style.backgroundColor = `var(--resume-primary-light, rgba(100, 255, 218, 0.1))`;
                tag.style.color = `var(--resume-primary)`;
            });
    }
}

function useSelectedTemplate(templateId) {
    // Get the currently selected color and font
    const selectedColor = document.querySelector('.preview-colors .color-option[style*="border: 2px solid white"]')?.getAttribute('data-color') || 'teal';
    const selectedFont = document.getElementById('previewFontStyle')?.value || 'inter';
    
    const template = templateData.find(t => t.id === templateId);
    
    if (template.pro) {
        alert(`The ${template.name} template is a PRO template. Please upgrade to use this template.`);
    } else {
        alert(`Starting with the ${template.name} template with ${selectedColor} color and ${selectedFont} font!`);
        window.location.href = `resume-builder.html?template=${templateId}&color=${selectedColor}&font=${selectedFont}`;
    }
    
    closePreviewModal();
}


function toggleFilterDropdown(event) {
    const dropdown = event.target.nextElementSibling;
    if (dropdown && dropdown.classList.contains('dropdown-content')) {
        dropdown.classList.toggle('show');
    }
}

// Create dropdown UI elements for filters
function createFilterDropdowns() {
    const filterContainers = document.querySelectorAll('.filter-dropdown');
    
    // Industry filter
    const industryOptions = ['All Industries', 'Technology', 'Finance', 'Healthcare', 'Education', 'Creative', 'Marketing'];
    createDropdown(filterContainers[0], industryOptions, 'filterIndustry');
    
    // Experience filter
    const experienceOptions = ['All Levels', 'Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
    createDropdown(filterContainers[1], experienceOptions, 'filterExperience');
    
    // Style filter
    const styleOptions = ['All Styles', 'Modern', 'Traditional', 'Creative', 'Minimal', 'Bold'];
    createDropdown(filterContainers[2], styleOptions, 'filterStyle');
}

function createDropdown(container, options, stateProperty) {
    const button = container.querySelector('.filter-btn');
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-content';
    
    options.forEach(option => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.textContent = option;
        item.addEventListener('click', () => {
            state[stateProperty] = option;
            button.textContent = option;
            dropdown.classList.remove('show');
            renderTemplates();
        });
        dropdown.appendChild(item);
    });
    
    container.appendChild(dropdown);
    
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdown.classList.toggle('show');
    });
}

// Window click to close dropdowns
window.addEventListener('click', function(event) {
    if (!event.target.matches('.filter-btn')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Create filter dropdowns
    createFilterDropdowns();
    
    // Initial render
    renderTemplates();
    
    // Add event listeners
    templateTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            templateTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Extract category from tab text
            const category = this.textContent.split(' ')[0];
            changeCategory(category);
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', searchTemplates);
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreTemplates);
    }
    
    pageItems.forEach(item => {
        if (item.classList.contains('prev')) {
            item.addEventListener('click', prevPage);
        } else if (item.classList.contains('next')) {
            item.addEventListener('click', nextPage);
        } else {
            item.addEventListener('click', function() {
                const pageNum = parseInt(this.textContent);
                if (!isNaN(pageNum)) {
                    changePage(pageNum);
                }
            });
        }
    });

    // Add CSS for dropdown content and preview modal
    const style = document.createElement('style');
    style.textContent = `
        .dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            top: 100%;
            min-width: 180px;
            background-color: var(--card-bg);
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .dropdown-item {
            padding: 0.75rem 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .dropdown-item:hover {
            background-color: var(--gray-200);
        }
        
        .show {
            display: block;
        }
        
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        .disabled {
            pointer-events: none;
        }

        /* Preview Modal Styles */
        .preview-modal {
            z-index: 200;
        }
        
        .preview-modal-content {
            width: 90%;
            max-width: 1000px;
            height: 90vh;
            max-height: 900px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        .preview-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding: 1rem;
            background-color: var(--gray-100);
            border-radius: 0.5rem;
        }
        
        .preview-colors {
            display: flex;
            gap: 0.5rem;
        }
        
        .preview-options {
            display: flex;
            gap: 1rem;
        }
        
        .preview-container-frame {
            background-color: white;
            border-radius: 0.5rem;
            padding: 1rem;
            overflow-y: auto;
            flex: 1;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .resume-preview {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 2rem;
            color: #333;
            transition: all 0.3s ease;
            --resume-primary: var(--primary);
            --resume-primary-dark: var(--primary-dark);
            --resume-primary-light: rgba(100, 255, 218, 0.1);
        }
        
        /* Template-specific styles */
        .template-stockholm {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .template-stockholm .resume-section h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1a1a1a;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 0.5rem;
        }
        
        .template-berlin {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .template-berlin .resume-section h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            border-bottom: 2px solid var(--resume-primary);
            padding-bottom: 0.5rem;
            color: var(--resume-primary);
        }
        
        .template-tokyo {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border-left: 4px solid var(--resume-primary);
            padding-left: 20px;
        }
        
        .template-tokyo .resume-section h3 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--resume-primary);
            border-bottom: none;
            padding-bottom: 0;
        }
        
        .template-madrid {
            font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .template-madrid .resume-section h3 {
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--resume-primary);
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 0.5rem;
        }
        
        .template-sydney {
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: rgba(100, 255, 218, 0.05);
            padding: 2rem;
            border-radius: 0.5rem;
        }
        
        .template-sydney .resume-section h3 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--resume-primary);
            border-bottom: none;
            padding-bottom: 0;
            padding-left: 15px;
            position: relative;
        }
        
        .template-paris {
            font-family: 'Playfair Display', Georgia, serif;
        }
        
        .template-paris .resume-header h1 {
            font-family: 'Playfair Display', Georgia, serif;
            font-weight: 700;
        }
        
        .template-paris .resume-section h3 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 1.25rem;
            font-weight: 600;
            font-style: italic;
            margin-bottom: 1rem;
            color: var(--resume-primary);
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 0.5rem;
        }
        
        .template-newyork {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-weight: 500;
        }
        
        .template-newyork .resume-section h3 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: uppercase;
            background-color: var(--resume-primary);
            color: white;
            padding: 8px 15px;
            border-radius: 4px;
        }
        
        .template-oslo {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.6;
        }
        
        .template-oslo .resume-section h3 {
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #999;
            border-bottom: none;
        }
        
        /* Color variations for skill tags */
        .template-stockholm .skill-tag,
        .template-paris .skill-tag,
        .template-tokyo .skill-tag {
            background-color: rgba(100, 255, 218, 0.1);
            color: var(--resume-primary);
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            font-size: 0.85rem;
            font-weight: 500;
            display: inline-block;
            margin-right: 0.75rem;
            margin-bottom: 0.75rem;
        }
        
        .template-berlin .skill-tag {
            background-color: var(--resume-primary);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            font-size: 0.85rem;
            font-weight: 500;
            display: inline-block;
            margin-right: 0.75rem;
            margin-bottom: 0.75rem;
        }
        
        .template-madrid .skill-tag,
        .template-newyork .skill-tag {
            background-color: #f5f5f5;
            color: #333;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            font-size: 0.85rem;
            font-weight: 500;
            display: inline-block;
            margin-right: 0.75rem;
            margin-bottom: 0.75rem;
            border: 1px solid #e0e0e0;
        }
        
        .template-sydney .skill-tag {
            background-color: var(--resume-primary);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
            display: inline-block;
            margin-right: 0.75rem;
            margin-bottom: 0.75rem;
        }
        
        .template-oslo .skill-tag {
            background-color: transparent;
            padding: 0;
            margin-right: 20px;
            color: #333;
            font-size: 0.9rem;
            display: inline-block;
        }
        
        /* For color selection */
        .color-teal-effect .resume-header h2,
        .color-teal-effect .experience-company,
        .color-teal-effect .education-institution {
            color: #64FFDA;
        }
        
        .color-purple-effect .resume-header h2,
        .color-purple-effect .experience-company,
        .color-purple-effect .education-institution {
            color: #7F5AF0;
        }
        
        .color-red-effect .resume-header h2,
        .color-red-effect .experience-company,
        .color-red-effect .education-institution {
            color: #FF6B6B;
        }
        
        .color-blue-effect .resume-header h2,
        .color-blue-effect .experience-company,
        .color-blue-effect .education-institution {
            color: #2563EB;
        }
        
        .color-green-effect .resume-header h2,
        .color-green-effect .experience-company,
        .color-green-effect .education-institution {
            color: #10B981;
        }
        
        /* Responsive fixes for the preview modal */
        @media (max-width: 768px) {
            .preview-modal-content {
                width: 95%;
                height: 95vh;
            }
            
            .preview-controls {
                flex-direction: column;
                gap: 1rem;
                align-items: flex-start;
            }
            
            .resume-preview {
                padding: 1rem;
            }
        }
        
        /* Print styles for when the user wants to print the resume */
        @media print {
            body * {
                visibility: hidden;
            }
            
            .resume-preview,
            .resume-preview * {
                visibility: visible;
            }
            
            .resume-preview {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                padding: 0;
                margin: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Window click to close dropdowns
window.addEventListener('click', function(event) {
    if (!event.target.matches('.filter-btn')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
});
    
// Handle escape key to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const previewModal = document.getElementById('templatePreviewModal');
        if (previewModal) {
            closePreviewModal();
        }
    }
});
    // Initialize event listeners for pagination - moved to main initialization
    // This code was duplicated from above