import { loadYears } from "../../lib/years.js";

// Drives the per-year archive pages at /y/<year>/. See src/years.njk.
export default () => loadYears();
