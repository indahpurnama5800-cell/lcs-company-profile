document.addEventListener('DOMContentLoaded', function () {

    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
    });

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
            if (!navLinks.classList.contains('open')) {
                document.querySelectorAll('.nav-toggle span').forEach(s => s.style.background = '');
            }
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

  
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .portfolio-card, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.8)';
            cursorFollower.style.opacity = '0.3';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.opacity = '0.5';
        });
    });


    const heroCounters = document.querySelectorAll('.trust-number[data-count]');
    let heroCountersDone = false;

    const observeHeroCounters = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroCountersDone) {
                heroCountersDone = true;
                heroCounters.forEach(counter => {
                    const target = parseInt(counter.dataset.count);
                    animateCount(counter, 0, target, 1800);
                });
            }
        });
    }, { threshold: 0.3 });

    if (heroCounters.length) {
        observeHeroCounters.observe(heroCounters[0]);
    }

    const statCounters = document.querySelectorAll('.stat-number.counter');

    const observeStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                if (!counter.dataset.animated) {
                    counter.dataset.animated = 'true';
                    animateCount(counter, 0, target, 1500);
                }
                observeStats.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    statCounters.forEach(c => observeStats.observe(c));

    function animateCount(el, start, end, duration) {
        let startTime = null;
        function update(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(start + (end - start) * eased);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = end;
        }
        requestAnimationFrame(update);
    }

    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 40; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(14,165,233,${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
                animation-delay: ${Math.random() * 8}s;
            `;
            particlesContainer.appendChild(dot);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
                25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.3); }
                50% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(0.8); opacity: 0.8; }
                75% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }

    // =====================================
    // Portfolio Filter
    // =====================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach(item => {
                const categories = item.dataset.category || '';
                if (filter === 'all' || categories.includes(filter)) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.4s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    const vmTabs = document.querySelectorAll('.vm-tab');
    const vmPanels = document.querySelectorAll('.vm-panel');

    vmTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            vmTabs.forEach(t => t.classList.remove('active'));
            vmPanels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const targetId = tab.dataset.tab;
            const target = document.getElementById(targetId);
            if (target) target.classList.add('active');
        });
    });

    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =====================================
    // Smooth Scroll
    // =====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // =====================================
    // Form Submit Feedback
    // =====================================
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.innerHTML = '<span>Mengirim...</span><i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;
            }
        });
    }

    // Fade in animation for portfolio items
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(fadeStyle);

});