// ========================================
// DOM CONTENT LOADED - INICIO
// ========================================

document.addEventListener('DOMContentLoaded', function() {

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navbar) {
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });
}

// Mobile Navigation Toggle
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translateY(10px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
      } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
      }
  });

  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          const spans = navToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
      });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Animación de números del proceso
const timelineMarkers = document.querySelectorAll('.timeline-marker');
const timelineItems = document.querySelectorAll('.timeline-item');

const animateTimelineNumbers = () => {
    const isMobile = window.innerWidth <= 768;
    
    timelineItems.forEach((item, index) => {
        const marker = item.querySelector('.timeline-marker');
        if (!marker) return;
        
        const itemRect = item.getBoundingClientRect();
        const itemTop = itemRect.top;
        const itemBottom = itemRect.bottom;
        const windowHeight = window.innerHeight;
        
        let shouldActivate = false;
        
        if (isMobile) {
            shouldActivate = itemTop < windowHeight - 200;
        } else {
            const activationTop = windowHeight * 0.2;
            const activationBottom = windowHeight * 0.8;
            shouldActivate = itemTop < activationBottom && itemBottom > activationTop;
        }
        
        if (shouldActivate) {
            marker.classList.add('active');
        } else if (!isMobile) {
            marker.classList.remove('active');
        }
    });
};

const initTimelineAnimation = () => {
    setTimeout(() => {
        animateTimelineNumbers();
    }, 100);
};

window.addEventListener('scroll', animateTimelineNumbers);
window.addEventListener('load', initTimelineAnimation);
window.addEventListener('resize', animateTimelineNumbers);
initTimelineAnimation();

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

const observerOptionsStats = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptionsStats);

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// Parallax Effect for Video
const videoParallax = document.querySelector('.parallax-video');

if (videoParallax) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const videoSection = document.querySelector('.video-parallax');
        
        if (videoSection) {
            const videoTop = videoSection.offsetTop;
            const videoHeight = videoSection.offsetHeight;
            
            if (scrolled > videoTop - window.innerHeight && scrolled < videoTop + videoHeight) {
                const parallaxValue = (scrolled - videoTop) * 0.5;
                videoParallax.style.transform = `translate(-50%, calc(-50% + ${parallaxValue}px))`;
            }
        }
    });
}

// Hero Video Background Effect
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrolled < heroHeight) {
            const opacity = 1 - (scrolled / heroHeight) * 0.5;
            heroVideo.style.opacity = opacity;
        }
    });
}

// Timeline Animation on Scroll
const timelineItemsAnim = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

timelineItemsAnim.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    timelineObserver.observe(item);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            mensaje: document.getElementById('mensaje').value
        };
        
        console.log('Form submitted:', formData);
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
          scrollToTopBtn.classList.add('visible');
      } else {
          scrollToTopBtn.classList.remove('visible');
      }
  });

  scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
}

// Lazy Loading Images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

document.body.classList.add('loaded');

// Add keyframe animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Testimonials Carousel Auto-scroll
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function highlightTestimonial() {
    testimonialCards.forEach((card, index) => {
        if (index === currentTestimonial) {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 20px 60px rgba(210, 105, 30, 0.3)';
        } else {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        }
    });
    
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
}

if (testimonialCards.length > 0) {
    setInterval(highlightTestimonial, 5000);
}

// Form Input Animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        const label = input.parentElement.querySelector('label');
        if (label) {
          label.style.color = 'var(--accent-color)';
        }
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            const label = input.parentElement.querySelector('label');
            if (label) {
              label.style.color = 'var(--primary-color)';
            }
        }
    });
});

// Performance Optimization: Debounce scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedReveal = debounce(revealOnScroll);
window.removeEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', debouncedReveal);

console.log('%c¡Bienvenido a Tashi Cerámica!', 'color: #D2691E; font-size: 20px; font-weight: bold;');
console.log('%cMás que una botella, creamos arte', 'color: #8B4513; font-size: 14px; font-style: italic;');

// Logo interactions
const navLogo = document.querySelector('.logo-interactive');
const sectionBadges = document.querySelectorAll('.logo-section-badge');
const accentLogos = document.querySelectorAll('.logo-accent-small');

if (navLogo) {
    navLogo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Section badges - add bounce effect on scroll into view
const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'bounce-in 0.8s ease-out';
        }
    });
}, { threshold: 0.5 });

sectionBadges.forEach(badge => {
    badgeObserver.observe(badge);
    
    badge.addEventListener('click', () => {
        badge.style.transform = 'scale(1.3) rotate(720deg)';
        setTimeout(() => {
            badge.style.transform = '';
        }, 600);
    });
});

// Accent logos - wiggle on hover
accentLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.animation = 'wiggle 0.5s ease-in-out';
    });
    
    logo.addEventListener('animationend', () => {
        logo.style.animation = '';
    });
});

// Add CSS animations dynamically
const logoAnimations = document.createElement('style');
logoAnimations.textContent = `
    @keyframes bounce-in {
        0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.2) rotate(10deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
    
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg) scale(1.1); }
        75% { transform: rotate(10deg) scale(1.1); }
    }
`;
document.head.appendChild(logoAnimations);

// Interactive hover effects for feature cards
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Progress bar for page scroll
const createProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--accent-color), var(--secondary-color));
        z-index: 10000;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createProgressBar();

// BUBBLE MENU
class BubbleMenu {
    constructor(options = {}) {
        this.isOpen = false;
        this.toggle = document.querySelector('.bubble-menu-toggle');
        this.overlay = document.querySelector('.bubble-menu-overlay');
        this.pills = document.querySelectorAll('.bubble-pill-link');
        this.staggerDelay = options.staggerDelay || 120;
        this.init();
    }

    init() {
        if (!this.toggle || !this.overlay) return;

        this.toggle.addEventListener('click', () => this.toggleMenu());

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        this.pills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                const href = pill.getAttribute('href');
                if (href && href.startsWith('#')) {
                    setTimeout(() => this.closeMenu(), 300);
                }
            });
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.toggle.classList.add('open');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        this.pills.forEach((pill, index) => {
            setTimeout(() => {
                pill.classList.add('show');
            }, index * this.staggerDelay);
        });
    }

    closeMenu() {
        this.isOpen = false;
        this.toggle.classList.remove('open');
        document.body.style.overflow = '';

        this.pills.forEach(pill => {
            pill.classList.remove('show');
        });

        setTimeout(() => {
            this.overlay.classList.remove('active');
        }, 300);
    }
}

const originalNav = document.querySelector('.navbar');
if (originalNav) {
    originalNav.style.display = 'none';
}

const bubbleMenu = new BubbleMenu({ staggerDelay: 120 });
console.log('🫧 Bubble Menu inicializado');

window.addEventListener('resize', () => {
    const pills = document.querySelectorAll('.bubble-pill-link');
    const isMobile = window.innerWidth < 900;
    
    pills.forEach(pill => {
        if (isMobile) {
            pill.style.setProperty('--rotation', '0deg');
        } else {
            const rotation = pill.getAttribute('data-rotation') || '0deg';
            pill.style.setProperty('--rotation', rotation);
        }
    });
});

// CARRUSEL INFINITO PARA TESTIMONIOS
function createInfiniteCarousel(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container || window.innerWidth > 768) return;
    
    const items = Array.from(container.children);
    if (items.length === 0) return;
    
    items.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
    });
    
    let isScrolling;
    container.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        
        isScrolling = setTimeout(() => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            const currentScroll = container.scrollLeft;
            const itemWidth = items[0].offsetWidth + parseFloat(getComputedStyle(container).gap);
            const totalOriginalWidth = itemWidth * items.length;
            
            if (currentScroll >= totalOriginalWidth) {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = currentScroll - totalOriginalWidth;
                setTimeout(() => {
                    container.style.scrollBehavior = 'smooth';
                }, 50);
            }
            else if (currentScroll <= 0) {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = totalOriginalWidth;
                setTimeout(() => {
                    container.style.scrollBehavior = 'smooth';
                }, 50);
            }
        }, 150);
    });
}

function initInfiniteCarousels() {
    if (window.innerWidth <= 768) {
        createInfiniteCarousel('.testimonials-carousel');
        createInfiniteCarousel('.reviews-grid');
    }
}

initInfiniteCarousels();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const testimonialCarousel = document.querySelector('.testimonials-carousel');
        if (testimonialCarousel) {
          const wasMobile = testimonialCarousel.children.length > 3;
          const isMobile = window.innerWidth <= 768;
          
          if (wasMobile !== isMobile) {
              location.reload();
          }
        }
    }, 250);
});

console.log('🔄 Carruseles infinitos inicializados para móvil');

}); // FIN DE DOMContentLoaded

// BOOT VIDEO DON RAMÓN
(function () {
  const video = document.querySelector('.video-parallax .parallax-video');
  if (!video) return;

  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  video.muted = true;

  const show = () => {
    video.style.opacity = '1';
  };

  video.addEventListener('loadeddata', show, { once: true });
  video.addEventListener('canplay', show, { once: true });

  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        show();
      }).catch((err) => {
        console.warn('[Don Ramón] Autoplay bloqueado o códec no soportado:', err);
        video.setAttribute('controls', '');
      });
    }
  };

  video.addEventListener('error', (e) => {
    console.error('[Don Ramón] Error al cargar/decodificar el video.', e);
    video.setAttribute('controls', '');
  });

  if (!video.currentSrc) {
    const mp4 = video.querySelector('source[type="video/mp4"]');
    if (mp4 && mp4.src) {
      video.src = mp4.src;
    }
  }

  tryPlay();
})();

// ===== SISTEMA DE FILTRADO DE GALERÍA =====
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    console.log('🎨 Filtros encontrados:', filterBtns.length);
    console.log('🖼️ Gallery items encontrados:', galleryItems.length);
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');
                console.log('🔍 Filtrando por:', filterValue);
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

// ===== LIGHTBOX CON TÍTULO Y DESCRIPCIÓN =====
class Lightbox {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.init();
  }

  init() {
    this.disableOldLightbox();
    this.createLightboxHTML();
    this.initGallery();
    this.initClientes();
    this.setupEventListeners();
  }

  disableOldLightbox() {
    const oldGalleryItems = document.querySelectorAll('.gallery-item');
    oldGalleryItems.forEach(item => {
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);
    });

    const oldClienteItems = document.querySelectorAll('.cliente-item');
    oldClienteItems.forEach(item => {
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);
    });
  }

  createLightboxHTML() {
    const oldLightbox = document.querySelector('.lightbox');
    if (oldLightbox) {
      oldLightbox.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.id = 'lightbox';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.id = 'lightbox-close';
    closeBtn.textContent = '×';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.id = 'lightbox-prev';
    prevBtn.textContent = '‹';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.id = 'lightbox-next';
    nextBtn.textContent = '›';

    const content = document.createElement('div');
    content.className = 'lightbox-content';

    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.id = 'lightbox-image';
    img.src = '';
    img.alt = '';

    const info = document.createElement('div');
    info.className = 'lightbox-info';

    const title = document.createElement('h3');
    title.id = 'lightbox-title';

    const description = document.createElement('p');
    description.id = 'lightbox-description';

    info.appendChild(title);
    info.appendChild(description);
    content.appendChild(img);
    content.appendChild(info);
    modal.appendChild(closeBtn);
    modal.appendChild(prevBtn);
    modal.appendChild(nextBtn);
    modal.appendChild(content);

    document.body.appendChild(modal);
  }

  initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('✨ Inicializando lightbox para', galleryItems.length, 'items de galería');
    
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        let title = '';
        let description = '';
        
        if (overlay) {
            const h3 = overlay.querySelector('h3');
            const p = overlay.querySelector('p');
            title = h3 ? h3.textContent.trim() : '';
            description = p ? p.textContent.trim() : '';
        }
        
        if (img) {
            this.images.push({
                img: img.src,
                title: title,
                description: description
            });
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.open(index);
            });
        }
    });
  }

  initClientes() {
    const clienteItems = document.querySelectorAll('.cliente-item');
    const startIndex = this.images.length;
    
    clienteItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.cliente-overlay');
        let title = '';
        let description = '';
        
        if (overlay) {
            const h3 = overlay.querySelector('h3');
            const p = overlay.querySelector('p');
            title = h3 ? h3.textContent.trim() : '';
            description = p ? p.textContent.trim() : '';
        }
        
        if (img) {
            this.images.push({
                img: img.src,
                title: title,
                description: description
            });
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.open(startIndex + index);
            });
        }
    });
  }

  open(index) {
    this.currentIndex = index;
    this.updateLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateLightbox();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateLightbox();
  }

  updateLightbox() {
    const current = this.images[this.currentIndex];
    document.getElementById('lightbox-image').src = current.img;
    document.getElementById('lightbox-image').alt = current.title;
    document.getElementById('lightbox-title').textContent = current.title;
    document.getElementById('lightbox-description').textContent = current.description;
  }

  setupEventListeners() {
    document.getElementById('lightbox-close').addEventListener('click', () => {
      this.close();
    });

    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') {
        this.close();
      }
    });

    document.getElementById('lightbox-prev').addEventListener('click', () => {
      this.prev();
    });

    document.getElementById('lightbox-next').addEventListener('click', () => {
      this.next();
    });

    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('lightbox').classList.contains('active')) return;
      
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    new Lightbox();
    console.log('✨ Lightbox inicializado');
  }, 150);
});

// ===== NAVBAR SECTION HIGHLIGHT =====
class NavbarSectionHighlight {
    constructor() {
        this.sections = ['inicio', 'nosotros', 'proceso', 'galeria', 'clientes', 'testimonios', 'contacto'];
        this.currentSection = '';
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveSection());
        this.updateActiveSection();
    }

    updateActiveSection() {
        const scrollY = window.scrollY;
        let currentActive = '';
        
        if (scrollY < 300) {
            currentActive = 'inicio';
        } else {
            for (let i = this.sections.length - 1; i >= 0; i--) {
                const sectionId = this.sections[i];
                const section = document.getElementById(sectionId);
                
                if (section) {
                    const sectionTop = section.offsetTop - 300;
                    if (scrollY >= sectionTop) {
                        currentActive = sectionId;
                        break;
                    }
                }
            }
        }
        
        if (currentActive && currentActive !== this.currentSection) {
            this.currentSection = currentActive;
            this.highlightSection(currentActive);
        }
    }

    highlightSection(sectionId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('data-section', sectionId);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NavbarSectionHighlight();
});

// ===== CARRUSEL MATERIA PRIMA =====
document.addEventListener('DOMContentLoaded', () => {
    const carouselImage = document.getElementById('carousel-image');
    const circleBtns = document.querySelectorAll('.circle-btn');
    
    if (carouselImage && circleBtns.length > 0) {
        let currentIndex = 0;
        let autoPlayInterval;
        
        const changeImage = (btn) => {
            const imageUrl = btn.getAttribute('data-image');
            
            carouselImage.classList.add('fade-out');
            
            setTimeout(() => {
                carouselImage.src = imageUrl;
                carouselImage.classList.remove('fade-out');
                carouselImage.classList.add('fade-in');
                
                setTimeout(() => {
                    carouselImage.classList.remove('fade-in');
                }, 500);
            }, 500);
            
            circleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        
        circleBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentIndex = index;
                changeImage(btn);
                clearInterval(autoPlayInterval);
                startAutoPlay();
            });
        });
        
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % circleBtns.length;
                changeImage(circleBtns[currentIndex]);
            }, 5000);
        };
        
        startAutoPlay();
    }

    // ========================================
    // CARRUSELES HORIZONTALES INFINITOS
    // ========================================
    
    function initHorizontalCarousels() {
        const carousels = document.querySelectorAll('.horizontal-carousel');
        
        carousels.forEach(carousel => {
            const track = carousel.querySelector('.carousel-track');
            const items = Array.from(track.children);
            const speed = carousel.dataset.speed || 30;
            const leftBtn = carousel.querySelector('.carousel-nav-left');
            const rightBtn = carousel.querySelector('.carousel-nav-right');
            
            // Duplicar items para crear efecto infinito
            items.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
            
            // Calcular duración de la animación basada en el ancho total
            const totalWidth = track.scrollWidth / 2;
            const duration = totalWidth / speed;
            
            track.style.animationDuration = `${duration}s`;
            
            // Variables para control
            let currentTranslate = 0;
            let isPaused = false;
            
            // Función para mover el carrusel
            function moveCarousel(direction) {
                const itemWidth = items[0].offsetWidth + 32; // width + gap
                if (direction === 'left') {
                    currentTranslate += itemWidth;
                } else {
                    currentTranslate -= itemWidth;
                }
                track.style.transform = `translateX(${currentTranslate}px)`;
                track.style.transition = 'transform 0.5s ease';
                
                setTimeout(() => {
                    track.style.transition = '';
                }, 500);
            }
            
            // Event listeners para las flechas
            if (leftBtn) {
                leftBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    moveCarousel('left');
                });
            }
            
            if (rightBtn) {
                rightBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    moveCarousel('right');
                });
            }
            
            // Agregar evento de click a todos los items
            track.querySelectorAll('.carousel-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    const img = this.querySelector('img');
                    const caption = this.querySelector('.carousel-caption');
                    if (img && caption) {
                        openLightbox(img.src, img.alt, caption.textContent);
                    }
                });
                
                // Prevenir drag de imagen por defecto
                item.querySelector('img').addEventListener('dragstart', (e) => e.preventDefault());
            });
        });
    }
    
    // Función lightbox simple
    function openLightbox(src, alt, caption) {
        // Crear overlay si no existe
        let lightbox = document.getElementById('carousel-lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'carousel-lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 2rem;
                cursor: pointer;
            `;
            
            const img = document.createElement('img');
            img.style.cssText = `
                max-width: 90%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            const captionEl = document.createElement('div');
            captionEl.style.cssText = `
                color: white;
                font-size: 1.5rem;
                margin-top: 1rem;
                font-family: 'Playfair Display', serif;
                font-weight: 600;
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '✕';
            closeBtn.style.cssText = `
                position: absolute;
                top: 2rem;
                right: 2rem;
                background: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            lightbox.appendChild(img);
            lightbox.appendChild(captionEl);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
            
            // Cerrar al hacer click
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target === closeBtn) {
                    lightbox.style.display = 'none';
                }
            });
        }
        
        // Mostrar lightbox con la imagen
        const img = lightbox.querySelector('img');
        const captionEl = lightbox.querySelectorAll('div')[0];
        img.src = src;
        img.alt = alt;
        captionEl.textContent = caption;
        lightbox.style.display = 'flex';
    }
    
    // Inicializar carruseles
    initHorizontalCarousels();
});

console.log('✨ Tashi Cerámica - Página cargada exitosamente');
// ========================================
// MODALES DE GALERÍA Y CLIENTES
// ========================================

// Datos de galería
const galleryData = [
    { image: 'assets/Imagen19.png', text: 'Botella Colorida' },
    { image: 'assets/Imagen22.png', text: 'Botella Ornamental' },
    { image: 'assets/imagen24.png', text: 'Botellas Tiki' },
    { image: 'assets/Imagen25.png', text: 'Botella con Relieve' },
    { image: 'assets/Imagen26.png', text: 'Botella Calavera' },
    { image: 'assets/Imagen27.png', text: 'Botella Premium' },
    { image: 'assets/Imagen32.png', text: 'Botella Azteca' },
    { image: 'assets/Imagen34.png', text: 'Botella Cactus' },
    { image: 'assets/imagen1.jpg', text: 'Botella Artesanal' },
    { image: 'assets/imagen2.jpg', text: 'Botella Premium' },
    { image: 'assets/imagen4.png', text: 'Botellas Talavera' },
    { image: 'assets/imagen6.png', text: 'Botella Premium' },
    { image: 'assets/imagen7.png', text: 'Botella Circular' },
    { image: 'assets/imagen8.png', text: 'Botella Talavera' },
    { image: 'assets/Imagen20.png', text: 'Marco Circular' },
    { image: 'assets/Imagen29.png', text: 'Vaso Cocktail' },
    { image: 'assets/Imagen31.png', text: 'Lucha Libre' },
    { image: 'assets/Imagen33.png', text: 'Día de Muertos' },
    { image: 'assets/Imagen36.png', text: 'Marco Agave' },
    { image: 'assets/imagen3.jpg', text: 'Marco Artesanal' },
    { image: 'assets/imagen15.png', text: 'Arte Abstracto' },
    { image: 'assets/Imagen21.png', text: 'Set Jarra y Vasos' },
    { image: 'assets/Imagen35.png', text: 'Set Premium' },
    { image: 'assets/imagen14.png', text: 'Set de Vajilla' }
];

// Datos de clientes
const clientesData = [
    { image: 'assets/cliente1.png', text: 'Mundo Oro' },
    { image: 'assets/cliente2.png', text: 'Los Nahuales' },
    { image: 'assets/cliente3.png', text: 'Don Valerio' },
    { image: 'assets/cliente4.png', text: 'Legacy by Real' },
    { image: 'assets/cliente5.png', text: 'Dinastía Real' },
    { image: 'assets/cliente6.png', text: 'Premium Line' },
    { image: 'assets/cliente7.png', text: 'Maxino Imperio' },
    { image: 'assets/cliente8.png', text: 'Dulce Amigura' },
    { image: 'assets/cliente9.png', text: 'Amor Mío' },
    { image: 'assets/cliente10.png', text: 'Arte Editions' },
    { image: 'assets/cliente11.png', text: 'Don Ramón' },
    { image: 'assets/cliente12.png', text: 'Oro de Oaxaca' }
];

function openGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const grid = document.getElementById('modalGalleryGrid');
    grid.innerHTML = '';
    
    galleryData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'modal-gallery-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.text}">
            <div class="modal-gallery-caption">${item.text}</div>
        `;
        div.onclick = () => openLightbox(item.image, item.text, item.text);
        grid.appendChild(div);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function openClientesModal() {
    const modal = document.getElementById('clientesModal');
    const grid = document.getElementById('modalClientesGrid');
    grid.innerHTML = '';
    
    clientesData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'modal-gallery-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.text}">
            <div class="modal-gallery-caption">${item.text}</div>
        `;
        div.onclick = () => openLightbox(item.image, item.text, item.text);
        grid.appendChild(div);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeClientesModal() {
    const modal = document.getElementById('clientesModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeGalleryModal();
        closeClientesModal();
    }
});