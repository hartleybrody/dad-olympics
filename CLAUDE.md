# Dad Olympics — repo guide

The website for the 2026 Dad Olympics, live at **https://olympics.dad**.

Read this before making changes. It covers where content lives and which
pieces of content have to move together.

## How publishing works

Commit to `main` → GitHub Actions builds the site → it's live in about a
minute. There is no staging environment, no review step, and no pull request
workflow. `_site/` is generated output and is gitignored; never commit it.

To undo a change, revert the commit and push. That redeploys the previous
version.

## Where things live

| Path | What it is |
| --- | --- |
| `src/index.md` | The entire homepage. HTML inside a Markdown file, using Nunjucks `{{ }}` variables. |
| `src/_data/site.json` | Date, time, place, registration URL, title, year. Edit these here — they're referenced throughout the templates. |
| `src/_includes/base.njk` | Page shell: `<head>`, fonts, header/footer includes. |
| `src/_includes/header.njk` | Site header and nav. |
| `src/_includes/footer.njk` | Site footer. |
| `src/css/style.css` | All styles. Design tokens are the CSS custom properties in `:root`. |
| `marketing/branding.md` | Brand guidelines — palette, typography, voice. Follow it for new copy and design. |
| `eleventy.config.js` | Build config. Rarely needs changing. |
| `.github/workflows/deploy.yml` | The deploy pipeline. |

## Coupled content — keep these in sync

`src/index.md` repeats the same information in several places. Changing one
without the others leaves the page self-contradicting. The build won't catch
this; nothing validates it.

**If you add or remove an event:**

1. The `<li class="event">` block in `<ol class="events">`
2. The `<span class="event-num">` numbers on the events that follow it —
   they're hardcoded (`01`, `02`, …), not generated
3. The eyebrow above the list — it spells the count in words:
   `<p class="eyebrow">Four Official Events</p>`
4. The matching `<li>` in `<ol class="schedule">`, **and** the `<span
   class="ord">` numbers on every entry after it — also hardcoded, and offset
   from the event numbers because the schedule includes registration and the
   ceremonies
5. Any `.notice` callout that references that event by name. The Point Chase
   notice is entirely about the Entire Family Carry — if that event goes, the
   notice goes.

**If you change the date, time, place, or registration URL:** edit
`src/_data/site.json` only. It feeds the hero, the footer, and the register
buttons.

**If you rename a section:** the header nav links to `#events`, `#schedule`,
and `#what-to-bring`. Keep the `id` attributes and the nav in agreement.

## Conventions

- Content is hand-written HTML, not Markdown syntax, so it can carry the
  brand's class names. Keep the existing class vocabulary (`section`, `wrap`,
  `eyebrow`, `lede`, `notice`, `event`, `btn`) rather than inventing new ones.
- Never hardcode a value that already exists in `site.json`.
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
