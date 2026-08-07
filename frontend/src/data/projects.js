// Project data directory for Deepak Rakshit's portfolio.
// Add projects here; they are automatically mapped into the project catalog.

const projectEntries = [];

const splitDescriptionSentences = (description = "") =>
  description
    .match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g)
    ?.map((sentence) => sentence.trim())
    .filter(Boolean) || [];

const buildProjectDetailSections = (project) => {
  if (project.detailSections?.length) {
    return project.detailSections;
  }

  const explicitSections = [
    project.problem && { title: "Problem", body: project.problem },
    project.solution && { title: "Solution", body: project.solution },
    project.architecture && { title: "Architecture", body: project.architecture },
    project.results && { title: "Results", body: project.results },
  ].filter(Boolean);

  if (explicitSections.length) {
    return explicitSections;
  }

  const [focus, ...supportingDetails] = splitDescriptionSentences(project.description);
  const sections = [];

  if (focus) {
    sections.push({ title: "Focus", body: focus });
  }

  const featureDetails = supportingDetails.slice(0, 2).join(" ");
  if (featureDetails && featureDetails !== focus) {
    sections.push({ title: "Key Details", body: featureDetails });
  }

  if (project.tags?.length) {
    sections.push({
      title: "Stack Signal",
      body: project.tags.slice(0, 5).join(" / "),
    });
  }

  return sections;
};

export const projects = projectEntries.map((project) => ({
  ...project,
  imageAlt:
    project.imageAlt ||
    `${project.title} project screenshot from Deepak Rakshit's ${project.category === "ai-ml" ? "AI and machine learning" : "full-stack web development"} portfolio`,
  detailSections: buildProjectDetailSections(project),
}));

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "web-dev", label: "Web Dev" },
  { id: "ai-ml", label: "AI & ML" },
];

// Helper: Get a project by ID
export function getProjectById(projectId) {
  return projects.find((p) => p.id === projectId) || null;
}

// Helper: Get projects that use a specific skill
export function getProjectsForSkill(skillId) {
  return projects.filter((p) => p.skillIds && p.skillIds.includes(skillId));
}
