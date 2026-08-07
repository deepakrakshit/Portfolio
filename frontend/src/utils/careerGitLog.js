import { experiences } from "../data/experience";

function fakeHash(seed) {
  let h = 5381;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h * 33) ^ seed.charCodeAt(i);
  }
  return (h >>> 0).toString(16).slice(0, 7).padStart(7, "0");
}

function branchSlug(exp) {
  if (exp.company) {
    const slug = exp.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (slug) return slug;
  }
  return `exp-${exp.id || "role"}`;
}

function linkToMsg(name) {
  const cleaned = name.replace(/\(.*?\)/g, "").trim();
  return `feat: ${cleaned.slice(0, 42)}`;
}

function row(seed, fields) {
  return {
    id: seed,
    hash: fakeHash(seed),
    ...fields,
  };
}

const HIGHLIGHTS_PER_ROLE = 1;

/** Grouped roles for the About page career section. */
export function buildCareerRoles() {
  return [...experiences].map((exp) => {
      const link = (exp.links || [])[0];
      return {
        id: exp.id,
        branch: branchSlug(exp),
        position: exp.position,
        company: exp.company,
        companyUrl: exp.companyUrl || "",
        period: exp.period,
        current: Boolean(exp.current),
        highlight: link
          ? {
              name: link.name,
              msg: linkToMsg(link.name),
              hash: fakeHash(`${exp.id}-${link.name}`),
            }
          : null,
      };
    });
}

/** Build a compact git-log from experience + linked projects (not the GitHub API). */
export function buildCareerCommits() {
  const rows = [];
  const ordered = [...experiences];

  ordered.forEach((exp, expIndex) => {
    const branch = branchSlug(exp);
    const highlight = (exp.links || []).slice(0, HIGHLIGHTS_PER_ROLE);

    highlight.forEach((link, i) => {
      rows.push(
        row(`${exp.id}-${branch}-link-${i}-${link.name}`, {
          branch,
          msg: linkToMsg(link.name),
          expId: exp.id,
          graph: "| *",
        }),
      );
    });

    rows.push(
      row(`merge-${exp.id}-${branch}`, {
        branch: "main",
        msg: `merge(${branch}): ${exp.position}`,
        expId: exp.id,
        graph: expIndex === ordered.length - 1 ? "* |\\" : "|\\",
        meta: exp.company,
      }),
    );
  });

  return rows;
}
