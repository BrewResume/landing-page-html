document.addEventListener('DOMContentLoaded', function() {
    // Get all tab elements
    const tabs = document.querySelectorAll('.settings-tab');
    const sections = document.querySelectorAll('.settings-section');
    
    // Add click event to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the target section ID
            const targetId = this.getAttribute('data-tab');
            
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the target section
            document.getElementById(targetId).style.display = 'block';
        });
    });
    
    // Handle Save button click
    const saveButton = document.getElementById('saveSettingsBtn');
    saveButton.addEventListener('click', function() {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary)';
        notification.style.color = 'var(--dark)';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 6px rgba(0,0,0,0.2)';
        notification.style.zIndex = '9999';
        notification.innerHTML = `
            <div style="display: flex; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 20px; height: 20px; margin-right: 8px;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Settings saved successfully!
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    });
    
    // Setup color theme selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get color value from class
            let color = '';
            if (this.classList.contains('color-teal')) color = 'teal';
            else if (this.classList.contains('color-purple')) color = 'purple';
            else if (this.classList.contains('color-blue')) color = 'blue';
            else if (this.classList.contains('color-red')) color = 'red';
            else if (this.classList.contains('color-green')) color = 'green';
            
            // Update CSS variables
            const root = document.documentElement;
            switch(color) {
                case 'teal':
                    root.style.setProperty('--primary', '#64FFDA');
                    root.style.setProperty('--primary-dark', '#4ED8BB');
                    break;
                case 'purple':
                    root.style.setProperty('--primary', '#7F5AF0');
                    root.style.setProperty('--primary-dark', '#6A48D7');
                    break;
                case 'blue':
                    root.style.setProperty('--primary', '#2563EB');
                    root.style.setProperty('--primary-dark', '#1D4ED8');
                    break;
                case 'red':
                    root.style.setProperty('--primary', '#FF6B6B');
                    root.style.setProperty('--primary-dark', '#FF3333');
                    break;
                case 'green':
                    root.style.setProperty('--primary', '#10B981');
                    root.style.setProperty('--primary-dark', '#059669');
                    break;
            }
        });
    });
    
    // Device logout buttons functionality
    const logoutButtons = document.querySelectorAll('.device-actions button');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            const deviceItem = this.closest('.device-item');
            deviceItem.style.opacity = '0';
            deviceItem.style.height = '0';
            deviceItem.style.margin = '0';
            deviceItem.style.padding = '0';
            deviceItem.style.overflow = 'hidden';
            deviceItem.style.transition = 'all 0.5s ease';
        });
    });
    
    // API key copy button
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            // Create notification
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = 'var(--primary)';
            notification.style.color = 'var(--dark)';
            notification.style.padding = '12px 20px';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 3px 6px rgba(0,0,0,0.2)';
            notification.style.zIndex = '9999';
            notification.innerHTML = 'API key copied to clipboard!';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        });
    }
});