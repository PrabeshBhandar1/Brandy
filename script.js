document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality
    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Set up initial slide position
    heroSlider.style.width = `${slideCount * 100}%`;
    slides.forEach(slide => {
        slide.style.width = `${100 / slideCount}%`;
    });
    
    // Function to change slide
    // function goToSlide(index) {
    //     if (index < 0) index = slideCount - 1;
    //     if (index >= slideCount) index = 0;
        
    //     heroSlider.style.transform = `translateX(-${index * (100 / slideCount)}%)`;
        
    //     // Update active dot
    //     dots.forEach(dot => dot.classList.remove('active'));
    //     dots[index].classList.add('active');
        
    //     currentSlide = index;
        
    //     // Reset animations for current slide
    //     const currentSlideContent = slides[currentSlide].querySelector('.slide-content');
    //     const elements = currentSlideContent.querySelectorAll('h1, p, .slide-btn');
        
    //     elements.forEach(element => {
    //         element.style.animation = 'none';
    //         element.offsetHeight; // Trigger reflow
    //         element.style.animation = null;
    //     });
    // }
    
    // // Automatic slideshow
    // let slideInterval = setInterval(() => {
    //     goToSlide(currentSlide + 1);
    // }, 5000);
    
    // Click events for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            
            // Restart interval
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
    });
    
    // Testimonials slider functionality
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    const testimonialCount = testimonialSlides.length;
    
    // Set up initial testimonial position
    testimonialsTrack.style.width = `${testimonialCount * 100}%`;
    testimonialSlides.forEach(slide => {
        slide.style.width = `${100 / testimonialCount}%`;
    });
    
    // Function to change testimonial
    function goToTestimonial(index) {
        if (index < 0) index = testimonialCount - 1;
        if (index >= testimonialCount) index = 0;
        
        testimonialsTrack.style.transform = `translateX(-${index * (100 / testimonialCount)}%)`;
        currentTestimonial = index;
    }
    
    // Click events for testimonial navigation
    prevButton.addEventListener('click', () => {
        goToTestimonial(currentTestimonial - 1);
    });
    
    nextButton.addEventListener('click', () => {
        goToTestimonial(currentTestimonial + 1);
    });
    
    // Mobile menu toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        const mobileMenuStyles = document.createElement('style');
        mobileMenuStyles.textContent = `
            .mobile-menu-btn {
                display: none;
                font-size: 24px;
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block;
                }
                
                .nav-links {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    background-color: #fff;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    transform: translateY(-150%);
                    transition: transform 0.3s ease;
                }
                
                .nav-links.active {
                    transform: translateY(0);
                    display: flex;
                }
                
                .nav-links li {
                    margin: 15px 0;
                }
            }
        `;
        document.head.appendChild(mobileMenuStyles);
        
        nav.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };
    
    createMobileMenu();
    
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.category-card, .product-card, .section-title');
    
    const fadeIn = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Add initial styles for fade elements
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.transform = 'translateY(20px)';
    });
    
    // Create CSS class for visible elements
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Run fade function on load and scroll
    window.addEventListener('scroll', fadeIn);
    window.addEventListener('load', fadeIn);
});



