# Dad Olympics — repo guide

The website for the Dad Olympics, live at **https://olympics.dad**.

Read this before making changes.

## How publishing works

Commit to `main` → GitHub Actions builds the site → it's live in about a
minute. There is no staging environment, no review step, and no pull request
workflow. `_site/` is generated output and is gitignored; never commit it.

To undo a change, revert the commit and push. That redeploys the previous
version.

## Where things live

**Almost every content change is an edit to `src/_data/2026.json`.** The page
template holds structure and section headings; the data file holds the words.

| Path | What it is |
| --- | --- |
| `src/_data/2026.json` | All content for the 2026 games: events, schedule, invitation, date, time, place, registration URL, what to bring. |
| `src/_data/games.js` | Chooses which year's file the site renders. One constant, `YEAR`. |
| `src/_data/site.json` | Site-wide only — currently just the title. Anything year-specific belongs in the year file. |
| `src/index.md` | Page structure. Loops over `games.*`; contains section headings and little else. |
| `src/_includes/base.njk` | Page shell: `<head>`, fonts, header/footer includes. |
| `src/_includes/header.njk` | Site header and nav. |
| `src/_includes/footer.njk` | Site footer. |
| `src/css/style.css` | All styles. Design tokens are the CSS custom properties in `:root`. |
| `src/img/` | Web-ready images, copied through as-is and served from `/img/…`. |
| `marketing/branding.md` | Brand guidelines — palette, typography, voice. Follow it for new copy and design. |
| `marketing/barbell-mascot.png` | Full-resolution mascot source. Kept for regenerating the web versions; never published. |
| `eleventy.config.js` | Build config and two template filters. |
| `.github/workflows/deploy.yml` | The deploy pipeline. |

The data file is exposed to templates as **`games`**, not `2026` — a Nunjucks
identifier can't start with a digit, so `{{ 2026.year }}` is a parse error.
`games.js` re-exports the JSON under a usable name.

## What derives automatically

These used to be hand-maintained in the markup and are now computed. Don't
reintroduce hardcoded copies:

- **Event numbers** (`01`, `02`, …) — from list position, via the `pad2` filter
- **"Four Official Events"** — from `events.length`, via the `numberWord`
  filter, which spells the count
- **Schedule numbering** — continuous across `schedule.before`, the events,
  and `schedule.after`, so inserting an event renumbers everything after it
- **Schedule entries for events** — each event's `summary` field supplies its
  schedule line; the card uses `description`
- **The Point Chase callout** — it's a `notice` on the Entire Family Carry
  event, so deleting that event deletes the callout with it
- **The displayed year** — `games.year`, a fixed string, *not* the real-world
  current date. The hero, footer, and copyright all show the year of the games
  currently on display.

So removing an event means deleting one object from the `events` array.
Nothing else needs touching.

## Adding a year

Copy `2026.json` to `2027.json`, edit it, and change `YEAR` in `games.js`. The
old file stays in the repo as a record of that year's games.

## Images

Anything in `src/img/` is published at `/img/…`. Sources stay in `marketing/`,
which is not copied to the site, so full-resolution art never ships.

Ship WebP at two widths and let `srcset` choose. The mascot was produced from
the source PNG with:

```sh
cwebp -q 80 -alpha_q 60 -m 6 in.png -o out.webp
```

`-alpha_q 60` is the setting that matters. The cutout's mask is nearly binary,
so a high alpha quality almost doubles the file — 169 KB vs 87 KB — for no
measurable difference once composited. Crop transparent padding away before
encoding; the original was 2.4 MB largely because of empty canvas.

The mascot appears in the markup twice: in the hero for desktop, and in
`.mascot-band` above the footer for phones, where it would otherwise push the
date and the register button below the fold. Only one is ever displayed.

## Conventions

- The page is hand-written HTML rather than Markdown syntax, so it can carry
  the brand's class names. Keep the existing class vocabulary (`section`,
  `wrap`, `eyebrow`, `lede`, `notice`, `event`, `btn`) rather than inventing
  new ones.
- Data values are plain text, never HTML — templates handle the markup, and
  Nunjucks escapes what it interpolates. A notice is `{title, body}` so the
  bold run stays in the template. Don't put tags in the JSON; they'll render
  as visible text.
- Never hardcode a value that already exists in the year file.
- The `.misprint` off-register effect is used **once**, on the hero wordmark.
  Don't apply it elsewhere — `marketing/branding.md` explains why.
- Copy follows the voice section of `marketing/branding.md`: dry, ceremonial
  about trivial things, never mean.

## Local development

```sh
npm install
npm start     # dev server at localhost:8080 with live reload
npm run build # build to _site/
```

See `README.md` for hosting, DNS, and deploy details.
