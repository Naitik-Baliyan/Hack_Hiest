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

// Optional: clicking the video also toggles sound for quick mobile/desktop interaction
if (video) {
  video.addEventListener('click', (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    updateMuteUI();
  });

  // Automatically dismiss when the video finishes
  video.addEventListener('ended', dismiss);

  // Ensure autoplay starts smoothly
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay was prevented, ensure muted and retry
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
