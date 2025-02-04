// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

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

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
const formMessage = document.querySelector('.form-message');

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

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.setProperty('--progress-width', width);
            observer.unobserve(progressBar);
        }
    });
}, observerOptions);

progressBars.forEach(bar => {
    observer.observe(bar);
}); 