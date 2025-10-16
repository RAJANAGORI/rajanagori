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

setTimeout(function () {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

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
      loopLines(whois, "color2 margin whois", animationSpeed[currentAnimationSpeed]);
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
      loopLines(projects, "color2 margin", animationSpeed[currentAnimationSpeed]);
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
    // New features
    case "skills-matrix":
      loopLines(skillsMatrix, "color2 margin", animationSpeed[currentAnimationSpeed]);
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
      addLine("Available themes: default, light, cyberpunk, matrix, retro, hacker", "color2", 0);
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

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
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
    handleTabCompletion();
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

function handleTabCompletion() {
  var currentInput = textarea.value.toLowerCase();
  var availableCommands = [
    'help', 'whois', 'conference', 'video', 'sudo', 'interview', 'youtube', 
    'discuss', 'slack', 'social', 'projects', 'wiki', 'blog', 'resume', 
    'password', 'history', 'email', 'clear', 'skills-matrix', 'experience', 
    'themes', 'settings', 'set-theme', 'set-animation', 
    'twitter', 'linkedin', 'instagram', 'github'
  ];
  
  var matches = availableCommands.filter(cmd => cmd.startsWith(currentInput));
  
  if (matches.length > 0) {
    autoCompleteIndex = (autoCompleteIndex + 1) % matches.length;
    textarea.value = matches[autoCompleteIndex];
    command.innerHTML = textarea.value;
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
    
    addLine(`Theme changed to: ${theme.name}`, "color2", 0);
    
    // Add visual effects based on theme
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
    addLine("Theme not found. Available themes: default, light, cyberpunk, matrix, retro, hacker", "error", 0);
  }
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
  addLine(`Theme: ${currentTheme}`, "color2", 0);
  addLine(`Animation Speed: ${currentAnimationSpeed}`, "color2", 0);
  addLine(`Commands in History: ${commandHistory.length}`, "color2", 0);
  addLine("<br>", "command", 50);
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
