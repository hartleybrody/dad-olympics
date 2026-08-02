import { CURRENT_YEAR, loadYear } from "../../lib/years.js";

// A one-item list so the front page selects its year with pagination, the
// same mechanism the archive pages use.
//
// Both pages being on the same mechanism is the point. `games` is only ever
// set by a pagination alias, never as global data — Eleventy deep-merges the
// data cascade, so a global `games` would merge *underneath* each archive
// page's year, and any field a partly-filled year hadn't set yet would
// silently inherit the current year's value. A 2027 page would have quietly
// advertised the 2026 venue and sign-up form.
export default () => [loadYear(CURRENT_YEAR)];
