var ui = ['input', 'prompt', 'heading'];

ui.forEach(function(id){
  ui[id] = document.getElementById(id);
});

var $ = function (id) {
  return document.getElementById(id);
};

ui.prompt = $('prompt');

var w = window.open(
  'about:blank', 
  'smallwin', 
  'width=400,height=350,status=yes,resizable=yes'
);

if (w){
  w.alert('About to visit http://www.example.com');
  w.location = 'http://www.example.com';  
  w.close();
}


var iframeElement = document.getElementById('f1');
var childFrame = iframeElement.contentWindow;

