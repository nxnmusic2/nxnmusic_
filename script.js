document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll Animations (Fade In Up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // Booking Form Submission (Placeholder)
    // Booking Form Submission (Formspree)
    const form = document.querySelector('.booking-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            // Update button state to loading
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Build form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                // Formspree ID: xdaopndq
                const response = await fetch('https://formspree.io/f/xdaopndq', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    // Success State
                    btn.innerText = 'Sent!';
                    btn.style.borderColor = 'var(--neon-green)';
                    btn.style.color = 'var(--neon-green)';

                    setTimeout(() => {
                        alert("Thank you! Your inquiry has been sent to nxnmusic_ management.");
                        form.reset();
                        btn.innerText = originalText;
                        btn.disabled = false;
                        btn.style.borderColor = '';
                        btn.style.color = '';
                    }, 1000);
                } else {
                    // Error State (Server side)
                    const result = await response.json();
                    console.error('Formspree Error:', result);
                    throw new Error(result.error || 'Form submission failed');
                }
            } catch (error) {
                // Network or other error
                console.error('Submission Error:', error);
                alert("There was a problem sending your inquiry. Please try again or email directly.");
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
});
