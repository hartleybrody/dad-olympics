// The live countdown under the hero.
//
// The section is in the markup but hidden; this reveals it only while the
// start of the games is still ahead, and hides it again the moment they
// begin. See the comment above the markup in games-page.njk for why that
// decision belongs to the visitor's clock rather than to the build.
//
// Every page carries at most one of these, and pages that have none — the
// year index, say — simply find nothing and do nothing.

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

for (const section of document.querySelectorAll("[data-countdown]")) {
  startCountdown(section);
}
