if (element.addEventListener){
  element.addEventListener('keydown', handler, false);
  element.addEventListener('keypress', handler, false);
} else if (element.attachEvent) {
  element.attachEvent('onkeydown', handler);
  element.attachEvent('onkeypress', handler);
} else {
  element.onkeydown = element.onkeypress = handler;
}