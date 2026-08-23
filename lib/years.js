import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const DATA_DIR = fileURLToPath(new URL("../src/_data/", import.meta.url));

// A year file is named for its year: 2026.json. The filename is the only
// source of truth for which year a file describes, and it's what the archive
// URL is built from, so nothing inside the JSON has to agree with it.
const YEAR_FILE = /^(\d{4})\.json$/;

// Which year the front page shows. Everything on "/" reads from this year's
// file, so the site never depends on the real-world current date.
//
// To publish a new year: add its JSON file and change this constant. The
// previous year keeps its own page under /y/, unchanged, forever.
export const CURRENT_YEAR = "2027";

/**
 * Which sections have enough content to be worth rendering.
 *
 * A year is filled in a piece at a time, so a file can hold a date and a
 * venue long before it has events or a schedule. Rather than let those
 * sections render as a heading over nothing, each one is skipped until its
 * content arrives.
 *
 * This lives here, not in the template, because the page and the header nav
 * both need the answer — a nav link pointing at a section that isn't on the
 * page is its own small bug.
 */
function sectionsWithContent(data) {
  const { invitation = {}, whatToBring = {}, schedule = {}, events = [], winners } = data;

  return {
    invitation: Boolean(invitation.lede || invitation.paragraphs?.length),
    events: events.length > 0,
    // The schedule is built from the ceremonies and the events together, so
    // any one of the three is enough to give it something to list.
    schedule: Boolean(
      schedule.before?.length || schedule.after?.length || events.length,
    ),
    whatToBring: Boolean(whatToBring.items?.length || whatToBring.notice),
    // Winners starts out null and is filled in after the closing ceremony —
    // see games-page.njk. A null or missing value means the section simply
    // doesn't render yet, the same as any other section still in progress.
    winners: Boolean(winners?.length),
  };
}

function readYear(filename, slug) {
  const data = JSON.parse(readFileSync(join(DATA_DIR, filename), "utf8"));
  // slug last: the filename wins over anything the JSON might claim.
  return {
    ...data,
    slug,
    isCurrent: slug === CURRENT_YEAR,
    sections: sectionsWithContent(data),
  };
}

/**
 * Every year file on disk, newest first.
 *
 * All of them get a page, however little is filled in — a year with a date
 * and nothing else still publishes. `sectionsWithContent` is what keeps that
 * from looking broken: the sections without content simply aren't rendered.
 */
export function loadYears() {
  return readdirSync(DATA_DIR)
    .map((name) => ({ name, match: YEAR_FILE.exec(name) }))
    .filter(({ match }) => match)
    .map(({ name, match }) => readYear(name, match[1]))
    .sort((a, b) => b.slug.localeCompare(a.slug));
}

/** One year by slug. Throws rather than rendering a page full of blanks. */
export function loadYear(slug) {
  const year = loadYears().find((y) => y.slug === slug);
  if (!year) {
    throw new Error(`No data file src/_data/${slug}.json for the current year`);
  }
  return year;
}
