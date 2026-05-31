document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // MOBILE NAVIGATION NAVBAR
    // ----------------------------------------------------
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isActive = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        
        // Prevent background scrolling when menu is active
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking nav link or outside menu
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (hamburger.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // ----------------------------------------------------
    // HEADER SCROLL TRANSITION
    // ----------------------------------------------------
    const header = document.querySelector('.navbar-header');
    
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial invocation on load

    // ----------------------------------------------------
    // SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ----------------------------------------------------
    // SCROLL SPY ACTIVE NAV LINK
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    
    const scrollSpy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy();

    // ----------------------------------------------------
    // STATISTICS DYNAMIC COUNTER
    // ----------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // Animation duration in ms
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime >= duration) {
                element.textContent = target;
            } else {
                // Quadratic out easing function
                const progress = elapsedTime / duration;
                const easeProgress = progress * (2 - progress);
                const currentCount = Math.floor(easeProgress * target);
                element.textContent = currentCount;
                requestAnimationFrame(updateCount);
            }
        };

        requestAnimationFrame(updateCount);
    };

    // Trigger statistics countdown when visible
    const statsSection = document.querySelector('.stats-grid');
    let countersAnimated = false;

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                statNumbers.forEach(num => animateCounter(num));
                countersAnimated = true;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ----------------------------------------------------
    // GLASSMORPHIC CARD CURSOR GLOW EFFECT (Vercel Style)
    // ----------------------------------------------------
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});
