// Tab navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const personalInfoNav = document.getElementById('personalInfoNav');
    const experienceNav = document.getElementById('experienceNav');
    const educationNav = document.getElementById('educationNav');
    const skillsNav = document.getElementById('skillsNav');
    const customSectionNav = document.getElementById('customSectionNav');
    
    // Tab elements
    const personalInfoTab = document.getElementById('personalInfoTab');
    const experienceTab = document.getElementById('experienceTab');
    const educationTab = document.getElementById('educationTab');
    const skillsTab = document.getElementById('skillsTab');
    const customSectionTab = document.getElementById('customSectionTab');
    
    // Form sections
    const personalInfoForm = document.getElementById('personalInfoForm');
    const experienceForm = document.getElementById('experienceForm');
    const educationForm = document.getElementById('educationForm');
    const skillsForm = document.getElementById('skillsForm');
    const customSectionForm = document.getElementById('customSectionForm');
    
    // Function to show a specific tab
    function showTab(tabName) {
        // Hide all forms
        personalInfoForm.style.display = 'none';
        experienceForm.style.display = 'none';
        educationForm.style.display = 'none';
        skillsForm.style.display = 'none';
        customSectionForm.style.display = 'none';
        
        // Remove active class from all tabs and nav items
        personalInfoTab.classList.remove('active');
        experienceTab.classList.remove('active');
        educationTab.classList.remove('active');
        skillsTab.classList.remove('active');
        customSectionTab.classList.remove('active');
        
        personalInfoNav.classList.remove('active');
        experienceNav.classList.remove('active');
        educationNav.classList.remove('active');
        skillsNav.classList.remove('active');
        customSectionNav.classList.remove('active');
        
        // Show the selected form and add active class to tab
        if (tabName === 'personalInfo') {
            personalInfoForm.style.display = 'block';
            personalInfoTab.classList.add('active');
            personalInfoNav.classList.add('active');
        } else if (tabName === 'experience') {
            experienceForm.style.display = 'block';
            experienceTab.classList.add('active');
            experienceNav.classList.add('active');
        } else if (tabName === 'education') {
            educationForm.style.display = 'block';
            educationTab.classList.add('active');
            educationNav.classList.add('active');
        } else if (tabName === 'skills') {
            skillsForm.style.display = 'block';
            skillsTab.classList.add('active');
            skillsNav.classList.add('active');
        } else if (tabName === 'customSection') {
            customSectionForm.style.display = 'block';
            customSectionTab.classList.add('active');
            customSectionNav.classList.add('active');
        }
    }
    
    // Add event listeners to tab navigation
    personalInfoTab.addEventListener('click', () => showTab('personalInfo'));
    experienceTab.addEventListener('click', () => showTab('experience'));
    educationTab.addEventListener('click', () => showTab('education'));
    skillsTab.addEventListener('click', () => showTab('skills'));
    customSectionTab.addEventListener('click', () => showTab('customSection'));
    
    // Add event listeners to sidebar navigation
    personalInfoNav.addEventListener('click', () => showTab('personalInfo'));
    experienceNav.addEventListener('click', () => showTab('experience'));
    educationNav.addEventListener('click', () => showTab('education'));
    skillsNav.addEventListener('click', () => showTab('skills'));
    customSectionNav.addEventListener('click', () => showTab('customSection'));
    
    // Update preview function
    window.updatePreview = function() {
        // Personal Info section
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        document.getElementById('previewName').textContent = firstName + ' ' + lastName;
        document.getElementById('previewJobTitle').textContent = document.getElementById('jobTitle').value;
        document.getElementById('previewEmail').textContent = document.getElementById('email').value;
        document.getElementById('previewPhone').textContent = document.getElementById('phone').value;
        document.getElementById('previewLocation').textContent = document.getElementById('location').value;
        document.getElementById('previewSummary').textContent = document.getElementById('summary').value;
        
        // Experience section
        document.getElementById('previewPosition1').textContent = document.getElementById('position1').value;
        document.getElementById('previewCompany1').textContent = document.getElementById('company1').value;
        document.getElementById('previewExpDate1').textContent = document.getElementById('expStartDate1').value + ' - ' + document.getElementById('expEndDate1').value;
        document.getElementById('previewExpDescription1').textContent = document.getElementById('expDescription1').value;
        
        document.getElementById('previewPosition2').textContent = document.getElementById('position2').value;
        document.getElementById('previewCompany2').textContent = document.getElementById('company2').value;
        document.getElementById('previewExpDate2').textContent = document.getElementById('expStartDate2').value + ' - ' + document.getElementById('expEndDate2').value;
        document.getElementById('previewExpDescription2').textContent = document.getElementById('expDescription2').value;
        
        // Education section
        document.getElementById('previewDegree1').textContent = document.getElementById('degree1').value;
        document.getElementById('previewInstitution1').textContent = document.getElementById('institution1').value;
        document.getElementById('previewEduDate1').textContent = document.getElementById('eduStartDate1').value + ' - ' + document.getElementById('eduEndDate1').value;
        document.getElementById('previewEduDescription1').textContent = document.getElementById('eduDescription1').value;
        
        document.getElementById('previewDegree2').textContent = document.getElementById('degree2').value;
        document.getElementById('previewInstitution2').textContent = document.getElementById('institution2').value;
        document.getElementById('previewEduDate2').textContent = document.getElementById('eduStartDate2').value + ' - ' + document.getElementById('eduEndDate2').value;
        document.getElementById('previewEduDescription2').textContent = document.getElementById('eduDescription2').value;
        
        // Skills section
        updateSkillsPreview();
    };
    
    // Update skills preview
    function updateSkillsPreview() {
        const skillsInput = document.getElementById('skills').value;
        const skillsArr = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
        
        const skillsPreviewList = document.getElementById('skillsPreviewList');
        skillsPreviewList.innerHTML = '';
        
        skillsArr.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillsPreviewList.appendChild(skillTag);
        });
        
        // Update the main preview skills section
        const previewSkills = document.getElementById('previewSkills');
        previewSkills.innerHTML = '';
        
        skillsArr.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            previewSkills.appendChild(skillTag);
        });
    }
    
    // Initialize skills preview
    updateSkillsPreview();
    
    // Add input event listeners to all form elements
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
    
    // Add functionality to dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            console.log(`${action} clicked`);
            // Here you would add specific functionality for each option
            
            // Close the dropdown
            profileDropdown.classList.remove('active');
        });
    });
});