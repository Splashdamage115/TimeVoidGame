const cacheName = 'Time_Void';
const filesToCache = [
  '.',
  'sw.js',
  'assets/js/background.js',
  'assets/js/buffer.js',
  'assets/js/button.js',
  'assets/js/canvas.js',
  'assets/js/character.js',
  'assets/js/gameLoop.js',
  'assets/js/global.js',
  'assets/js/home.js',
  'assets/js/input.js',
  'assets/js/instructionsLoop.js',
  'assets/js/loop.js',
  'assets/js/menuLoop.js',
  'assets/js/peer.js',
  'assets/js/radialMenu.js',
  'assets/js/restore.js',
  'assets/js/tile.js',
  'assets/js/winnerScreen.js',
  'assets/js/peerToPeerPackage.js',
  'index.html',
  'assets/css/screen.css',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/index.html',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/css/screen.css',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/css/background.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/blank.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/charSheet.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/CouldntExecute.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/flags.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/night.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/normalButton.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/placementSS.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/play-Button.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/playerImg.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/radialButtonBasic.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/radialButtonBasicSS.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/stopwatch.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/Tile.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/waiting.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/winnerScreen.png',
  './David_Strikaitis_c00283152-UI-Programming-Module-Project/assets/imgs/instructions.png'
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(filesToCache);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req.url);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}