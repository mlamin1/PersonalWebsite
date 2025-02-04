// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const expertiseSection = document.querySelector('.about-me');
            if (expertiseSection) {
                expertiseSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    const formMessage = document.querySelector('.form-message');

    if (newsletterForm && formMessage) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            formMessage.textContent = 'Subscribing...';
            
            try {
                // Here you would typically make an API call to your backend
                // For now, we'll simulate a successful subscription
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                formMessage.textContent = 'Thank you for subscribing!';
                formMessage.className = 'form-message success';
                newsletterForm.reset();
                
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 3000);
            } catch (error) {
                formMessage.textContent = 'Something went wrong. Please try again.';
                formMessage.className = 'form-message error';
            }
        });
    }

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress');
    
    function updateProgressBar(progressBar) {
        const width = progressBar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
        progressBar.textContent = width + '%';
        progressBar.style.setProperty('--progress-width', width + '%');
    }

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                updateProgressBar(progressBar);
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}); 