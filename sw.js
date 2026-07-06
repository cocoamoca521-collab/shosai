// 書斎 — minimal service worker (installability + network passthrough)
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  // ネット必須アプリなので素通し。オフライン時はそのまま失敗させる。
  e.respondWith(fetch(e.request).catch(() => new Response("オフラインです。接続を確認してください。", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } })));
});
