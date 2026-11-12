/**
 * THE PABNA HAUNTING - Global Navigation & Header Controller
 * Connects all pages, handles audio state, language switching, and panic reset.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Highlight current nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 2. Audio Toggle Button
  const audioBtn = document.getElementById('btn-audio-toggle');
  if (audioBtn) {
    const updateAudioBtnUI = () => {
      const isSoundOn = window.pabnaState ? window.pabnaState.get('soundEnabled') : true;
      const key = isSoundOn ? 'nav_mute' : 'nav_unmute';
      const label = window.pabnaI18n ? window.pabnaI18n.t(key) : (isSoundOn ? 'Sound: ON' : 'Sound: MUTED');
      audioBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          ${isSoundOn 
            ? '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>'
            : '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>'}
        </svg>
        <span>${label}</span>
      `;
      if (isSoundOn) {
        audioBtn.classList.add('active-glow');
      } else {
        audioBtn.classList.remove('active-glow');
      }
    };

    updateAudioBtnUI();

    audioBtn.addEventListener('click', () => {
      if (window.pabnaAudio) {
        window.pabnaAudio.toggleMute();
        updateAudioBtnUI();
      }
    });

    window.addEventListener('pabna_language_changed', updateAudioBtnUI);
  }

  // 3. Language Toggle Button
  const langBtn = document.getElementById('btn-lang-toggle');
  if (langBtn) {
    const updateLangBtnUI = () => {
      const currentLang = window.pabnaState ? window.pabnaState.get('language') : 'en';
      langBtn.textContent = currentLang === 'en' ? 'বাংলা (BN)' : 'English (EN)';
    };

    updateLangBtnUI();

    langBtn.addEventListener('click', () => {
      if (window.pabnaI18n) {
        window.pabnaI18n.toggleLanguage();
        updateLangBtnUI();
        if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
      }
    });
  }

  // 4. Panic Reset Button
  const panicBtn = document.getElementById('btn-panic-reset');
  if (panicBtn) {
    panicBtn.addEventListener('click', () => {
      const isBn = window.pabnaState && window.pabnaState.get('language') === 'bn';
      const msg = isBn 
        ? 'আপনি কি নিশ্চিত যে সমস্ত তদন্ত তথ্য এবং ধাঁধার অগ্রগতি মুছে ফেলে প্রথম থেকে শুরু করবেন?' 
        : 'Are you sure you want to trigger a PANIC RESET? All clues, ciphers, and investigation state will be purged.';
      
      if (confirm(msg)) {
        if (window.pabnaAudio) window.pabnaAudio.playCipherError();
        if (window.pabnaState) window.pabnaState.resetProgress();
        window.location.href = 'index.html';
      }
    });
  }

  // 5. Sound trigger for all standard links and buttons
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      if (window.pabnaAudio) {
        window.pabnaAudio.playKeyClick();
      }
    });
  });
});

