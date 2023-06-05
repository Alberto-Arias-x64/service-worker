const CACHE_NAME = 'app-vl'
self.addEventListener('fetch', myCustomFetch)
self.addEventListener('activate',clearCache)

function myCustomFetch(event) {
    const response = cacheOrFetch(event)
    event.respondWith(response)
}

async function cacheOrFetch(event) {
    let response = await caches.match(event.request)
    if (response) return response
    response = await fetch(event.request)
    if (!response || response.status !== 200 || response.type !== 'basic' || !isAssetCSS(event.request.url)) return response
    const clonedResponse = response.clone()
    caches.open(CACHE_NAME).then(caches =>{
        caches.put(event.request, clonedResponse)
    })
    return response
}

const assetsRegex = /.png|.gif|.jpg|.jpeg|.css|.js|.ttf|.webp/g
const isAssetCSS = url => assetsRegex.test(url)

function clearCache (event) {
    const deletePromise = caches.delete(CACHE_NAME)
    event.waitUntil(deletePromise)
}