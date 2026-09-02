/*
 * Inscribe documentation service worker: a scoped offline safety and recovery
 * pack. Nothing here is a framework; the rules are explicit and small.
 *
 * Caching rules:
 *  - hashed build assets: cache first (immutable).
 *  - article HTML: stale while revalidate.
 *  - learning manifest: network first with validated cached fallback.
 *  - live status and fee data: network only; offline renders an explicit state.
 *  - user-entered values and Ask Universe results are never cached.
 *  - the practice studio is cached only after the user opts in.
 */
const BASE = new URL(self.registration.scope).pathname
const VERSION = self.SW_VERSION ?? 'dev'
const CACHE = `inscribe-docs-${VERSION}`
const PRECACHE_MANIFEST = self.__PRECACHE_MANIFEST ?? []
const PRACTICE_FLAG = `${BASE}offline-practice-opt-in`

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE_MANIFEST)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key.startsWith('inscribe-docs-') && key !== CACHE).map((key) => caches.delete(key))),
    ).then(() => self.clients.claim()),
  )
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'CACHE_PRACTICE') {
    event.waitUntil(
      caches.open(CACHE).then((cache) => cache.addAll(event.data.urls ?? ['/docs-inscribe/practice/sim/practice.html'])),
    )
  }
  if (event.data?.type === 'UPDATE_READY') {
    self.skipWaiting()
  }
})

function isHashedAsset(url) {
  return url.pathname.includes('/_astro/')
}

function isLearningManifest(url) {
  return url.pathname.endsWith('/learning-manifest.json')
}

function isLiveOnly(url) {
  return url.pathname.includes('/status/') || url.pathname.includes('/api/')
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE)
  const cached = await cache.match(request)
  const network = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone())
    return response
  }).catch(() => null)
  return cached ?? (await network) ?? offlineFallback(request)
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE)
  try {
    const response = await fetch(request)
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch {
    const cached = await cache.match(request)
    if (cached) return cached
    return offlineFallback(request)
  }
}

function offlineFallback(request) {
  if (request.mode === 'navigate') {
    return caches.match(`${BASE}offline.html`)
  }
  return new Response(
    JSON.stringify({ state: 'unknown', reason: 'offline', note: 'Live state is unknown while offline. Never treat this as healthy or as zero.' }),
    { status: 503, headers: { 'Content-Type': 'application/json' } },
  )
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return
  if (!url.pathname.startsWith(BASE)) return

  // Live-only surfaces are honest offline: network only, explicit state.
  if (isLiveOnly(url)) {
    event.respondWith(fetch(event.request).catch(() => offlineFallback(event.request)))
    return
  }
  // User-entered values and Ask results are never cached: bypass entirely.
  if (url.pathname.includes('/ask')) return

  if (isHashedAsset(url)) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached ?? fetch(event.request).then((response) => {
        const copy = response.clone()
        caches.open(CACHE).then((cache) => cache.put(event.request, copy))
        return response
      })),
    )
    return
  }
  if (isLearningManifest(url)) {
    event.respondWith(networkFirst(event.request))
    return
  }
  if (url.pathname.includes('/practice/sim/')) {
    // Practice is cached only after an explicit opt-in, recorded as a flag
    // document the site puts into the cache when the user asks for it.
    event.respondWith(
      caches.match(PRACTICE_FLAG).then((optIn) =>
        optIn ? staleWhileRevalidate(event.request) : fetch(event.request),
      ),
    )
    return
  }
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('.md') || url.pathname.endsWith('.txt') || url.pathname.endsWith('.json') || url.pathname.endsWith('.jsonl')) {
    event.respondWith(staleWhileRevalidate(event.request))
  }
})
