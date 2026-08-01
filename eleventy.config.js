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

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");

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
