#!/usr/bin/env python3
"""Fetch public RSS feeds and write live-news.json (stdlib only).

Never touches data.json. If every feed fails, the existing live-news.json is kept.
"""
import email.utils
import html
import json
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "live-news.json")
MAX_ITEMS = 80
PER_SOURCE = 9
MAX_AGE_HOURS = 72

FEEDS = [
    # (source name, url, default category)
    ("BBC World", "https://feeds.bbci.co.uk/news/world/rss.xml", "news"),
    ("BBC Business", "https://feeds.bbci.co.uk/news/business/rss.xml", "economy"),
    ("Al Jazeera", "https://www.aljazeera.com/xml/rss/all.xml", "news"),
    ("NPR World", "https://feeds.npr.org/1004/rss.xml", "news"),
    ("The Guardian World", "https://www.theguardian.com/world/rss", "news"),
    ("The Guardian Economics", "https://www.theguardian.com/business/economics/rss", "economy"),
    ("DW World", "https://rss.dw.com/rdf/rss-en-world", "news"),
    ("DW Business", "https://rss.dw.com/rdf/rss-en-bus", "economy"),
    ("France 24", "https://www.france24.com/en/rss", "news"),
    ("CNBC World", "https://www.cnbc.com/id/100727362/device/rss/rss.html", "economy"),
]

REGIONS = [
    ("Middle East", r"\b(israel\w*|gaza|palestin\w*|west bank|iran\w*|iraq\w*|syria\w*|lebanon|lebanese|hezbollah|hamas|houthi\w*|yemen\w*|saudi\w*|qatar\w*|uae|emirat\w*|dubai|abu dhabi|tehran|jordan\w*|kuwait|oman|bahrain|hormuz|turkey|turkish|erdogan|netanyahu|egypt\w*|cairo)\b"),
    ("Europe", r"\b(ukrain\w*|russia\w*|kremlin|putin|zelensk\w*|kyiv|moscow|europe\w*|eu|eurozone|nato|brussels|uk|britain|british|england|scotland|london|starmer|burnham|france|french|paris|macron|german\w*|berlin|merz|ital\w*|rome|spain|spanish|madrid|poland|polish|netherlands|dutch|belgi\w*|sweden|norway|finland|denmark|greece|greek|hungar\w*|bulgaria\w*|romania\w*|serbia\w*|montenegro|ireland|irish|portugal|switzerland|austria\w*|czech|slovak\w*|balkan\w*|baltic)\b"),
    ("Asia-Pacific", r"\b(china|chinese|beijing|xi jinping|taiwan\w*|hong kong|japan\w*|tokyo|korea\w*|seoul|pyongyang|india\w*|delhi|modi|pakistan\w*|afghan\w*|bangladesh\w*|sri lanka|nepal|indonesia\w*|jakarta|prabowo|malaysia\w*|anwar|kuala lumpur|singapore|thai\w*|bangkok|vietnam\w*|philippin\w*|manila|myanmar|cambodia\w*|laos|australia\w*|new zealand|pacific|asia\w*|apec|asean)\b"),
    ("Africa", r"\b(africa\w*|sudan\w*|khartoum|darfur|ethiopia\w*|somalia\w*|kenya\w*|nigeria\w*|congo\w*|drc|uganda\w*|rwanda\w*|ghana\w*|senegal\w*|mali|niger|burkina|chad|libya\w*|tunisia\w*|algeria\w*|morocc\w*|zimbabwe\w*|mozambique|angola\w*|cameroon\w*|sahel|ebola|tanzania\w*|eritrea\w*)\b"),
    ("Americas", r"\b(us|u\.s\.|usa|america\w*|washington|trump|biden|congress|senate|white house|pentagon|fed|federal reserve|wall street|canada|canadian|mexic\w*|brazil\w*|lula|argentin\w*|chile\w*|colombia\w*|venezuela\w*|peru\w*|paraguay\w*|uruguay\w*|bolivia\w*|ecuador\w*|panama\w*|cuba\w*|haiti\w*|caribbean|latin america)\b"),
]
CONFLICT = re.compile(r"\b(war|wars|warfare|strike|strikes|airstrike\w*|missile\w*|drone\w*|attack\w*|bomb\w*|shell\w*|troops|military|army|soldier\w*|ceasefire|truce|killed|fighting|invasion|offensive|militant\w*|rebel\w*|insurgen\w*|hostage\w*|siege|frontline|conflict\w*|clash\w*|weapon\w*|nuclear)\b", re.I)
ECONOMY = re.compile(r"\b(econom\w*|inflation|interest rate\w*|rates|central bank|fed|ecb|recession|gdp|market\w*|stock\w*|shares|bond\w*|yield\w*|investor\w*|oil price\w*|crude|brent|opec|trade|tariff\w*|export\w*|import\w*|budget|tax\w*|debt|currency|dollar|euro|yen|bitcoin|crypto\w*|bank\w*|earnings|profit\w*|jobs|unemployment|wage\w*|prices)\b", re.I)

TAG_RE = re.compile(r"<[^>]+>")
WS_RE = re.compile(r"\s+")


def local(tag):
    return tag.rsplit("}", 1)[-1].lower() if isinstance(tag, str) else ""


def clean(text, limit=None):
    if not text:
        return ""
    t = html.unescape(TAG_RE.sub(" ", html.unescape(text)))
    t = WS_RE.sub(" ", t).strip()
    if limit and len(t) > limit:
        cut = t[:limit].rsplit(" ", 1)[0]
        t = cut.rstrip(",;:.- ") + "…"
    return t


def parse_date(s):
    if not s:
        return None
    s = s.strip()
    try:
        d = email.utils.parsedate_to_datetime(s)
    except (TypeError, ValueError):
        d = None
    if d is None:
        try:
            d = datetime.fromisoformat(s.replace("Z", "+00:00"))
        except ValueError:
            return None
    if d.tzinfo is None:
        d = d.replace(tzinfo=timezone.utc)
    return d.astimezone(timezone.utc)


def child_text(el, *names):
    for c in el:
        if local(c.tag) in names:
            if local(c.tag) == "link" and not (c.text or "").strip():
                href = c.attrib.get("href")
                if href:
                    return href
            if (c.text or "").strip():
                return c.text
    return ""


def guess_region(text):
    low = " " + text.lower() + " "
    best, score = None, 0
    for name, pat in REGIONS:
        n = len(re.findall(pat, low))
        if n > score:
            best, score = name, n
    return best or "Global"


def guess_category(text, default):
    c = len(CONFLICT.findall(text))
    e = len(ECONOMY.findall(text))
    if c >= 1 and c >= e:
        return "conflict"
    if e >= 2 or (e >= 1 and default == "economy"):
        return "economy"
    return default


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (gim-app live news; +https://elchto.github.io/gim-app/)"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()


def parse_feed(source, raw, default_cat, now):
    root = ET.fromstring(raw)
    out = []
    for el in root.iter():
        if local(el.tag) not in ("item", "entry"):
            continue
        title = clean(child_text(el, "title"))
        link = clean(child_text(el, "link", "guid"))
        if not title or not link.startswith("http"):
            continue
        summary = clean(child_text(el, "description", "summary", "content"), 300)
        pub = parse_date(child_text(el, "pubdate", "date", "published", "updated"))
        if pub and (now - pub).total_seconds() > MAX_AGE_HOURS * 3600:
            continue
        if pub and pub > now:
            pub = now
        text = title + " " + summary
        out.append({
            "title": title,
            "summary": summary,
            "link": link,
            "source": source,
            "published": pub.isoformat().replace("+00:00", "Z") if pub else None,
            "region": guess_region(text),
            "category": guess_category(text, default_cat),
        })
    out.sort(key=lambda x: x["published"] or "", reverse=True)
    return out[:PER_SOURCE]


def norm_title(t):
    return re.sub(r"[^a-z0-9 ]", "", t.lower())[:80]


def main():
    now = datetime.now(timezone.utc)
    items, ok, failed = [], [], []
    for source, url, cat in FEEDS:
        try:
            got = parse_feed(source, fetch(url), cat, now)
            if not got:
                raise ValueError("no recent items")
            items.extend(got)
            ok.append(source)
            print(f"ok   {source}: {len(got)}")
        except Exception as e:  # keep going with other feeds
            failed.append(source)
            print(f"FAIL {source}: {e}", file=sys.stderr)
    if not items:
        print("All feeds failed; keeping existing live-news.json", file=sys.stderr)
        return 0
    seen_links, seen_titles, deduped = set(), set(), []
    items.sort(key=lambda x: x["published"] or "", reverse=True)
    for it in items:
        lk = it["link"].split("?")[0].rstrip("/")
        nt = norm_title(it["title"])
        if lk in seen_links or nt in seen_titles:
            continue
        seen_links.add(lk)
        seen_titles.add(nt)
        deduped.append(it)
    deduped = deduped[:MAX_ITEMS]

    # Only bump updatedAt when the item list actually changed.
    old = None
    try:
        with open(OUT, encoding="utf-8") as f:
            old = json.load(f)
    except (OSError, ValueError):
        pass
    if old and old.get("items") == deduped and old.get("sources") == ok:
        print("No change in items; not rewriting.")
        return 0
    data = {
        "updatedAt": now.replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "sources": ok,
        "failed": failed,
        "count": len(deduped),
        "items": deduped,
    }
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"Wrote {len(deduped)} items from {len(ok)} feeds")
    return 0


if __name__ == "__main__":
    sys.exit(main())
