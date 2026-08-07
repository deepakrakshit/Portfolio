// Skills data repository for Deepak Rakshit's portfolio.
// Add skills under their respective categories to populate the skills catalog.

export const skills = {
  webdev: [],
  machinelearning: [],
  devops: [],
};

export const skillCategories = [
  { id: "all", label: "All" },
  { id: "webdev", label: "Web Development" },
  { id: "machinelearning", label: "AI & ML" },
  { id: "devops", label: "DevOps & Tools" },
];

// Helper: Get a flat list of all skills
export function getAllSkills() {
  return Object.values(skills).flat();
}

// Helper: Find a skill by ID
export function getSkillById(skillId) {
  return getAllSkills().find((s) => s.id === skillId) || null;
}

// Helper: Get skills used by a project (by project ID)
export function getSkillsForProject(projectId) {
  return getAllSkills().filter((s) => s.projectIds.includes(projectId));
}

// Helper: Get the category label for a skill
export function getSkillCategory(skillId) {
  for (const [catId, catSkills] of Object.entries(skills)) {
    if (catSkills.some((s) => s.id === skillId)) {
      const cat = skillCategories.find((c) => c.id === catId);
      return cat ? cat.label : catId;
    }
  }
  return "";
}

// Helper: Get the category ID for a skill
export function getSkillCategoryId(skillId) {
  for (const [catId, catSkills] of Object.entries(skills)) {
    if (catSkills.some((s) => s.id === skillId)) {
      return catId;
    }
  }
  return "";
}
