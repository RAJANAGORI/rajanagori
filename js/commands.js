// These are the variable for the direct links
var youtube = "https://www.youtube.com/@rajanagorii";
var twitter = "https://www.twitter.com/RajaNagori7";
var linkedin = "https://www.linkedin.com/in/raja-nagori";
var instagram = "https://www.instagram.com/insiderlearners";
var github = "https://github.com/RAJANAGORI";
var email = 'mailto:raja.nagori@owasp.org';
var nightingale = 'https://github.com/RAJANAGORI/Nightingale';
var nightingaleSite = 'https://nightingale-security.com/';
var nightingaleDashboard = 'https://dashboard.nightingale-security.com/';
var sbomParser = 'https://github.com/RAJANAGORI/sbom-parser';
var sbomSite = 'https://sbom.nightingale-security.com/';
var scas = 'https://github.com/RAJANAGORI/supply-chain-attack-simulator';
var scasSite = 'https://simulator.rajanagori.in/';
var interviewRepo = 'https://github.com/RAJANAGORI/interview';
var interviewSite = 'https://interview.rajanagori.in/';
var secucode = 'https://secucode.gitbook.io';
var wiki = 'https://github.com/RAJANAGORI/Nightingale/wiki/1.-Nightingale-Docker-for-Pentesters';
var resume = 'https://github.com/RAJANAGORI/rajanagori/blob/master/Raja_Nagori.pdf';
var wiregaurd = 'https://medium.com/@rajanagori/wireguard-a-new-tunneling-protocol-207d4aa893d0';
var xss = 'https://medium.com/@rajanagori/tales-of-xss-navigating-web-vulnerabilities-71f2ef61af9b';
var xxe = 'https://medium.com/@rajanagori/a-long-story-of-xxe-vulnerability-6a9a33276602';
var ios = 'https://medium.com/@rajanagori/ios-application-vulnerability-assessment-and-penetration-testing-263e9da452fd';
var androidp1 = 'https://medium.com/@rajanagori/android-vulnerability-assessment-and-penetration-testing-part-1-382838a3d230';
var androidp2 = 'https://medium.com/@rajanagori/android-vulnerability-assessment-and-penetration-testing-part-2-6558612c9382';
var ipbypass = 'https://medium.com/@rajanagori/bypass-ip-block-with-the-x-forwarded-for-header-8c1dbd89ae58';
var burplocalhost = 'https://medium.com/@rajanagori/why-localhost-and-burpsuite-are-not-best-friends-169e7ef1752c';
var xssautomation = 'https://medium.com/@rajanagori/xss-automation-using-waybackurl-and-gf-grep-finding-4f6745f70a22';
var interviewprep = 'https://interview.rajanagori.in/interview/';
var threatmodeling = 'https://interview.rajanagori.in/threatmodel/';
var zerotohero = 'https://interview.rajanagori.in/zerotohero/';
var sourcecodereview = 'https://interview.rajanagori.in/source-code-review/';

// Structured whois panel (rendered via showWhois in main.js)
function getWhoisPanelHtml() {
  return (
    '<div class="whois-panel">' +
      '<div class="whois-hero">' +
        '<div class="whois-avatar" aria-hidden="true">RN</div>' +
        '<div class="whois-hero-text">' +
          '<h2 class="whois-name">Raja Nagori</h2>' +
          '<p class="whois-role">Product Security Engineer <span class="whois-at">@</span> Splunk</p>' +
          '<p class="whois-tagline">OWASP-Nightingale Lead · Pentester · Open Source Builder</p>' +
          '<div class="whois-badges">' +
            '<span class="whois-badge">🇮🇳 India</span>' +
            '<span class="whois-badge">🛡️ AppSec</span>' +
            '<span class="whois-badge">🐳 Docker</span>' +
            '<span class="whois-badge">📦 Supply Chain</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="whois-stats">' +
        '<div class="whois-stat"><span class="whois-stat-value">300+</span><span class="whois-stat-label">GitHub Stars</span></div>' +
        '<div class="whois-stat"><span class="whois-stat-value">5×</span><span class="whois-stat-label">Blackhat Arsenal</span></div>' +
        '<div class="whois-stat"><span class="whois-stat-value">9+</span><span class="whois-stat-label">Publications</span></div>' +
        '<div class="whois-stat"><span class="whois-stat-value">200+</span><span class="whois-stat-label">Pentest Tools</span></div>' +
      '</div>' +
      '<p class="whois-intro">Product Security Engineer passionate about penetration testing, threat modeling, DevSecOps, and building open-source security tools for the community.</p>' +
      '<div class="whois-grid">' +
        '<section class="whois-section">' +
          '<h3 class="whois-section-title">Speaking &amp; Events</h3>' +
          '<ul class="whois-list">' +
            '<li>Blackhat Arsenal ASIA 2022, 2023, 2024</li>' +
            '<li>Blackhat Arsenal EU London 2025</li>' +
            '<li>OWASP Global AppSec EU 2022</li>' +
            '<li>Docker Community Hands-On Event</li>' +
            '<li>Blackhat Arsenal MEA 2022, 2023 <span class="whois-muted">(Shortlisted)</span></li>' +
            '<li>IWCON 2024 · c0c0n 2024</li>' +
          '</ul>' +
        '</section>' +
        '<section class="whois-section">' +
          '<h3 class="whois-section-title">Flagship Projects</h3>' +
          '<ul class="whois-list whois-links">' +
            '<li><a href="' + nightingaleSite + '" target="_blank">Nightingale v2.0</a> — OWASP pentest framework</li>' +
            '<li><a href="' + sbomSite + '" target="_blank">SBOM Parser</a> — CycloneDX vulnerability explorer</li>' +
            '<li><a href="' + scasSite + '" target="_blank">SCAS Labs</a> — 22 supply chain attack labs</li>' +
            '<li><a href="' + interviewSite + '" target="_blank">Interview Prep</a> — Security interview guides</li>' +
          '</ul>' +
        '</section>' +
        '<section class="whois-section">' +
          '<h3 class="whois-section-title">Core Expertise</h3>' +
          '<div class="whois-tags">' +
            '<span>Web &amp; Network Pentest</span><span>Mobile Security</span><span>Threat Modeling</span>' +
            '<span>SAST / DAST</span><span>DevSecOps</span><span>Docker Security</span>' +
            '<span>SBOM Analysis</span><span>Python / Bash</span><span>OS Hardening</span>' +
          '</div>' +
        '</section>' +
        '<section class="whois-section">' +
          '<h3 class="whois-section-title">Community &amp; Writing</h3>' +
          '<ul class="whois-list">' +
            '<li>Leads <a href="' + nightingale + '" target="_blank">OWASP-Nightingale</a> (Incubator project)</li>' +
            '<li>Active on <strong>Hack The Box</strong> — continuous learning</li>' +
            '<li>9+ security articles on <a href="https://rajanagori.medium.com/" target="_blank">Medium</a></li>' +
            '<li>OWASP chapter talks &amp; security community mentorship</li>' +
          '</ul>' +
        '</section>' +
      '</div>' +
      '<p class="whois-footer">Beyond security: guitar, indie music, and long bike trips 🎸🚴</p>' +
      '<p class="whois-cta"><span class="color2">Explore more →</span> <span class="command">projects</span> · <span class="command">nightingale</span> · <span class="command">blog</span> · <span class="command">social</span></p>' +
    '</div>'
  );
}

// Legacy fallback (unused — kept for reference)
whois = [
  "<br>",
  "Raja Nagori",
  "<br>"
];

conference = [
  "<br>",
  "1. Blackhat Arsenal ASIA 2022, 2023, 2024",
  "2. Blackhat Arsenal EU London 2025",
  "3. OWASP Global Appsec EU 2022",
  "4. Docker Community Hands-On Event",
  "5. Blackhat Arsenal MEA 2022, 2023 (Shortlisted)",
  "6. IWCON - 2024",
  "7. c0c0n - 2024",
  "<br>"
];

social = [
  "<br>",
  'youtube        <a href="' + youtube + '" target="_blank">youtube/insiderlearners' + "</a>",
  'twitter        <a href="' + twitter + '" target="_blank">twitter/RajaNagori7' + '</a>',
  'linkedin       <a href="' + linkedin + '" target="_blank">linkedin/raja-nagori' + "</a>",
  'instagram      <a href="' + instagram + '" target="_blank">instagram/insiderlearners' + '</a>',
  'github         <a href="' + github + '" target="_blank">github/RAJANAGORI' + "</a>",
  "<br>"
];

projects = [
  "<br>",
  '<span class="command">Open Source Projects (by activity):</span>',
  "<br>",
  'Type <span class="command">projects</span> to see interactive project cards with hover previews.',
  "<br>"
];

projectCardsData = [
  {
    name: 'Nightingale v2.0',
    tag: 'OWASP Incubator',
    stars: '300+',
    tech: 'Docker · Python · JS',
    desc: 'Pentest framework with web GUI, 200+ tools, embedded VS Code, and AI-assisted analysis.',
    preview: 'Web console · Multi-terminal · OpenSSF certified · Multi-arch AMD64/ARM64',
    site: nightingaleSite
  },
  {
    name: 'SBOM Parser',
    tag: 'Supply Chain',
    stars: 'New',
    tech: 'Node.js · Alpine.js',
    desc: 'CycloneDX SBOM explorer with interactive vulnerability dashboard and export.',
    preview: 'Parse SBOMs · Filter CVEs · Visual dependency graph · Export reports',
    site: sbomSite
  },
  {
    name: 'SCAS Labs',
    tag: 'Education',
    stars: '22 labs',
    tech: 'Python · Node.js',
    desc: 'Hands-on supply chain attack simulator for learning attack and defense patterns.',
    preview: 'Dependency confusion · Typosquatting · CI/CD poisoning · Mitigation playbooks',
    site: scasSite
  },
  {
    name: 'Interview Prep',
    tag: 'Community',
    stars: '4 tracks',
    tech: 'HTML · Markdown',
    desc: 'Structured security interview guides, threat modeling, and source code review prep.',
    preview: 'Interview Q&A · Threat modeling · Zero-to-hero · Secure code review',
    site: interviewSite
  },
  {
    name: 'SecuCode',
    tag: 'Reference',
    stars: 'CWE',
    tech: 'GitBook',
    desc: 'CWE-based vulnerability reference and mitigation guide for developers.',
    preview: 'CWE catalog · Mitigations · Developer-friendly security patterns',
    site: secucode
  }
];

interview = [
  "<br>",
  '<span class="command">Security Interview Prep:</span>',
  "<br>",
  '1. Interview Preparation <a href="' + interviewprep + '" target="_blank">interview.rajanagori.in/interview</a>',
  '2. Threat Modeling <a href="' + threatmodeling + '" target="_blank">interview.rajanagori.in/threatmodel</a>',
  '3. Zero to Hero <a href="' + zerotohero + '" target="_blank">interview.rajanagori.in/zerotohero</a>',
  '4. Secure Source Code Review <a href="' + sourcecodereview + '" target="_blank">interview.rajanagori.in/source-code-review</a>',
  "<br>"
];

nightingaleInfo = [
  "<br>",
  '<span class="command">Nightingale v2.0 — OWASP Docker for Pentesters</span>',
  "<br>",
  "A comprehensive penetration testing framework built on Docker with a modern web-based GUI.",
  "<br><br>",
  '<span class="command">Highlights:</span>',
  "• 200+ pre-installed security tools across 6 categories",
  "• Web console with multi-terminal support and embedded VS Code",
  "• Security scans, playbooks, findings ingestion, and AI-assisted analysis",
  "• OpenSSF Best Practices certified",
  "• 300+ GitHub stars | Multi-arch (AMD64 + ARM64)",
  "<br>",
  '<span class="command">Links:</span>',
  'Website    <a href="' + nightingaleSite + '" target="_blank">nightingale-security.com</a>',
  'Dashboard  <a href="' + nightingaleDashboard + '" target="_blank">dashboard.nightingale-security.com</a>',
  'GitHub     <a href="' + nightingale + '" target="_blank">github/RAJANAGORI/Nightingale</a>',
  'Wiki       <a href="' + wiki + '" target="_blank">Nightingale Wiki</a>',
  "<br>"
];

game = [
  "<br>",
  '<span class="command">startGame</span> Have some maths game',
  "<br>"
];

// Local blog mapping: name -> file path (for local content)
localBlogMap = {
  'wireguard': 'blogs/wireguard/wireguard.txt',
  'wiregaurd': 'blogs/wireguard/wireguard.txt', // Support typo variant
  '1': 'blogs/wireguard/wireguard.txt',
  'xss': 'blogs/xss/xss.txt',
  'xxs': 'blogs/xss/xss.txt', // Support typo variant
  '2': 'blogs/xss/xss.txt',
  'xxe': 'blogs/xxe/xxe.txt',
  '3': 'blogs/xxe/xxe.txt',
  'ios': 'blogs/ios/ios.txt',
  '4': 'blogs/ios/ios.txt',
  'androidp1': 'blogs/android_part1/part1.txt',
  'android-part1': 'blogs/android_part1/part1.txt',
  'android-1': 'blogs/android_part1/part1.txt',
  '5': 'blogs/android_part1/part1.txt',
  'androidp2': 'blogs/android_part2/part2.txt',
  'android-part2': 'blogs/android_part2/part2.txt',
  'android-2': 'blogs/android_part2/part2.txt',
  '6': 'blogs/android_part2/part2.txt'
};

// Blog mapping: name -> URL (for Medium links)
blogMap = {
  'wireguard': wiregaurd,
  'wiregaurd': wiregaurd, // Support typo variant
  '1': wiregaurd,
  'xss': xss,
  '2': xss,
  'xxe': xxe,
  '3': xxe,
  'ios': ios,
  '4': ios,
  'androidp1': androidp1,
  'android-part1': androidp1,
  'android-1': androidp1,
  '5': androidp1,
  'androidp2': androidp2,
  'android-part2': androidp2,
  'android-2': androidp2,
  '6': androidp2,
  'ipbypass': ipbypass,
  '7': ipbypass,
  'burplocalhost': burplocalhost,
  '8': burplocalhost,
  'xssautomation': xssautomation,
  '9': xssautomation
};

blogs = [
  "<br>",
  '1. Wireguard : A new tunneling protocol <span class="command">[LOCAL]</span>', 
  '2. Tales of XSS: Navigating Web Vulnerabilities <span class="command">[LOCAL]</span>', 
  '3. A Long Story of XXE Vulnerability!! <span class="command">[LOCAL]</span>', 
  '4. iOS Application Vulnerability Assessment and Penetration Testing. <span class="command">[LOCAL]</span>', 
  '5. Android Vulnerability Assessment and Penetration Testing Part 1 <span class="command">[LOCAL]</span>', 
  '6. Android Vulnerability Assessment and Penetration Testing Part 2 <span class="command">[LOCAL]</span>',
  '7. Bypass IP Block with X-Forwarded-For Header <span class="command">[MEDIUM]</span>',
  '8. Why Localhost and Burp Suite Are Not Best Friends <span class="command">[MEDIUM]</span>',
  '9. XSS Automation Using Waybackurl and GF Grep Finding <span class="command">[MEDIUM]</span>',
  "<br>",
  '<span class="command">Usage:</span> Type "blog [blog-name]" to read the full article',
  '<span class="command">Note:</span> [LOCAL] articles load in-terminal; [MEDIUM] opens on Medium',
  "<br>",
  '<span class="command">Examples:</span> blog wireguard, blog 1, blog xss, blog ipbypass',
  "<br>"
];

secret = [
  "<br>",
  '<span class="command">sudo</span>           Only use if you\'re admin',
  "<br>"
];

// Theme configurations
themes = {
  default: {
    name: "Default Terminal",
    background: "#222831",
    text: "#F6B17A",
    command: "#ED7D31",
    cursor: "#73ABAD"
  },
  light: {
    name: "Light Mode",
    background: "#f8f9fa",
    text: "#2c3e50",
    command: "#e74c3c",
    cursor: "#3498db"
  },
  cyberpunk: {
    name: "Cyberpunk",
    background: "#0a0a0a",
    text: "#00ff41",
    command: "#ff0080",
    cursor: "#00ffff"
  },
  matrix: {
    name: "Matrix",
    background: "#000000",
    text: "#00ff00",
    command: "#ff0000",
    cursor: "#00ffff"
  },
  retro: {
    name: "Retro Terminal",
    background: "#1a1a1a",
    text: "#00ff00",
    command: "#ffff00",
    cursor: "#ff00ff"
  },
  hacker: {
    name: "Hacker Mode",
    background: "#0d1117",
    text: "#00ff41",
    command: "#ff6b6b",
    cursor: "#00d4ff"
  },
  golden: {
    name: "Golden Nightingale (Secret)",
    background: "#1a1208",
    text: "#fde68a",
    command: "#fbbf24",
    cursor: "#f59e0b"
  }
};


// Animation speed settings
animationSpeed = {
  fast: 20,
  normal: 80,
  slow: 150,
  none: 0
};

// Skills matrix data (fallback text version)
skillsMatrix = [
  "<br>",
  "<span class='command'>Security Skills Matrix:</span>",
  "<br>",
  "Use this command to see animated skill bars.",
  "<br>"
];

neofetch = [
  "<br>",
  '<span class="neofetch-art">        .---.   </span>  <span class="neofetch-label">rajanagori@portfolio</span>',
  '<span class="neofetch-art">       /     \\  </span>  ──────────────────────────',
  '<span class="neofetch-art">      |  R N  | </span>  <span class="neofetch-label">Role:</span>     Product Security Engineer',
  '<span class="neofetch-art">      |  🛡️   | </span>  <span class="neofetch-label">Company:</span>  Splunk',
  '<span class="neofetch-art">       \\   /   </span>  <span class="neofetch-label">Project:</span>  OWASP-Nightingale v2.0',
  '<span class="neofetch-art">        \'-\'    </span>  <span class="neofetch-label">Stars:</span>    300+ on Nightingale',
  '                          <span class="neofetch-label">Talks:</span>    Blackhat Arsenal ×5',
  '                          <span class="neofetch-label">Blog:</span>     9+ Medium articles',
  '                          <span class="neofetch-label">Shell:</span>    portfolio-bash v2.0',
  '                          <span class="neofetch-label">Theme:</span>    try set-theme hacker',
  "<br>",
  '                          <span class="neofetch-label">Links:</span>    <a href="' + nightingaleSite + '" target="_blank">nightingale-security.com</a>',
  '                                      <a href="' + github + '" target="_blank">github/RAJANAGORI</a>',
  "<br>"
];

// Experience timeline
experienceTimeline = [
  "<br>",
  "<span class='command'>Professional Journey:</span>",
  "<br>",
  "2024 - Present    Product Security Engineer @ Splunk",
  "2023 - Present    Lead OWASP-Nightingale v2.0 (OWASP Incubator)",
  "2022 - 2024       Built Nightingale Docker toolkit & community",
  "2021 - 2022       Security Researcher & Blogger",
  "2020 - 2021       Penetration Tester",
  "2019 - 2020       Computer Science Graduate",
  "<br>",
  "<span class='command'>Key Achievements:</span>",
  "• Blackhat Arsenal Asia 2022, 2023, 2024 & EU London 2025",
  "• OWASP Global AppSec EU 2022 Speaker",
  "• Nightingale v2.0 — 300+ GitHub stars, OpenSSF certified",
  "• Supply Chain Attack Simulator — 22 hands-on security labs",
  "• 9+ Security Publications on Medium",
  "• Active OWASP Project Leader",
  "<br>"
];

help = [
  "<br>",
  '<span class="command">Commands</span>       Description',
  "<br>",
  '<span class="command">whois</span>          About Me',
  '<span class="command">video</span>          My Youtube Channel',
  '<span class="command">social</span>         My Social platforms',
  '<span class="command">projects</span>       My Open Source Projects',
  '<span class="command">nightingale</span>    Nightingale v2.0 details',
  '<span class="command">resume</span>         My Resume',
  '<span class="command">wiki</span>           Nightingale Wiki',
  '<span class="command">conference</span>     Conference list',
  '<span class="command">blog</span>           My Blog',
  '<span class="command">history</span>        Command history with search',
  '<span class="command">email</span>          My Email address',
  '<span class="command">interview</span>      Interview',
  '<span class="command">clear</span>          Clear terminal',
  "<br>",
  '<span class="command">--- NEW FEATURES ---</span>',
  "<br>",
  '<span class="command">neofetch</span>       System-style profile card',
  '<span class="command">cowsay</span>         Nightingale ASCII easter egg',
  '<span class="command">sound</span>          Toggle typing sound on/off',
  '<span class="command">skills-matrix</span>  Animated skills visualization',
  '<span class="command">experience</span>     Professional journey timeline',
  '<span class="command">set-theme</span>      Change terminal theme',
  '<span class="command">set-animation</span>  Control typing speed',
  '<span class="command">themes</span>         Available themes list',
  '<span class="command">settings</span>       Current settings',
  "<br>",
  '<span class="command">--- KEYBOARD SHORTCUTS ---</span>',
  "<br>",
  '<span class="command">Tab</span>            Auto-complete commands',
  '<span class="command">Ctrl+L</span>         Clear terminal',
  '<span class="command">Ctrl+H</span>         Show help',
  '<span class="command">Ctrl+T</span>         Toggle theme',
  "<br>",
];

banner = [
  "<br>",
  '<span class="banner-art holographic">+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+</span>',
  '<span class="banner-art holographic">|R|A|J|A| |N|A|G|O|R|I|</span>',
  '<span class="banner-art holographic">+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+</span>',
  "<span class=\"color2\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color2\">.</span>",
  "<span class=\"color2\">Try</span> <span class=\"command\">'neofetch'</span> <span class=\"color2\">or</span> <span class=\"command\">'cowsay'</span> <span class=\"color2\">for fun</span>",
  "<span class=\"color2\">Quick picks:</span> <span class=\"command\">nightingale</span> <span class=\"color2\">·</span> <span class=\"command\">projects</span> <span class=\"color2\">·</span> <span class=\"command\">skills-matrix</span>",
  "<span class=\"color2\">Keyboard:</span> <span class=\"command\">Ctrl+T</span> <span class=\"color2\">themes ·</span> <span class=\"command\">Tab</span> <span class=\"color2\">autocomplete · chips below</span>",
  "<span class=\"nightingale-highlight\">Nightingale v2.0 – Docker for Pentesters → <a href=\"" + nightingaleSite + "\" target=\"_blank\">nightingale-security.com</a></span>",
  "<span class=\"color2\">Note: Don't think about</span> <span class=\"command\">'SUDO'</span><span class=\"color2\">.</span>"
];
