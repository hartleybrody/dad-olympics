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

You don't need to run this to deploy — the GitHub Actions workflow runs it for
you. It's just useful for checking the built output locally.

## Deploying

The site is hosted on [GitHub Pages](https://pages.github.com/) and deployed by
GitHub Actions (`.github/workflows/deploy.yml`).

### Deploying a change

```sh
git push origin main
```

That's it. Every push to `main` triggers a build and publishes it, usually live
within a minute. Watch progress under the repo's **Actions** tab.

Nothing is committed by the deploy — `_site/` stays gitignored and is built
fresh on GitHub each time.

### One-time setup

**1. Create the repo and push**

The repo needs to be **public** — GitHub Pages on a private repo requires a paid
plan. Public repos get Pages free, with a soft limit of 100 GB/month bandwidth
and 10 builds/hour, far more than this site will use.

```sh
gh repo create dad-olympics --public --source=. --remote=origin --push
```

**2. Turn on Pages**

In the repo: **Settings → Pages → Build and deployment → Source**, and pick
**GitHub Actions**. Do this before the first deploy, or the workflow fails with
a "Pages is not enabled" error. (If that happens, just enable it and re-run the
job from the Actions tab — no need to push again.)

At this point the site is live at `hartleybrody.github.io/dad-olympics/`.

**3. Point `olympics.dad` at it**

Add the DNS records first, then set the domain in GitHub — GitHub runs a DNS
check on save, and doing it in this order avoids a failed check you have to
wait out.

In the Cloudflare dashboard for `olympics.dad`, under **DNS → Records**, add
these. The apex needs four A records and four AAAA records — GitHub serves
Pages from all of them:

| Type | Name | Content |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `hartleybrody.github.io` |

**Set every one of these to "DNS only" (grey cloud), not "Proxied" (orange
cloud).** This is the step that most often goes wrong. With the proxy on,
GitHub can't complete the ACME challenge and will never issue the TLS
certificate for the domain.

Then in GitHub, under **Settings → Pages → Custom domain**, enter `olympics.dad`
and save.

**4. Enforce HTTPS**

Once the DNS check passes and GitHub has provisioned the certificate — usually
minutes, occasionally up to an hour — tick **Enforce HTTPS** on the same Pages
settings screen.

Don't skip this: `.dad` is one of Google's HSTS-preloaded TLDs, so browsers
refuse to load it over plain HTTP no matter what. The site is unreachable until
the certificate is live.

### Editing from the Claude app

The site can also be updated from Claude on a phone or desktop — describe a
change in chat, and it commits to `main` and deploys itself. Setup is in
[`docs/claude-project-setup.md`](docs/claude-project-setup.md).

### Notes and gotchas

- **Leaving Cloudflare's proxy off is fine.** You lose Cloudflare's CDN, but
  GitHub Pages is already served from a CDN with HTTPS. If you later want the
  proxy on, turn it on *only after* HTTPS is confirmed working, and set
  **SSL/TLS → Overview → Full (strict)** first. Cloudflare's default
  "Flexible" mode causes an infinite redirect loop with Pages.
- **No `CNAME` file needed in the repo.** That's only for branch-based
  publishing. Deploying via Actions stores the domain in the repo settings
  instead. If a deploy ever appears to clear the custom domain, re-enter it in
  Settings → Pages.
- **Links are root-relative** (`/css/style.css`) because the site is served
  from the root of a domain. If you ever move it back to a
  `github.io/dad-olympics/` subpath, you'd need Eleventy's `pathPrefix` and the
  `url` filter on every internal link.

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
