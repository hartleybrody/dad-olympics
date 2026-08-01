# Dad Olympics — Brand Guidelines

*Draft v1 — for the 2026 games, Sunday May 17, Shaker Heights*

---

## 1. What we're branding

A backyard-scale, family-wide athletic meet where dads race strollers, press their kids
overhead, and carry entire families across a lawn. Two hours, five events, medals for the
top three, and a stated rule that governs everything else:

> **"No hardos."**

That's the brand in two words. Everything below is in service of it: the visual world
should look like it takes itself *enormously* seriously, while the words underneath make
it clear that nobody actually does.

**One-liner:** *Feats of strength. Family-sized.*

**Positioning statement:** The Dad Olympics is a neighborhood field day dressed in the
clothes of a national sporting event — mid-century pageantry, torch and all, applied to
men jogging with a diaper bag.

---

## 2. The visual idea

**"1954 sporting-goods catalog meets the Rexall soda fountain."**

Picture the counter card that sat next to the malt machine, or the back cover of a boys'
athletics annual: a heavy condensed headline, one flat spot color, cream stock, halftone
grain, and a grinning illustrated strongman. Now hand the strongman a stuffed rabbit.

The humor should never come from the design. The design plays it straight — confident,
optimistic, slightly overproduced. The gag lives in the subject matter and the copy.

### Borrow the era's graphics, not its politics

The reference period is post-war Americana, and it's worth being deliberate here. We take
the printing, the color, the optimism, the typography. We do **not** take the aproned-mom-
in-the-background thing. In the actual event, moms pace runners, run the clock, and spot
the pull-up bar; kids are competitors, not props. Illustrate that. A mom with a stopwatch
is more on-brand than a mom with a pie.

---

## 3. Color

Sampled from the 2026 poster and cleaned up for screen. The poster art is heavily
grained, which desaturates it on paper — the values below are the "clean plate" versions,
and the texture pass will knock them back naturally.

### Core palette

| Role | Name | Hex | Notes |
|---|---|---|---|
| Primary | **Field Teal** | `#7FA2A6` | The panel color. Backgrounds, large flat fields, medals ribbon. |
| Accent | **Bleacher Brick** | `#BF4A34` | The year badge. Use sparingly — one red thing per layout. |
| Paper | **Malt Cream** | `#F2E7CB` | The stock. Default page background and knockout type. |
| Ink | **Coach's Ink** | `#33261C` | Warm near-black. Line art, outlines, body text. Never pure `#000`. |

### Soda-fountain accents

These pull the palette from "sober athletic poster" toward "bubble gum." Use one per
layout, at small scale — a stripe, a badge, a highlight. Never two at once.

| Name | Hex | Use |
|---|---|---|
| **Bubblegum** | `#E8899B` | Kid-facing material, junior events, ribbon stripes. |
| **Counter Mint** | `#9CC7B6` | Secondary panels, schedule blocks, alternating table rows. |
| **Medal Gold** | `#D9A441` | Podium, results, first place only. Not a general accent. |
| **Root Beer** | `#7A4A2B` | Deep neutral for wood/leather illustration; alt to Ink on cream. |

### CSS custom properties

```css
:root {
  --teal:      #7FA2A6;
  --teal-dark: #5E8286;  /* shadows, borders, hover */
  --brick:     #BF4A34;
  --brick-dark:#A83E2B;  /* cream type on brick — clears AA at body size */
  --cream:     #F2E7CB;
  --cream-lt:  #FBF5E6;  /* cards on cream */
  --ink:       #33261C;
  --bubblegum: #E8899B;
  --mint:      #9CC7B6;
  --gold:      #D9A441;
  --rootbeer:  #7A4A2B;
}
```

### Pairing rules

- **Cream + Ink** is the default for anything with real reading in it (schedule, rules,
  the FAQ). 11.8:1 — comfortable everywhere.
- **Ink on Teal** is the rule for *all functional text* on a teal panel — 5.0:1, passes AA
  at any size. Schedule text, captions, quotes, buttons on teal.
- **Cream on Teal** is the poster's signature look but measures only **2.25:1**. It is
  reserved for the wordmark itself, which is a logotype and exempt. Do not set readable
  copy in cream on Field Teal — reach for Ink instead.
- **Brick on Teal** is for shapes, not text. Cream on Brick is 4.0:1 — fine for large bold
  UI like the year badge; use **Brick Dark `#A83E2B`** (5.0:1) anywhere cream type needs to
  pass AA at body size, e.g. buttons.
- Never put Brick next to Bubblegum. Never tint the cream toward gray — it should always
  read warm, like aged newsprint.

---

## 4. Typography

Three faces, all free on Google Fonts, chosen to match the poster.

| Role | Face | Where |
|---|---|---|
| **Display** | **Anton** | Event name, headlines, bib numbers, medal engraving, results. |
| **Script** | **Grand Hotel** | One-line flourishes only: "Sunday best," "Ice cold," "Est. 2025." |
| **Text** | **Jost** | Everything else. Geometric, Futura-adjacent, correct for the era. |

*Premium alternates if the budget ever appears:* Knockout HTF or ATF Alternate Gothic for
display; Streetwear or Hamburger Heaven for script; real Futura for text.

### Rules

1. **Display is always all-caps, always tight.** Letterspacing `-0.01em`, line-height
   `0.92`. Headlines should stack in a block — "DAD / OLYMPICS" on two lines beats one
   long line every time.
2. **Script is a garnish.** Maximum one script element per surface, maximum four or five
   words. It is never a headline and never a paragraph.
3. **Body copy is Jost 400/500** at 17–18px, line-height 1.6. Sentence case.
4. **Numbers are Anton** — bib numbers, times, standings, the year. Enable
   `font-variant-numeric: tabular-nums` on any results table.
5. Never italicize the display face. Never letterspace the script.

```css
--font-display: "Anton", "Oswald", Impact, sans-serif;
--font-script:  "Grand Hotel", "Lobster Two", cursive;
--font-text:    "Jost", "Futura", system-ui, sans-serif;
```

### Scale

| Token | Size | Face |
|---|---|---|
| Hero | `clamp(3rem, 11vw, 7rem)` | Anton |
| H1 | `clamp(2rem, 6vw, 3.5rem)` | Anton |
| H2 | `1.75rem` | Anton |
| H3 | `1.15rem`, uppercase, `0.08em` tracking | Jost 600 |
| Body | `1.0625rem` | Jost 400 |
| Fine print | `0.85rem` | Jost 400, `--ink` at 70% |

---

## 5. Logo & lockups

The poster establishes the primary lockup:

- Rounded-rectangle panel in Field Teal
- Inset keyline in Malt Cream, 2–3px, offset ~14px from the panel edge, rounded corners
- **DAD OLYMPICS** in Anton, cream, stacked two lines, left-aligned
- Year in a rounded Brick badge above the wordmark

**Clear space:** one cap-height of the wordmark on all sides. Nothing crosses the keyline
except the mascot, who is *supposed* to break the frame — that overlap is the composition.

**Minimum size:** 120px wide for the full lockup. Below that, use the badge alone (year in
a brick rounded-rect) or the stacked wordmark with no frame.

**Approved variants:** full lockup (teal panel) · wordmark only (ink on cream, or cream on
teal) · year badge · circular "seal" version for medals and stickers.

**Never:** rotate it, gradient it, outline the type, drop-shadow it, place it on a photo
without a solid panel behind it, or recolor the wordmark to an accent.

---

## 6. Illustration

The mascot style is the anchor: heavy uniform outlines, flat fills, one or two tone steps
for shading, halftone dots in the shadow areas, cheerful faces, slightly exaggerated
musculature. Think vintage vitamin ad.

**Subjects worth drawing:**
- A dad mid-press with a delighted kid overhead
- A jogging stroller in motion lines
- A dad carrying three kids and a scooter, composure intact
- A stopwatch, a torch, a folding camp chair, a laurel wreath on a bike helmet
- Medals with striped ribbons

**Style rules:** outlines in Ink at consistent weight; two-color fills max per object;
halftone shading only, never soft gradients; everything sits on a flat field, no cast
shadows on the ground.

**Deliberately un-perfect:** the illustrations should look printed, not rendered. A little
off-register color (a fill shifted 1–2px off its outline) sells the whole thing.

---

## 7. Texture & print effects

Every finished surface gets at least two of these:

1. **Paper grain** — subtle noise across the whole composition, ~4–6% opacity.
2. **Halftone** — visible dot pattern in shading and in any large flat area of Brick.
3. **Off-register** — one color plate nudged 1–2px. Use once per piece, not everywhere.
4. **Ink bleed** — very slight edge softening on type at large sizes. Optional.
5. **Rounded rectangles + inset keylines** — the structural motif, used on cards, badges,
   photo frames, table headers.

Never: drop shadows, glows, blurs, glassmorphism, gradients (except a halftone gradient),
rounded-everything modern UI chrome. If it looks like it could have been printed in 1954
on a two-color press, it's right.

---

## 8. Voice

**Deadpan announcer with a clipboard, who loves his kids.** Faux-official, faintly
overproduced, warm underneath. Read every line in the voice of a newsreel narrator
describing something that does not merit a newsreel.

### The four dials

| Dial | Setting |
|---|---|
| Formality | Ceremonial for titles, plainspoken for logistics |
| Humor | Dry and understated — never a punchline where a fact will do |
| Warmth | High. Everyone finishes, everyone gets clapped for |
| Hype | Loud about the *event*, quiet about the *athletes* |

### Do

- Use real committee language for silly things: *"The Committee has ruled that wagons are
  vehicles."* *"Protests will be heard at the snack table."*
- Borrow soda-fountain ad copy: *"Ice cold."* *"Two scoops of glory."* *"Served daily."*
- State the ridiculous premise flatly and let it work: *"Press your oldest child overhead.
  Last child aloft wins."*
- Be genuinely useful in logistics copy. Check tire pressure. Bring water. This part is
  real, and it stays clear.
- Celebrate participation over placement. Kids read this too.

### Don't

- **Don't do groaner dad jokes.** The brand *is* dads; it doesn't need to announce it.
  Dry beats punny every time.
- Don't do gym-bro copy. No "beast mode," no "crush it," no "leave it all on the field."
  Literally against the rules — see "no hardos."
- Don't do exhausted-parent-martyr copy. No wine-mom energy, no "send help."
- Don't punch at anyone's fitness, kid count, or body.
- Don't overuse exclamation points. One per paragraph, maximum, and make it earn its keep.

### Voice, calibrated

> **Too flat:** The overhead press event begins at 10:45.
>
> **Too much:** 💪 TIME TO GET SWOLE DADS!! Who's ready to CRUSH the press?!
>
> **Right:** **Overhead Press & Hold.** Everyone starts together. Last child aloft wins.
> Bring your child. 10:45 sharp.

### Sample copy

**Invitation:**
> You are cordially invited to the 2026 Dad Olympics. One mile with a stroller, three
> hundred yards carrying a scooter, and the return of the overhead press. New this year:
> the entire family carry. Bring water, a camp chair, and a child. No hardos.

**Buttons/CTA:** `REGISTER` · `CLAIM YOUR BIB` · `SEE THE EVENTS` · `VIEW STANDINGS`

**Empty state:** *"Standings post after the closing ceremony. The Committee is tallying."*

**Downtime notice:** *"There will be 10–15 minutes between events while points are tallied,
cones are moved, and somebody's kid is located."*

---

## 9. Naming & terminology

Consistency here does more for the brand than any color choice.

| Use | Not |
|---|---|
| **The Games** | the competition, the meet |
| **Athletes** (dads) / **Teammates** (kids) | contestants, participants |
| **The Committee** | the organizers, me |
| **Opening Ceremony / Closing Ceremony** | kickoff, wrap-up |
| **The Point Chase** | the leaderboard, rankings |

**Official event names** — always title case, always these exact strings:

1. **The Mile** *(1.2 miles, stroller or wagon)*
2. **Run & Carry** *(~300 yards, out and back)*
3. **Overhead Press & Hold** *(last child aloft)*
4. **Entire Family Carry** *(all kids at once, heats by kid count)*

Each event gets a one-line subtitle in Jost, sentence case, under the Anton name. That
pattern — ceremonial name, plain-language explanation — is the whole voice in miniature.

---

## 10. Applications

**Race bibs.** Anton numerals in Ink on cream, as large as the sheet allows. Teal band
across the top with the wordmark, thin brick rule beneath. Leave a blank line for the
kid's name — kids should see their own name on the bib.

**Medals & ribbons.** Circular seal lockup. Ribbon stripes: teal/cream for finishers,
gold/cream for first, and a Bubblegum stripe on every kid's medal so they're distinct.

**Signage.** One message per sign, Anton only, cream on teal, rounded corners, inset
keyline. Legible from 40 yards or it's not a sign.

**Website.** Cream page, teal hero panel, brick used exactly twice per page. Full-bleed
poster at the top, then plain readable schedule and logistics below. The site's job is to
get people registered and to the right corner at the right time — decoration stops where
the schedule starts.

**Email.** Plain text voice, one illustration at the top, no HTML fireworks.

**Results board.** Anton tabular numerals, alternating Counter Mint row tint, gold row for
first. Print it and tape it to something — a printed sheet is more on-brand than a screen.

---

## 11. Guardrails

- **No Olympic rings, ever.** No torch relay iconography that mimics the IOC's, no
  "Olympiad," no five-ring anything, no official-Olympic typography. The USOPC is famously
  litigious about this. Our torch is a backyard torch drawn in our own style, and the
  visual language is 1950s athletics generally — not the Olympic brand specifically.
- **No military imagery.** Post-war styling, not war styling. No khaki, no medals-of-valor,
  no recruitment-poster framing.
- **Keep the era's charm, drop its assumptions.** See §2.
- **Safety copy stays plain.** Tire pressure, brakes, spotters, "keep them safe/close" —
  these lines never get the announcer treatment.
- **Kids are the audience too.** Anything a seven-year-old will read should be readable and
  kind. If a joke only lands for the adults, it can't come at a kid's expense.

---

## 12. Open questions

- Do we want a named mascot for the strongman, or does he stay anonymous?
- Is there a junior brand extension for kid-only events, or is Bubblegum enough of a signal?
- Should the year badge change color annually (2026 brick, 2027 mint, …) as a collectible
  thread across bibs and medals?
