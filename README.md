# Global Intelligence Monitor — iPhone web app (PWA)

Static, installable web app version of Max's "Global Intelligence Monitor" Page
(canvas `bc764176-1b40-48b5-997d-dc7d375e2369`). No build step, no server code.

## Files
| File | Purpose |
|---|---|
| `index.html` | App shell, iOS meta tags (`apple-mobile-web-app-capable`, apple-touch-icon, theme colours) |
| `app.css` | Mobile-first styles, automatic light/dark (`prefers-color-scheme`) |
| `app.js` | Vanilla JS: tabs (Berita, Konflik, Politik, Ekonomi, Negara, Sejarah), global search, region/decade/type filters, "Terakhir diperbarui" line |
| `data.json` | **All content.** The only file the daily job needs to change |
| `sw.js` | Service worker: cache-first for the shell (offline), **network-first for `data.json`** (falls back to cached copy offline) |
| `manifest.webmanifest` | PWA manifest, `display: standalone`, relative `start_url`/`scope` (works at a sub-path like GitHub Pages `/repo/`) |
| `icons/` | `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `favicon-32.png` |
| `tools/extract.ts` | One-off script that produced `data.json` from the Page source (`node tools/extract.ts`) |
| `tools/make_icons.py` | Regenerates the globe icons (Python + Pillow) |
| `live-news.json` | Hourly RSS headlines written by the GitHub Action (see below) |
| `scripts/update_live_news.py` | Stdlib-only RSS fetcher that writes `live-news.json` |
| `.github/workflows/update-news.yml` | Hourly GitHub Actions workflow |

## data.json schema (keep these keys)
```
title, snapshot (human text, e.g. "Wednesday 4 November 2026 (Europe/Rome)"), snapshotDate (YYYY-MM-DD),
lastUpdated (ISO 8601 with offset, shown in the app as "Terakhir diperbarui", in Rome time),
summary,
news[]:      {headline, summary, date, region (Americas|Europe|Middle East|Asia-Pacific|Africa), countries[] (US CN RU UA IL IN JP DE GB FR BR SA IR ID MY), source, url}
conflicts[]: {name, parties, status:{label, tone: danger|warning|neutral|accent}, latest, date, source, url}
politics[]:  {date, title, detail, status?:{label, tone?: success|warning|danger}, source, url}
upcoming[]:  {date, event, place, kind: Politics|Economy, source, url}
economy[]:   {item, figure, detail, date, source, url}
economyNote, policyRates[]:{label, value, display}, euroInflation[]:{label, value}
profiles[]:  {code, name, capital, population (millions), gdp (USD billions), headOfState, headOfGov, note?}
profilesNote, profileSource,
history[]:   {year, date, title, detail, url|null, source|null}
sources[]:   {title, site, url, date?}
```

## Daily update (what the routine does)
1. Rewrite `data.json` with fresh items (same schema). Every item must keep a real source `url`; drop stale news.
   Set `lastUpdated` to the current time with offset (e.g. `2026-11-06T07:00:00+01:00`) and update `snapshot`/`snapshotDate`.
2. Validate: `python3 -m json.tool data.json > /dev/null`
3. Redeploy only `data.json` (see Hosting). No service-worker version bump is needed for data changes:
   the app always fetches `data.json` from the network first (with `cache: "no-store"`), and also refetches when the app returns to the foreground.
4. Verify: `curl -s https://<host>/data.json | python3 -c "import json,sys; print(json.load(sys.stdin)['lastUpdated'])"`

If you change `index.html`, `app.js`, `app.css` or icons, bump `VERSION` in `sw.js` (e.g. `gim-v2`) so phones pick up the new shell.

## Local test
```
cd /workspace/gim-app && python3 -m http.server 8765
curl -sI http://localhost:8765/data.json
node --check app.js && node --check sw.js && python3 -m json.tool data.json >/dev/null
```

## Live news (self-running, hourly, on GitHub)
- `.github/workflows/update-news.yml` runs every hour at minute 17 (UTC cron `17 * * * *`) and on manual dispatch
  (`gh workflow run update-news.yml -R elchto/gim-app`).
- It runs `scripts/update_live_news.py` (Python stdlib only, no pip) which fetches these public RSS feeds:
  BBC World, BBC Business, Al Jazeera, NPR World, The Guardian World, The Guardian Economics, DW World, DW Business,
  France 24, CNBC World. (Reuters has no public RSS; reutersagency.com/feed returns 404, so it is skipped.)
- Output: `live-news.json` = `{updatedAt, sources[], failed[], count, items[]}`; each item is
  `{title, summary (plain text, ≤ ~300 chars), link, source, published (ISO UTC), region (keyword guess: Americas|Europe|Middle East|Asia-Pacific|Africa|Global), category (news|economy|conflict, keyword guess)}`.
  Items older than 72 h are dropped, max 9 per feed, deduped by link and title, newest first, max 80.
- Failed feeds are skipped and listed in `failed`; if **all** feeds fail the old file is kept. If nothing changed, the file is not rewritten and no commit is made.
- The workflow commits only `live-news.json` as `github-actions[bot]`, does `git pull --rebase` before pushing (retries 3x), so it coexists with other jobs pushing `data.json`.
  It **never touches `data.json`**.
- Pages redeploys automatically after each push (branch deploy). The app shows "Berita Langsung" at the top of the Berita tab with its own
  "Diperbarui" time, and live items are included in global search. If `live-news.json` is missing or fails to load, the app still works.
- 60-day rule: GitHub disables scheduled workflows in public repos after 60 days without repository activity. The hourly bot commits are
  pushes to the default branch, which count as activity, so as long as the feeds keep changing (they do, every hour) the schedule stays alive.
  If it ever gets disabled (e.g. every feed broke for 60 days), re-enable it in the Actions tab or with `gh workflow enable update-news.yml -R elchto/gim-app`.
- Runs cost nothing: Actions minutes are free and unlimited for public repositories.

## Hosting / redeploy
Live at https://elchto.github.io/gim-app/ (repo https://github.com/elchto/gim-app, Pages from branch `main`, root).
Always `git pull --rebase` before pushing: both the hourly workflow (live-news.json) and the daily/hourly data job (data.json) push to `main`.

**Original setup (done):**
```
cd /workspace/gim-app
git init -b main && git add -A && git commit -m "Global Intelligence Monitor PWA"
gh repo create gim-app --public --source=. --push
gh api -X POST repos/{owner}/gim-app/pages -f "source[branch]=main" -f "source[path]=/"
# URL: https://<github-user>.github.io/gim-app/
# Daily redeploy:
git add data.json && git commit -m "data: $(date +%F)" && git push
```

**Option B — Netlify (free account needed).** With a personal access token in `NETLIFY_AUTH_TOKEN`:
```
npx netlify-cli deploy --dir=/workspace/gim-app --prod --site <site-id>
```
(`--allow-anonymous` deploys exist but are deleted after 1 hour unless claimed, so they are not usable for a permanent app.)

## Install on iPhone
Open the HTTPS URL in **Safari** → Share button → **Add to Home Screen** → Add. It opens full-screen like a normal app.
