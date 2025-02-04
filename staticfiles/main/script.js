// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    function handleScroll() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    if (backToTopButton) {
        // Initial check for scroll position
        handleScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Scroll to top when clicked
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