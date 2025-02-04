// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

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

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get the form message div
            const formMessage = contactForm.querySelector('.form-message');
            formMessage.textContent = 'Sending message...';
            formMessage.className = 'form-message';
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action || '/contact/', {
                    method: 'POST',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': formData.get('csrfmiddlewaretoken')
                    },
                    body: formData
                });
                
                const data = await response.json();
                console.log('Response:', data);  // Debug log
                
                if (response.ok && data.status === 'success') {
                    formMessage.textContent = data.message;
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        formMessage.textContent = '';
                        formMessage.className = 'form-message';
                    }, 5000);
                } else {
                    formMessage.textContent = data.message || 'An error occurred. Please try again.';
                    formMessage.className = 'form-message error';
                }
            } catch (error) {
                console.error('Error:', error);
                formMessage.textContent = 'An error occurred. Please try again.';
                formMessage.className = 'form-message error';
            }
        });
    }
}); 