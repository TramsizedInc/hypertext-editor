
var buildDateTime = '${buildDateTime}';

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('/editor/service-worker.js');

    var refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', function() {
        console.log('reloading');
        if (refreshing) {
            return;
        }
        refreshing = true;
        window.location.reload();
    });

    navigator.serviceWorker.ready.then(function(){
        console.log('ready');
    });


}

function postMessage(message){
  if(navigator.serviceWorker.controller){
    navigator.serviceWorker.controller.postMessage(message);
  } else {
    console.log('no controller');
  }
}