/* (audio removed) */

/* PAGE NAVIGATION */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const pageName = btn.getAttribute('data-page');
    showPage(pageName);
  });
});

document.querySelectorAll('.cta-btn, .next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const pageName = btn.getAttribute('data-page');
    showPage(pageName);
  });
});

function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show selected page
  document.getElementById(pageName).classList.add('active');
  
  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-page') === pageName) {
      btn.classList.add('active');
    }
  });
  
  // Scroll to top
  window.scrollTo(0, 0);
}

/* AUTO PLAY PREVIEW */
window.addEventListener('load', async () => {
  const preview = document.getElementById('previewAudio');
  const container = document.querySelector('.audio-preview');
  const overlay = document.getElementById('audioOverlay');
  const overlayBtn = document.getElementById('playOverlayBtn');
  if (!preview) return;

  // Try to autoplay (unmuted). Many browsers will block this.
  try {
    await preview.play();
    // autoplay succeeded
    if (overlay) overlay.style.display = 'none';
    if (container) container.classList.remove('pulse');
  } catch (err) {
    // Autoplay blocked — show overlay so user can start playback
    if (overlay) overlay.style.display = 'flex';
    if (container) container.classList.add('pulse');
    console.warn('Autoplay blocked, showing play overlay.', err);
  }

  // When the user clicks the overlay button (or the overlay), start playback
  function userStart() {
    preview.play().then(() => {
      if (overlay) overlay.style.display = 'none';
      if (container) container.classList.remove('pulse');
    }).catch(e => {
      console.warn('Playback failed after user gesture:', e);
    });
  }

  if (overlayBtn) overlayBtn.addEventListener('click', (e) => { e.stopPropagation(); userStart(); });
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) userStart(); });

  preview.addEventListener('play', () => {
    if (container) container.classList.remove('pulse');
  });
});

/* FALLING HEARTS */
const heartsContainer = document.getElementById("hearts");
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  const hearts = ["❤️", "💕", "💖", "💝", "💗"];
  heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  heart.style.opacity = Math.random() * 0.5 + 0.5;
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 500);

/* FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworksActive = false;

function startFireworks() {
  if (fireworksActive) return;
  fireworksActive = true;
  
  const fireworkInterval = setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 60%)`;
      ctx.beginPath();
      ctx.arc(
        x + Math.random() * 100 - 50,
        y + Math.random() * 100 - 50,
        3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 500);
  }, 800);
  
  // Stop fireworks after 5 seconds
  setTimeout(() => {
    clearInterval(fireworkInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworksActive = false;
  }, 5000);
}

/* CONFETTI EFFECT */
const confettiCanvas = document.getElementById("confetti");
if (confettiCanvas) {
  const confettiCtx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  
  let confettiPieces = [];
  
  function ConfettiPiece() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = -10;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = Math.random() * 4 + 4;
    this.size = Math.random() * 6 + 3;
    this.rotation = Math.random() * 360;
    this.color = ['#ff1654', '#ffa502', '#ff69b4', '#ffb6c1'][Math.floor(Math.random() * 4)];
  }
  
  function drawConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    for (let i = 0; i < confettiPieces.length; i++) {
      const p = confettiPieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += 5;
      
      if (p.y > confettiCanvas.height) {
        confettiPieces.splice(i, 1);
        continue;
      }
      
      confettiCtx.save();
      confettiCtx.fillStyle = p.color;
      confettiCtx.globalAlpha = 1 - (p.y / confettiCanvas.height);
      confettiCtx.fillRect(p.x, p.y, p.size, p.size);
      confettiCtx.restore();
    }
    
    if (confettiPieces.length > 0) {
      requestAnimationFrame(drawConfetti);
    }
  }
  
  window.triggerConfetti = function() {
    for (let i = 0; i < 100; i++) {
      confettiPieces.push(new ConfettiPiece());
    }
    drawConfetti();
  };
}

/* CONFETTI EFFECT FOR ACCEPTANCE PAGE */
const confettiAcceptanceCanvas = document.getElementById("confetti-acceptance");
if (confettiAcceptanceCanvas) {
  const confettiAcceptanceCtx = confettiAcceptanceCanvas.getContext("2d");
  confettiAcceptanceCanvas.width = window.innerWidth;
  confettiAcceptanceCanvas.height = window.innerHeight;
  
  let confettiAcceptancePieces = [];
  
  function ConfettiAcceptancePiece() {
    this.x = Math.random() * confettiAcceptanceCanvas.width;
    this.y = -10;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = Math.random() * 4 + 4;
    this.size = Math.random() * 6 + 3;
    this.rotation = Math.random() * 360;
    this.color = ['#ff1654', '#ffa502', '#ff69b4', '#ffb6c1'][Math.floor(Math.random() * 4)];
  }
  
  function drawConfettiAcceptance() {
    confettiAcceptanceCtx.clearRect(0, 0, confettiAcceptanceCanvas.width, confettiAcceptanceCanvas.height);
    
    for (let i = 0; i < confettiAcceptancePieces.length; i++) {
      const p = confettiAcceptancePieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += 5;
      
      if (p.y > confettiAcceptanceCanvas.height) {
        confettiAcceptancePieces.splice(i, 1);
        continue;
      }
      
      confettiAcceptanceCtx.save();
      confettiAcceptanceCtx.fillStyle = p.color;
      confettiAcceptanceCtx.globalAlpha = 1 - (p.y / confettiAcceptanceCanvas.height);
      confettiAcceptanceCtx.fillRect(p.x, p.y, p.size, p.size);
      confettiAcceptanceCtx.restore();
    }
    
    if (confettiAcceptancePieces.length > 0) {
      requestAnimationFrame(drawConfettiAcceptance);
    }
  }
  
  window.triggerConfettiAcceptance = function() {
    for (let i = 0; i < 100; i++) {
      confettiAcceptancePieces.push(new ConfettiAcceptancePiece());
    }
    drawConfettiAcceptance();
  };
}

/* YES BUTTON */
document.getElementById("yesBtn").onclick = () => {
  document.getElementById("response").innerHTML = 
    "🎉 Yayyy fariya! ❤️ You just made me the happiest person alive! 💍💖 I love you! 💕";
  startFireworks();
  if (window.triggerConfetti) {
    window.triggerConfetti();
  }
  
  // Navigate to acceptance after 2 seconds
  setTimeout(() => {
    document.getElementById("acceptanceMessage").innerHTML = 
      "🌹 I'm so happy! Will you please accept my love forever? 💕";
    showPage("acceptance");
    if (window.triggerConfettiAcceptance) {
      window.triggerConfettiAcceptance();
    }
  }, 2000);
};

/* NO BUTTON - Also goes to acceptance page */
const noBtn = document.getElementById("noBtn");
let clickCount = 0;

function moveNoButton() {
  noBtn.style.position = "fixed";
  noBtn.style.left = Math.random() * 80 + "vw";
  noBtn.style.top = Math.random() * 80 + "vh";
  clickCount++;
  
  // After 5 hover attempts, force navigation
  if (clickCount >= 5) {
    noBtn.onclick = () => {
      document.getElementById("acceptanceMessage").innerHTML = 
        "💔 I know your heart says NO, but please reconsider... 💕 I'm still here for you. Please accept me? 🥺";
      showPage("acceptance");
    };
  }
}

noBtn.onmouseover = moveNoButton;
noBtn.ontouchstart = moveNoButton; // For mobile devices

// Also allow clicking on NO after it runs away
noBtn.onclick = () => {
  document.getElementById("acceptanceMessage").innerHTML = 
    "💔 I know your heart says NO, but please reconsider... 💕 I'm still here for you. Please accept me? 🥺";
  showPage("acceptance");
};

/* ACCEPTANCE PAGE - YES BUTTON */
document.getElementById("acceptYesBtn").onclick = () => {
  document.getElementById("acceptanceMessage").innerHTML = 
    "🎉 YES! I'M SO HAPPY! 💕 Forever with you is all I ever wanted! 💍💖";
  startFireworks();
  if (window.triggerConfettiAcceptance) {
    window.triggerConfettiAcceptance();
  }
};

/* ACCEPTANCE PAGE - NO BUTTON - Goes back to proposal */
document.getElementById("acceptNoBtn").onclick = () => {
  clickCount = 0; // Reset click count
  showPage("proposal");
};

/* HANDLE WINDOW RESIZE */
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (confettiCanvas) {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  if (confettiAcceptanceCanvas) {
    confettiAcceptanceCanvas.width = window.innerWidth;
    confettiAcceptanceCanvas.height = window.innerHeight;
  }
});
