function onLoad(func){
  if (onLoad.loaded){
    window.setTimeout(func, 0);
  } else if (window.addEventListener) {
    window.addEventListener('load', func. false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', func);
  }
}

onLoad.loaded = false;
onLoad(function(){
  onLoad.loaded = true;
});