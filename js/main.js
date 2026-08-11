var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];
var currentTheme = 'default';
var currentAnimationSpeed = 'normal';
var commandHistory = [];
var historyIndex = -1;
var autoCompleteIndex = -1;
var autoCompleteOptions = [];

document.addEventListener('DOMContentLoaded', function () {
  loadSavedTheme();
  if (typeof startPortfolio === 'function') {
    startPortfolio();
  } else {
    loopLines(banner, "", 80);
    textarea.focus();
  }
});

window.addEventListener("keyup", enterKey);
window.addEventListener("keydown", handleKeyDown);


//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      pwd = true;
    }
    if (pwd && e.keyCode == 13) {
      loopLines(secret, "color2 margin", 120);
      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Wrong password", "error", 0);
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("rajanagori@about-me:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
      scrollTerminalToBottom(true);
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  // Add to command history
  commandHistory.push(cmd.toLowerCase());
  historyIndex = commandHistory.length;
  
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", animationSpeed[currentAnimationSpeed]);
      break;
    case "whois":
      showWhois();
      break;
    case "conference":
      loopLines(conference, "color2 margin", animationSpeed[currentAnimationSpeed]);
      break;
    case "video":
      addLine("Opening YouTube...", "color2", animationSpeed[currentAnimationSpeed]);
      newTab(youtube);
      break;
    case "sudo":
      addLine("Oh no, you're not admin...", "color2", animationSpeed[currentAnimationSpeed]);
      setTimeout(function () {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000);
      break;
    case "interview":
      loopLines(interview, "color2 margin", animationSpeed[currentAnimationSpeed]);
      break;
    case "youtube":
      addLine("Sending you to the link...", "color2", animationSpeed[currentAnimationSpeed]);
      setTimeout(function () {
        window.open('https://youtu.be/KtYby2QN0kQ?si=FN3fcEEVzT5gwGXv');
      }, 2000);
      break;
    case "discuss":
      addLine("Sending you to the link...", "color2", animationSpeed[currentAnimationSpeed]);
      setTimeout(function () {
        window.open('https://github.com/RAJANAGORI/Nightingale/discussions/11');
      }, 2000);
      break;
    case "slack":
      addLine("Sending you to the link...", "color2", animationSpeed[currentAnimationSpeed]);
      setTimeout(function () {
        window.open('https://join.slack.com/share/enQtNjA2OTUwOTI1NDc3NC1iOWY3ZDk0NzJhYWFkYTc4OWFlMDk0YTlkMDhkMmY2N2MxMjRkYWMxMzU2MzllZjRhMDdkMTdjZmJmYTUyYjZl');
      }, 2000);
      break;
    case "social":
      loopLines(social, "color2 margin", animationSpeed[currentAnimationSpeed]);
      break;
    case "projects":
      showProjectCards();
      break;
    case "nightingale":
      loopLines(nightingaleInfo, "color2 margin", animationSpeed[currentAnimationSpeed]);
      break;
    case "wiki":
      addLine("Opening nightingale wiki...", "color2", animationSpeed[currentAnimationSpeed]);
      newTab(wiki);
      break;
    case "blog":
      loopLines(blogs, "color2 margin", animationSpeed[currentAnimationSpeed]);
      break;
    case "resume":
      addLine("Opening resume...", "color2", animationSpeed[currentAnimationSpeed]);
      newTab(resume);
      break;
    case "password":
      addLine("<span class=\"inherit\"> Lol! You're joking, right? You\'re gonna have to try harder than that!😂</span>", "error", 100);
      break;
    case "history":
      showEnhancedHistory();
      break;
    case "email":
      addLine('Opening mailto:<a href="mailto:raja.nagori@owasp.org">raja.nagori@owasp.org</a>...', "color2", animationSpeed[currentAnimationSpeed]);
      newTab(email);
      break;
    case "clear":
      clearTerminal();
      break;
    case "neofetch":
      loopLines(neofetch, "color2 margin neofetch-wrap", 0);
      break;
    case "cowsay":
      var cowsayMsg = 'Nightingale v2.0 — Docker for Pentesters';
      loopLines(buildCowsay(cowsayMsg), 'color2 margin cowsay-wrap', 0);
      break;
    case "sound":
      if (typeof toggleSound === 'function') {
        toggleSound();
      }
      break;
    case "skills-matrix":
      showSkillsMatrix();
      break;
    case "experience":
      loopLines(getExperienceTimeline(), "color2 margin", animationSpeed[currentAnimationSpeed]);
      break;
    case "themes":
      showAvailableThemes();
      break;
    case "settings":
      showCurrentSettings();
      break;
    // Theme commands
    case "set-theme":
      addLine("Usage: set-theme [theme-name]", "color2", 0);
      addLine("Available themes: default, light, cyberpunk, matrix, retro, hacker, golden", "color2", 0);
      break;
    case "set-animation":
      addLine("Usage: set-animation [speed]", "color2", 0);
      addLine("Available speeds: fast, normal, slow, none", "color2", 0);
      break;
    // Socials
    case "twitter":
      addLine("Opening Twitter...", "color2", 0);
      newTab(twitter);
      break;
    case "linkedin":
      addLine("Opening LinkedIn...", "color2", 0);
      newTab(linkedin);
      break;
    case "instagram":
      addLine("Opening Instagram...", "color2", 0);
      newTab(instagram);
      break;
    case "github":
      addLine("Opening GitHub...", "color2", 0);
      newTab(github);
      break;
    default:
      // Check for parameterized commands
      if (cmd.toLowerCase().startsWith('set-theme ')) {
        var themeName = cmd.toLowerCase().substring(10);
        setTheme(themeName);
      } else if (cmd.toLowerCase().startsWith('set-animation ')) {
        var speed = cmd.toLowerCase().substring(14);
        setAnimationSpeed(speed);
      } else if (cmd.toLowerCase().startsWith('blog ')) {
        var blogName = normalizeBlogName(cmd.substring(5));
        fetchBlogContent(blogName);
      } else {
        addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      }
      break;
  }
}

function newTab(link) {
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}

function scrollTerminalToBottom(smooth) {
  var terminalEl = document.getElementById('terminal');
  if (!terminalEl) return;
  requestAnimationFrame(function () {
    if (smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      terminalEl.scrollTo({ top: terminalEl.scrollHeight, behavior: 'smooth' });
    } else {
      terminalEl.scrollTop = terminalEl.scrollHeight;
    }
  });
}

function addHtmlBlock(html, className, time, onReady) {
  setTimeout(function () {
    var block = document.createElement('div');
    block.className = className || 'terminal-block';
    block.innerHTML = html;
    before.parentNode.insertBefore(block, before);
    scrollTerminalToBottom(true);
    if (typeof onReady === 'function') onReady(block);
  }, time || 0);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    scrollTerminalToBottom(time > 0);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
  if (name.length > 0) {
    setTimeout(function () {
      scrollTerminalToBottom(true);
    }, name.length * time + 50);
  }
}

// New utility functions
function handleKeyDown(e) {
  // Keyboard shortcuts
  if (e.ctrlKey) {
    switch(e.key.toLowerCase()) {
      case 'l':
        e.preventDefault();
        clearTerminal();
        break;
      case 'h':
        e.preventDefault();
        commander('help');
        break;
      case 't':
        e.preventDefault();
        cycleTheme();
        break;
    }
  }
  
  // Tab completion
  if (e.key === 'Tab') {
    e.preventDefault();
    handleTabCompletion(e);
  }

  if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
    var ghost = document.getElementById('ghost');
    if (ghost && !e.ctrlKey) {
      setTimeout(function () {
        handleTabCompletion(null);
      }, 0);
    }
  }
  
  // Enhanced history navigation
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    navigateHistory('up');
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    navigateHistory('down');
  }
  
}

function handleTabCompletion(e) {
  var currentInput = textarea.value.toLowerCase();
  var availableCommands = [
    'help', 'whois', 'conference', 'video', 'sudo', 'interview', 'youtube',
    'discuss', 'slack', 'social', 'projects', 'nightingale', 'wiki', 'blog', 'resume',
    'password', 'history', 'email', 'clear', 'neofetch', 'cowsay', 'sound', 'skills-matrix', 'experience',
    'themes', 'settings', 'set-theme', 'set-animation',
    'twitter', 'linkedin', 'instagram', 'github'
  ];

  // Complete `blog <name>` against known local blog keys
  if (currentInput.startsWith('blog ')) {
    var blogPrefix = currentInput.substring(5);
    var blogKeys = getBlogCompletionKeys();
    var blogMatches = blogKeys.filter(function (name) {
      return name.startsWith(blogPrefix);
    });
    var ghostBlog = document.getElementById('ghost');
    if (blogMatches.length === 1) {
      var full = 'blog ' + blogMatches[0];
      var suffix = full.slice(currentInput.length);
      if (ghostBlog) ghostBlog.textContent = suffix;
      if (e && e.key === 'Tab') {
        e.preventDefault();
        textarea.value = full;
        command.innerHTML = textarea.value;
        if (ghostBlog) ghostBlog.textContent = '';
      }
    } else if (blogMatches.length > 1 && e && e.key === 'Tab') {
      e.preventDefault();
      addLine("<br>", "", 0);
      addLine(blogMatches.join('  '), "color2", 0);
      if (ghostBlog) ghostBlog.textContent = '';
    } else if (ghostBlog) {
      ghostBlog.textContent = blogMatches.length === 1 ? ('blog ' + blogMatches[0]).slice(currentInput.length) : '';
    }
    return;
  }

  var matches = availableCommands.filter(function (cmd) {
    return cmd.startsWith(currentInput);
  });

  var ghost = document.getElementById('ghost');

  if (matches.length === 1 && matches[0].startsWith(currentInput) && currentInput.length > 0) {
    var suffix = matches[0].slice(currentInput.length);
    if (ghost) ghost.textContent = suffix;
  } else if (ghost) {
    ghost.textContent = '';
  }

  if (matches.length > 0 && e && e.key === 'Tab') {
    autoCompleteIndex = (autoCompleteIndex + 1) % matches.length;
    textarea.value = matches[autoCompleteIndex];
    command.innerHTML = textarea.value;
    if (ghost) ghost.textContent = '';
  }
}

function navigateHistory(direction) {
  if (commandHistory.length === 0) return;
  
  if (direction === 'up') {
    if (historyIndex > 0) {
      historyIndex--;
      textarea.value = commandHistory[historyIndex];
    }
  } else if (direction === 'down') {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      textarea.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      textarea.value = '';
    }
  }
  
  command.innerHTML = textarea.value;
}

function showEnhancedHistory() {
  addLine("<br>", "", 0);
  addLine("<span class='command'>Command History:</span>", "color2", 0);
  
  if (commandHistory.length === 0) {
    addLine("No commands in history", "color2", 0);
  } else {
    commandHistory.forEach((cmd, index) => {
      addLine(`${index + 1}. ${cmd}`, "color2", 0);
    });
  }
  addLine("<br>", "command", 50);
}

function setTheme(themeName) {
  if (themes[themeName]) {
    currentTheme = themeName;
    var theme = themes[themeName];

    document.documentElement.style.setProperty('--background-color', theme.background);
    document.documentElement.style.setProperty('--main-text-color', theme.text);
    document.documentElement.style.setProperty('--command-color', theme.command);
    document.documentElement.style.setProperty('--cursor-color', theme.cursor);
    document.documentElement.style.setProperty('--cursor-background-color', theme.cursor);

    document.body.className = themeName !== 'default' && themeName !== 'light'
      ? 'theme-' + themeName
      : '';

    if (themeName === 'golden') {
      document.body.classList.add('theme-golden');
    }

    try {
      localStorage.setItem('portfolio-theme', themeName);
      localStorage.setItem('portfolio-theme-manual', 'true');
    } catch (err) {}

    if (typeof updateStatusTheme === 'function') {
      updateStatusTheme(themeName);
    }

    addLine('Theme changed to: ' + theme.name, 'color2', 0);

    if (themeName === 'matrix') {
      addMatrixEffect();
    } else if (themeName === 'cyberpunk') {
      addCyberpunkEffect();
    } else if (themeName === 'hacker') {
      addHackerEffect();
    } else {
      removeVisualEffects();
    }
  } else {
    addLine('Theme not found. Available themes: default, light, cyberpunk, matrix, retro, hacker, golden', 'error', 0);
  }
}

function loadSavedTheme() {
  try {
    var saved = localStorage.getItem('portfolio-theme');
    var manual = localStorage.getItem('portfolio-theme-manual') === 'true';
    if (!saved && typeof applySystemTheme === 'function') {
      applySystemTheme(false);
      return;
    }
    if (saved && themes[saved]) {
      currentTheme = saved;
      var theme = themes[saved];
      document.documentElement.style.setProperty('--background-color', theme.background);
      document.documentElement.style.setProperty('--main-text-color', theme.text);
      document.documentElement.style.setProperty('--command-color', theme.command);
      document.documentElement.style.setProperty('--cursor-color', theme.cursor);
      document.documentElement.style.setProperty('--cursor-background-color', theme.cursor);
      document.body.className = saved !== 'default' && saved !== 'light' ? 'theme-' + saved : '';
      if (saved === 'golden') document.body.classList.add('theme-golden');
      if (typeof updateStatusTheme === 'function') updateStatusTheme(saved);
    }
  } catch (err) {}
}

function showSkillsMatrix() {
  addLine('<br>', '', 0);
  addLine('<span class="command">Security Skills Matrix:</span>', 'color2', 0);

  var skills = [
    { name: 'Web Penetration Testing', pct: 98 },
    { name: 'Mobile Security', pct: 94 },
    { name: 'Threat Modeling', pct: 88 },
    { name: 'Source Code Review', pct: 90 },
    { name: 'DevSecOps', pct: 92 },
    { name: 'Docker Security', pct: 95 },
    { name: 'Supply Chain Security', pct: 88 },
    { name: 'SBOM Analysis', pct: 82 },
    { name: 'Red Teaming', pct: 75 },
    { name: 'Scripting (Python/Bash)', pct: 90 },
    { name: 'OS Hardening', pct: 85 }
  ];

  skills.forEach(function (skill, index) {
    var label = skill.name.padEnd(26, ' ');
    var barWidth = Math.round(skill.pct * 1.2);
    setTimeout(function () {
      addLine(
        label + ' <span class="skill-bar" style="width:' + barWidth + 'px"></span> ' + skill.pct + '%',
        'skill-bar-row color2 no-animation',
        0
      );
    }, index * 80);
  });

  setTimeout(function () {
    addLine('<br>', 'command', 0);
  }, skills.length * 80 + 100);
}

function cycleTheme() {
  var themeKeys = Object.keys(themes);
  var currentIndex = themeKeys.indexOf(currentTheme);
  var nextIndex = (currentIndex + 1) % themeKeys.length;
  setTheme(themeKeys[nextIndex]);
}

function showAvailableThemes() {
  addLine("<br>", "", 0);
  addLine("<span class='command'>Available Themes:</span>", "color2", 0);
  
  Object.keys(themes).forEach(themeKey => {
    var theme = themes[themeKey];
    var current = themeKey === currentTheme ? " (current)" : "";
    addLine(`${themeKey}: ${theme.name}${current}`, "color2", 0);
  });
  addLine("<br>", "command", 50);
}


function setAnimationSpeed(speed) {
  if (animationSpeed[speed] !== undefined) {
    currentAnimationSpeed = speed;
    addLine(`Animation speed set to: ${speed}`, "color2", 0);
  } else {
    addLine("Invalid speed. Available: fast, normal, slow, none", "error", 0);
  }
}

function showCurrentSettings() {
  addLine("<br>", "", 0);
  addLine("<span class='command'>Current Settings:</span>", "color2", 0);
  addLine("Theme: " + currentTheme, "color2", 0);
  addLine("Animation Speed: " + currentAnimationSpeed, "color2", 0);
  addLine("Commands in History: " + commandHistory.length, "color2", 0);
  addLine("Sound: " + (typeof isSoundEnabled === 'function' && isSoundEnabled() ? 'on' : 'off'), "color2", 0);
  addLine("System theme sync: " + (typeof isSystemThemeEnabled === 'function' && isSystemThemeEnabled() ? 'on' : 'off'), "color2", 0);
  addLine("<span class='color2'>Toggle sound with</span> <span class='command'>sound</span>", "color2", 0);
  addLine("<br>", "command", 50);
}

function showWhois() {
  addLine('<br>', '', 0);
  if (typeof getWhoisPanelHtml === 'function') {
    addHtmlBlock(getWhoisPanelHtml(), 'whois-panel-wrap', 0);
  } else {
    loopLines(whois, 'color2 margin whois', 0);
  }
  addLine('<br>', 'no-animation', 50);
}

function showProjectCards() {
  addLine('<br>', '', 0);
  addLine('<span class="command">Open Source Projects — hover for preview</span>', 'color2 no-animation', 0);

  var cardsHtml = projectCardsData.map(function (project) {
    return (
      '<a class="project-card" href="' + project.site + '" target="_blank" rel="noopener">' +
        '<div class="project-card-header">' +
          '<span class="project-card-name">' + project.name + '</span>' +
          '<span class="project-card-tag">' + project.tag + '</span>' +
        '</div>' +
        '<p class="project-card-desc">' + project.desc + '</p>' +
        '<div class="project-card-meta">' +
          '<span>★ ' + project.stars + '</span>' +
          '<span>' + project.tech + '</span>' +
        '</div>' +
        '<div class="project-card-preview">' + project.preview + '</div>' +
      '</a>'
    );
  }).join('');

  addHtmlBlock('<div class="project-grid">' + cardsHtml + '</div>', 'project-cards-wrap', 0);
  addLine('<br>', 'no-animation', 50);
}

function buildCowsay(message) {
  var top = '_'.repeat(message.length + 2);
  var bubble = '( ' + message + ' )';
  return [
    '<br>',
    ' <span class="cowsay-line">' + top + '</span>',
    ' <span class="cowsay-line">' + bubble + '</span>',
    ' <span class="cowsay-line">' + '-'.repeat(top.length) + '</span>',
    ' <span class="cowsay-art neofetch-art">        \\   ^__^</span>',
    ' <span class="cowsay-art neofetch-art">         \\  (oo)\\_______</span>',
    ' <span class="cowsay-art neofetch-art">            (__)\\       )\\/\\</span>',
    ' <span class="cowsay-art neofetch-art">                ||----w |</span>',
    ' <span class="cowsay-art neofetch-art">                ||     ||</span>',
    ' <span class="cowsay-line color2">   Nightingale says: Try `projects` or `nightingale`</span>',
    '<br>'
  ];
}

function clearTerminal() {
  setTimeout(function () {
    terminal.innerHTML = '<a id="before"></a>';
    before = document.getElementById("before");
  }, 1);
}


function addMatrixEffect() {
  // Add matrix-style falling code effect
  var matrix = document.createElement('div');
  matrix.id = 'matrix-effect';
  matrix.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background: linear-gradient(transparent, rgba(0, 255, 0, 0.1));
    animation: matrixRain 20s linear infinite;
  `;
  
  // Add CSS animation
  if (!document.getElementById('matrix-styles')) {
    var style = document.createElement('style');
    style.id = 'matrix-styles';
    style.textContent = `
      @keyframes matrixRain {
        0% { background-position: 0 0; }
        100% { background-position: 0 100vh; }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(matrix);
}

function addCyberpunkEffect() {
  // Add cyberpunk-style glitch effects
  var glitch = document.createElement('div');
  glitch.id = 'cyberpunk-effect';
  glitch.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background: radial-gradient(circle, rgba(255, 0, 128, 0.1) 0%, transparent 70%);
    animation: cyberpunkPulse 3s ease-in-out infinite;
  `;
  
  if (!document.getElementById('cyberpunk-styles')) {
    var style = document.createElement('style');
    style.id = 'cyberpunk-styles';
    style.textContent = `
      @keyframes cyberpunkPulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(glitch);
}

function addHackerEffect() {
  // Add hacker-style terminal effects
  var hacker = document.createElement('div');
  hacker.id = 'hacker-effect';
  hacker.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background: 
      radial-gradient(circle at 25% 25%, rgba(0, 255, 65, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
      linear-gradient(45deg, transparent 49%, rgba(0, 212, 255, 0.05) 50%, transparent 51%);
    animation: hackerScan 4s ease-in-out infinite;
  `;
  
  if (!document.getElementById('hacker-styles')) {
    var style = document.createElement('style');
    style.id = 'hacker-styles';
    style.textContent = `
      @keyframes hackerScan {
        0%, 100% { 
          opacity: 0.3; 
          transform: translateY(0) scale(1);
          filter: hue-rotate(0deg);
        }
        25% { 
          opacity: 0.6; 
          transform: translateY(-2px) scale(1.02);
          filter: hue-rotate(90deg);
        }
        50% { 
          opacity: 0.4; 
          transform: translateY(0) scale(1);
          filter: hue-rotate(180deg);
        }
        75% { 
          opacity: 0.7; 
          transform: translateY(2px) scale(1.01);
          filter: hue-rotate(270deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(hacker);
}

function removeVisualEffects() {
  var matrix = document.getElementById('matrix-effect');
  var cyberpunk = document.getElementById('cyberpunk-effect');
  var hacker = document.getElementById('hacker-effect');
  
  if (matrix) matrix.remove();
  if (cyberpunk) cyberpunk.remove();
  if (hacker) hacker.remove();
}

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function normalizeBlogName(raw) {
  return String(raw || '')
    .toLowerCase()
    .trim()
    .replace(/^blog\s+/, '')
    .replace(/\s+/g, '-')
    .replace(/_/g, '-');
}

function getBlogCompletionKeys() {
  var keys = {};
  var skipNumeric = /^\d+$/;
  if (typeof localBlogMap === 'object' && localBlogMap) {
    Object.keys(localBlogMap).forEach(function (k) {
      if (!skipNumeric.test(k)) keys[k] = true;
    });
  }
  return Object.keys(keys).sort();
}

function getAvailableBlogHint() {
  return getBlogCompletionKeys().join(', ');
}

/** Turn one raw man-page line into safe HTML (links/images/styles). */
function formatBlogLineHtml(line) {
  if (!line || !line.length) {
    return '';
  }

  // Man-page header: NAME(7) ... NAME(7)
  if (/^[A-Z][A-Z0-9_-]*\([0-9]+\)/.test(line)) {
    return '<span class="command">' + escapeHtml(line) + '</span>';
  }

  // Section headers (NAME, DESCRIPTION, NOTES, SEE ALSO, COLOPHON, …)
  if (/^[A-Z][A-Z0-9 ]+$/.test(line)) {
    return '<span class="command">' + escapeHtml(line) + '</span>';
  }

  // Shell examples
  if (/^\s*\$/.test(line)) {
    return '<span class="blog-cmd">' + escapeHtml(line) + '</span>';
  }

  // Parse ⟨...⟩ markers into images or links; escape everything else
  var markerRe = /⟨([^⟩]+)⟩/g;
  var html = '';
  var lastIndex = 0;
  var match;

  while ((match = markerRe.exec(line)) !== null) {
    html += escapeHtml(line.slice(lastIndex, match.index));
    var inner = match[1].trim();

    if (/^\.\/blogs\/.+\.(png|jpg|jpeg|gif|svg)$/i.test(inner)) {
      var safeSrc = escapeHtml(inner);
      html += '<img class="blog-image" src="' + safeSrc + '" alt="Blog illustration" loading="lazy" />';
    } else if (/^https?:\/\//i.test(inner)) {
      var safeHref = escapeHtml(inner);
      html += '<a class="blog-link" href="' + safeHref + '" target="_blank" rel="noopener noreferrer">' + safeHref + '</a>';
    } else {
      html += escapeHtml(match[0]);
    }
    lastIndex = match.index + match[0].length;
  }

  html += escapeHtml(line.slice(lastIndex));
  return html;
}

/**
 * Build a single safe man-page HTML block from raw .txt content.
 * Also expands ```gist:URL ... ``` embedded blocks when present.
 */
function buildBlogManHtml(content) {
  var lines = content.split('\n');
  var parts = [];
  var i = 0;

  while (i < lines.length) {
    var line = lines[i];

    // Skip standalone ```gist:URL fences — content already shown via ⟨URL⟩ handling
    // Prefer embedded gist body when present right after a ⟨gist⟩ line.
    var gistLineMatch = line.match(/⟨(https:\/\/gist\.github\.com\/[^⟩]+)⟩/);
    if (gistLineMatch) {
      var gistUrl = gistLineMatch[1];
      var before = line.slice(0, line.indexOf('⟨'));
      var after = line.slice(line.indexOf('⟩') + 1);
      if (before.trim()) parts.push(formatBlogLineHtml(before));
      parts.push(formatBlogLineHtml('⟨' + gistUrl + '⟩'));

      var j = i + 1;
      var embedded = [];
      var fenceStart = '```gist:' + gistUrl;
      while (j < lines.length && j < i + 120) {
        if (lines[j].trim().indexOf(fenceStart) === 0) {
          j++;
          while (j < lines.length && lines[j].trim().indexOf('```') !== 0) {
            embedded.push(lines[j]);
            j++;
          }
          if (j < lines.length) j++; // closing ```
          i = j - 1;
          break;
        }
        // Stop lookahead if we hit another section or unrelated content soon
        if (j > i + 3 && lines[j].trim() !== '' && lines[j].indexOf('```gist:') !== 0) {
          break;
        }
        j++;
      }

      if (embedded.length) {
        parts.push('<span class="command">--- Gist Content ---</span>');
        parts.push('<pre class="blog-gist">' + escapeHtml(embedded.join('\n')) + '</pre>');
        parts.push('<span class="command">--- End Gist ---</span>');
      }

      if (after.trim()) parts.push(formatBlogLineHtml(after));
      i++;
      continue;
    }

    // Skip orphan ```gist / ``` fence lines so they do not pollute output
    if (/^\s*```/.test(line)) {
      i++;
      continue;
    }

    parts.push(formatBlogLineHtml(line));
    i++;
  }

  return parts.join('\n');
}

function fetchBlogContent(blogName) {
  blogName = normalizeBlogName(blogName);

  if (!blogName) {
    addLine('Usage: blog [name|number]', 'color2', 0);
    addLine('Type <span class="command">blog</span> to list articles.', 'color2', 0);
    return;
  }

  if (localBlogMap && localBlogMap[blogName]) {
    var blogPath = localBlogMap[blogName];
    addLine('Loading <span class="command">' + escapeHtml(blogName) + '</span>…', 'color2', 0);

    fetch(blogPath)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Blog file not found (' + response.status + ')');
        }
        return response.text();
      })
      .then(function (content) {
        var html = buildBlogManHtml(content);
        addLine('<br>', '', 0);
        // Insert as a real node so addLine's space→nbsp conversion cannot break wrapping
        setTimeout(function () {
          var wrap = document.createElement('div');
          wrap.className = 'blog-wrap color2';
          wrap.innerHTML = '<div class="blog-man">' + html + '</div>';
          before.parentNode.insertBefore(wrap, before);
          scrollTerminalToBottom(false);
        }, 0);
        addLine('<br>', '', 10);
        addLine(
          'Done. Type <span class="command">blog</span> for more, or <span class="command">clear</span> to reset.',
          'color2',
          20
        );
      })
      .catch(function (error) {
        addLine('Error loading local blog: ' + escapeHtml(error.message), 'error', 0);
        addLine("Blog not found. Type 'blog' to see available blogs.", 'error', 0);
        addLine('Available: ' + getAvailableBlogHint(), 'color2', 0);
      });
  } else {
    addLine("Blog not found. Type 'blog' to see available blogs.", 'error', 0);
    addLine('Available: ' + getAvailableBlogHint(), 'color2', 0);
  }
}
