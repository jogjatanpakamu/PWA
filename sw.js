const cacheName = "sablon-v1";
const appShellFiles = [
  "/",
  "/index.html",
  "/assets/img/favicon/favicon.ico",
  "/assets/img/icons/fox-icon.png",
  "/assets/vendor/fonts/boxicons.css",
  "/assets/vendor/css/core.css",
  "/assets/vendor/css/theme-default.css",
  "/assets/vendor/js/helpers.js",
  "/assets/img/avatars/1.png",
  "/assets/img/produk/1.jpg",
  "/assets/vendor/js/bootstrap.js",
  "/assets/js/jquery-2.2.3.min.js",
  "/assets/js/jquery.mycart.js",
  "/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js",
  "/assets/vendor/js/menu.js",
  "/assets/js/main.js",
  "/manifest.json",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(appShellFiles);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     caches
//       .open("fox-store")
//       .then((cache) =>
//         cache.addAll([
//           "/",
//           "/index.html",
//           "/assets/img/favicon/favicon.ico",
//           "/assets/img/icons/fox-icon.png",
//           "/assets/vendor/fonts/boxicons.css",
//           "/assets/vendor/css/core.css",
//           "/assets/vendor/css/theme-default.css",
//           "/assets/vendor/js/helpers.js",
//           "/assets/img/avatars/1.png",
//           "/assets/img/produk/1.jpg",
//           "/assets/vendor/js/bootstrap.js",
//           "/assets/js/jquery-2.2.3.min.js",
//           "/assets/js/jquery.mycart.js",
//           "/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js",
//           "/assets/vendor/js/menu.js",
//           "/assets/js/main.js",
//           "/manifest.json",
//         ])
//       )
//   );
// });
// self.addEventListener("fetch", (e) => {
//   console.log(e.request.url);
//   e.respondWith(
//     caches.match(e.request).then((response) => response || fetch(e.request))
//   );
// });
