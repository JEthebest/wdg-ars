// Scroll-based landing page functionality
// No page navigation needed anymore



// Static invitation - no form functionality needed
// All content is now static HTML







// Scroll-based animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.section-title, .story-text, .photo-upload-container, ' +
        '.venue-info, .dress-code-section, .schedule-item, ' +
        '.program-header, .invitation-intro'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Staggered animation for schedule items
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Smooth scroll to sections
function setupSmoothScroll() {
    // Auto-scroll on hero section interaction
    const heroSection = document.querySelector('.hero-section');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.story-section')?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Minimal parallax for hero background only
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const mountainsBg = document.querySelector('.mountains-bg');
        
        if (mountainsBg) {
            mountainsBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Touch gestures for mobile scrolling enhancement
function setupTouchEnhancements() {
    // Add momentum scrolling for iOS
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Enhanced photo upload touch experience
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        placeholder.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Keyboard navigation for sections
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const sections = document.querySelectorAll('section');
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });
        
        if (!currentSection) return;
        
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            const nextSection = sections[currentIndex + 1];
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevSection = sections[currentIndex - 1];
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Export/Print functionality
function setupExportFunctions() {
    // Add floating action buttons
    const fabContainer = document.createElement('div');
    fabContainer.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        z-index: 1000;
    `;
    
    // Print button
    const printButton = document.createElement('button');
    printButton.innerHTML = '🖨️';
    printButton.title = 'Печать приглашения';
    printButton.style.cssText = `
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #8B9575;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    printButton.addEventListener('mouseenter', () => {
        printButton.style.transform = 'scale(1.1)';
        printButton.style.background = '#6B7460';
    });
    
    printButton.addEventListener('mouseleave', () => {
        printButton.style.transform = 'scale(1)';
        printButton.style.background = '#8B9575';
    });
    
    // Share button (if supported)
    if (navigator.share) {
        const shareButton = document.createElement('button');
        shareButton.innerHTML = '📤';
        shareButton.title = 'Поделиться приглашением';
        shareButton.style.cssText = printButton.style.cssText;
        
        shareButton.addEventListener('click', () => {
            shareInvitation();
        });
        
        shareButton.addEventListener('mouseenter', () => {
            shareButton.style.transform = 'scale(1.1)';
            shareButton.style.background = '#6B7460';
        });
        
        shareButton.addEventListener('mouseleave', () => {
            shareButton.style.transform = 'scale(1)';
            shareButton.style.background = '#8B9575';
        });
        
        fabContainer.appendChild(shareButton);
    }
    
    fabContainer.appendChild(printButton);
    document.body.appendChild(fabContainer);
}

// Print styles
function setupPrintStyles() {
    const printStyles = `
        @media print {
            body {
                background: white !important;
                padding: 0 !important;
            }
            
            .phone-frame {
                box-shadow: none !important;
                border-radius: 0 !important;
                background: white !important;
                width: 100% !important;
                height: auto !important;
                padding: 0 !important;
            }
            
            .page {
                position: static !important;
                opacity: 1 !important;
                transform: none !important;
                page-break-after: always;
                height: auto !important;
                min-height: 100vh;
            }
            
            .page:last-child {
                page-break-after: avoid;
            }
            
            .play-button, .pause-button, .website-bar {
                display: none !important;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = printStyles;
    document.head.appendChild(styleSheet);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved form data
    loadFormData();
    

    

    
    // Setup animations and interactions
    setupScrollAnimations();
    setupSmoothScroll();
    setupTouchEnhancements();
    setupKeyboardNavigation();
    
    // Setup export functionality
    setupExportFunctions();
    setupPrintStyles();
    setupShareFunction();
    

    

    
    console.log('Wedding invitation landing page initialized successfully!');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Wedding invitation error:', e.error);
});

// Utility functions
function validateForm() {
    const requiredFields = ['brideName', 'groomName', 'weddingDate'];
    const missingFields = [];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            missingFields.push(fieldId);
        }
    });
    
    return {
        isValid: missingFields.length === 0,
        missingFields: missingFields
    };
}

function showValidationMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${type === 'error' ? '#e74c3c' : '#8B9575'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 2000;
        font-size: 14px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Share functionality
function setupShareFunction() {
    if (navigator.share) {
        window.shareInvitation = function() {
            const validation = validateForm();
            if (!validation.isValid) {
                showValidationMessage('Пожалуйста, заполните обязательные поля: имена и дату', 'error');
                return;
            }
            
            const brideName = document.getElementById('brideName').value;
            const groomName = document.getElementById('groomName').value;
            const weddingDate = document.getElementById('weddingDate').value;
            
            navigator.share({
                title: `Свадебное приглашение ${brideName} и ${groomName}`,
                text: `Приглашаем вас на нашу свадьбу ${new Date(weddingDate).toLocaleDateString('ru-RU')}!`,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        };
    }
}


