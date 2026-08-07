/** RAY welcome + per-page first-visit lines. */
export const RAY_WELCOME_KEY = "portfolio_ray_welcome";
export const RAY_PAGES_KEY = "portfolio_ray_pages";

export const RAY_WELCOME_LINES = [
  "Hey, I'm RAY. Ask about Deepak, or tell me where to go.",
  "Yo. I'm the co-pilot in the corner. Projects, hack mode, whatever. Your call.",
  "What's up. I'm RAY. Compliments welcome. Random theme flips, not so much.",
];

export const RAY_PAGE_LINES = {
  "/": [
    "Welcome home! Check out the globe or jump straight to projects.",
    "First time here? This is the launch pad. Ask me anything!",
  ],
  "/projects": [
    "Projects time! Explore the engineering work or ask about any stack you care about.",
    "First look at the work? Tell me a stack and I'll point you to a match.",
  ],
  "/experience": [
    "Career timeline unlocked! Expand any role for the full story.",
    "New to the resume rail? Click a dot for details.",
  ],
  "/research": [
    "Research desk! Pick a paper card - details and the PDF expand underneath.",
    "First look at the papers? Open any card to read the abstract and download.",
  ],
  "/certifications": [
    "Credentials shelf! Filter by category or search by topic.",
    "First time here? Filter by AI & ML or Web Dev to narrow down.",
  ],
  "/skills": [
    "Full skill deck! Hover on cards to flip them, or search for a specific tool.",
    "First time? Filter by category or hit 'All' to scan everything.",
  ],
  "/about": [
    "Deep dive into the background! Drag through the photo carousel or read the origin story.",
    "First time in About? Check the story, career log, and philosophy cards below.",
  ],
  "/contact": [
    "Ready to connect? Drop a line below - goes straight to Deepak's inbox.",
    "First visit to contact? Pick a subject chip or send a custom message.",
  ],
  "/playground": [
    "Terminal sandbox! Type 'help' for commands, or 'hack' if you're daring.",
    "First time in the CLI? Try 'about', 'skills', or 'projects' to navigate fast.",
  ],
  "/achievements": [
    "Trophy wall! 17 achievements hidden across the site. How many can you unlock?",
    "First look at badges? Try the Konami code, toggle dark mode, or pet RAY!",
  ],
  "/guestbook": [
    "Leave your mark! Sign the visitor wall or scroll down to see who's stopped by.",
    "First time here? Drop a friendly note or emoji on the guestbook.",
  ],
};

const DEFAULT_PAGE_LINES = [
  "New page! Ask me to navigate anywhere on the site.",
  "First time here? I'm RAY. Tell me where you want to go next!",
];

export function getRayWelcomeLine() {
  return RAY_WELCOME_LINES[Math.floor(Math.random() * RAY_WELCOME_LINES.length)];
}

export function getRayPageLine(pathname) {
  const lines = RAY_PAGE_LINES[pathname] || DEFAULT_PAGE_LINES;
  return lines[Math.floor(Math.random() * lines.length)];
}

function readVisitedPages() {
  try {
    const raw = localStorage.getItem(RAY_PAGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function hasVisitedPage(pathname) {
  return readVisitedPages().includes(pathname);
}

export function markPageVisited(pathname) {
  try {
    const pages = readVisitedPages();
    if (!pages.includes(pathname)) {
      pages.push(pathname);
      localStorage.setItem(RAY_PAGES_KEY, JSON.stringify(pages));
    }
  } catch {
    /* ignore */
  }
}

export function hasMetRay() {
  try {
    return localStorage.getItem(RAY_WELCOME_KEY) === "true";
  } catch {
    return true;
  }
}

export function markRayMet() {
  try {
    localStorage.setItem(RAY_WELCOME_KEY, "true");
  } catch {
    /* ignore */
  }
}
