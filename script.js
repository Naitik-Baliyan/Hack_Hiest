const splash = document.getElementById('splash');
const video = document.getElementById('splash-video');
const muteBtn = document.getElementById('mute-btn');
const iconMuted = document.getElementById('icon-muted');
const iconUnmuted = document.getElementById('icon-unmuted');
const skipBtn = document.getElementById('skip-btn');

let dismissed = false;

function dismiss() {
  if (dismissed || !splash) return;
  dismissed = true;
  
  if (video) {
    video.pause();
  }
  
  splash.classList.add('hide');
  splash.addEventListener('transitionend', () => {
    splash.remove();
  }, { once: true });
}

function updateMuteUI() {
  if (!video || !iconMuted || !iconUnmuted || !muteBtn) return;
  if (video.muted) {
    iconMuted.style.display = 'block';
    iconUnmuted.style.display = 'none';
    muteBtn.setAttribute('title', 'Unmute sound');
    muteBtn.setAttribute('aria-label', 'Unmute sound');
  } else {
    iconMuted.style.display = 'none';
    iconUnmuted.style.display = 'block';
    muteBtn.setAttribute('title', 'Mute sound');
    muteBtn.setAttribute('aria-label', 'Mute sound');
  }
}

// Mute / Unmute toggle
if (muteBtn && video) {
  muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    updateMuteUI();
  });
}

// Clicking the video toggles sound
if (video) {
  video.addEventListener('click', (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    updateMuteUI();
  });

  // Automatically dismiss when the video finishes
  video.addEventListener('ended', dismiss);

  // Autoplay handler
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      video.muted = true;
      updateMuteUI();
      video.play().catch(() => {});
    });
  }
}

// Skip button
if (skipBtn) {
  skipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dismiss();
  });
}

// Mobile Navbar Toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}
