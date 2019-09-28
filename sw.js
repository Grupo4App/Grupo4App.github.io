
var CACHENAME = "cachestore-v1";

const recursosEstaticos = [
  'css/materialize.min.css',  
  'js/materialize.min.js' , 
  'icons/512.png',
  'icons/192.png',
	'index.html',
	'trabajos.html',
	'imagenes/Paez.jpg',
	'imagenes/Fuentes.jpg',
	'imagenes/Douce.jpg'
];

self.addEventListener('install', function(event) 
{
  event.waitUntil
  (
    caches.open(CACHENAME).then(function(cache) 
       {
        return cache.addAll(recursosEstaticos);
       })
  );
});

self.addEventListener('activate', function(event)  {
	var version = 'v1'; 
	event.waitUntil(
			       caches.keys()
			       .then(cacheNames =>
				    Promise.all(
				       cacheNames
				       .map(c => c.split('-'))
				       .filter(c=> c[0] === 'cachestore')
				       .filter(c => c[1] !== version)
				       .map(c => caches.delete(c.join('-')))
				       )
				     )
			       );
});

					       
			       

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

