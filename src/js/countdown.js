// Time-based visibility on the year page, decided by the visitor's clock
// rather than by the build. The site is static and only rebuilds on a
// commit, so build time says nothing about whether "now" is before or after
// a given moment for whoever is actually looking at the page — see the
// comments in games-page.njk above each section that uses this.
//
// Two independent behaviors live here:
//   [data-countdown]  — reveals a hidden section while a start time is
//                        still ahead, and hides it again once it passes.
//   [data-hide-after]  — a section that ships visible and disappears once
//                        its timestamp passes (e.g. the invitation, once
//                        the games have started).
//
// Every page carries at most one of each; pages with neither — the year
// index, say — simply find nothing and do nothing.

const SECOND = 1000;

/** Whole days, hours, minutes and seconds left in a span of milliseconds. */
function unitsUntil(ms) {
  const seconds = Math.floor(ms / SECOND);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
}

const plural = (n, noun) => `${n} ${noun}${n === 1 ? "" : "s"}`;

/* The screen-reader line. Deliberately coarser than the digits: down to the
   second is unreadable read aloud, and the last two units of whatever scale
   is left are what anyone actually wants to know. */
function summarize({ days, hours, minutes, seconds }) {
  const parts = days
    ? [plural(days, "day"), plural(hours, "hour")]
    : hours
      ? [plural(hours, "hour"), plural(minutes, "minute")]
      : [plural(minutes, "minute"), plural(seconds, "second")];
  return `${parts.join(" and ")} until the games begin.`;
}

function startCountdown(section) {
  const startsAt = Date.parse(section.dataset.countdown);
  if (Number.isNaN(startsAt)) return;

  const digits = section.querySelectorAll("[data-unit]");
  const summary = section.querySelector("[data-countdown-summary]");
  let timer;

  function tick() {
    const remaining = startsAt - Date.now();

    // Once the games start there is nothing to count down to. Hiding beats
    // freezing at zero: the day's details are further down the page and this
    // band is only in the way.
    if (remaining <= 0) {
      section.hidden = true;
      clearInterval(timer);
      return;
    }

    const units = unitsUntil(remaining);
    for (const digit of digits) {
      // Days keeps its own width once past 99; the rest are two-digit slots.
      const value = String(units[digit.dataset.unit]).padStart(2, "0");
      if (digit.textContent !== value) digit.textContent = value;
    }
    if (summary) summary.textContent = summarize(units);

    section.hidden = false;
  }

  tick();
  // Recomputed from the clock on every tick rather than decremented, so a
  // throttled background tab or a sleeping laptop catches up instead of
  // drifting behind by however long it was away.
  timer = setInterval(tick, SECOND);
}

/**
 * A section that ships visible in the markup and disappears once its
 * timestamp has passed — no digits to update, so a single one-shot check is
 * enough rather than a running interval like the countdown needs.
 *
 * Deliberately has no JS-off fallback the way the countdown does: without
 * JavaScript the section just stays visible always, which errs toward
 * showing copy that's gone slightly stale rather than hiding something a
 * visitor might still need.
 */
function hideAfter(el) {
  const at = Date.parse(el.dataset.hideAfter);
  if (Number.isNaN(at)) return;

  const remaining = at - Date.now();
  if (remaining <= 0) {
    el.hidden = true;
    return;
  }
  // Still ahead: hide it the moment it arrives, if the visitor is still on
  // the page then. A live band like the countdown needs to keep redrawing
  // digits every second; this only ever needs to fire once.
  setTimeout(() => {
    el.hidden = true;
  }, remaining);
}

for (const section of document.querySelectorAll("[data-countdown]")) {
  startCountdown(section);
}

for (const el of document.querySelectorAll("[data-hide-after]")) {
  hideAfter(el);
}
