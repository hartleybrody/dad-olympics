# Dad Olympics

A static site built with [Eleventy](https://www.11ty.dev/) (11ty).

## Requirements

- Node.js 18 or newer (developed on v24)
- npm

## Setup

Clone the repo, then install dependencies:

```sh
npm install
```

## Running locally

```sh
npm start
```

This starts Eleventy's dev server at **http://localhost:8080**. It watches
`src/` and reloads the browser automatically when you save a change, so you can
preview edits as you make them.

Stop the server with `Ctrl+C`.

## Building for production

```sh
npm run build
```

Writes the finished site to `_site/`. That directory is generated output — it's
gitignored, and you can delete it at any time.

## Project structure

```
src/
├── index.md              # Homepage content (Markdown + front matter)
├── css/style.css         # Styles, copied to /css/style.css as-is
├── _data/
│   ├── site.json         # Site-wide values, available as {{ site.title }}
│   └── year.js           # Current year, available as {{ year }}
└── _includes/
    ├── base.njk          # Page layout (the <html> wrapper)
    ├── header.njk        # Shared header
    └── footer.njk        # Shared footer
```

`eleventy.config.js` at the repo root wires this together: `src/` is the input
directory, `_site/` is the output, and `src/css/` is copied through untouched.

## Making changes

- **Edit the homepage** — `src/index.md`. Everything below the `---` front
  matter block is Markdown.
- **Add a page** — drop a new `.md` file in `src/`. Give it the same front
  matter (`layout: base.njk`) and it picks up the header and footer. A file at
  `src/about.md` is served at `/about/`.
- **Change the header or footer** — `src/_includes/header.njk` and
  `footer.njk`.
- **Change the site title** — `src/_data/site.json`, which updates the header
  and every page's `<title>` at once.

Templates use [Nunjucks](https://mozilla.github.io/nunjucks/), which is
Jinja2 syntax for JavaScript. It's enabled for both Markdown and HTML files, so
`{{ variables }}` and `{% tags %}` work in `.md` pages too.
