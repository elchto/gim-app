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

## Hosting / redeploy
Not deployed yet: no authenticated static host is available on the box (gh is not logged in, GitHub connector not connected).

**Option A — GitHub Pages (recommended, free).** After Max connects GitHub (or `gh auth login` on the box):
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
