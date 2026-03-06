import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contextPath = path.resolve(__dirname, "../../data/site-context.json");

let cachedContext = null;

export async function loadSiteContext() {
  if (cachedContext) {
    return cachedContext;
  }

  const raw = await fs.readFile(contextPath, "utf-8");
  cachedContext = JSON.parse(raw);
  return cachedContext;
}

export async function getContextSlice({ currentPage, section }) {
  const context = await loadSiteContext();
  const pageContext = context.pages[currentPage] ?? context.pages["/"];

  return {
    page: currentPage,
    section: section || "general",
    summary: pageContext.summary,
    sectionContext: pageContext.sections?.[section] || "",
    suggestions: pageContext.suggestions || [],
    allowedActions: context.allowedActions,
  };
}
