/* Global Intelligence Monitor PWA. All content comes from data.json. */
(function () {
  "use strict";
  var D = null;
  var state = { tab: "news", region: "All", upKind: "All", country: "US", decade: "All", q: "" };
  var REGION_LABEL = { All: "Semua", Americas: "Amerika", Europe: "Eropa", "Middle East": "Timur Tengah", "Asia-Pacific": "Asia-Pasifik", Africa: "Afrika" };
  var REGIONS = ["All", "Americas", "Europe", "Middle East", "Asia-Pacific", "Africa"];
  var DECADES = ["All", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];
  var KIND_LABEL = { All: "Semua", Politics: "Politik", Economy: "Ekonomi" };
  var TABS = ["news", "conflicts", "politics", "economy", "countries", "timeline"];

  var main = document.getElementById("main");
  var qInput = document.getElementById("q");
  var updatedEl = document.getElementById("updated");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function site(url) { var m = /^https?:\/\/(?:www\.)?([^/]+)/.exec(url || ""); return m ? m[1] : ""; }
  function link(url, label) {
    if (!url) return "";
    return '<a class="src" href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(label || site(url)) + " ↗</a>";
  }
  function chips(list, current, labelFn, countFn, attr) {
    return '<div class="chips">' + list.map(function (v) {
      var c = countFn ? countFn(v) : null;
      return '<button class="chip' + (v === current ? " on" : "") + '" data-' + attr + '="' + esc(v) + '">' + esc(labelFn(v)) +
        (c != null ? "<small>" + c + "</small>" : "") + "</button>";
    }).join("") + "</div>";
  }
  function decadeOf(y) { return Math.floor(y / 10) * 10 + "s"; }
  function fmtGdp(b) { return b >= 1000 ? "$" + (b / 1000).toFixed(2) + " triliun" : "$" + Math.round(b) + " miliar"; }
  function fmtGdpShort(b) { return b >= 1000 ? "$" + (b / 1000).toFixed(1) + "T" : "$" + Math.round(b) + "B"; }
  function fmtPop(m) { return m >= 1000 ? (m / 1000).toFixed(2) + " miliar" : m.toFixed(1) + " juta"; }
  function fmtStamp(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return iso || "-";
    try {
      return d.toLocaleString("id-ID", { timeZone: "Europe/Rome", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " (waktu Roma)";
    } catch (e) { return d.toISOString(); }
  }

  function newsCard(n) {
    return '<article class="card"><div class="meta"><span>' + esc(n.date) + "</span><span>" + esc(REGION_LABEL[n.region] || n.region) +
      "</span></div><h4>" + esc(n.headline) + "</h4><p>" + esc(n.summary) + '</p><div class="meta"><span>' + esc(n.source) + "</span>" + link(n.url) + "</div></article>";
  }
  function bars(items, emphasis) {
    var max = Math.max.apply(null, items.map(function (b) { return b.value; }));
    return '<div class="bars">' + items.map(function (b, i) {
      return '<div class="row' + (i === emphasis ? " em" : "") + '"><span>' + esc(b.label) + '</span><div class="track"><div class="fill" style="width:' +
        (100 * b.value / max).toFixed(1) + '%"></div></div><span>' + esc(b.display) + "</span></div>";
    }).join("") + "</div>";
  }
  function lineChart(points, floor, ceil) {
    var W = 320, H = 150, L = 28, R = 10, T = 12, B = 24;
    var x = function (i) { return L + i * (W - L - R) / (points.length - 1); };
    var y = function (v) { return T + (ceil - v) * (H - T - B) / (ceil - floor); };
    var path = points.map(function (p, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(p.value).toFixed(1); }).join(" ");
    var grid = "";
    for (var g = floor; g <= ceil; g++) grid += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(g) + '" y2="' + y(g) + '" stroke="currentColor" opacity=".12"/><text x="2" y="' + (y(g) + 4) + '">' + g + "%</text>";
    var dots = points.map(function (p, i) {
      return '<circle cx="' + x(i) + '" cy="' + y(p.value) + '" r="3.5" fill="var(--accent)"/><text x="' + x(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(p.label) +
        '</text><text x="' + x(i) + '" y="' + (y(p.value) - 8) + '" text-anchor="middle">' + p.value.toFixed(1) + "</text>";
    }).join("");
    return '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Inflasi zona euro">' + grid +
      '<path d="' + path + '" fill="none" stroke="var(--accent)" stroke-width="2.5"/>' + dots + "</svg>";
  }

  var views = {
    news: function () {
      var list = D.news.filter(function (n) { return state.region === "All" || n.region === state.region; });
      return "<h2>Berita Dunia</h2>" +
        '<div class="notice">Snapshot per ' + esc(D.snapshot) + ". Isi berita dalam bahasa Inggris, setiap item ada tautan sumbernya.</div>" +
        chips(REGIONS, state.region, function (r) { return REGION_LABEL[r]; }, function (r) {
          return r === "All" ? D.news.length : D.news.filter(function (n) { return n.region === r; }).length;
        }, "region") +
        (list.length ? list.map(newsCard).join("") : '<p class="empty">Tidak ada berita untuk filter ini.</p>');
    },
    conflicts: function () {
      return "<h2>Konflik Internasional</h2><p class=\"cap\">Status mengikuti cara sumber yang dikutip menggambarkan setiap konflik.</p>" +
        D.conflicts.map(function (c) {
          return '<article class="card"><div class="meta"><span class="badge t-' + esc(c.status.tone) + '">' + esc(c.status.label) + "</span><span>" + esc(c.date) +
            "</span></div><h4>" + esc(c.name) + '</h4><div class="meta" style="margin-bottom:6px"><span>Pihak: ' + esc(c.parties) + "</span></div><p>" + esc(c.latest) +
            '</p><div class="meta"><span>' + esc(c.source) + "</span>" + link(c.url) + "</div></article>";
        }).join("");
    },
    politics: function () {
      var up = D.upcoming.filter(function (u) { return state.upKind === "All" || u.kind === state.upKind; });
      return "<h2>Perkembangan Politik</h2>" +
        D.politics.map(function (p) {
          return '<article class="card"><div class="meta"><span>' + esc(p.date) + "</span>" +
            (p.status ? '<span class="badge t-' + esc(p.status.tone || "accent") + '">' + esc(p.status.label) + "</span>" : "") +
            "</div><h4>" + esc(p.title) + "</h4><p>" + esc(p.detail) + '</p><div class="meta"><span>' + esc(p.source) + "</span>" + link(p.url) + "</div></article>";
        }).join("") +
        "<h3>Agenda Mendatang</h3>" +
        chips(["All", "Politics", "Economy"], state.upKind, function (k) { return KIND_LABEL[k]; }, null, "kind") +
        up.map(function (u) {
          return '<article class="card"><div class="meta"><span><b>' + esc(u.date) + "</b></span><span>" + esc(KIND_LABEL[u.kind] || u.kind) + "</span><span>📍 " + esc(u.place) +
            "</span></div><h4>" + esc(u.event) + '</h4><div class="meta"><span>' + esc(u.source) + "</span>" + link(u.url) + "</div></article>";
        }).join("");
    },
    economy: function () {
      return "<h2>Peristiwa Ekonomi</h2>" +
        D.economy.map(function (e) {
          return '<article class="card"><div class="meta"><span>' + esc(e.date) + "</span></div><h4>" + esc(e.item) + ': <span class="t-accent">' + esc(e.figure) +
            "</span></h4><p>" + esc(e.detail) + '</p><div class="meta"><span>' + esc(e.source) + "</span>" + link(e.url) + "</div></article>";
        }).join("") +
        '<h3>Suku bunga acuan, % (batas atas untuk Fed)</h3><div class="card">' + bars(D.policyRates, -1) + "</div>" +
        '<h3>Inflasi zona euro 2026, %</h3><div class="card">' + lineChart(D.euroInflation, 0, 5) + "</div>" +
        '<p class="cap">' + esc(D.economyNote) + "</p>";
    },
    countries: function () {
      var p = D.profiles.filter(function (x) { return x.code === state.country; })[0] || D.profiles[0];
      var cn = D.news.filter(function (n) { return n.countries.indexOf(p.code) >= 0; });
      var sorted = D.profiles.slice().sort(function (a, b) { return b.gdp - a.gdp; });
      var em = sorted.map(function (x) { return x.code; }).indexOf(p.code);
      return "<h2>Profil Negara</h2><p class=\"cap\">" + esc(D.profilesNote) + "</p>" +
        '<select id="country" aria-label="Negara">' + D.profiles.map(function (x) {
          return '<option value="' + esc(x.code) + '"' + (x.code === p.code ? " selected" : "") + ">" + esc(x.name) + "</option>";
        }).join("") + "</select>" +
        '<div class="card"><h4>' + esc(p.name) + '</h4><dl class="kv">' +
        "<dt>Ibu kota</dt><dd>" + esc(p.capital) + "</dd>" +
        "<dt>Penduduk</dt><dd>" + esc(fmtPop(p.population)) + " (2025, estimasi IMF)</dd>" +
        "<dt>PDB</dt><dd>" + esc(fmtGdp(p.gdp)) + " (2025, estimasi IMF)</dd>" +
        "<dt>Kepala negara</dt><dd>" + esc(p.headOfState) + "</dd>" +
        "<dt>Kepala pemerintahan</dt><dd>" + esc(p.headOfGov) + "</dd>" +
        (p.note ? "<dt>Catatan</dt><dd>" + esc(p.note) + "</dd>" : "") +
        '</dl><div class="meta" style="margin-top:8px">' + link(D.profileSource, "IMF WEO") + "</div></div>" +
        "<h3>Berita terbaru: " + esc(p.name) + "</h3>" +
        (cn.length ? cn.map(newsCard).join("") : '<p class="empty">Belum ada berita untuk negara ini dalam snapshot.</p>') +
        '<h3>PDB 2025, semua 15 negara</h3><div class="card">' +
        bars(sorted.map(function (x) { return { label: x.name, value: x.gdp, display: fmtGdpShort(x.gdp) }; }), em) + "</div>" +
        "<h3>Sumber data utama</h3>" + D.sources.map(function (s) {
          return '<div class="card"><h4>' + esc(s.title) + '</h4><div class="meta">' + (s.date ? "<span>" + esc(s.date) + "</span>" : "") + link(s.url, s.site) + "</div></div>";
        }).join("");
    },
    timeline: function () {
      var list = D.history.filter(function (h) { return state.decade === "All" || decadeOf(h.year) === state.decade; });
      return "<h2>Linimasa Sejarah</h2><p class=\"cap\">Peristiwa geopolitik besar, 1945 hingga November 2026.</p>" +
        chips(DECADES, state.decade, function (d) { return d === "All" ? "Semua" : d; }, function (d) {
          return d === "All" ? D.history.length : D.history.filter(function (h) { return decadeOf(h.year) === d; }).length;
        }, "decade") +
        (list.length ? '<div class="tl">' + list.map(function (h) {
          return '<article class="card"><div class="meta"><span><b>' + esc(h.date) + "</b></span></div><h4>" + esc(h.title) + "</h4><p>" + esc(h.detail) + "</p>" +
            (h.url ? '<div class="meta"><span>' + esc(h.source) + "</span>" + link(h.url) + "</div>" : "") + "</article>";
        }).join("") + "</div>" : '<p class="empty">Tidak ada peristiwa pada dekade ini.</p>');
    }
  };

  function searchEntries() {
    var E = [];
    D.news.forEach(function (n) { E.push({ s: "Berita", t: n.headline, x: n.summary + " " + n.region + " " + n.source, d: n.date, u: n.url }); });
    D.conflicts.forEach(function (c) { E.push({ s: "Konflik", t: c.name, x: c.parties + " " + c.latest + " " + c.status.label, d: c.date, u: c.url }); });
    D.politics.forEach(function (p) { E.push({ s: "Politik", t: p.title, x: p.detail, d: p.date, u: p.url }); });
    D.upcoming.forEach(function (u) { E.push({ s: "Agenda", t: u.event, x: u.place + " " + u.kind, d: u.date, u: u.url }); });
    D.economy.forEach(function (e) { E.push({ s: "Ekonomi", t: e.item + ": " + e.figure, x: e.detail, d: e.date, u: e.url }); });
    D.profiles.forEach(function (p) { E.push({ s: "Negara", t: p.name, x: p.capital + " " + p.headOfState + " " + p.headOfGov + " " + (p.note || ""), d: "Estimasi IMF 2025", u: D.profileSource, code: p.code }); });
    D.history.forEach(function (h) { E.push({ s: "Sejarah", t: h.title, x: h.detail + " " + h.year, d: h.date, u: h.url || "https://www.britannica.com/search?query=" + encodeURIComponent(h.title) }); });
    return E;
  }
  function renderSearch() {
    var q = state.q.trim().toLowerCase();
    var res = searchEntries().filter(function (e) { return (e.t + " " + e.x + " " + e.s).toLowerCase().indexOf(q) >= 0; });
    return "<h2>Hasil pencarian</h2><p class=\"cap\">" + res.length + " hasil untuk “" + esc(state.q.trim()) + "”</p>" +
      (res.length ? res.map(function (e) {
        return '<article class="card"><div class="sec-tag">' + esc(e.s) + '</div><h4>' + esc(e.t) + "</h4><p>" + esc(e.x.length > 220 ? e.x.slice(0, 220) + "…" : e.x) +
          '</p><div class="meta"><span>' + esc(e.d) + "</span>" + link(e.u) + "</div></article>";
      }).join("") : '<p class="empty">Tidak ada yang cocok di snapshot ini.</p>');
  }

  function render() {
    if (!D) return;
    var searching = state.q.trim().length >= 2;
    main.innerHTML = searching ? renderSearch() : views[state.tab]();
    Array.prototype.forEach.call(document.querySelectorAll("#tabs button"), function (b) {
      b.classList.toggle("active", !searching && b.getAttribute("data-tab") === state.tab);
    });
  }

  main.addEventListener("click", function (ev) {
    var b = ev.target.closest("button.chip");
    if (!b) return;
    if (b.dataset.region) state.region = b.dataset.region;
    if (b.dataset.kind) state.upKind = b.dataset.kind;
    if (b.dataset.decade) state.decade = b.dataset.decade;
    render();
  });
  main.addEventListener("change", function (ev) {
    if (ev.target.id === "country") { state.country = ev.target.value; render(); }
  });
  document.getElementById("tabs").addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-tab]");
    if (!b) return;
    state.tab = b.getAttribute("data-tab");
    state.q = ""; qInput.value = "";
    if (location.hash !== "#" + state.tab) history.replaceState(null, "", "#" + state.tab);
    render(); window.scrollTo(0, 0);
  });
  qInput.addEventListener("input", function () { state.q = qInput.value; render(); });

  function setUpdated(offline) {
    updatedEl.textContent = "Terakhir diperbarui: " + fmtStamp(D.lastUpdated) + (offline ? " · offline" : "");
  }
  function load() {
    updatedEl.textContent = "Memuat data…";
    return fetch("data.json", { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      var offline = r.headers.get("X-GIM-Offline") === "1";
      return r.json().then(function (j) { D = j; setUpdated(offline); render(); });
    }).catch(function (e) {
      if (D) { setUpdated(true); return; }
      updatedEl.textContent = "Gagal memuat data";
      main.innerHTML = '<p class="empty">Data tidak bisa dimuat (' + esc(e.message) + "). Periksa koneksi lalu tekan ⟳.</p>";
    });
  }
  document.getElementById("refresh").addEventListener("click", load);
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible" && D) load(); });

  var h = (location.hash || "").slice(1);
  if (TABS.indexOf(h) >= 0) state.tab = h;
  load();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
})();
