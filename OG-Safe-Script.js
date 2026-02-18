/* Paste this inside script.js on GitHub */
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  function getEl(id) { return document.getElementById(id); }
  function createEl(tag, className, html) { const el = document.createElement(tag); if(className) el.className = className; if(html) el.innerHTML = html; return el; }
  
  if (urlParams.has('link')) { sessionStorage.setItem('sl_slug', urlParams.get('link')); sessionStorage.setItem('sl_step', '1'); window.location.href = safeConfig.googleUrl; return; }
  
  let currentStep = parseInt(sessionStorage.getItem('sl_step'));
  const slug = sessionStorage.getItem('sl_slug');
  if (!currentStep || !slug) return; 

  // HOME PAGE
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    if (currentStep === 1) {
      const homeContainer = getEl('safe-home-location');
      if (homeContainer) {
        const homePill = createEl('div', 'timer-pill-box', `PLEASE WAIT ${safeConfig.mainWait} SECONDS...`);
        homeContainer.appendChild(homePill);
        let t = safeConfig.mainWait;
        const int = setInterval(() => {
          t--; homePill.innerText = `PLEASE WAIT ${t} SECONDS...`;
          if (t < 0) { clearInterval(int); homePill.style.display = 'none'; const btn = createEl('button', 'home-next-btn', 'CLICK TO CONTINUE'); btn.onclick = () => { sessionStorage.setItem('sl_step', '2'); window.location.href = safeConfig.posts[Math.floor(Math.random() * safeConfig.posts.length)]; }; homeContainer.appendChild(btn); }
        }, 1000);
      }
    }
  } 
  // POST PAGE
  else {
    const timerBox = getEl('safe-timer-location'); const btnBox = getEl('safe-button-location');
    if (timerBox && btnBox) {
      document.body.appendChild(createEl('div', '', `<div id="sl-sticky-header"><span>You are On Step ${currentStep}/${safeConfig.totalPages}</span></div>`));
      const popup = createEl('div', '', `<div id="sl-overlay-popup"><div class="sl-popup-content"><h3 style="margin-top:0; color:#333;">Click On Ads</h3><div class="ad-placeholder">REPLACE THIS TEXT WITH YOUR TOP AD CODE</div><div class="timer-pill-box" style="margin:10px auto; min-width:auto; padding:10px 20px; font-size:14px;">Wait <span id="p-time">${safeConfig.popupWait}</span> Seconds</div><div class="ad-placeholder">REPLACE THIS TEXT WITH YOUR BOTTOM AD CODE</div><p style="font-size:11px; color:#999; margin-top:5px;">Please wait for the timer to finish.</p></div></div>`);
      document.body.appendChild(popup); document.body.style.overflow = 'hidden';
      let pt = safeConfig.popupWait;
      const pInt = setInterval(() => { const pSpan = getEl('p-time'); if(pSpan) pSpan.innerText = pt; pt--; if (pt < 0) { clearInterval(pInt); popup.remove(); document.body.style.overflow = 'auto'; startMainTimer(); } }, 1000);
      function startMainTimer() {
        timerBox.style.display = 'block'; btnBox.style.display = 'block'; const actionBtn = getEl('safe-action-btn'); timerBox.scrollIntoView({behavior: "smooth", block: "center"});
        timerBox.innerHTML = `<div id="main-pill" class="timer-pill-box">PLEASE WAIT ${safeConfig.mainWait} SECONDS...</div>`; const pill = getEl('main-pill');
        let t = safeConfig.mainWait;
        const mInt = setInterval(() => { t--; pill.innerText = `PLEASE WAIT ${t} SECONDS...`; if (t < 0) { clearInterval(mInt); pill.style.background = "#27ae60"; pill.innerText = "SCROLL DOWN"; actionBtn.style.display = "block"; let isFinal = currentStep >= safeConfig.totalPages; actionBtn.innerText = isFinal ? "GET LINK" : "NEXT STEP"; actionBtn.onclick = () => { if (isFinal) { sessionStorage.removeItem('sl_step'); sessionStorage.removeItem('sl_slug'); window.location.href = safeConfig.finalDomain + slug; } else { sessionStorage.setItem('sl_step', (currentStep + 1).toString()); window.location.href = safeConfig.posts[Math.floor(Math.random() * safeConfig.posts.length)]; } }; } }, 1000);
      }
    }
  }
})();
