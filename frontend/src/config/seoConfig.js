/**
 * Centralized SEO configuration for every route.
 * Each page gets a unique title, description, keywords, canonical URL,
 * and structured data to maximize search visibility.
 */

const SITE_URL = "https://deepakrakshit.is-a.dev";
const SITE_NAME = "Deepak Rakshit Portfolio";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;
const TWITTER_HANDLE = "@deepakrakshit";
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const DEFAULT_IMAGE_ALT = "Deepak Rakshit AI Engineer and Full Stack Developer portfolio preview";

export function routeOgImage(path) {
  const slug = path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-");
  return `${SITE_URL}/og-${slug}.svg`;
}

export const SEO_ROUTE_ORDER = [
  "/",
  "/projects",
  "/experience",
  "/research",
  "/certifications",
  "/skills",
  "/about",
  "/contact",
  "/playground",
  "/achievements",
  "/guestbook",
  "/copyright",
];

export const SEO_ROUTE_META = {
  "/": { label: "Home", priority: "1.0", changefreq: "weekly" },
  "/projects": { label: "Projects", priority: "0.8", changefreq: "weekly" },
  "/experience": { label: "Experience", priority: "0.8", changefreq: "monthly" },
  "/research": { label: "Research", priority: "0.8", changefreq: "monthly" },
  "/certifications": { label: "Certifications", priority: "0.8", changefreq: "monthly" },
  "/skills": { label: "Skills", priority: "0.8", changefreq: "monthly" },
  "/about": { label: "About", priority: "0.8", changefreq: "monthly" },
  "/contact": { label: "Contact", priority: "0.8", changefreq: "yearly" },
  "/playground": { label: "CLI Playground", priority: "0.5", changefreq: "yearly" },
  "/achievements": { label: "Achievements", priority: "0.5", changefreq: "monthly" },
  "/guestbook": { label: "Guestbook", priority: "0.5", changefreq: "weekly" },
  "/copyright": { label: "Copyright", priority: "0.5", changefreq: "yearly" },
};

/** Shared Person schema reference (defined once in index.html) */
const PERSON_REF = { "@id": `${SITE_URL}/#person` };
const WEBSITE_REF = { "@id": `${SITE_URL}/#website` };

/**
 * Build a BreadcrumbList JSON-LD for a given page.
 * Every page gets Home → Current Page.
 */
function buildBreadcrumbs(pageName, pagePath) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ];

  if (pagePath !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: pageName,
      item: `${SITE_URL}${pagePath}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/**
 * Build a WebPage JSON-LD for a given page.
 */
function buildWebPage(name, description, path) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: WEBSITE_REF,
    about: PERSON_REF,
    inLanguage: "en-US",
  };
}

function softwareApplicationFromProject(project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/projects#${project.id}`,
    name: project.title,
    description: project.description,
    applicationCategory: project.category === "ai-ml" ? "AIApplication" : "WebApplication",
    operatingSystem: "Web",
    url: project.links?.preview || `${SITE_URL}/projects?highlight=${project.id}`,
    codeRepository: project.links?.github,
    creator: PERSON_REF,
    author: PERSON_REF,
    dateCreated: project.year,
    keywords: project.tags?.join(", "),
    image: project.image ? `${SITE_URL}${project.image}` : DEFAULT_IMAGE,
  };
}

export function buildBaseSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Deepak Rakshit",
      givenName: "Deepak",
      familyName: "Rakshit",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/og-image.svg`,
      jobTitle: "AI Engineer & Full Stack Developer",
      description:
        "AI Engineer and Full Stack Developer specializing in Agentic AI Systems, Gemini Live API, Multimodal AI, React, Next.js, Python, and FastAPI.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Greater Noida",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Noida Institute of Engineering and Technology",
        alternateName: "NIET",
        url: "https://www.niet.co.in/",
      },
      affiliation: {
        "@type": "Organization",
        name: "Smart India Hackathon 2026",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Computer Vision",
        "Generative AI",
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "Vector Databases",
        "Full Stack Development",
        "React",
        "Vite",
        "React Router",
        "Tailwind CSS",
        "Framer Motion",
        "Python",
        "FastAPI",
        "LangGraph",
        "YOLOv11",
        "Threat Detection",
      ],
      sameAs: [
        "https://www.linkedin.com/in/deepakrakshit",
        "https://github.com/deepakrakshit",
        "https://x.com/deepakrakshit",
        "https://www.instagram.com/de3pakkk/",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: PERSON_REF,
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/projects?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: "Deepak Rakshit - AI Engineer & Full Stack Developer Portfolio",
      isPartOf: WEBSITE_REF,
      about: PERSON_REF,
      mainEntity: PERSON_REF,
      inLanguage: "en-US",
    },
  ];
}

/**
 * SEO configuration per route.
 */
export const SEO_CONFIG = {
  "/": {
    title: "Deepak Rakshit - AI Engineer & Full Stack Developer Portfolio",
    description:
      "Portfolio of Deepak Rakshit - AI Engineer and Full Stack Developer specializing in Machine Learning, Computer Vision, Generative AI, LLMs, RAG, React, Vite, Python, and FastAPI. Explore projects, skills, and experience.",
    keywords:
      "Deepak Rakshit, AI Engineer, Full Stack Developer, Machine Learning, Computer Vision, Generative AI, LLMs, RAG, React, Vite, Python, Portfolio",
    canonical: `${SITE_URL}/`,
    robots: DEFAULT_ROBOTS,
    imageAlt: DEFAULT_IMAGE_ALT,
    priority: SEO_ROUTE_META["/"].priority,
    changefreq: SEO_ROUTE_META["/"].changefreq,
    ogType: "website",
    schemas: (extraData) => {
      const schemas = [
        buildBreadcrumbs("Home", "/"),
        buildWebPage(
          "Deepak Rakshit - AI Engineer & Full Stack Developer Portfolio",
          "Portfolio of Deepak Rakshit - AI Engineer and Full Stack Developer specializing in Machine Learning, Computer Vision, Generative AI, LLMs, RAG, React, Vite, Python, and FastAPI.",
          "/"
        ),
      ];

      // ItemList for featured projects (if provided)
      if (extraData?.projects) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Featured Projects by Deepak Rakshit",
          itemListOrder: "https://schema.org/ItemListUnordered",
          numberOfItems: extraData.projects.length,
          itemListElement: extraData.projects.slice(0, 6).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            url: `${SITE_URL}/projects?highlight=${p.id}`,
          })),
        });
      }

      return schemas;
    },
  },

  "/projects": {
    title: "Projects - Deepak Rakshit | AI & Web Development Portfolio",
    description:
      "Explore Deepak Rakshit's portfolio of AI and web development projects including Computer Vision systems, LLM-powered applications, and full-stack apps with React, Vite, FastAPI, and more.",
    keywords:
      "AI portfolio, Machine Learning portfolio, Computer Vision projects, web development projects, React projects, Python projects, Generative AI portfolio",
    canonical: `${SITE_URL}/projects`,
    robots: DEFAULT_ROBOTS,
    imageAlt: "Deepak Rakshit AI, machine learning, and full-stack development projects",
    priority: SEO_ROUTE_META["/projects"].priority,
    changefreq: SEO_ROUTE_META["/projects"].changefreq,
    ogType: "website",
    schemas: (extraData) => {
      const schemas = [
        buildBreadcrumbs("Projects", "/projects"),
        buildWebPage(
          "Projects - Deepak Rakshit | AI & Web Development Portfolio",
          "Explore Deepak Rakshit's portfolio of AI and web development projects.",
          "/projects"
        ),
      ];

      if (extraData?.projects) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/projects#collectionpage`,
          name: "Projects by Deepak Rakshit",
          url: `${SITE_URL}/projects`,
          description: "A collection of AI, Machine Learning, and Web Development projects.",
          about: PERSON_REF,
          mainEntity: {
            "@type": "ItemList",
            name: "All Projects",
            numberOfItems: extraData.projects.length,
            itemListElement: extraData.projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              description: p.description,
              url: p.links?.preview || p.links?.github || `${SITE_URL}/projects?highlight=${p.id}`,
            })),
          },
        });
        schemas.push(...extraData.projects.slice(0, 8).map(softwareApplicationFromProject));
      }

      return schemas;
    },
  },

  "/experience": {
    title: "Experience - Deepak Rakshit | AI Engineer & Web Developer",
    description:
      "Professional experience and milestones of Deepak Rakshit as an AI Engineer and Full Stack Developer.",
    keywords:
      "Deepak Rakshit experience, AI Engineer, Full Stack Developer, agentic AI, web developer experience",
    canonical: `${SITE_URL}/experience`,
    robots: DEFAULT_ROBOTS,
    imageAlt: "Deepak Rakshit professional AI engineer and web developer experience",
    priority: SEO_ROUTE_META["/experience"].priority,
    changefreq: SEO_ROUTE_META["/experience"].changefreq,
    ogType: "website",
    schemas: (extraData) => {
      const schemas = [
        buildBreadcrumbs("Experience", "/experience"),
        buildWebPage(
          "Experience - Deepak Rakshit | AI Engineer & Web Developer",
          "Professional experience of Deepak Rakshit as an AI Engineer and Full Stack Developer.",
          "/experience"
        ),
      ];

      if (extraData?.experiences) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Deepak Rakshit Professional Experience",
          description: "Timeline of professional roles and achievements",
          numberOfItems: extraData.experiences.length,
          itemListElement: extraData.experiences.map((exp, i) => {
            const periodParts = exp.period.split(" - ");
            return {
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "OrganizationRole",
                roleName: exp.position,
                startDate: periodParts[0] || "",
                endDate: periodParts[1] || "",
                worksFor: {
                  "@type": "Organization",
                  name: exp.company,
                  url: exp.companyUrl,
                  location: exp.location || ""
                }
              }
            };
          })
        });
      }

      return schemas;
    },
  },

  "/research": {
    title: "Research - Deepak Rakshit | Papers & Technical Write-ups",
    description:
      "Research by Deepak Rakshit — computer vision and AI papers. Browse abstracts, metrics, and technical write-ups.",
    keywords:
      "Deepak Rakshit research, AI research, computer vision papers, technical write-ups",
    canonical: `${SITE_URL}/research`,
    robots: DEFAULT_ROBOTS,
    imageAlt: "Deepak Rakshit research papers and technical write-ups",
    priority: SEO_ROUTE_META["/research"].priority,
    changefreq: SEO_ROUTE_META["/research"].changefreq,
    ogType: "website",
    schemas: (extraData) => {
      const papers = extraData?.papers || [];
      const schemas = [
        buildBreadcrumbs("Research", "/research"),
        buildWebPage(
          "Research - Deepak Rakshit | Papers & Technical Write-ups",
          "Browse research papers and technical write-ups by Deepak Rakshit.",
          "/research"
        ),
      ];

      if (papers.length) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Research papers by Deepak Rakshit",
          numberOfItems: papers.length,
          itemListElement: papers.map((paper, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "ScholarlyArticle",
              "@id": `${SITE_URL}/research?highlight=${encodeURIComponent(paper.id)}`,
              headline: paper.subtitle ? `${paper.title}: ${paper.subtitle}` : paper.title,
              name: paper.title,
              description: paper.summary || paper.abstract,
              author: (paper.authors || []).map((a) => ({
                "@type": "Person",
                name: a.name,
                email: a.email,
              })),
              creator: PERSON_REF,
              url: `${SITE_URL}/research?highlight=${encodeURIComponent(paper.id)}`,
              encoding: paper.pdfUrl
                ? {
                    "@type": "MediaObject",
                    contentUrl: `${SITE_URL}${paper.pdfUrl}`,
                    encodingFormat: "application/pdf",
                  }
                : undefined,
              keywords: Array.isArray(paper.keywords) ? paper.keywords.join(", ") : paper.keywords,
              datePublished: paper.year,
              publisher: {
                "@type": "CollegeOrUniversity",
                name: "Noida Institute of Engineering and Technology",
                alternateName: "NIET",
              },
            },
          })),
        });
      }

      return schemas;
    },
  },

  "/certifications": {
    title: "Certifications - Deepak Rakshit | AI & Cloud Credentials",
    description:
      "Industry-recognized certifications earned by Deepak Rakshit across AI, cloud computing, web development, and data science from Google, IBM, Meta, and more.",
    keywords:
      "Deepak Rakshit certifications, AI certifications, cloud certifications, Google certifications, developer credentials",
    canonical: `${SITE_URL}/certifications`,
    robots: DEFAULT_ROBOTS,
    imageAlt: "Deepak Rakshit AI cloud web development and data science certifications",
    priority: SEO_ROUTE_META["/certifications"].priority,
    changefreq: SEO_ROUTE_META["/certifications"].changefreq,
    ogType: "website",
    schemas: (extraData) => {
      const schemas = [
        buildBreadcrumbs("Certifications", "/certifications"),
        buildWebPage(
          "Certifications - Deepak Rakshit | AI & Cloud Credentials",
          "Industry-recognized certifications earned by Deepak Rakshit.",
          "/certifications"
        ),
      ];

      if (extraData?.certifications) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Deepak Rakshit Technical Certifications",
          description: "List of technical certifications and professional credentials",
          numberOfItems: extraData.certifications.length,
          itemListElement: extraData.certifications.map((cert, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "EducationalOccupationalCredential",
              name: cert.title,
              credentialCategory: cert.tag || "Certification",
              recognizedBy: {
                "@type": "Organization",
                name: cert.issuer,
                logo: cert.issuerLogo
              },
              url: cert.link !== "#" ? cert.link : `${SITE_URL}/certifications`
            }
          }))
        });
      }

      return schemas;
    },
  },

  "/skills": {
    title: "Skills & Tools - Deepak Rakshit | Tech Stack & Expertise",
    description:
      "Complete technical skill set of Deepak Rakshit including Python, React, Vite, FastAPI, LangGraph, TensorFlow, PyTorch, Computer Vision, Generative AI, LLMs, RAG, Docker, and 30+ technologies.",
    keywords:
      "Python developer, React developer, Vite, FastAPI, Generative AI, LLMs, RAG, Vector Database, Computer Vision, Full Stack Developer",
    canonical: `${SITE_URL}/skills`,
    robots: DEFAULT_ROBOTS,
    imageAlt: "Deepak Rakshit technical skills in AI machine learning web development and Python",
    priority: SEO_ROUTE_META["/skills"].priority,
    changefreq: SEO_ROUTE_META["/skills"].changefreq,
    ogType: "website",
    schemas: () => [
      buildBreadcrumbs("Skills & Tools", "/skills"),
      buildWebPage(
        "Skills & Tools - Deepak Rakshit | Tech Stack & Expertise",
        "Complete technical skill set of Deepak Rakshit including Python, React, Vite, FastAPI, LangGraph, and 30+ technologies.",
        "/skills"
      ),
    ],
  },

  "/about": {
    title: "About Deepak Rakshit - AI Engineer & Full Stack Developer",
    description:
      "Learn about Deepak Rakshit - an AI Engineer and Full Stack Developer from Greater Noida, India. Specializing in Agentic AI, Multimodal AI, Gemini Live API, Next.js, and modern full-stack development.",
    keywords:
      "Deepak Rakshit, Deepak Rakshit developer, Deepak Rakshit AI, AI Engineer India, Full Stack Developer, NIET Greater Noida",
    canonical: `${SITE_URL}/about`,
    robots: DEFAULT_ROBOTS,
    imageAlt: "About Deepak Rakshit AI Engineer and Full Stack Developer",
    priority: SEO_ROUTE_META["/about"].priority,
    changefreq: SEO_ROUTE_META["/about"].changefreq,
    ogType: "profile",
    schemas: () => [
      buildBreadcrumbs("About", "/about"),
      buildWebPage(
        "About Deepak Rakshit - AI Engineer & Full Stack Developer",
        "Learn about Deepak Rakshit - an AI Engineer and Full Stack Developer from Greater Noida, India.",
        "/about"
      ),
    ],
  },

  "/contact": {
    title: "Contact Deepak Rakshit - Hire an AI Engineer & Web Developer",
    description:
      "Get in touch with Deepak Rakshit for freelance projects, job opportunities, collaborations, or open source contributions. AI Engineer and Full Stack Developer available for hire.",
    keywords:
      "hire Deepak Rakshit, contact developer, freelance AI engineer, hire web developer, collaboration",
    canonical: `${SITE_URL}/contact`,
    robots: DEFAULT_ROBOTS,
    imageAlt: "Contact Deepak Rakshit for AI engineering web development and collaboration",
    priority: SEO_ROUTE_META["/contact"].priority,
    changefreq: SEO_ROUTE_META["/contact"].changefreq,
    ogType: "website",
    schemas: (extraData) => {
      const schemas = [
        buildBreadcrumbs("Contact", "/contact"),
        buildWebPage(
          "Contact Deepak Rakshit - Hire an AI Engineer & Web Developer",
          "Get in touch with Deepak Rakshit for freelance projects, collaborations, or job opportunities.",
          "/contact"
        ),
      ];

      // FAQ structured data from the contact page
      if (extraData?.faqItems) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: extraData.faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        });
      }

      return schemas;
    },
  },

  "/playground": {
    title: "CLI Playground - Deepak Rakshit Portfolio | Interactive Terminal",
    description:
      "Explore Deepak Rakshit's portfolio through an interactive command-line interface. Query projects, list skills, navigate pages, and discover features using terminal commands.",
    keywords:
      "interactive portfolio, CLI portfolio, developer terminal, Deepak Rakshit playground",
    canonical: `${SITE_URL}/playground`,
    robots: DEFAULT_ROBOTS,
    imageAlt: "Interactive CLI playground for Deepak Rakshit portfolio",
    priority: SEO_ROUTE_META["/playground"].priority,
    changefreq: SEO_ROUTE_META["/playground"].changefreq,
    ogType: "website",
    schemas: () => [
      buildBreadcrumbs("CLI Playground", "/playground"),
      buildWebPage(
        "CLI Playground - Deepak Rakshit Portfolio | Interactive Terminal",
        "Explore Deepak Rakshit's portfolio through an interactive command-line interface.",
        "/playground"
      ),
    ],
  },

  "/achievements": {
    title: "Achievements - Deepak Rakshit Portfolio | Trophy Wall",
    description: "Unlock achievements by exploring Deepak Rakshit's portfolio - CLI commands, easter eggs, and hidden modes.",
    keywords: "portfolio achievements, gamified portfolio, Deepak Rakshit",
    canonical: `${SITE_URL}/achievements`,
    robots: DEFAULT_ROBOTS,
    imageAlt: "Achievement trophy wall on Deepak Rakshit portfolio",
    priority: SEO_ROUTE_META["/achievements"].priority,
    changefreq: SEO_ROUTE_META["/achievements"].changefreq,
    ogType: "website",
    schemas: () => [
      buildBreadcrumbs("Achievements", "/achievements"),
      buildWebPage("Achievements - Deepak Rakshit Portfolio", "Gamified trophy wall.", "/achievements"),
    ],
  },

  "/guestbook": {
    title: "Guestbook - Deepak Rakshit Portfolio | Sign The Wall",
    description: "Leave a message on Deepak Rakshit's portfolio guestbook wall.",
    keywords: "portfolio guestbook, Deepak Rakshit",
    canonical: `${SITE_URL}/guestbook`,
    robots: DEFAULT_ROBOTS,
    imageAlt: "Guestbook wall on Deepak Rakshit portfolio",
    priority: SEO_ROUTE_META["/guestbook"].priority,
    changefreq: SEO_ROUTE_META["/guestbook"].changefreq,
    ogType: "website",
    schemas: () => [
      buildBreadcrumbs("Guestbook", "/guestbook"),
      buildWebPage("Guestbook - Deepak Rakshit Portfolio", "Sign the wall.", "/guestbook"),
    ],
  },

  "/copyright": {
    title: "Copyright & License - Deepak Rakshit Portfolio",
    description:
      "MIT License and copyright information for Deepak Rakshit's portfolio website. Open source portfolio template.",
    keywords: "Deepak Rakshit copyright, MIT License, portfolio license",
    canonical: `${SITE_URL}/copyright`,
    robots: "noindex, follow",
    imageAlt: "Copyright and license information for Deepak Rakshit portfolio",
    priority: SEO_ROUTE_META["/copyright"].priority,
    changefreq: SEO_ROUTE_META["/copyright"].changefreq,
    ogType: "website",
    schemas: () => [
      buildBreadcrumbs("Copyright", "/copyright"),
      buildWebPage(
        "Copyright & License - Deepak Rakshit Portfolio",
        "MIT License and copyright information for Deepak Rakshit's portfolio website.",
        "/copyright"
      ),
    ],
  },
  "/404": {
    title: "Page Not Found - Deepak Rakshit Portfolio",
    description:
      "The requested page could not be found. Return to Deepak Rakshit's AI Engineer and Full Stack Developer portfolio to explore projects, skills, experience, and contact details.",
    keywords: "Deepak Rakshit portfolio 404",
    canonical: `${SITE_URL}/404`,
    robots: "noindex, follow",
    imageAlt: DEFAULT_IMAGE_ALT,
    ogType: "website",
    schemas: () => [
      buildWebPage(
        "Page Not Found - Deepak Rakshit Portfolio",
        "The requested page could not be found.",
        "/404"
      ),
    ],
  },
};

/** Shared constants exported for use by the SEO hook */
export { SITE_URL, SITE_NAME, DEFAULT_IMAGE, TWITTER_HANDLE, DEFAULT_ROBOTS, DEFAULT_IMAGE_ALT };
