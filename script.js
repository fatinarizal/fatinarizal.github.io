/* ==========================================================================
   NurFatin's Portfolio Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* --- 1. Theme Switcher Logic --- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Set theme from localStorage or system preference
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Set initial theme
  setTheme(getPreferredTheme());

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });


  /* --- 2. Mobile Menu Toggle --- */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const menuIconOpen = mobileMenuToggle.querySelector('.icon-open');
  const menuIconClose = mobileMenuToggle.querySelector('.icon-close');

  const toggleMobileMenu = () => {
    const isOpen = mobileNav.classList.toggle('open');
    
    // Change menu icons
    if (isOpen) {
      menuIconOpen.style.display = 'none';
      menuIconClose.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Stop background scroll
    } else {
      menuIconOpen.style.display = 'block';
      menuIconClose.style.display = 'none';
      document.body.style.overflow = ''; // Resume background scroll
    }
  };

  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when links are clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });


  /* --- 3. Sticky Header & Active Link Scroll Spy --- */
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const scrollHandler = () => {
    const scrollPos = window.scrollY;

    // Sticky header background opacity
    if (scrollPos > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy active navigation link highlight
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120; // offset header
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollHandler);
  // Run once on load to highlight active element
  scrollHandler();


  /* --- 4. Interactive Typewriter Animation --- */
  const typingTextElement = document.getElementById('typing');
  const roles = [
    "Software Engineer 🚀",
    "Multimedia University Graduate 🎓",
    "React & Firebase Developer 💻",
    "Creative Problem Solver 💡",
    "Full-Stack Web Architect 🛠️"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const type = () => {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Remove character
      typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletion speed is faster
    } else {
      // Add character
      typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    // If typing finished, pause and switch to deletion
    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Wait before deleting
      isDeleting = true;
    } 
    // If deletion finished, switch to next role
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Wait before starting typing again
    }

    setTimeout(type, typingSpeed);
  };

  // Start typing loop
  if (typingTextElement) {
    setTimeout(type, 1000);
  }


  /* --- 5. Contact Form Submission Interaction --- */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page refresh

      // Animate button loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="animate-spin"></i>';
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }

      // Capture values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Submit via FormSubmit AJAX endpoint
      fetch("https://formsubmit.co/ajax/fatinainarizal@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `New Portfolio Message: ${subject}`,
          message: message,
          _captcha: "false"
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('FormSubmit Success:', data);
        
        // Animate form departure and show success card
        contactForm.classList.add('hidden');
        setTimeout(() => {
          contactForm.style.display = 'none';
          formSuccess.classList.remove('hidden');
          
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }, 300);
      })
      .catch(error => {
        console.error('FormSubmit Error:', error);
        
        // Fallback alert warning
        alert("Oops! There was an issue sending your message. Please try emailing directly at fatinainarizal@gmail.com.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message <i data-lucide="send"></i>';
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }
      });
    });
  }
});
