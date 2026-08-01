import { readFileSync } from "node:fs";

// The year currently on display. Everything on the site — the hero, the
// footer, the events, the schedule — reads from this year's JSON file, so
// nothing is tied to the real-world current date.
//
// To publish a new year: copy 2026.json to 2027.json, edit it, and change
// this constant. The previous year's file stays in the repo as a record.
const YEAR = "2026";

export default () =>
  JSON.parse(readFileSync(new URL(`./${YEAR}.json`, import.meta.url), "utf8"));
