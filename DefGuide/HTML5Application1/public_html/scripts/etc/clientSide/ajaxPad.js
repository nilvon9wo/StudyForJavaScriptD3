var progress = document.getElementById('progress');

var request = new XMLHttpRequest();
request.open('GET', 'data.csv');
request.setRequestHeader('Content-Type', 'text/plain');
request.overrideMimeType('text/plain; charset=utf-8');
request.onprogress = function(event) {
    if (event.lengthComputable) {
        progress.innerHTML = Math.round(100 * event.loaded / event.total) + '% Complete';
    }
};
request.send(null);