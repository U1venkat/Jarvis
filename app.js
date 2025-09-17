/**
 * Jarvis AI - Professional Enterprise JavaScript
 * Advanced interactions and animations for professional AI website
 */

class JarvisAI {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initLoadingScreen();
    this.initScrollAnimations();
    this.initNavigationEffects();
    this.initParticleSystem();
    this.initTypewriterEffect();
    this.initInteractiveCards();
    this.initSmoothScrolling();
    this.initPerformanceOptimizations();
    this.initAccessibilityFeatures();
    this.logWelcomeMessage();
  }

  setupEventListeners() {
    // DOM Content Loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }

    // Window Load
    window.addEventListener('load', () => this.onWindowLoad());

    // Scroll Events (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        this.handleScroll();
        scrollTimeout = null;
      }, 16); // ~60fps
    }, { passive: true });

    // Resize Events (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.handleResize(), 250);
    }, { passive: true });

    // Mouse Movement (throttled)
    let mouseTimeout;
    document.addEventListener('mousemove', (e) => {
      if (mouseTimeout) return;
      mouseTimeout = setTimeout(() => {
        this.handleMouseMove(e);
        mouseTimeout = null;
      }, 16);
    }, { passive: true });
  }

  onDOMReady() {
    // Add loaded class for CSS transitions
    document.body.classList.add('dom-ready');
    
    // Initialize mobile navigation
    this.initMobileNavigation();
    
    // Set up intersection observers
    this.setupIntersectionObservers();
    
    // Initialize button effects
    this.initButtonEffects();
  }

  onWindowLoad() {
    // Remove loading screen
    setTimeout(() => {
      this.removeLoadingScreen();
    }, 1500);

    // Start background animations
    this.startBackgroundAnimations();
    
    // Performance logging
    this.logPerformanceMetrics();
  }

  initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    if (!loadingScreen) return;

    const messages = [
      'Initializing AI Systems...',
      'Loading Neural Networks...',
      'Calibrating Voice Recognition...',
      'Optimizing Performance...',
      'Ready for Deployment'
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length - 1) {
        messageIndex++;
        if (loadingText) {
          loadingText.textContent = messages[messageIndex];
        }
      } else {
        clearInterval(messageInterval);
      }
    }, 300);
  }

  removeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }
  }

  initScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Stagger child animations
          const children = entry.target.querySelectorAll('.feature-card, .benefit-card, .challenge-card, .process-step');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll(`
      .glass-card,
      .feature-card,
      .benefit-card,
      .challenge-card,
      .process-step,
      .team-member,
      .social-link
    `);

    elementsToObserve.forEach(el => {
      el.classList.add('fade-in');
      this.scrollObserver.observe(el);
    });
  }

  setupIntersectionObservers() {
    // Navigation highlighting with improved threshold and margins
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Update active navigation link
          const id = entry.target.getAttribute('id');
          this.updateActiveNavLink(id);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    // Observe all sections with IDs
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      navObserver.observe(section);
    });
  }

  updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  initNavigationEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Navbar background on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Hide/show navbar on scroll direction (disabled for better UX)
      // if (scrollTop > lastScrollTop && scrollTop > 300) {
      //   navbar.style.transform = 'translateY(-100%)';
      // } else {
      //   navbar.style.transform = 'translateY(0)';
      // }
      lastScrollTop = scrollTop;
    }, { passive: true });
  }

  initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('active');
      
      if (isOpen) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  initParticleSystem() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;

    // Create floating particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${this.getRandomColor()};
        border-radius: 50%;
        opacity: ${Math.random() * 0.6 + 0.2};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        animation: float-particle ${Math.random() * 20 + 15}s linear infinite;
        box-shadow: 0 0 10px currentColor;
      `;
      heroParticles.appendChild(particle);
    }

    // Add CSS animation
    this.addParticleCSS();
  }

  getRandomColor() {
    const colors = [
      'rgba(0, 217, 255, 0.8)',
      'rgba(0, 102, 255, 0.8)',
      'rgba(99, 102, 241, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(16, 185, 129, 0.8)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  addParticleCSS() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-particle {
        0% {
          transform: translateY(100vh) translateX(0px) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  initTypewriterEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    const originalText = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';

    let index = 0;
    const typeSpeed = 80;

    const typeChar = () => {
      if (index < originalText.length) {
        tagline.textContent += originalText.charAt(index);
        index++;
        setTimeout(typeChar, typeSpeed);
      } else {
        // Add blinking cursor
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1.2s infinite';
        tagline.appendChild(cursor);

        // Add blink animation
        if (!document.querySelector('#blink-style')) {
          const blinkStyle = document.createElement('style');
          blinkStyle.id = 'blink-style';
          blinkStyle.textContent = `
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `;
          document.head.appendChild(blinkStyle);
        }
      }
    };

    // Start typing after hero animation
    setTimeout(typeChar, 3000);
  }

  initInteractiveCards() {
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.glass-card, .feature-card, .benefit-card, .challenge-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        this.createRippleEffect(e, card);
      });

      card.addEventListener('mousemove', (e) => {
        this.updateCardTilt(e, card);
      });

      card.addEventListener('mouseleave', () => {
        this.resetCardTilt(card);
      });
    });
  }

  createRippleEffect(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.8s ease-out;
      pointer-events: none;
      z-index: 1;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-style')) {
      const rippleStyle = document.createElement('style');
      rippleStyle.id = 'ripple-style';
      rippleStyle.textContent = `
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0; }
        }
      `;
      document.head.appendChild(rippleStyle);
    }

    setTimeout(() => ripple.remove(), 800);
  }

  updateCardTilt(e, card) {
    if (window.innerWidth <= 768) return; // Disable on mobile

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    const rotateX = deltaY * -10;
    const rotateY = deltaX * 10;
    
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(20px)
    `;
  }

  resetCardTilt(card) {
    card.style.transform = '';
    card.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      card.style.transition = '';
    }, 300);
  }

  initSmoothScrolling() {
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Calculate proper offset accounting for navbar height
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
          const offsetTop = targetElement.offsetTop - navbarHeight - 20;
          
          // Use smooth scrolling
          window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: 'smooth'
          });

          // Update URL without jumping
          history.pushState(null, null, `#${targetId}`);
          
          // Update active nav link immediately
          this.updateActiveNavLink(targetId);
        }
      });
    });

    // Handle initial hash in URL
    if (window.location.hash) {
      setTimeout(() => {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
          const offsetTop = targetElement.offsetTop - navbarHeight - 20;
          window.scrollTo(0, Math.max(0, offsetTop));
          this.updateActiveNavLink(targetId);
        }
      }, 100);
    }
  }

  initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      // Add click effect
      button.addEventListener('click', (e) => {
        this.createButtonClickEffect(e, button);
      });

      // Add hover sound effect (visual representation)
      button.addEventListener('mouseenter', () => {
        button.style.filter = 'brightness(1.1)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.filter = '';
      });
    });
  }

  createButtonClickEffect(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickEffect = document.createElement('div');
    clickEffect.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      animation: click-effect 0.4s ease-out;
      pointer-events: none;
      z-index: 10;
    `;

    button.style.position = 'relative';
    button.appendChild(clickEffect);

    // Add click effect animation
    if (!document.querySelector('#click-effect-style')) {
      const clickStyle = document.createElement('style');
      clickStyle.id = 'click-effect-style';
      clickStyle.textContent = `
        @keyframes click-effect {
          0% { width: 0; height: 0; opacity: 0.5; }
          100% { width: 100px; height: 100px; opacity: 0; }
        }
      `;
      document.head.appendChild(clickStyle);
    }

    setTimeout(() => clickEffect.remove(), 400);
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
      const heroContent = hero.querySelector('.hero-container');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }

    // Update scroll progress indicator
    this.updateScrollProgress();
  }

  updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxScroll) * 100;

    // Create or update progress bar
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: ${progress}%;
        height: 3px;
        background: linear-gradient(90deg, #00d9ff, #0066ff);
        z-index: 10000;
        transition: width 0.1s ease-out;
        box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
      `;
      document.body.appendChild(progressBar);
    } else {
      progressBar.style.width = `${progress}%`;
    }
  }

  handleResize() {
    // Recalculate particle positions
    this.repositionParticles();
    
    // Update card effects for mobile
    if (window.innerWidth <= 768) {
      document.querySelectorAll('.glass-card, .feature-card').forEach(card => {
        card.style.transform = '';
      });
    }
  }

  handleMouseMove(e) {
    // Cursor trail effect (desktop only)
    if (window.innerWidth > 768) {
      this.createCursorTrail(e);
    }
  }

  createCursorTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, rgba(0, 217, 255, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      animation: cursor-fade 0.8s ease-out forwards;
    `;

    document.body.appendChild(trail);

    // Add cursor trail animation
    if (!document.querySelector('#cursor-trail-style')) {
      const trailStyle = document.createElement('style');
      trailStyle.id = 'cursor-trail-style';
      trailStyle.textContent = `
        @keyframes cursor-fade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.5); }
        }
      `;
      document.head.appendChild(trailStyle);
    }

    setTimeout(() => trail.remove(), 800);
  }

  repositionParticles() {
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach(particle => {
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = Math.random() * 20 + 15 + 's';
    });
  }

  startBackgroundAnimations() {
    // Start any complex background animations after page load
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
      heroParticles.style.animationPlayState = 'running';
    }
  }

  initPerformanceOptimizations() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Lazy load non-critical images
    this.initLazyLoading();
    
    // Optimize scroll performance
    this.optimizeScrollPerformance();
  }

  preloadCriticalResources() {
    // Preload important fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    fontPreload.as = 'style';
    fontPreload.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreload);
  }

  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  }

  optimizeScrollPerformance() {
    // Use passive listeners where possible
    const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
    passiveEvents.forEach(event => {
      document.addEventListener(event, () => {}, { passive: true });
    });
  }

  initAccessibilityFeatures() {
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Focus management for modals and overlays
    this.setupFocusManagement();
    
    // ARIA live regions for dynamic content
    this.setupLiveRegions();
  }

  setupFocusManagement() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close any open modals or dropdowns
        const activeElement = document.activeElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
    });
  }

  setupLiveRegions() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  logPerformanceMetrics() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
          
          console.log(`%c🚀 JARVIS AI Performance Metrics`, 'color: #00d9ff; font-weight: bold;');
          console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #10b981;');
          console.log(`%cDOM Content Loaded: ${domContentLoadedTime}ms`, 'color: #10b981;');
          
          // Performance optimizations suggestions
          if (pageLoadTime > 3000) {
            console.warn('Consider optimizing page load performance');
          }
        }, 0);
      });
    }
  }

  logWelcomeMessage() {
    const asciiArt = `
    ╔═══════════════════════════════════════╗
    ║           🤖 JARVIS AI 🤖            ║
    ║     Advanced AI Solutions Platform    ║
    ║                                       ║
    ║   Problems are the price you pay      ║
    ║         for progress                  ║
    ║                                       ║
    ║   Created by: Rohith & Yuvan         ║
    ║   Status: Online & Operational        ║
    ╚═══════════════════════════════════════╝
    `;

    console.log(`%c${asciiArt}`, 'color: #00d9ff; font-family: monospace;');
    console.log('%c🔥 Professional AI Website Loaded Successfully!', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('%c⚡ All systems operational. Welcome to the future of AI.', 'color: #f59e0b; font-size: 14px;');
    
    // Easter egg for developers
    console.log('%cDeveloper Tools Detected! 🕵️‍♂️', 'color: #6366f1; font-weight: bold;');
    console.log('%cInterested in our technology? Let\'s connect!', 'color: #8b5cf6;');
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new JarvisAI();
});

// Global utility functions
window.JarvisUtils = {
  // Smooth scroll to element
  scrollToElement: (elementId, offset = 100) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offsetTop = element.offsetTop - offset;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  },

  // Animate counter numbers
  animateCounter: (element, start, end, duration = 2000) => {
    let startTimestamp = null;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  },

  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for performance
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
};

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    console.log('%c🔧 Service Worker Support Detected', 'color: #3b82f6;');
    // Service worker registration would go here for PWA features
  });
}

// Performance observer for monitoring
if ('PerformanceObserver' in window) {
  const perfObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log(`%c📊 LCP: ${entry.startTime}ms`, 'color: #059669;');
      }
    });
  });
  
  try {
    perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Ignore unsupported entry types
  }
}