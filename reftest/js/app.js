// Registering ServiceWorker
if ( 'serviceWorker' in navigator ) {
  navigator.serviceWorker.register( 'sw.js' ).then(function(registration) {

    // Registration was successful
    registration.update();
    console.log( 'ServiceWorker registration successful. Scope: ' + registration.scope )
  }).catch(function(err) {

    // Registration failed with error
    console.log( 'ServiceWorker registration failed. Error: ' + err);
  });
}