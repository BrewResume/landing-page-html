document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation functionality
    const headerInfoTab = document.getElementById('headerInfoTab');
    const bodyContentTab = document.getElementById('bodyContentTab');
    const templateTab = document.getElementById('templateTab');
    const formattingTab = document.getElementById('formattingTab');
    
    const headerInfoNav = document.getElementById('headerInfoNav');
    const bodyContentNav = document.getElementById('bodyContentNav');
    const templateNav = document.getElementById('templateNav');
    const formattingNav = document.getElementById('formattingNav');
    
    const headerInfoForm = document.getElementById('headerInfoForm');
    const bodyContentForm = document.getElementById('bodyContentForm');
    const templateForm = document.getElementById('templateForm');
    const formattingForm = document.getElementById('formattingForm');
    
    const aiAssistantNav = document.getElementById('aiAssistantNav');
    const exportNav = document.getElementById('exportNav');
    
    const exportButton = document.getElementById('exportButton');
    const downloadButton = document.getElementById('downloadButton');
    
    const exportModal = document.getElementById('exportModal');
    const aiAssistantModal = document.getElementById('aiAssistantModal');
    
    // Function to show a specific tab
    function showTab(tabName) {
        // Hide all forms
        headerInfoForm.style.display = 'none';
        bodyContentForm.style.display = 'none';
        templateForm.style.display = 'none';
        formattingForm.style.display = 'none';
        
        // Remove active class from all tabs and nav items
        headerInfoTab.classList.remove('active');
        bodyContentTab.classList.remove('active');
        templateTab.classList.remove('active');
        formattingTab.classList.remove('active');
        
        headerInfoNav.classList.remove('active');
        bodyContentNav.classList.remove('active');
        templateNav.classList.remove('active');
        formattingNav.classList.remove('active');
        
        // Show the selected form and activate the corresponding tab
        if (tabName === 'headerInfo') {
            headerInfoForm.style.display = 'block';
            headerInfoTab.classList.add('active');
            headerInfoNav.classList.add('active');
        } else if (tabName === 'bodyContent') {
            bodyContentForm.style.display = 'block';
            bodyContentTab.classList.add('active');
            bodyContentNav.classList.add('active');
        } else if (tabName === 'template') {
            templateForm.style.display = 'block';
            templateTab.classList.add('active');
            templateNav.classList.add('active');
        } else if (tabName === 'formatting') {
            formattingForm.style.display = 'block';
            formattingTab.classList.add('active');
            formattingNav.classList.add('active');
        }
    }
    
    // Add event listeners to tabs
    headerInfoTab.addEventListener('click', () => showTab('headerInfo'));
    bodyContentTab.addEventListener('click', () => showTab('bodyContent'));
    templateTab.addEventListener('click', () => showTab('template'));
    formattingTab.addEventListener('click', () => showTab('formatting'));
    
    // Add event listeners to sidebar nav items
    headerInfoNav.addEventListener('click', () => showTab('headerInfo'));
    bodyContentNav.addEventListener('click', () => showTab('bodyContent'));
    templateNav.addEventListener('click', () => showTab('template'));
    formattingNav.addEventListener('click', () => showTab('formatting'));
    
    // Modal functionality
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
    }
    
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
    
    // Add event listeners for modals
    exportButton.addEventListener('click', () => openModal('exportModal'));
    exportNav.addEventListener('click', () => openModal('exportModal'));
    aiAssistantNav.addEventListener('click', () => openModal('aiAssistantModal'));
    
    // Close button functionality for modals
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            modal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // Cancel buttons in modals
    document.querySelectorAll('.modal-footer .btn-outline').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            modal.style.display = 'none';
        });
    });
    
    // Template selection
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            templateCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            updatePreview();
        });
    });
    
    // Color theme selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            // Get the selected color class
            const colorClass = this.classList[1]; // e.g., color-teal, color-purple, etc.
            const color = colorClass.replace('color-', ''); // e.g., teal, purple, etc.
            
            updateColorTheme(color);
        });
    });
    
    // Function to update color theme
    function updateColorTheme(color) {
        const root = document.documentElement;
        
        switch(color) {
            case 'teal':
                root.style.setProperty('--primary', '#64FFDA');
                root.style.setProperty('--primary-dark', '#4ED8BB');
                root.style.setProperty('--primary-light', 'rgba(100, 255, 218, 0.1)');
                break;
            case 'purple':
                root.style.setProperty('--primary', '#7F5AF0');
                root.style.setProperty('--primary-dark', '#6A48D7');
                root.style.setProperty('--primary-light', 'rgba(127, 90, 240, 0.1)');
                break;
            case 'blue':
                root.style.setProperty('--primary', '#2563EB');
                root.style.setProperty('--primary-dark', '#1D4ED8');
                root.style.setProperty('--primary-light', 'rgba(37, 99, 235, 0.1)');
                break;
            case 'red':
                root.style.setProperty('--primary', '#FF6B6B');
                root.style.setProperty('--primary-dark', '#FF3333');
                root.style.setProperty('--primary-light', 'rgba(255, 107, 107, 0.1)');
                break;
            case 'green':
                root.style.setProperty('--primary', '#10B981');
                root.style.setProperty('--primary-dark', '#059669');
                root.style.setProperty('--primary-light', 'rgba(16, 185, 129, 0.1)');
                break;
        }
        
        updatePreview();
    }
    
    // Font style change
    const fontStyleSelect = document.getElementById('fontStyle');
    fontStyleSelect.addEventListener('change', function() {
        const selectedFont = this.value;
        updateFontStyle(selectedFont);
    });
    
    // Function to update font style
    function updateFontStyle(font) {
        const root = document.documentElement;
        
        switch(font) {
            case 'inter':
                root.style.setProperty('font-family', "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif");
                break;
            case 'roboto':
                root.style.setProperty('font-family', "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif");
                break;
            case 'opensans':
                root.style.setProperty('font-family', "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif");
                break;
            case 'montserrat':
                root.style.setProperty('font-family', "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif");
                break;
            case 'playfair':
                root.style.setProperty('font-family', "'Playfair Display', Georgia, serif");
                break;
        }
        
        updatePreview();
    }
    
    // Subject line toggle
    const includeSubjectCheck = document.getElementById('includeSubjectCheck');
    const subjectLineGroup = document.getElementById('subjectLineGroup');
    
    includeSubjectCheck.addEventListener('change', function() {
        subjectLineGroup.style.display = this.checked ? 'block' : 'none';
        updatePreview();
    });
    
    // Update preview function
    function updatePreview() {
        // Personal info
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        document.getElementById('previewSenderName').textContent = firstName + ' ' + lastName;
        
        // Update sender details
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        
        document.getElementById('previewSenderDetails').innerHTML = 
            address + '<br>' +
            phone + '<br>' +
            email;
        
        // Update recipient info
        const recipientName = document.getElementById('recipientName').value;
        const recipientTitle = document.getElementById('recipientTitle').value;
        const companyName = document.getElementById('companyName').value;
        const companyAddress = document.getElementById('companyAddress').value;
        
        document.getElementById('previewReceiverName').textContent = recipientName;
        document.getElementById('previewReceiverDetails').innerHTML = 
            recipientTitle + '<br>' +
            companyName + '<br>' +
            companyAddress;
        
        // Salutation
        document.getElementById('previewSalutation').textContent = document.getElementById('salutation').value;
        
        // Letter body - gather all paragraphs
        const paragraphs = document.querySelectorAll('#bodyContentForm .paragraph-item textarea');
        let letterBody = '';
        
        paragraphs.forEach(paragraph => {
            letterBody += '<p>' + paragraph.value + '</p>';
        });
        
        document.getElementById('previewLetterBody').innerHTML = letterBody;
        
        // Complimentary close and signature
        document.getElementById('previewClose').textContent = document.getElementById('complimentaryClose').value;
        document.getElementById('previewSignature').textContent = firstName + ' ' + lastName;
        
        // Apply subject line if checked
        if (includeSubjectCheck.checked && subjectLineGroup.style.display === 'block') {
            const subjectLine = document.getElementById('subjectLine').value;
            // Insert subject line before the first paragraph in letter body
            if (subjectLine) {
                const subjectHtml = '<p style="font-weight: bold;">Subject: ' + subjectLine + '</p>';
                const firstParagraph = document.querySelector('#previewLetterBody p:first-child');
                if (firstParagraph) {
                    firstParagraph.insertAdjacentHTML('beforebegin', subjectHtml);
                }
            }
        }
    }
    
    // Initialize the preview on page load
    updatePreview();
    
    // Add input event listeners to form fields
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('input', updatePreview);
    });
    
    // User profile dropdown functionality
    const userProfileSection = document.getElementById('userProfileSection');
    const profileDropdown = document.getElementById('profileDropdown');
    
    userProfileSection.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userProfileSection.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
    });
    
    // Export option click handlers
    const exportOptions = document.querySelectorAll('.export-option');
    exportOptions.forEach(option => {
        option.addEventListener('click', function() {
            const format = this.getAttribute('data-format');
            exportCoverLetter(format);
            closeModal('exportModal');
        });
    });
    
    // Export function (placeholder)
    function exportCoverLetter(format) {
        alert(`Your cover letter would be exported as ${format.toUpperCase()} format.`);
        // In a real implementation, this would generate and download the file
    }
    
    // Download button functionality
    downloadButton.addEventListener('click', function() {
        exportCoverLetter('pdf'); // Default to PDF when clicking the download button
    });
    
    // Generate AI suggestions (placeholder function)
    function generateAiSuggestions() {
        const assistType = document.getElementById('aiAssistType').value;
        const prompt = document.getElementById('aiAssistPrompt').value;
        
        alert(`AI would generate suggestions for: ${assistType}\nBased on prompt: ${prompt}`);
        closeModal('aiAssistantModal');
        
        // In a real implementation, this would call an API and update the form with suggestions
    }
    
    // AI Assistant modal generate button
    const aiGenerateButton = document.querySelector('#aiAssistantModal .btn-primary');
    aiGenerateButton.addEventListener('click', generateAiSuggestions);
    
    // Example of job description analysis functionality (placeholder)
    const analyzeJobButton = document.querySelector('.job-details-header button');
    analyzeJobButton.addEventListener('click', function() {
        const jobDescription = document.getElementById('jobDescription').value;
        
        // In a real implementation, this would analyze the job description
        // and extract relevant keywords
        alert('Job description analysis complete. Keywords extracted!');
    });
});