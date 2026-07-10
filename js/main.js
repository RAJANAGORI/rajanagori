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
      loopLines(experienceTimeline, "color2 margin", animationSpeed[currentAnimationSpeed]);
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
        var blogName = cmd.toLowerCase().substring(5).trim();
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

function addHtmlBlock(html, className, time) {
  setTimeout(function () {
    var block = document.createElement('div');
    block.className = className || 'terminal-block';
    block.innerHTML = html;
    before.parentNode.insertBefore(block, before);
    scrollTerminalToBottom(true);
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

function fetchBlogContent(blogName) {
  // Check if blog exists locally
  if (localBlogMap && localBlogMap[blogName]) {
    var blogPath = localBlogMap[blogName];
    addLine("Loading blog content from local file...", "color2", 0);
    
    // Fetch the blog content
    fetch(blogPath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Blog file not found');
        }
        return response.text();
      })
      .then(async content => {
        // First, collect all gist URLs and fetch their content
        var lines = content.split('\n');
        var gistMap = {};
        var gistUrls = [];
        
        // Find all gist URLs
        for (var i = 0; i < lines.length; i++) {
          var gistMatch = lines[i].match(/⟨(https:\/\/gist\.github\.com\/[^⟩]+)⟩/);
          if (gistMatch) {
            var gistUrl = gistMatch[1];
            if (gistMap[gistUrl] === undefined) {
              gistMap[gistUrl] = null; // Placeholder
              gistUrls.push(gistUrl);
            }
          }
        }
        
        // Fetch all gist contents in parallel with timeout
        // Helper function to fetch with timeout
        function fetchWithTimeout(url, options, timeout = 3000) {
          return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Timeout')), timeout)
            )
          ]);
        }
        
        // Only try to fetch if there are gist URLs
        if (gistUrls.length > 0) {
          addLine("Loading blog content and fetching gist resources...", "color2", 0);
          
          var fetchPromises = gistUrls.map(async function(gistUrl) {
            try {
              // Try direct fetch first with short timeout
              try {
                var response = await fetchWithTimeout(gistUrl, {
                  method: 'GET',
                  mode: 'cors',
                  cache: 'no-cache'
                }, 2000);
                
                if (response.ok) {
                  var gistContent = await response.text();
                  gistMap[gistUrl] = gistContent;
                  return;
                }
              } catch (error) {
                // Direct fetch failed or timed out
              }
              
              // Mark as failed - we'll show clickable links instead
              gistMap[gistUrl] = null;
            } catch (error) {
              gistMap[gistUrl] = null;
            }
          });
          
          // Wait for all gists with a short overall timeout
          try {
            await Promise.race([
              Promise.all(fetchPromises),
              new Promise((resolve) =>
                setTimeout(() => {
                  resolve();
                }, 5000)
              )
            ]);
          } catch (timeoutError) {
            // Continue anyway
          }
        } else {
          addLine("Loading blog content...", "color2", 0);
        }
        
        // Now display the content line by line
        addLine("<br>", "", 0);
        var delay = 0;
        
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          // Check for image references (format: ⟨./blogs/.../image.png⟩)
          var imageMatch = line.match(/⟨(\.\/blogs\/[^⟩]+\.(png|jpg|jpeg|gif|svg))⟩/i);
          
          if (imageMatch) {
            var imagePath = imageMatch[1];
            var beforeLink = line.substring(0, line.indexOf('⟨'));
            var afterLink = line.substring(line.indexOf('⟩') + 1);
            
            // Display text before the image
            if (beforeLink.trim().length > 0) {
              var formattedBefore = beforeLink.replace(/  /g, '&nbsp;&nbsp;');
              addLine(formattedBefore, "color2", delay);
              delay += 3;
            }
            
            // Display the image
            addLine("<br>", "", delay);
            addLine("<img src='" + imagePath + "' alt='Blog Image' style='max-width: 100%; height: auto; border: 1px solid var(--command-color); margin: 10px 0; border-radius: 4px;' />", "color2", delay);
            delay += 5;
            addLine("<br>", "", delay);
            
            // Display text after the image if any
            if (afterLink.trim().length > 0) {
              var formattedAfter = afterLink.replace(/  /g, '&nbsp;&nbsp;');
              addLine(formattedAfter, "color2", delay);
              delay += 3;
            }
            continue;
          }
          
          // Check for gist links (format: ⟨URL⟩)
          var gistMatch = line.match(/⟨(https:\/\/gist\.github\.com\/[^⟩]+)⟩/);
          
          if (gistMatch) {
            var gistUrl = gistMatch[1];
            var beforeLink = line.substring(0, line.indexOf('⟨'));
            var afterLink = line.substring(line.indexOf('⟩') + 1);
            
            // Display text before the link
            if (beforeLink.trim().length > 0) {
              var formattedBefore = beforeLink.replace(/  /g, '&nbsp;&nbsp;');
              addLine(formattedBefore, "color2", delay);
              delay += 3;
            }
            
            // Check if there's embedded content in the next lines
            var embeddedContent = null;
            var embeddedLines = [];
            var j = i + 1;
            // Look ahead for embedded content block (between ```gist:URL and ```)
            while (j < lines.length && j < i + 100) {
              if (lines[j].trim().startsWith('```gist:' + gistUrl)) {
                // Found start of embedded content
                j++;
                while (j < lines.length && !lines[j].trim().startsWith('```')) {
                  embeddedLines.push(lines[j]);
                  j++;
                }
                embeddedContent = embeddedLines.join('\n');
                i = j; // Skip the embedded block
                break;
              }
              j++;
            }
            
            // Display gist content if available (embedded or fetched)
            if (embeddedContent) {
              // Display embedded content immediately
              addLine("<br>", "", delay);
              addLine("<span class='command'>--- Gist Content ---</span>", "command", delay);
              delay += 5;
              addLine("<pre style='background: rgba(0,0,0,0.2); padding: 10px; border-left: 3px solid var(--command-color); overflow-x: auto; font-family: monospace; white-space: pre-wrap; word-wrap: break-word; margin: 5px 0;'>" + 
                      escapeHtml(embeddedContent) + "</pre>", "color2", delay);
              delay += 5;
              addLine("<span class='command'>--- End Gist ---</span>", "command", delay);
              delay += 5;
              addLine("<br>", "", delay);
            } else if (gistMap[gistUrl] !== null && gistMap[gistUrl] !== undefined) {
              // Display fetched content
              var gistContent = gistMap[gistUrl];
              addLine("<br>", "", delay);
              addLine("<span class='command'>--- Gist Content ---</span>", "command", delay);
              delay += 5;
              addLine("<pre style='background: rgba(0,0,0,0.2); padding: 10px; border-left: 3px solid var(--command-color); overflow-x: auto; font-family: monospace; white-space: pre-wrap; word-wrap: break-word; margin: 5px 0;'>" + 
                      escapeHtml(gistContent) + "</pre>", "color2", delay);
              delay += 5;
              addLine("<span class='command'>--- End Gist ---</span>", "command", delay);
              delay += 5;
              addLine("<br>", "", delay);
            } else {
              // If gist fetch failed, show clickable link
              addLine("<br>", "", delay);
              addLine("<span class='command'>Gist Content (click to view):</span> <a href='" + gistUrl + "' target='_blank' style='color: var(--command-color); text-decoration: underline;'>" + gistUrl + "</a>", "color2", delay);
              delay += 3;
              addLine("<br>", "", delay);
            }
            
            // Display text after the link if any
            if (afterLink.trim().length > 0) {
              var formattedAfter = afterLink.replace(/  /g, '&nbsp;&nbsp;');
              addLine(formattedAfter, "color2", delay);
              delay += 3;
            }
          } else {
            // Regular line processing
            var formattedLine = line.replace(/  /g, '&nbsp;&nbsp;');
            
            // Style different types of lines
            if (line.match(/^[A-Z_]+\([0-9]+\)/)) {
              // Header line (e.g., WIREGUARD(7))
              addLine(formattedLine, "command", delay);
            } else if (line.match(/^[A-Z ]+$/)) {
              // Section headers (all caps, no special chars)
              addLine(formattedLine, "command", delay);
            } else if (line.trim().startsWith('$')) {
              // Command examples
              addLine(formattedLine, "color2", delay);
            } else if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
              // Bold text (markdown style)
              addLine("<strong>" + formattedLine.replace(/\*\*/g, '') + "</strong>", "color2", delay);
            } else if (line.trim().length > 0) {
              // Regular content
              addLine(formattedLine, "color2", delay);
            } else {
              // Empty lines
              addLine("<br>", "", delay);
            }
            delay += 3;
          }
        }
        
        addLine("<br>", "", delay);
      })
      .catch(error => {
        addLine("Error loading local blog: " + error.message, "error", 0);
        addLine("Falling back to Medium link...", "color2", 100);
        // Fall back to Medium link
        if (blogMap && blogMap[blogName]) {
          newTab(blogMap[blogName]);
        } else {
          addLine("Blog not found. Type 'blog' to see available blogs.", "error", 0);
        }
      });
  } else if (blogMap && blogMap[blogName]) {
    // Blog exists only on Medium
    addLine("Opening Medium article...", "color2", 0);
    newTab(blogMap[blogName]);
  } else {
    addLine("Blog not found. Type 'blog' to see available blogs.", "error", 0);
    addLine("Available blogs: wireguard, xss, xxe, ios, androidp1, androidp2, ipbypass, xssautomation, burplocalhost", "color2", 0);
  }
}
