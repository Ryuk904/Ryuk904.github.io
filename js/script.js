// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const contactForm = document.querySelector('.contact-form');

// Scroll Event
window.addEventListener('scroll', () => {
    // Add shadow to header on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Highlight active nav link based on scroll position
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Contact Form Submission (just for demonstration)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message (you can customize this)
        alert('Thanks for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Animation on Scroll (simple implementation)
const animateOnScroll = () => {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    
    elementsToAnimate.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Add animation classes to elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add animate-on-scroll class to elements that should animate
    document.querySelectorAll('.project-card, .skill-category, .about-image, .about-text').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Trigger initial animation check
    animateOnScroll();
    
    // Add typing animation to hero title (optional)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.innerHTML = heroTitle.textContent.replace(/\S/g, "<span>$&</span>");
        
        const spans = heroTitle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.05}s`;
        });
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero h1 span {
        display: inline-block;
        opacity: 0;
        animation: fadeIn 0.3s forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
    
    /* Mobile Menu Styles */
    @media screen and (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: white;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-150%);
            transition: transform 0.3s ease;
            z-index: 999;
        }
        
        .nav-links.active {
            transform: translateY(0);
        }
        
        .nav-links li {
            margin: 15px 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);
