import { projects } from "./projects";
import { getAllSkills } from "./skills";
import { certifications } from "./certifications";

/** Dynamic counts for Home stats - avoids hardcoded values */
export const portfolioStats = {
  get projects() {
    return projects.length;
  },
  get skills() {
    return getAllSkills().length;
  },
  get certifications() {
    return certifications.length;
  },
};
