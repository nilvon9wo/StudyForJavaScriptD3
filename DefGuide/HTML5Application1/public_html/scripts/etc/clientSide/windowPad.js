function newDate() {
  return new Date().toString();
}


window.location = 'about:blank';
document.open();
document.write('<html><body></body></html>');
document.close();

var timestamp = document.getElementById('timestamp');
if (!timestamp){
  timestamp = document.createElement('a');
}
if (timestamp.firstChild === null){
  timestamp.appendChild(document.createTextNode(newDate()));
}
var body = document.getElementsByTagName('body')[0];
body.appendChild(timestamp);

timestamp.style.backgroundColor = 'yellow';
timestamp.className = 'highlight';
timestamp.onclick = function(){
  this.innerHTML = newDate();
}
