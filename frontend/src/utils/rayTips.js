const TIP_POOL = {
  "/": [
    { label: "Projects", send: "go to projects" },
    { label: "Hack mode", send: "hack mode" },
    { label: "Who built this?", send: "Who built this?" },
    { label: "Skills", send: "What are your core skills?" },
    { label: "GitHub stats", send: "Tell me about his GitHub" },
    { label: "Pet RAY", send: "What can you do?" },
  ],
  "/projects": [
    { label: "Web Dev", send: "Which projects use React?" },
    { label: "Stack match", send: "Show full-stack projects" },
    { label: "Open skills", send: "go to skills" },
    { label: "GitHub", send: "Where is the source code?" },
  ],
  "/skills": [
    { label: "Frontend stack", send: "What frontend tools does he use?" },
    { label: "AI stack", send: "What AI tools does he use?" },
    { label: "See projects", send: "go to projects" },
    { label: "Who built this?", send: "Who built this?" },
  ],
  "/experience": [
    { label: "Latest role", send: "Summarize his experience" },
    { label: "Resume", send: "Where is the resume?" },
    { label: "Research", send: "go to research" },
    { label: "Projects", send: "go to projects" },
  ],
  "/research": [
    { label: "Paper PDF", send: "Where is the research paper?" },
    { label: "Publications", send: "Tell me about your research" },
    { label: "Projects", send: "go to projects" },
  ],
  "/about": [
    { label: "GitHub stats", send: "Tell me about his GitHub" },
    { label: "Contact", send: "go to contact" },
    { label: "Email", send: "What's his email?" },
  ],
  "/contact": [
    { label: "Copy email", send: "What's his email?" },
    { label: "Projects", send: "go to projects" },
    { label: "Guestbook", send: "go to guestbook" },
  ],
  "/playground": [
    { label: "sudo hire-me", send: "What does sudo hire-me do?" },
    { label: "Hack mode", send: "hack mode" },
    { label: "Konami tip", send: "How do I enable hack mode?" },
  ],
  "/guestbook": [
    { label: "Sign the wall", send: "How does the guestbook work?" },
    { label: "Projects", send: "go to projects" },
  ],
  "/achievements": [
    { label: "Secret eggs", send: "Any easter eggs?" },
    { label: "Hack mode", send: "hack mode" },
    { label: "Home", send: "go to home" },
  ],
};

const FALLBACK_TIPS = [
  { label: "Projects", send: "go to projects" },
  { label: "Hack mode", send: "hack mode" },
  { label: "Who built this?", send: "Who built this?" },
  { label: "Skills", send: "go to skills" },
  { label: "Email", send: "What's his email?" },
  { label: "Resume", send: "Where is the resume?" },
];

const PLACEHOLDERS = [
  "Ask RAY about Deepak, or say go to projects",
  "Try: who built this?",
  "Try: what are your top skills?",
  "Try: take me to skills",
  "Try: how do I enable hack mode?",
  "Try: copy email address",
];

const RECENT_KEY = "portfolio_ray_tip_recent";

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function readRecent() {
  try {
    const raw = sessionStorage.getItem(RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRecent(labels) {
  try {
    sessionStorage.setItem(RECENT_KEY, JSON.stringify(labels.slice(-9)));
  } catch {
    /* ignore */
  }
}

/** Pick 3 suggestion chips for the current path, avoiding recently shown labels. */
export function getDynamicSuggestionChips(pathname = "/") {
  const pool = [...(TIP_POOL[pathname] || []), ...FALLBACK_TIPS];
  const recent = new Set(readRecent());
  const fresh = pool.filter((tip) => !recent.has(tip.label));
  const source = fresh.length >= 3 ? fresh : pool;
  const unique = [];
  const seen = new Set();
  for (const tip of shuffle(source)) {
    if (seen.has(tip.label)) continue;
    seen.add(tip.label);
    unique.push(tip);
    if (unique.length >= 3) break;
  }
  writeRecent([...readRecent(), ...unique.map((t) => t.label)]);
  return unique;
}

export function getDynamicPlaceholder() {
  return PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];
}
