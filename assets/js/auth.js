// Auth Pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Password Toggle Visibility
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Password Strength Checker
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        const strengthBar = document.querySelector('.strength-progress');
        const strengthText = document.querySelector('.strength-text span');
        const requirements = {
            length: document.querySelector('.password-requirements li:nth-child(1) i'),
            uppercase: document.querySelector('.password-requirements li:nth-child(2) i'),
            number: document.querySelector('.password-requirements li:nth-child(3) i'),
            special: document.querySelector('.password-requirements li:nth-child(4) i')
        };
        
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Check for length
            if (password.length >= 8) {
                requirements.length.classList.remove('far', 'fa-circle');
                requirements.length.classList.add('fas', 'fa-check-circle');
                strength += 25;
            } else {
                requirements.length.classList.remove('fas', 'fa-check-circle');
                requirements.length.classList.add('far', 'fa-circle');
            }
            
            // Check for uppercase
            if (/[A-Z]/.test(password)) {
                requirements.uppercase.classList.remove('far', 'fa-circle');
                requirements.uppercase.classList.add('fas', 'fa-check-circle');
                strength += 25;
            } else {
                requirements.uppercase.classList.remove('fas', 'fa-check-circle');
                requirements.uppercase.classList.add('far', 'fa-circle');
            }
            
            // Check for number
            if (/[0-9]/.test(password)) {
                requirements.number.classList.remove('far', 'fa-circle');
                requirements.number.classList.add('fas', 'fa-check-circle');
                strength += 25;
            } else {
                requirements.number.classList.remove('fas', 'fa-check-circle');
                requirements.number.classList.add('far', 'fa-circle');
            }
            
            // Check for special character
            if (/[^A-Za-z0-9]/.test(password)) {
                requirements.special.classList.remove('far', 'fa-circle');
                requirements.special.classList.add('fas', 'fa-check-circle');
                strength += 25;
            } else {
                requirements.special.classList.remove('fas', 'fa-check-circle');
                requirements.special.classList.add('far', 'fa-circle');
            }
            
            // Update strength UI
            strengthBar.style.width = `${strength}%`;
            
            if (strength <= 25) {
                strengthBar.style.backgroundColor = 'var(--auth-strength-weak)';
                strengthText.textContent = 'Too weak';
                strengthBar.classList.remove('medium', 'strong');
            } else if (strength <= 75) {
                strengthBar.style.backgroundColor = 'var(--auth-strength-medium)';
                strengthText.textContent = 'Medium';
                strengthBar.classList.add('medium');
                strengthBar.classList.remove('strong');
            } else {
                strengthBar.style.backgroundColor = 'var(--auth-strength-strong)';
                strengthText.textContent = 'Strong';
                strengthBar.classList.remove('medium');
                strengthBar.classList.add('strong');
            }
        });
    }
    
    // Form Submissions
    const authForms = document.querySelectorAll('.auth-form');
    
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.auth-submit');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = '';
            submitButton.style.position = 'relative';
            
            const loadingSpinner = document.createElement('i');
            loadingSpinner.className = 'fas fa-spinner fa-spin';
            loadingSpinner.style.marginRight = '8px';
            submitButton.prepend(loadingSpinner);
            submitButton.appendChild(document.createTextNode('Processing...'));
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Success state
                submitButton.textContent = '';
                const successIcon = document.createElement('i');
                successIcon.className = 'fas fa-check';
                successIcon.style.marginRight = '8px';
                submitButton.prepend(successIcon);
                
                if (form.closest('.auth-card').querySelector('.auth-brand .auth-subtitle').textContent.includes('Create')) {
                    submitButton.appendChild(document.createTextNode('Account Created'));
                    
                    // Redirect to sign in page after registration
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    submitButton.appendChild(document.createTextNode('Signed In'));
                    
                    // Redirect to dashboard after login
                    setTimeout(() => {
                        window.location.href = '../dashboard/dashboard.html';
                    }, 1500);
                }
            }, 2000);
        });
    });
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get button text to determine which social login
            const buttonText = this.textContent.trim();
            let provider = '';
            
            if (buttonText.includes('Google')) {
                provider = 'Google';
            } else if (buttonText.includes('LinkedIn')) {
                provider = 'LinkedIn';
            }
            
            // Show loading state
            const originalContent = this.innerHTML;
            this.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting to ${provider}...`;
            this.disabled = true;
            
            // Simulate OAuth redirect with timeout
            setTimeout(() => {
                // In a real app, this would redirect to OAuth provider
                console.log(`Redirecting to ${provider} OAuth...`);
                
                // For demo, just show success then redirect
                this.innerHTML = `<i class="fas fa-check"></i> Connected to ${provider}`;
                
                setTimeout(() => {
                    // Redirect to dashboard after successful OAuth
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 2000);
        });
    });
    
    // Decoration Elements Animation
    const decorationShapes = document.querySelectorAll('.decoration-shape');
    
    if (decorationShapes.length) {
        // Add subtle float animation
        decorationShapes.forEach((shape, index) => {
            shape.style.animation = `float${index + 1} 15s infinite ease-in-out`;
        });
        
        // Add keyframe animations dynamically
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            @keyframes float1 {
                0% { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(-20px, -20px) rotate(5deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
            
            @keyframes float2 {
                0% { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(20px, 20px) rotate(-5deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Add subtle entrance animation
    const authCard = document.querySelector('.auth-card');
    const authDecoration = document.querySelector('.auth-decoration');
    
    if (authCard) {
        authCard.style.opacity = '0';
        authCard.style.transform = 'translateY(20px)';
        authCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            authCard.style.opacity = '1';
            authCard.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (authDecoration) {
        authDecoration.style.opacity = '0';
        authDecoration.style.transform = 'translateX(20px)';
        authDecoration.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            authDecoration.style.opacity = '1';
            authDecoration.style.transform = 'translateX(0)';
        }, 300);
    }
});