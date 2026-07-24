// Sync SVG glow rect border-radius with button border-radius
(function setGlowEffectRx() {
    const glowEffects = document.querySelectorAll('.glow');
    glowEffects.forEach(element => {
        const rx = getComputedStyle(element).borderRadius;
        element.querySelectorAll('rect').forEach(rect => {
            rect.setAttribute('rx', rx);
        });
    });
})();

const hamburger = document.querySelector(".header .navbar .navlist .hamburger");
const mobile_menu = document.querySelector(".header .navbar .navlist ul");
const menu_item = document.querySelectorAll(".header .navbar .navlist ul li a");
const header = document.getElementById("header");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
});

const handleScroll = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 || window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
};

document.body.addEventListener("scroll", handleScroll);
window.addEventListener("scroll", handleScroll);

menu_item.forEach((item) => {
    item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobile_menu.classList.remove("active");
    });
});

// Form Submission Handler
const contactForm = document.getElementById('contact-form');
const formPopup = document.getElementById('form-popup');
const closePopup = document.querySelector('.close-popup');
const popupTitle = document.getElementById('popup-title');
const popupMessage = document.getElementById('popup-message');

if (contactForm) {
    const submitBtn = contactForm.querySelector('input[type="submit"]');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const originalBtnText = submitBtn.value;
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                popupTitle.textContent = "Success!";
                popupTitle.style.color = "var(--color-primary)";
                popupMessage.textContent = "Your message has been sent successfully. We will get back to you soon.";
                contactForm.reset();
            } else {
                popupTitle.textContent = "Error";
                popupTitle.style.color = "var(--color-on-surface)";
                popupMessage.textContent = json.message || "Something went wrong!";
            }
        })
        .catch(error => {
            popupTitle.textContent = "Error";
            popupTitle.style.color = "var(--color-on-surface)";
            popupMessage.textContent = "Something went wrong! Please try again later.";
        })
        .finally(() => {
            formPopup.classList.remove('hidden');
            submitBtn.value = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

if (closePopup) {
    closePopup.addEventListener('click', () => {
        formPopup.classList.add('hidden');
    });
}

if (formPopup) {
    window.addEventListener('click', (e) => {
        if (e.target == formPopup) {
            formPopup.classList.add('hidden');
        }
    });
}

// Universal Reactive Border Outline Interaction
(function initInteractiveGlow() {
    function handleElementMouseMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    }

    function attachInteractiveGlow() {
        const selectors = [
            // Buttons & CTAs
            '.cta', '.more-button', '.get-a-quote-button', '.back-button', 
            '.np-cta', '.whatsapp_us', 'input[type="submit"]', '.socialmedia-icon',
            // Mobile Menu
            '#header .navlist ul li a',
            // Cards & Service Items
            '.service-item', '.feature-card', '#bottom .item', 
            // Contact Section Cards (Outer Get a Quote Box & Right Cards)
            '.contact-left', '.contact-item', '.map-container',
            // Images & Feature Containers
            '.np-wrapper', '.np-image', '.about-img', '.service-image', '.hero-image-wrap'
        ];
        const elements = document.querySelectorAll(selectors.join(', '));
        elements.forEach(el => {
            if (!el.classList.contains('interactive-glow')) {
                el.classList.add('interactive-glow');
                el.addEventListener('mousemove', handleElementMouseMove);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachInteractiveGlow);
    } else {
        attachInteractiveGlow();
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Global Scroll Reveal & Staggered Reveal Animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    const revealSelectors = [
        '.section-title',
        '.np-wrapper',
        '#about .column-left',
        '#about .column-right',
        '.client-slider .clients',
        '.contact-left',
        '.contact-right'
    ];
    
    document.querySelectorAll(revealSelectors.join(', ')).forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Staggered reveal components
    document.querySelectorAll('.service-item').forEach(el => {
        el.classList.add('staggered-reveal');
        revealObserver.observe(el);
    });
});
