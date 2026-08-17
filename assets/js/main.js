document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================================================
  // NAVBAR & HAMBURGER DRAWER
  // ==========================================================================
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on link click
  const drawerLinks = document.querySelectorAll('.mobile-drawer a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Sticky Navbar on Scroll
  const navContainer = document.querySelector('.navbar-container');
  if (navContainer) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      } else {
        navContainer.style.boxShadow = 'none';
      }
    });
  }

  // ==========================================================================
  // THEME SWITCHER (LIGHT / DARK MODE)
  // ==========================================================================
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

  // Apply theme
  setTheme(initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  });

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      updateThemeIcons('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      updateThemeIcons('light');
    }
  }

  function updateThemeIcons(theme) {
    themeToggleBtns.forEach(btn => {
      // Find SVG inside button or update inner icon content
      const icon = btn.querySelector('[data-lucide]') || btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.setAttribute('data-lucide', 'sun');
        } else {
          icon.setAttribute('data-lucide', 'moon');
        }
      }
    });
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // ==========================================================================
  // RTL LAYOUT TOGGLER
  // ==========================================================================
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const storedRtl = localStorage.getItem('rtl') === 'true';

  if (storedRtl) {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        document.documentElement.removeAttribute('dir');
        localStorage.setItem('rtl', 'false');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('rtl', 'true');
      }
    });
  });

  // ==========================================================================
  // FORM VALIDATION SYSTEM
  // ==========================================================================
  const forms = document.querySelectorAll('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('.form-control');

      inputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });

      // Special check for Terms Checkbox
      const termsCheckbox = form.querySelector('input[type="checkbox"][required]');
      if (termsCheckbox) {
        const checkboxLabel = termsCheckbox.closest('.form-checkbox-label');
        if (!termsCheckbox.checked) {
          isValid = false;
          if (checkboxLabel) {
            checkboxLabel.style.color = 'var(--color-error)';
          }
        } else {
          if (checkboxLabel) {
            checkboxLabel.style.color = '';
          }
        }
      }

      if (isValid) {
        showFormSuccess(form);
      }
    });

    // Realtime input validations
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        validateInput(input);
      });
      input.addEventListener('blur', () => {
        validateInput(input);
      });
    });
  });

  function validateInput(input) {
    const value = input.value.trim();
    let isInputValid = true;

    // Required check
    if (input.hasAttribute('required') && value === '') {
      isInputValid = false;
    }

    // Email check
    if (isInputValid && input.type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isInputValid = false;
      }
    }

    // Password length check
    if (isInputValid && input.type === 'password' && input.id === 'password' && value !== '') {
      if (value.length < 8) {
        isInputValid = false;
      }
    }

    // Confirm Password Match Check
    if (isInputValid && input.id === 'confirm_password') {
      const passwordVal = document.getElementById('password').value;
      if (value !== passwordVal) {
        isInputValid = false;
      }
    }

    if (!isInputValid) {
      input.classList.add('error');
      input.classList.remove('success');
    } else {
      input.classList.remove('error');
      if (value !== '') {
        input.classList.add('success');
      } else {
        input.classList.remove('success');
      }
    }

    return isInputValid;
  }

  function showFormSuccess(form) {
    // Hide standard elements inside form container or just show success block
    const successBanner = document.createElement('div');
    successBanner.style.backgroundColor = 'rgba(40, 122, 67, 0.1)';
    successBanner.style.color = 'var(--color-success)';
    successBanner.style.border = '1px solid var(--color-success)';
    successBanner.style.borderRadius = 'var(--border-radius)';
    successBanner.style.padding = '20px';
    successBanner.style.marginTop = '20px';
    successBanner.style.textAlign = 'center';
    successBanner.style.fontFamily = 'var(--font-ui)';
    successBanner.style.fontWeight = 'var(--weight-bold-inline)';
    
    let successMessage = 'Action completed successfully!';
    if (form.id === 'contact-form') {
      successMessage = 'Thank you! Your message has been received. Our news desk or ad rep will contact you shortly.';
    } else if (form.id === 'login-form') {
      successMessage = 'Login successful! Redirecting you...';
      setTimeout(() => window.location.href = 'index.html', 1500);
    } else if (form.id === 'register-form') {
      successMessage = 'Registration successful! Verification email sent.';
      setTimeout(() => window.location.href = 'login.html', 2000);
    } else if (form.id === 'newsletter-form' || form.id === 'ticker-newsletter') {
      successMessage = 'Subscribed successfully! Welcome to NEWZ Daily.';
    }

    successBanner.textContent = successMessage;
    form.innerHTML = '';
    form.appendChild(successBanner);
  }

  // ==========================================================================
  // NEWS CATEGORY FILTER TABS
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-grid .card, .blog-grid .card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      newsCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.parentElement.style.display = 'block';
        } else {
          card.parentElement.style.display = 'none';
        }
      });
    });
  });

  // URL Parameter Category Auto-Filter
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam) {
    const targetBtn = document.querySelector(`.filter-btn[data-filter="${catParam}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
  }


  // ==========================================================================
  // TESTIMONIALS SLIDER
  // ==========================================================================
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const carouselDots = document.querySelectorAll('.carousel-dot');

  if (testimonialTrack && testimonialSlides.length > 0) {
    let currentSlide = 0;
    const slideCount = testimonialSlides.length;

    function goToSlide(index) {
      currentSlide = index;
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      carouselDots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    carouselDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
      });
    });

    // Auto play carousel every 6 seconds
    setInterval(() => {
      let nextSlide = (currentSlide + 1) % slideCount;
      goToSlide(nextSlide);
    }, 6000);
  }

  // ==========================================================================
  // INTERACTIVE COMMUNITY POLL (Home 2)
  // ==========================================================================
  const pollCard = document.querySelector('.poll-card');
  const pollOptionBtns = document.querySelectorAll('.poll-option-btn');

  if (pollCard && pollOptionBtns.length > 0) {
    // Initial results simulation
    const votes = {
      option1: 42,
      option2: 28,
      option3: 30
    };

    const votedStored = localStorage.getItem('voted_poll_1');
    if (votedStored) {
      applyPollResults(votedStored);
    }

    pollOptionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const optionId = btn.getAttribute('data-option');
        // Add user vote
        votes[optionId] += 1;
        localStorage.setItem('voted_poll_1', optionId);
        applyPollResults(optionId);
      });
    });

    function applyPollResults(selectedOptionId) {
      pollCard.classList.add('voted');
      
      const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

      pollOptionBtns.forEach(btn => {
        const optionId = btn.getAttribute('data-option');
        const percentage = Math.round((votes[optionId] / totalVotes) * 100);
        
        // Show percent label
        const percentLabel = btn.querySelector('.poll-option-percent');
        if (percentLabel) {
          percentLabel.textContent = `${percentage}%`;
          percentLabel.style.display = 'block';
        }

        // Slide the progress colored overlay background
        const progressBar = btn.querySelector('.poll-option-progress');
        if (progressBar) {
          progressBar.style.width = `${percentage}%`;
        }

        // Highlight selected
        if (optionId === selectedOptionId) {
          btn.style.borderColor = 'var(--color-accent)';
          btn.style.fontWeight = 'var(--weight-bold-inline)';
        } else {
          btn.style.opacity = '0.7';
        }
      });

      const pollMeta = document.querySelector('.poll-meta');
      if (pollMeta) {
        pollMeta.textContent = `Thank you for voting! Total responses: ${totalVotes}`;
      }
    }
  }

  // ==========================================================================
  // COUNTDOWN TIMER (Coming Soon)
  // ==========================================================================
  const countdownContainer = document.querySelector('.countdown-container');
  if (countdownContainer) {
    // Set relaunch date: 30 days from now
    const relaunchDate = new Date();
    relaunchDate.setDate(relaunchDate.getDate() + 30);

    const daysVal = document.getElementById('days');
    const hoursVal = document.getElementById('hours');
    const minutesVal = document.getElementById('minutes');
    const secondsVal = document.getElementById('seconds');

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = relaunchDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysVal) daysVal.textContent = days.toString().padStart(2, '0');
      if (hoursVal) hoursVal.textContent = hours.toString().padStart(2, '0');
      if (minutesVal) minutesVal.textContent = minutes.toString().padStart(2, '0');
      if (secondsVal) secondsVal.textContent = seconds.toString().padStart(2, '0');

      if (distance < 0) {
        clearInterval(intervalId);
        if (countdownContainer) {
          countdownContainer.innerHTML = '<h4>The Newsroom is LIVE!</h4>';
        }
      }
    }

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
  }

  // ACTIVE NAVIGATION LINK HIGHLIGHTING
  // ==========================================================================
  const setNavActiveState = () => {
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === '/') currentPath = 'index.html';
    
    const allNavLinks = document.querySelectorAll('.nav-links a, .drawer-nav a');
    
    allNavLinks.forEach(link => {
      link.classList.remove('active');
      const linkPath = link.getAttribute('href');
      
      if (linkPath && !linkPath.startsWith('http') && !linkPath.startsWith('#')) {
        if (linkPath === currentPath) {
          link.classList.add('active');
        }
      }
    });
  };

  setNavActiveState();
});
