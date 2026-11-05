/* Service worker: cache-first app shell, network-first data.json. Bump VERSION when shell files change. */
var VERSION = "gim-v1";
var SHELL = ["./", "index.html", "app.css", "app.js", "manifest.webmanifest",
  "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/favicon-32.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith("/data.json")) {
    e.respondWith(fetch(req, { cache: "no-store" }).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put("data.json", copy); }); }
      return res;
    }).catch(function () {
      return caches.open(VERSION).then(function (c) { return c.match("data.json"); }).then(function (cached) {
        if (!cached) return new Response('{"error":"offline"}', { status: 503, headers: { "Content-Type": "application/json" } });
        return cached.text().then(function (body) {
          return new Response(body, { headers: { "Content-Type": "application/json", "X-GIM-Offline": "1" } });
        });
      });
    }));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(function (hit) {
    var net = fetch(req).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      return res;
    });
    return hit || net.catch(function () { return caches.match("index.html"); });
  }));
});
