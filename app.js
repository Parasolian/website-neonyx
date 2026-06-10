/* -------------------------------------------------------------------------
 * NEONYX DESIGNS - Interactive Scripts
 * ------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPortfolioFilter();
    initScrollAnimations();
});

/* =========================================================================
   1. Navigation & Sticky Navbar
   ========================================================================= */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksList = document.querySelector('.nav-links');

    // Sticky Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Hamburger Menu Toggle
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navLinksList.classList.toggle('active');
    });

    // Close Menu on Link Click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navLinksList.classList.remove('active');
        });
    });
}

/* =========================================================================
   2. Portfolio Filter
   ========================================================================= */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset card styling for smooth transition
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';

                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hide');
                        setTimeout(() => {
                            card.style.transform = 'scale(1)';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.classList.add('hide');
                    }
                }, 300);
            });
        });
    });
}

/* =========================================================================
   3. Style Archetype Quiz Logic
   ========================================================================= */
let quizAnswers = {
    1: '',
    2: '',
    3: ''
};

function startQuiz() {
    // Hide intro
    document.getElementById('step-intro').classList.remove('active');
    // Show step 1
    document.getElementById('step-1').classList.add('active');
    // Set Progress
    updateProgress(33);
}

function selectOption(questionNum, selection) {
    // Store answer
    quizAnswers[questionNum] = selection;
    
    // Hide current step
    document.getElementById(`step-${questionNum}`).classList.remove('active');

    if (questionNum < 3) {
        // Go to next question
        const nextStep = questionNum + 1;
        document.getElementById(`step-${nextStep}`).classList.add('active');
        updateProgress(nextStep * 33);
    } else {
        // Evaluate Result
        displayResult();
    }
}

function updateProgress(percentage) {
    const progressBar = document.getElementById('quiz-progress');
    progressBar.style.width = `${percentage}%`;
}

function displayResult() {
    // Calculate Archetype
    const answersList = Object.values(quizAnswers);
    const countA = answersList.filter(x => x === 'A').length;
    const countB = answersList.filter(x => x === 'B').length;
    const countC = answersList.filter(x => x === 'C').length;

    let archetype = {
        title: '',
        desc: '',
        image: '',
        features: []
    };

    if (countA >= countB && countA >= countC) {
        // Onyx Modernist
        archetype.title = "Onyx Modernist";
        archetype.image = "assets/dallas_modern.png";
        archetype.desc = "You gravitate towards a stunning high-end look featuring rich charcoal hues, custom backlighting, and polished metals like gold and brass. Your spaces feel like luxury hotel lounges, balancing bold contrasts with a warm, ambient atmosphere.";
        archetype.features = [
            "Rich textured slate & dark marble surfaces",
            "Soft gold indirect LED strip integration",
            "Warm metallic accents (Brass, Bronze)"
        ];
    } else if (countB > countA && countB >= countC) {
        // Transitional Luxe
        archetype.title = "Transitional Luxe";
        archetype.image = "assets/the_great_room.png";
        archetype.desc = "You appreciate grand, timeless spaces that feel warm, textured, and classical yet clean. Limestone fireplaces, built-in library shelves with soft glow styling, and soft neutral textiles create an elegant, comfortable sanctuary.";
        archetype.features = [
            "White limestone fireplaces & built-in shelving",
            "Integrated warm accent bookcase light strips",
            "Serene neutral furniture styling & wood beams"
        ];
    } else {
        // Coastal Modernist
        archetype.title = "Coastal Modernist";
        archetype.image = "assets/belmar_beach.png";
        archetype.desc = "You love bright, tranquil spaces that blend contemporary profiles with natural beachside aesthetics. Light oak flooring, custom wicker elements, warm glowing lanterns, and soft linen fabrics create a relaxing oasis.";
        archetype.features = [
            "Light oak wood & bright linen textures",
            "Panoramic window layouts highlighting views",
            "Subtle seaside accents & warm woven light features"
        ];
    }

    // Set content in result window
    document.getElementById('result-title').textContent = archetype.title;
    document.getElementById('result-desc').textContent = archetype.desc;
    document.getElementById('result-img').src = archetype.image;
    document.getElementById('result-img').alt = archetype.title;

    // Fallback if local assets are missing
    document.getElementById('result-img').onerror = function() {
        this.onerror = null;
        if (archetype.title === "Onyx Modernist") {
            this.src = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80";
        } else if (archetype.title === "Transitional Luxe") {
            this.src = "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80";
        } else {
            this.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80";
        }
    };

    // Set Checklist
    const featuresList = document.getElementById('result-features');
    featuresList.innerHTML = '';
    archetype.features.forEach(feat => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${feat}`;
        featuresList.appendChild(li);
    });

    // Show result step
    document.getElementById('step-result').classList.add('active');
    updateProgress(100);
}

function resetQuiz() {
    // Reset answers
    quizAnswers = { 1: '', 2: '', 3: '' };
    
    // Hide result step
    document.getElementById('step-result').classList.remove('active');
    
    // Show intro
    document.getElementById('step-intro').classList.add('active');
    
    // Reset Progress Bar
    updateProgress(0);
}

function setContactSubject() {
    const resultTitle = document.getElementById('result-title').textContent;
    const messageBox = document.getElementById('project-message');
    messageBox.value = `Hi Neonyx Designs, I just completed your online Style Quiz and received the '${resultTitle}' archetype. I'd love to set up a consultation to discuss applying this mood to my upcoming project!`;
}

/* =========================================================================
   4. Contact Form Validation & Mock Submit
   ========================================================================= */
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = document.getElementById('client-name').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const message = document.getElementById('project-message').value.trim();
    const statusMsg = document.getElementById('form-status-message');

    if (!name || !email || !message) {
        statusMsg.className = "form-status error";
        statusMsg.textContent = "Please fill in all required fields.";
        statusMsg.style.opacity = '1';
        return;
    }

    // Display beautiful success status
    statusMsg.className = "form-status success";
    statusMsg.textContent = `Thank you, ${name}! Your consultation request was received. We will reach out to you within 24 hours.`;
    statusMsg.style.opacity = '1';

    // Clear form inputs
    form.reset();

    // Auto-hide success message after 6 seconds
    setTimeout(() => {
        statusMsg.style.opacity = '0';
    }, 6000);
}

/* =========================================================================
   5. Scroll-Triggered Fade-In Animations
   ========================================================================= */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.philosophy-card, .service-card, .project-card, .section-header');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply a simple CSS animation class or slide up smoothly
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });

    // Hero initial fade-ins
    const heroElements = document.querySelectorAll('.hero-tagline, .hero-title, .hero-description, .hero-actions');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 1s cubic-bezier(0.25, 0.8, 0.25, 1), transform 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 150 * (index + 1));
    });
}
