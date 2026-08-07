const certificationEntries = [];

export const certifications = certificationEntries.map((certification) => ({
  ...certification,
  imageAlt:
    certification.imageAlt ||
    `${certification.title} certificate earned by Deepak Rakshit from ${certification.issuer}`,
}));

export const certificationCategories = [
  { id: "all", label: "All" },
  { id: "web-dev", label: "Web Dev" },
  { id: "ai-ml", label: "AI & ML" },
];
