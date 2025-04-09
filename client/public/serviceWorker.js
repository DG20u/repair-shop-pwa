const CACHE_NAME = 'repair-shop-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
  '/favicon.ico'
];

// Instalación del Service Worker
this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.forEach(cacheName => {
          if (cacheName !== CACHE_NAME) {
            caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar peticiones
this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Sincronización en segundo plano
this.addEventListener('sync', event => {
  if (event.tag === 'sync-posts') {
    event.waitUntil(syncPosts());
  }
});

// Función para obtener posts desde IndexedDB
async function getPostsFromIndexedDB() {
  // Implementación simulada para obtener posts
  return [
    { id: 1, data: { title: 'Post 1', content: 'Content 1' }, token: 'exampleToken1' },
    { id: 2, data: { title: 'Post 2', content: 'Content 2' }, token: 'exampleToken2' }
  ];
}

// Función para sincronizar posts
async function syncPosts() {
  try {
    const postsToSync = await getPostsFromIndexedDB();
    
    for (const post of postsToSync) {
      await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${post.token}`
        },
        body: JSON.stringify(post.data)
      });
      
      await removePostFromIndexedDB(post.id);
    }
  } catch (error) {
    console.error('Error syncing posts:', error);
  }
}

// Función para eliminar un post de IndexedDB
async function removePostFromIndexedDB(postId) {
  // Implementación simulada para eliminar un post
  console.log(`Post con ID ${postId} eliminado de IndexedDB`);
}