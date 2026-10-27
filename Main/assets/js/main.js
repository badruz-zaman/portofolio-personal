/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('shadow-header') 
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== TOAST NOTIFICATION ===============*/
const showToast = (message, type = 'info', duration = 3500) => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    toast.textContent = `${icon}  ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => toast.remove());
    }, duration);
};

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message'),
      contactButton = document.getElementById('contact-button'),
      buttonIcon = document.getElementById('button-icon'),
      buttonText = document.getElementById('button-text');

const sendEmail = (e) => {
    e.preventDefault();

    if (contactButton) {
        contactButton.disabled = true;
        if (buttonIcon) buttonIcon.className = 'ri-loader-4-line';
        if (buttonText) buttonText.textContent = 'Sending...';
    }

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_fhizrtw','template_wx7owp9','#contact-form','mBw70t3wo_3XwBFvx')
    .then(() =>{
       // Show sent message & toast
       contactMessage.textContent = ' Message sent successfully ✅';
       showToast('Pesan berhasil terkirim! Terima kasih telah menghubungi.', 'success');

       setTimeout(() =>{
            contactMessage.textContent = '';
       }, 5000);

       contactForm.reset();
    }, () =>{
        contactMessage.textContent = ' Message not sent (service error) ❌';
        showToast('Gagal mengirim pesan. Silakan coba kembali atau hubungi via WhatsApp.', 'error');
    })
    .finally(() => {
        if (contactButton) {
            contactButton.disabled = false;
            if (buttonIcon) buttonIcon.className = 'ri-send-plane-line';
            if (buttonText) buttonText.textContent = 'Send Message';
        }
    });
}

if(contactForm) contactForm.addEventListener('submit', sendEmail);
/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';
const themeImage = document.getElementById('theme-image'); // Ambil elemen gambar

// Ganti gambar sesuai tema
const lightImageSrc = 'assets/img/home-perfil.jpg'; // Path gambar untuk mode terang
const darkImageSrc = 'assets/img/mode-dark-1.jpg';   // Path gambar untuk mode gelap

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

// Update gambar sesuai tema yang disimpan
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
    themeImage.src = selectedTheme === 'dark' ? darkImageSrc : lightImageSrc; // Update gambar
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    // Ganti gambar sesuai tema
    if (document.body.classList.contains(darkTheme)) {
        themeImage.src = darkImageSrc;
    } else {
        themeImage.src = lightImageSrc;
    }

    // Simpan tema dan ikon yang dipilih
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== PROJECTS FILTER ===============*/
const filterBtns = document.querySelectorAll('.projects__filter-btn');
const projectCards = document.querySelectorAll('.projects__card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });
}

/*=============== INTERACTIVE PROJECT MODAL ===============*/
const projectsData = {
    1: {
        title: 'Guest House Booking',
        subtitle: 'Web App',
        image: 'assets/img/project-1.jpg',
        description: 'A complete hospitality booking web application designed to showcase guest rooms, amenities, customer reviews, and handle online reservation inquiries with ease.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
        features: [
            'Interactive room gallery with high-resolution image views',
            'Date picker and automated booking price calculator',
            'Direct reservation inquiry submission flow',
            'Clean architectural grid layout with smooth hover effects'
        ],
        demoUrl: '#',
        codeUrl: 'https://github.com/Vazz-B'
    },
    2: {
        title: 'Orca Paper Stationery',
        subtitle: 'UI/UX Design',
        image: 'assets/img/project-2.jpg',
        description: 'An elegant e-commerce design concept crafted in Figma for premium stationery, bespoke journals, and artisanal writing instruments.',
        tags: ['Figma', 'UI/UX', 'Design System', 'Prototyping'],
        features: [
            'Minimalist editorial layout with generous whitespace and clear typography',
            'Interactive product page with paper texture and binding options',
            'Optimized 3-step checkout experience reducing cart abandonment',
            'Full mobile-ready responsive component library'
        ],
        demoUrl: '#',
        codeUrl: 'https://github.com/Vazz-B'
    },
    3: {
        title: 'Fast Food Express',
        subtitle: 'Web App',
        image: 'assets/img/project-3.jpg',
        description: 'Dynamic food ordering web application featuring real-time menu category filters, item customization, cart persistence, and order tracking.',
        tags: ['React', 'JavaScript', 'Tailwind', 'LocalStorage'],
        features: [
            'Instant category filtering across appetizers, meals, and beverages',
            'Persistent shopping cart state using browser LocalStorage',
            'Real-time price calculation with tax and delivery estimates',
            'Interactive order progress timeline tracker'
        ],
        demoUrl: '#',
        codeUrl: 'https://github.com/Vazz-B'
    },
    4: {
        title: 'Coffee Delivery App',
        subtitle: 'Mobile App',
        image: 'assets/img/project-4.jpg',
        description: 'Cross-platform mobile application interface built with Flutter, designed for specialty coffee lovers to customize beverages and schedule pickups.',
        tags: ['Flutter', 'Dart', 'Mobile UI', 'Micro-interactions'],
        features: [
            'Dynamic cup size, dairy preference, and syrup customization sliders',
            'Nearest café branch locator and scheduled counter pickup',
            'Gamified rewards and member discount tier showcase',
            'Sleek dark and light theme palette support'
        ],
        demoUrl: '#',
        codeUrl: 'https://github.com/Vazz-B'
    },
    5: {
        title: 'Barbershop Rich',
        subtitle: 'UI/UX Design',
        image: 'assets/img/project-5.jpg',
        description: 'Dark-mode luxury appointment scheduling portal designed for an exclusive men’s barbershop and grooming studio.',
        tags: ['Figma', 'UI/UX', 'Dark Theme', 'Appointment Portal'],
        features: [
            'Stylist portfolio showcase with customer ratings and specialties',
            'Intuitive calendar date and available hour slot picker',
            'Service package breakdown with duration and pricing cards',
            'Seamless WhatsApp and SMS reminder confirmation workflow'
        ],
        demoUrl: '#',
        codeUrl: 'https://github.com/Vazz-B'
    }
};

const projectModal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');

function openProjectModal(id) {
    const project = projectsData[id];
    if (!project || !projectModal || !modalContent) return;

    modalContent.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project__modal-img">
        <span class="project__modal-subtitle">${project.subtitle}</span>
        <h3 class="project__modal-title">${project.title}</h3>
        <p class="project__modal-desc">${project.description}</p>
        
        <div class="projects__tags project__modal-tags">
            ${project.tags.map(tag => `<span>#${tag}</span>`).join('')}
        </div>

        <div class="project__modal-features">
            <h4>Key Highlights & Features:</h4>
            <ul>
                ${project.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>

        <div class="project__modal-actions">
            <a href="${project.codeUrl}" target="_blank" class="button">
                <i class="ri-github-line"></i> View Source Code
            </a>
            <a href="${project.demoUrl}" class="button button__secondary demo-preview-btn">
                <i class="ri-external-link-line"></i> Live Demo
            </a>
        </div>
    `;

    // Demo button handler
    const demoBtn = modalContent.querySelector('.demo-preview-btn');
    if (demoBtn) {
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Live preview & code repository are accessible on GitHub!', 'info');
        });
    }

    projectModal.classList.add('active-modal');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active-modal');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('.project-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        openProjectModal(id);
    });
});

if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active-modal')) {
        closeProjectModal();
    }
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
});

sr.reveal(`.home__perfil, .about__image, .contact__mail`, {origin: 'right'});
sr.reveal(`.home__title-box, .home__info, 
           .about__container .section__title-1, .about__info, 
           .contact__social, .contact__data`, {origin: 'left'});
sr.reveal(`.services__card, .projects__card, .about__skills`, {interval: 100});