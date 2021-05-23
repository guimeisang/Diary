const OFFICE_CACHE = 'v1'
this.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(OFFICE_CACHE).then(function(cache) {
      return cache.addAll([
        '/sw/sw/index.html',
        '/sw/sw/snowTroopers.jpg'
      ])
    })
  )
})

this.addEventListener('activate', function(e) {

})

this.addEventListener('fetch', function(e){
  e.respondWith(
    caches.open(OFFICE_CACHE).then(function(e) {
      return cache.match(e.request.url)
    })
  )
})