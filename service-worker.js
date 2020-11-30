/* global workbox */
/* eslint no-restricted-globals: 1 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

workbox.setConfig({ debug: true })
const { setCacheNameDetails, skipWaiting, clientsClaim } = workbox.core
const { registerRoute } = workbox.routing
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { precacheAndRoute } = workbox.precaching

setCacheNameDetails({
  prefix: 'pwa-dicoding',
  suffix: 'v2',
  precache: 'pc-rc-2',
  runtime: 'rt-rc-2'
})

skipWaiting()
clientsClaim()

precacheAndRoute([
  { url: '/', revision: 2 },
  { url: '/manifest.json', revision: 2 },
  { url: '/css/Main.css', revision: 2 },
  { url: '/css/materialize.min.css', revision: 2 },
  { url: '/Js/Main.js', revision: 2 },
  { url: '/Js/materialize.min.js', revision: 2 },
  { url: '/Js/api.js', revision: 2 },
  { url: '/Js/idb.js', revision: 2 },
  { url: '/Js/db.js', revision: 2 },
  { url: '/nav.html', revision: 2 },
  { url: '/Pages/Teams.html', revision: 2 },
  { url: '/Pages/Favorit.html', revision: 2 },
  { url: '/Pages/Klasmen.html', revision: 2 },
  { url: 'Images/Favicon/apple-icon-57x57.png', revision: 2 },
  { url: 'Images/Favicon/apple-icon-60x60.png', revision: 2 },
  { url: 'Images/Favicon/apple-icon-72x72.png', revision: 2 },
  { url: 'Images/Favicon/apple-icon-76x76.png', revision: 2 },
  { url: 'Images/Favicon/apple-icon-114x114.png', revision: 2 },
  { url: 'Images/Favicon/apple-icon-120x120.png', revision: 2 },
  { url: 'Images/Favicon/apple-icon-144x144.png', revision: 2 },
  { url: 'Images/Favicon/apple-icon-152x152.png', revision: 2 },
  { url: 'Images/Favicon/apple-icon-180x180.png', revision: 2 },
  { url: 'Images/Favicon/android-icon-192x192.png', revision: 2 },
  { url: 'Images/Favicon/favicon-32x32.png', revision: 2 },
  { url: 'Images/Favicon/favicon-96x96.png', revision: 2 },
  { url: 'Images/Favicon/favicon-16x16.png', revision: 2 },
  { url: 'Images/Favicon/ms-icon-144x144.png', revision: 2 },
  { url: 'Images/Icon/MS_ICON.png', revision: 2 },
  { url: '/Fonts/MA.woff2', revision: 2 }
])

registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({ cacheName: 'images' })
)

registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({ cacheName: 'google-fonts-stylesheets' })
)


// Menyimpan cache untuk file font selama 1 tahun
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({ cacheName: 'google-fonts-webfonts' })
)

registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  new StaleWhileRevalidate({
    cacheName: 'api-football-data',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] })
    ]
  })
)

self.addEventListener('push', event => {
  let bodyData
  if (event.data) {
    bodyData = event.data.text()
  } else {
    bodyData = 'Push message no payload'
  }
  const options = {
    body: bodyData,
    icon: 'Images/Icon/MS_ICON.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  )
})