const cidPattern = /\/ipfs\/([^\/\s]+)/

self.addEventListener('install', (event) => {
  log('Service Worker installing.')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  log('Service Worker activating.')
})

self.addEventListener('fetch', (event) => {
  log('Fetching:', event.request.url)
  const cidMatch = event.request.url.match(cidPattern)
  if (cidMatch) {
    const localGatewayUrl = `http://127.0.0.1:8080/ipfs/${cidMatch[1]}`
    log('intercepting cid request and fetching from local gateway:', localGatewayUrl)
    event.respondWith(fetch(localGatewayUrl))
  }
})

function log(...args) {
  console.log('sw: ', ...args)
}

function err(...args) {
  console.error('sw: ', ...args)
}
