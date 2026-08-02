# Editing the site from the Claude app

How to set up a Claude Project so you can say *"remove the fourth event"* from
your phone and have it be live a minute later — no laptop, no terminal, no
pull request.

This is for the regular Claude apps (iOS, Android, macOS desktop, claude.ai),
not Claude Code.

## How it works

Claude talks to GitHub through a **connector** — an MCP server that exposes
GitHub's API as tools Claude can call. The relevant ones are
`get_file_contents` (read a file), `create_or_update_file` (commit a change),
and `delete_file`. These commit **straight to `main`**, which is exactly the
no-PR workflow you want.

From there the existing pipeline takes over: push to `main` → GitHub Actions
builds → live at olympics.dad in about a minute.

```
Claude app  →  GitHub connector  →  commit to main  →  Actions  →  olympics.dad
```

Nothing runs on your machine, which is why it works from a phone.

## Step 1 — Add the GitHub connector

Check the built-in connector directory first: **Settings → Connectors**, and
look for GitHub. If it's there, connect it, then confirm it can *write* by
asking Claude to list its GitHub tools — you need `create_or_update_file` or
`push_files`. Some GitHub integrations are read-only and only do code search,
which won't work here.

If there's no built-in option, or it turns out to be read-only, add GitHub's
official remote MCP server as a custom connector:

1. **Settings → Connectors → + → Add custom connector**
2. URL: `https://api.githubcopilot.com/mcp/`
3. **Add**, then complete the GitHub OAuth prompt
4. In a new chat, tap **+ → Connectors** and switch it on

That last step matters — connectors are enabled per conversation, not
globally. If Claude claims it can't reach GitHub, this is almost always why.

### A note on access scope

Authorizing that connector gives it write access to the repos your GitHub
account can write to — not just this one. If you'd rather keep it narrow,
create a second GitHub account, add it to `dad-olympics` as a collaborator
with write permission, and authorize the connector as that account. Then the
worst case is a bad commit to a static site about carrying children, which is
recoverable with a revert.

## Step 2 — Create the Project

**Projects → New project.** Name it something like "Dad Olympics site."

## Step 3 — Paste in the project instructions

Every chat in the Project inherits these. Paste this verbatim:

```text
You maintain the Dad Olympics website at https://olympics.dad.

Repo: hartleybrody/dad-olympics (public). Branch: main. Use the GitHub connector.

HOW PUBLISHING WORKS
Commit directly to main. A GitHub Actions workflow builds the site and
publishes it, live in about a minute. Never open a pull request — this repo
has no review workflow. There is no staging environment.

BEFORE YOU EDIT
Read CLAUDE.md in the repo root once per conversation. It maps the site and
lists content that must be kept in sync.

Always fetch a file's current contents from GitHub immediately before editing
it. Never reconstruct a file from memory or from earlier in the conversation —
committing a file replaces it wholesale, so stale content silently destroys
changes.

WHERE THINGS LIVE
Almost every content change is an edit to src/_data/2026.json. It holds the
events, the schedule, the invitation copy, the date, and the registration URL.
Prefer editing it over editing the page.
- src/_data/2026.json — all content for the 2026 games
- src/_includes/games-page.njk — page structure. Loops over the data; holds
  section headings and little else. Edit only for structural changes.

Each year has its own file, and each is published at /y/<year>/ as well as
being what "/" shows while it is the current year. Editing 2026.json therefore
changes both the front page and /y/2026/. That is correct while 2026 is
current; once it isn't, editing that file rewrites what an archived year says.
Check which year is current in lib/years.js before editing a past one.
- src/_includes/ — base.njk (page shell), header.njk, footer.njk
- src/css/style.css — all styles
- marketing/branding.md — palette, typography, voice. Follow it for any new
  copy or design.

EDITING RULES
- Event numbering, the spelled-out event count, schedule numbering, and each
  event's schedule entry are all derived from the events array. Removing an
  event means deleting one object from that array — do not also hand-edit the
  page to match, and never reintroduce a hardcoded count or number.
- Data values are plain text, never HTML. Templates supply the markup and
  Nunjucks escapes what it interpolates, so tags placed in the JSON render as
  visible text.
- You cannot build or preview. JSON must stay valid — a trailing comma or an
  unclosed brace fails the build and nothing deploys.
- One commit per request, with a message describing the intent.
- Don't touch eleventy.config.js, .github/workflows/, package.json, or
  package-lock.json unless explicitly asked.
- Never commit secrets.

AFTER COMMITTING
Say plainly what you changed and that it will be live in about a minute. If
asked whether it worked, check the latest GitHub Actions run.

To undo something, revert the commit and push. That redeploys the previous
version.
```

Keep it roughly this length. Project instructions are re-sent with every
message in the Project, so padding costs tokens on each turn.

## Step 4 — Project knowledge: leave it mostly empty

Resist uploading copies of `index.md`, `style.css`, or `branding.md` as
project files.

The connector reads the repo live. An uploaded copy is a snapshot that goes
stale the moment Claude commits a change — and then you have two versions of
the truth, with the stale one loaded into context by default. That's a
reliable way to get edits based on content that no longer exists.

`CLAUDE.md` lives in the repo for the same reason: it stays correct as the
site changes, and the instructions above tell Claude to go read it.

## Step 5 — Verify it end to end

In a new chat inside the Project, with the connector enabled:

> What are the four events, and when is the site's date set to?

Getting this right means it can read `src/index.md` and `src/_data/site.json`.
Then try a small write:

> Change the closing line "See you on the lawn" to "See you on the field."

Then check that it committed, that the Actions run went green, and that
olympics.dad reflects it. Once that round trip works, the setup is done.

## What this setup is bad at

- **No preview.** Claude is editing blind. Copy changes and content edits are
  safe; significant CSS or layout work is not.
- **Broken syntax breaks the deploy.** A malformed Nunjucks tag fails the
  build and the site keeps serving the last good version. Recover by asking
  Claude to check the failed Actions run and fix or revert.
- **No local search.** Claude fetches files by path, so it works best when you
  say what to change, not "find wherever X is mentioned."

For anything structural — a new page type, restyling a section, changing the
build — use Claude Code instead. It can build and preview.

## Why the content lives in JSON

The site's content sits in `src/_data/2026.json` specifically so this workflow
is safe.

*"Remove the fourth event"* used to mean five coordinated edits: the event's
markup, the hardcoded `01`/`02` numbering on everything after it, the count
spelled out in prose as "Four Official Events", the separate schedule list
with its own numbering, and a callout that referenced the event by name. Every
one was a chance for an editor working without a preview to leave the page
contradicting itself, and nothing in the build would have caught it.

Now it's one deletion from the `events` array. The numbering, the count, the
schedule, and the callout all follow. That's the difference between a site you
*can* edit from your phone and one you can edit from your phone without
checking the result on a laptop afterward.

The general rule when extending the site: if a change would require editing
the same fact in two places, put the fact in the data file and derive both.
