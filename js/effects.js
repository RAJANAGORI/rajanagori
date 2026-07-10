(function () {
  var canvas = document.getElementById('bg-canvas');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var soundEnabled = false;
  var systemThemeEnabled = true;
  var konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var konamiIndex = 0;
  var audioCtx = null;

  try {
    soundEnabled = localStorage.getItem('portfolio-sound') === 'on';
    systemThemeEnabled = localStorage.getItem('portfolio-theme-manual') !== 'true';
  } catch (err) {}

  function initClock() {
    var clockEl = document.getElementById('status-clock');
    if (!clockEl) return;

    function tick() {
      var now = new Date();
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    tick();
    setInterval(tick, 30000);
  }

  function initCanvas() {
    if (!canvas || reducedMotion) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      var count = Math.min(60, Math.floor((w * h) / 18000));
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 166, 87, 0.35)';
        ctx.fill();
      }

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = 'rgba(88, 166, 255, ' + (0.12 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    window.addEventListener('resize', function () {
      resize();
      createParticles();
    });
    draw();
  }

  function playKeySound() {
    if (!soundEnabled || reducedMotion) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.value = 920 + Math.random() * 80;
      gain.gain.value = 0.015;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (err) {}
  }

  function initTypingSound() {
    var textarea = document.getElementById('texter');
    if (!textarea) return;
    textarea.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
        playKeySound();
      }
    });
  }

  window.toggleSound = function () {
    soundEnabled = !soundEnabled;
    try {
      localStorage.setItem('portfolio-sound', soundEnabled ? 'on' : 'off');
    } catch (err) {}
    if (typeof addLine === 'function') {
      addLine('Typing sound: ' + (soundEnabled ? 'ON' : 'OFF'), 'color2', 0);
    }
  };

  window.isSoundEnabled = function () {
    return soundEnabled;
  };

  window.isSystemThemeEnabled = function () {
    return systemThemeEnabled;
  };

  window.applySystemTheme = function (announce) {
    if (!systemThemeEnabled || typeof setTheme !== 'function' || typeof themes === 'undefined') return;
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var themeName = prefersDark ? 'default' : 'light';
    if (themes[themeName]) {
      currentTheme = themeName;
      var theme = themes[themeName];
      document.documentElement.style.setProperty('--background-color', theme.background);
      document.documentElement.style.setProperty('--main-text-color', theme.text);
      document.documentElement.style.setProperty('--command-color', theme.command);
      document.documentElement.style.setProperty('--cursor-color', theme.cursor);
      document.documentElement.style.setProperty('--cursor-background-color', theme.cursor);
      document.body.className = '';
      if (typeof updateStatusTheme === 'function') updateStatusTheme(themeName);
      if (typeof removeVisualEffects === 'function') removeVisualEffects();
      if (announce && typeof addLine === 'function') {
        addLine('System theme applied: ' + theme.name, 'color2', 0);
      }
    }
  };

  function initSystemThemeWatcher() {
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var handler = function () {
      try {
        if (localStorage.getItem('portfolio-theme-manual') === 'true') return;
      } catch (err) {}
      applySystemTheme(false);
    };
    if (media.addEventListener) {
      media.addEventListener('change', handler);
    } else if (media.addListener) {
      media.addListener(handler);
    }
  }

  function unlockGoldenTheme() {
    if (typeof setTheme === 'function') {
      setTheme('golden');
      if (typeof addLine === 'function') {
        addLine('<span class="command">🎉 SECRET UNLOCKED:</span> Golden Nightingale theme activated!', 'color2 no-animation', 0);
      }
    }
  }

  function initKonamiCode() {
    document.addEventListener('keydown', function (e) {
      var key = e.key;
      if (key === konamiPattern[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiPattern.length) {
          konamiIndex = 0;
          unlockGoldenTheme();
        }
      } else {
        konamiIndex = key === konamiPattern[0] ? 1 : 0;
      }
    });
  }

  function runBootSequence(callback) {
    if (reducedMotion || typeof loopLines !== 'function') {
      callback();
      return;
    }

    var bootLines = [
      '<span class="boot-line">[    0.000000] Initializing rajanagori-portfolio kernel...</span>',
      '<span class="boot-line">[    0.042891] Loading security modules: owasp, nightingale, sbom</span>',
      '<span class="boot-line">[    0.089234] Mounting /dev/projects — 5 repositories detected</span>',
      '<span class="boot-line">[    0.134567] Starting terminal session on tty1</span>',
      '<span class="boot-line">[    0.178901] Network: linkedin, github, medium — all interfaces up</span>',
      '<span class="boot-line">[    0.223456] Welcome to Raja Nagori Portfolio v2.0</span>',
      '<br>'
    ];

    bootLines.forEach(function (line, index) {
      setTimeout(function () {
        addLine(line, 'boot-line no-animation', 0);
        if (typeof scrollTerminalToBottom === 'function') scrollTerminalToBottom(false);
        if (index === bootLines.length - 1) {
          setTimeout(callback, 200);
        }
      }, index * 120);
    });
  }

  function initQuickActions() {
    var container = document.getElementById('quick-actions');
    if (!container) return;

    container.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cmd]');
      if (!btn) return;
      var cmd = btn.getAttribute('data-cmd');
      var textarea = document.getElementById('texter');
      var typer = document.getElementById('typer');
      if (!textarea || !typer || typeof commander !== 'function' || typeof addLine !== 'function') return;

      addLine('rajanagori@about-me:~$ ' + cmd, 'no-animation', 0);
      commander(cmd);
      textarea.value = '';
      typer.innerHTML = '';
      textarea.focus();
      if (typeof scrollTerminalToBottom === 'function') scrollTerminalToBottom(true);
    });
  }

  window.updateStatusTheme = function (themeName) {
    var el = document.getElementById('status-theme');
    if (el) el.textContent = themeName;
  };

  window.startPortfolio = function () {
    runBootSequence(function () {
      loopLines(banner, '', 60);
      var textarea = document.getElementById('texter');
      if (textarea) textarea.focus();
      if (typeof scrollTerminalToBottom === 'function') scrollTerminalToBottom(true);
    });
  };

  function initViewportFix() {
    var shell = document.querySelector('.terminal-shell');
    if (!shell) return;

    function applyHeight() {
      if (window.innerWidth > 767) {
        shell.style.height = '';
        shell.style.minHeight = '';
        shell.style.maxHeight = '';
        return;
      }
      var height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      shell.style.height = height + 'px';
      shell.style.minHeight = height + 'px';
      shell.style.maxHeight = height + 'px';
    }

    applyHeight();
    window.addEventListener('resize', applyHeight);
    window.addEventListener('orientationchange', applyHeight);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', applyHeight);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initClock();
    initCanvas();
    initQuickActions();
    initTypingSound();
    initSystemThemeWatcher();
    initKonamiCode();
    initViewportFix();
  });
})();
