// Mobile Navbar Toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Typewriter Animation for Hero Tagline
const typeWordEl = document.getElementById('type-word');

if (typeWordEl) {
  const words = [
    'LIMITATIONS',
    'BOUNDARIES',
    'BARRIERS',
    'THE ORDINARY',
    'CONVENTIONS',
    'DOUBT'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90; // typing speed in ms
  const deleteSpeed = 50; // deleting speed in ms
  const pauseEnd = 1600; // pause on full word
  const pauseStart = 350; // pause before typing next word

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      typeWordEl.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      typeWordEl.textContent = currentWord.substring(0, charIndex);
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      // Completed typing word, pause before deleting
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Completed deleting, switch to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = pauseStart;
    }

    setTimeout(typeEffect, delay);
  }

  // Start typewriter effect
  typeEffect();
}
