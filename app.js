/* ========================================================
   OPERATION: EMERGENCY PLAN // ROBLOX DATE NIGHT ENGINE
   ======================================================== */

// --- 1. NATIVE WEB AUDIO SYNTHESIZER ---
class BloxAudioEngine {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Classic OOF! Sound (Pitch drop)
  playOof() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.22);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Fizzy Bloxy Cola Sip & Gulp
  playSlurp() {
    this.init();
    const now = this.ctx.currentTime;

    for (let i = 0; i < 5; i++) {
      const popOsc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      popOsc.type = 'sine';
      const popTime = now + (i * 0.05);

      popOsc.frequency.setValueAtTime(600 + Math.random() * 400, popTime);
      popOsc.frequency.exponentialRampToValueAtTime(300, popTime + 0.04);

      popGain.gain.setValueAtTime(0.15, popTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.04);

      popOsc.connect(popGain);
      popGain.connect(this.ctx.destination);
      popOsc.start(popTime);
      popOsc.stop(popTime + 0.04);
    }
  }

  // Victory 8-Bit Triumphant Fanfare
  playVictory() {
    this.init();
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C E G C E G
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const startTime = now + (idx * 0.08);

      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  // Quick Blip / Click
  playClick() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Rapid Spin Tick
  playTick() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(950, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  // Lo-Fi Cozy Chime Generator
  toggleBGM(callback) {
    this.init();
    if (this.bgmPlaying) {
      clearInterval(this.bgmInterval);
      this.bgmPlaying = false;
      if (callback) callback(false);
      return;
    }

    this.bgmPlaying = true;
    if (callback) callback(true);

    const scale = [392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 783.99]; // G Major
    let step = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.bgmPlaying) return;
      const note = scale[step % scale.length];
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);

      step = (step + Math.floor(Math.random() * 3) + 1) % scale.length;
    }, 450);
  }
}

const audio = new BloxAudioEngine();

// --- 2. AMBIENT SNOW CANVAS BACKGROUND ---
function initSnowCanvas() {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const flakes = Array.from({ length: 55 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2.2 + 1,
    speed: Math.random() * 1.1 + 0.5,
    drift: Math.random() * 0.6 - 0.3
  }));

  function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.beginPath();
    for (const f of flakes) {
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      f.y += f.speed;
      f.x += f.drift;
      if (f.y > height) {
        f.y = -5;
        f.x = Math.random() * width;
      }
      if (f.x > width) f.x = 0;
      if (f.x < 0) f.x = width;
    }
    ctx.fill();
    requestAnimationFrame(render);
  }
  render();
}

// --- 3. SLEIGH MINI-GAME (CANVAS RUNNER) ---
class SleighRushGame {
  constructor() {
    this.canvas = document.getElementById('sleigh-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.scoreEl = document.getElementById('sleigh-score');
    this.overlay = document.getElementById('game-overlay');
    this.startBtn = document.getElementById('start-game-btn');
    this.leftBtn = document.getElementById('sleigh-left-btn');
    this.rightBtn = document.getElementById('sleigh-right-btn');

    this.sleighX = 180;
    this.sleighY = 195;
    this.sleighWidth = 36;
    this.sleighHeight = 22;
    this.obstacles = [];
    this.score = 0;
    this.running = false;
    this.animFrame = null;
    this.speed = 3;

    this.bindEvents();
  }

  bindEvents() {
    this.startBtn.addEventListener('click', () => {
      audio.playClick();
      this.start();
    });

    const moveLeft = () => {
      if (!this.running) return;
      this.sleighX = Math.max(10, this.sleighX - 35);
      audio.playClick();
    };

    const moveRight = () => {
      if (!this.running) return;
      this.sleighX = Math.min(this.canvas.width - this.sleighWidth - 10, this.sleighX + 35);
      audio.playClick();
    };

    this.leftBtn.addEventListener('click', moveLeft);
    this.rightBtn.addEventListener('click', moveRight);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') moveLeft();
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') moveRight();
    });
  }

  start() {
    this.overlay.classList.add('hidden');
    this.running = true;
    this.score = 0;
    this.speed = 3.2;
    this.obstacles = [];
    this.sleighX = this.canvas.width / 2 - this.sleighWidth / 2;
    this.scoreEl.textContent = '0';
    this.loop();
  }

  gameOver() {
    this.running = false;
    cancelAnimationFrame(this.animFrame);
    audio.playOof();
    this.overlay.classList.remove('hidden');
    this.overlay.innerHTML = `
      <h4>CRASHED IN THE SNOW!</h4>
      <p>Final Score: <strong>${this.score}</strong> meters navigated!</p>
      <button class="action-btn red" id="restart-game-btn">RETRY SLEIGH RUN</button>
    `;
    document.getElementById('restart-game-btn').addEventListener('click', () => {
      audio.playClick();
      this.start();
    });
  }

  spawnObstacle() {
    if (Math.random() < 0.04) {
      const isRock = Math.random() > 0.5;
      this.obstacles.push({
        x: Math.random() * (this.canvas.width - 30) + 10,
        y: -30,
        size: isRock ? 22 : 26,
        type: isRock ? 'rock' : 'tree'
      });
    }
  }

  loop() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Track lines
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(80, 0);
    this.ctx.lineTo(40, this.canvas.height);
    this.ctx.moveTo(320, 0);
    this.ctx.lineTo(360, this.canvas.height);
    this.ctx.stroke();

    // Spawn & Move Obstacles
    this.spawnObstacle();
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.y += this.speed;

      if (obs.type === 'rock') {
        this.ctx.fillStyle = '#6c757d';
        this.ctx.fillRect(obs.x, obs.y, obs.size, obs.size);
      } else {
        this.ctx.fillStyle = '#2b8a3e';
        this.ctx.beginPath();
        this.ctx.moveTo(obs.x + obs.size / 2, obs.y);
        this.ctx.lineTo(obs.x, obs.y + obs.size);
        this.ctx.lineTo(obs.x + obs.size, obs.y + obs.size);
        this.ctx.fill();
      }

      if (
        this.sleighX < obs.x + obs.size &&
        this.sleighX + this.sleighWidth > obs.x &&
        this.sleighY < obs.y + obs.size &&
        this.sleighY + this.sleighHeight > obs.y
      ) {
        this.gameOver();
        return;
      }

      if (obs.y > this.canvas.height + 20) {
        this.obstacles.splice(i, 1);
        this.score += 10;
        this.scoreEl.textContent = this.score;
        if (this.score % 100 === 0) this.speed += 0.4;
      }
    }

    // Sleigh
    this.ctx.fillStyle = '#e2231a';
    this.ctx.fillRect(this.sleighX, this.sleighY, this.sleighWidth, this.sleighHeight);
    this.ctx.fillStyle = '#ffd000';
    this.ctx.fillRect(this.sleighX, this.sleighY + this.sleighHeight - 4, this.sleighWidth, 4);
    this.ctx.strokeStyle = '#adb5bd';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(this.sleighX - 4, this.sleighY + this.sleighHeight + 3);
    this.ctx.lineTo(this.sleighX + this.sleighWidth + 6, this.sleighY + this.sleighHeight + 3);
    this.ctx.stroke();

    this.animFrame = requestAnimationFrame(() => this.loop());
  }
}

// --- 4. SLEIGH CRASH PENALTY ROULETTE (Streamlined) ---
function initCrashRoulette() {
  const penalties = [
    { text: "🍟 Feed your partner a fry or tot!", icon: "🍟" },
    { text: "💆 Give a 15-second gentle shoulder massage!", icon: "💆" },
    { text: "🥤 Take a big refreshing sip of Bloxy Cola!", icon: "🥤" },
    { text: "💖 Say 3 genuine things you adore about your partner!", icon: "💖" }
  ];

  const card = document.getElementById('roulette-card');
  const icon = document.getElementById('wheel-icon');
  const text = document.getElementById('wheel-text');
  const spinBtn = document.getElementById('spin-roulette-btn');

  if (!spinBtn) return;

  spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;
    card.classList.add('spinning');

    let counter = 0;
    const interval = setInterval(() => {
      const random = penalties[Math.floor(Math.random() * penalties.length)];
      icon.textContent = random.icon;
      text.textContent = random.text;
      audio.playTick();
      counter++;

      if (counter > 12) {
        clearInterval(interval);
        card.classList.remove('spinning');
        spinBtn.disabled = false;
        audio.playVictory();
      }
    }, 90);
  });
}

// --- 5. YOUTUBE LAUGH LOUNGE (Streamlined to 3 Curated Picks) ---
function initYouTubeLounge() {
  const items = [
    {
      title: "Top 50 Roblox Funniest Moments & Sleigh Fails",
      desc: "Hilarious ragdoll physics, sleigh crashes, and blocky chaos.",
      id: "7rAeo-q_2D8",
      icon: "😂"
    },
    {
      title: "Couples Try Not To Laugh: Roblox Edition",
      desc: "Watch together and see who giggles first! Loser owes hugs.",
      id: "fJ9rUzIMcZQ",
      icon: "👫"
    },
    {
      title: "Cozy Lo-Fi Roblox Cafe Ambiance & Jazz",
      desc: "Warm gentle beats, soft fireplace crackles, and relaxing vibes.",
      id: "jfKfPfyJRdk",
      icon: "☕"
    }
  ];

  const grid = document.getElementById('yt-card-grid');
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-iframe');
  const modalTitle = document.getElementById('modal-video-title');
  const closeBtn = document.getElementById('close-modal-btn');
  const backdrop = document.getElementById('modal-backdrop');

  if (grid) {
    grid.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'yt-card';
      card.innerHTML = `
        <div>
          <div class="yt-card-icon">${item.icon}</div>
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
        <span class="yt-play-pill">▶ WATCH CLIP</span>
      `;
      card.addEventListener('click', () => {
        audio.playClick();
        openModal(item.title, item.id);
      });
      grid.appendChild(card);
    });
  }

  function openModal(title, vidId) {
    modalTitle.textContent = title;
    iframe.src = `https://www.youtube.com/embed/${vidId}?autoplay=1`;
    modal.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
    iframe.src = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Custom Link Opener
  const customInput = document.getElementById('custom-yt-url');
  const launchBtn = document.getElementById('launch-yt-btn');
  if (launchBtn && customInput) {
    launchBtn.addEventListener('click', () => {
      const val = customInput.value.trim();
      if (!val) return;
      let vidId = val;
      if (val.includes('v=')) {
        vidId = val.split('v=')[1].split('&')[0];
      } else if (val.includes('youtu.be/')) {
        vidId = val.split('youtu.be/')[1].split('?')[0];
      }
      openModal('Custom Stream', vidId);
    });
  }
}

// --- 6. ANIME HOLODECK (Streamlined to 2 Options) ---
function initAnimeHolodeck() {
  const voteBtns = document.querySelectorAll('.vote-btn');
  voteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      voteBtns.forEach(b => {
        if (b !== btn) {
          b.classList.remove('voted');
          b.textContent = '❤️ Vote For This';
        }
      });
      btn.classList.toggle('voted');
      if (btn.classList.contains('voted')) {
        btn.textContent = '💖 VOTED!';
        audio.playVictory();
      } else {
        btn.textContent = '❤️ Vote For This';
        audio.playClick();
      }
      updateProgress();
    });
  });

  const titles = ["Spy x Family", "Horimiya"];

  const spinBtn = document.getElementById('random-anime-btn');
  const banner = document.getElementById('anime-selection-banner');
  const bannerTitle = document.getElementById('selected-anime-name');

  if (spinBtn) {
    spinBtn.addEventListener('click', () => {
      spinBtn.disabled = true;
      banner.classList.remove('hidden');

      let counter = 0;
      const interval = setInterval(() => {
        const pick = titles[counter % titles.length];
        bannerTitle.textContent = pick;
        audio.playTick();
        counter++;

        if (counter > 10) {
          clearInterval(interval);
          spinBtn.disabled = false;
          audio.playVictory();
        }
      }, 100);
    });
  }
}

// --- 7. CINEMA & FOOD ENGINE (NO SPIDERMAN) ---
function initCinemaAndFood() {
  const movies = {
    'howl': {
      title: "Howl's Moving Castle",
      desc: "The ultimate cozy Miyazaki masterpiece with magic, heartwarming romance, and soaring musical scores."
    },
    'suzume': {
      title: "Suzume",
      desc: "A breathtaking fantasy adventure across Japan with stunning Makoto Shinkai visuals."
    },
    'mario': {
      title: "The Super Mario Bros. Movie",
      desc: "Fast, nostalgic, full of video game easter eggs and pure feel-good energy."
    }
  };

  const select = document.getElementById('movie-dropdown');
  const previewTitle = document.getElementById('preview-title');
  const previewDesc = document.getElementById('preview-desc');

  if (select) {
    select.addEventListener('change', () => {
      const val = select.value;
      if (movies[val]) {
        previewTitle.textContent = movies[val].title;
        previewDesc.textContent = movies[val].desc;
        audio.playClick();
      }
    });
  }

  // Cinema Mode Dimmer
  const dimBtn = document.getElementById('toggle-cinema-mode');
  const dimmer = document.getElementById('cinema-dimmer');
  if (dimBtn && dimmer) {
    dimBtn.addEventListener('click', () => {
      dimmer.classList.remove('hidden');
      audio.playClick();
      dimmer.innerHTML = `
        <div style="text-align: center; color: #fff; padding: 20px;">
          <h2 style="font-family: 'Outfit'; font-size: 2.2rem; margin-bottom: 10px;">🍿 CINEMA LIGHTS DIMMED</h2>
          <p style="color: #8b949e; margin-bottom: 24px;">Enjoy your movie & feast! Click anywhere to restore ambient lighting.</p>
          <span style="font-size: 3rem;">🎬</span>
        </div>
      `;
    });

    dimmer.addEventListener('click', () => {
      dimmer.classList.add('hidden');
      audio.playClick();
    });
  }
}

// --- 8. ROBUX DATE VAULT & COUPONS ---
function initCoupons() {
  const buttons = document.querySelectorAll('.copy-coupon-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.coupon;
      const textToCopy = `🎟️ [ROBLOX DATE PASS]: ${code} - Issued for Maddie & Sahil!`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const oldText = btn.textContent;
        btn.textContent = '✔ COPIED TO CLIPBOARD!';
        audio.playVictory();
        setTimeout(() => {
          btn.textContent = oldText;
        }, 2200);
      });
    });
  });
}

// --- 9. OVERALL DATE NIGHT PROGRESS TRACKER ---
function updateProgress() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const total = checkboxes.length + 1; // checkboxes + anime vote
  let completed = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) completed++;
  });

  if (document.querySelector('.vote-btn.voted')) completed++;

  const pct = Math.min(100, Math.round((completed / total) * 100));
  const bar = document.getElementById('overall-progress-bar');
  const text = document.getElementById('overall-progress-text');

  if (bar) bar.style.width = `${pct}%`;
  if (text) text.textContent = `${pct}%`;

  if (pct >= 85) {
    const banner = document.getElementById('completion-banner');
    if (banner) banner.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- 10. CONFETTI GENERATOR ---
function fireConfetti() {
  audio.playVictory();
  const colors = ['#e2231a', '#ffd000', '#00f0ff', '#00e676', '#ff4081', '#9d4edd'];
  for (let i = 0; i < 90; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'fixed';
    conf.style.zIndex = '9999';
    conf.style.left = Math.random() * 100 + 'vw';
    conf.style.top = '-20px';
    conf.style.width = Math.random() * 12 + 6 + 'px';
    conf.style.height = Math.random() * 10 + 6 + 'px';
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    conf.style.transform = `rotate(${Math.random() * 360}deg)`;
    conf.style.pointerEvents = 'none';
    conf.style.transition = `transform ${Math.random() * 2 + 1.5}s ease-out, top ${Math.random() * 2 + 1.5}s ease-out, opacity 2s ease`;

    document.body.appendChild(conf);

    setTimeout(() => {
      conf.style.top = '105vh';
      conf.style.transform = `rotate(${Math.random() * 720}deg)`;
      conf.style.opacity = '0';
    }, 20);

    setTimeout(() => conf.remove(), 3500);
  }
}

// --- 11. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initSnowCanvas();
  new SleighRushGame();
  initCrashRoulette();
  initYouTubeLounge();
  initAnimeHolodeck();
  initCinemaAndFood();
  initCoupons();

  // Soundboard
  document.querySelectorAll('.sfx-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.sfx;
      if (type === 'oof') audio.playOof();
      if (type === 'slurp') audio.playSlurp();
      if (type === 'fanfare') audio.playVictory();
      if (type === 'toggle-bgm') {
        audio.toggleBGM((isPlaying) => {
          document.getElementById('bgm-status').textContent = isPlaying ? 'ON' : 'OFF';
          btn.style.borderColor = isPlaying ? 'var(--blox-green)' : 'var(--border-card)';
        });
      }
    });
  });

  // Checkbox SFX & Progress
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) audio.playClick();
      updateProgress();
    });
  });

  // Confetti Button
  const confettiBtn = document.getElementById('confetti-btn');
  if (confettiBtn) confettiBtn.addEventListener('click', fireConfetti);

  // Random Theme Button
  const randomThemeBtn = document.getElementById('random-theme-btn');
  const themeBtns = document.querySelectorAll('.theme-btn');
  if (randomThemeBtn) {
    randomThemeBtn.addEventListener('click', () => {
      audio.playClick();
      const currentActive = Array.from(themeBtns).findIndex(b => b.classList.contains('active'));
      const nextIdx = (currentActive + 1) % themeBtns.length;
      themeBtns.forEach((b, i) => {
        b.classList.toggle('active', i === nextIdx);
      });
    });
  }

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      audio.playClick();
    });
  });

  // Player Names Persistence
  const p1 = document.getElementById('p1-name');
  const p2 = document.getElementById('p2-name');
  if (p1) {
    if (localStorage.getItem('p1-name')) p1.value = localStorage.getItem('p1-name');
    p1.addEventListener('input', () => localStorage.setItem('p1-name', p1.value));
  }
  if (p2) {
    if (localStorage.getItem('p2-name')) p2.value = localStorage.getItem('p2-name');
    p2.addEventListener('input', () => localStorage.setItem('p2-name', p2.value));
  }
});
