// Toggle active tabs
document.querySelectorAll('.cover-letter-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.cover-letter-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Template hover effect
document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.template-overlay').style.opacity = '1';
    });
    card.addEventListener('mouseleave', function() {
        this.querySelector('.template-overlay').style.opacity = '0';
    });
});

// Pagination
document.querySelectorAll('.page-item').forEach(item => {
    if (!item.classList.contains('prev') && !item.classList.contains('next')) {
        item.addEventListener('click', function() {
            document.querySelectorAll('.page-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    }
});

// Filter dropdowns (simplified version)
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // In a real implementation, this would toggle a dropdown menu
        alert('Filter options would appear here');
    });
});