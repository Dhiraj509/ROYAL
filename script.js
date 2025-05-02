document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    // Initialize dots click event
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
    }

    // Auto rotate testimonials
    function rotateTestimonials() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    if (testimonials.length > 0) {
        // Start auto rotation
        let testimonialInterval = setInterval(rotateTestimonials, 5000);

        // Pause rotation on hover
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });

            testimonialSlider.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(rotateTestimonials, 5000);
            });
        }
    }

    // Gallery Navigation
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (prevBtn && nextBtn && galleryItems.length > 0) {
        let currentGalleryPage = 0;
        const itemsPerPage = window.innerWidth <= 768 ? 2 : 3;
        const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

        function showGalleryPage(page) {
            galleryItems.forEach((item, index) => {
                const startIndex = page * itemsPerPage;
                const endIndex = startIndex + itemsPerPage - 1;
                
                if (index >= startIndex && index <= endIndex) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Initialize gallery
        showGalleryPage(0);

        // Previous button click
        prevBtn.addEventListener('click', () => {
            currentGalleryPage = (currentGalleryPage - 1 + totalPages) % totalPages;
            showGalleryPage(currentGalleryPage);
        });

        // Next button click
        nextBtn.addEventListener('click', () => {
            currentGalleryPage = (currentGalleryPage + 1) % totalPages;
            showGalleryPage(currentGalleryPage);
        });

        // Update gallery on window resize
        window.addEventListener('resize', () => {
            const newItemsPerPage = window.innerWidth <= 768 ? 2 : 3;
            if (newItemsPerPage !== itemsPerPage) {
                itemsPerPage = newItemsPerPage;
                showGalleryPage(0);
                currentGalleryPage = 0;
            }
        });
    }

    // Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    const bookingModal = document.getElementById('booking-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show the confirmation modal
            if (bookingModal) {
                bookingModal.classList.add('show');
            }
        });
    }

    // Close modal when clicking the X button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            bookingModal.classList.remove('show');
        });
    }

    // Close modal when clicking the Close button
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function() {
            bookingModal.classList.remove('show');
        });
    }

    // Close modal when clicking outside the modal content
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('show');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the email to a server here
            // For this demo, we'll just clear the input
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
});