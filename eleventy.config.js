const NUMBER_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];

// The games are held in Shaker Heights, so the wall-clock time there is the
// only one that matters. Formatting is pinned to that zone rather than the
// build machine's, or a build run elsewhere would render a different date.
const TIME_ZONE = "America/New_York";

const formatDate = (value, options) =>
  new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, ...options }).format(
    new Date(value),
  );

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");

  // The year's JSON stores one ISO timestamp for the start of the games, and
  // the year, the date, and the clock time are all read back out of it.
  eleventyConfig.addFilter("year", (v) => formatDate(v, { year: "numeric" }));

  // "Sunday, May 17"
  eleventyConfig.addFilter("longDate", (v) =>
    formatDate(v, { weekday: "long", month: "long", day: "numeric" }),
  );

  // "9:30" — 24-hour, since the schedule never crosses noon into ambiguity,
  // with the leading zero trimmed to match how anyone would write it.
  eleventyConfig.addFilter("clock", (v) =>
    formatDate(v, {
      hour: "numeric",
      minute: "2-digit",
      hourCycle: "h23",
    }).replace(/^0/, ""),
  );

  // "Four Official Events" — the count is spelled out in prose, so it has to
  // track the length of the events list rather than being written by hand.
  eleventyConfig.addFilter("numberWord", (n) => NUMBER_WORDS[n] ?? String(n));

  // Event numbers render as 01, 02, 03.
  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
