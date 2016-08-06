var memory = document.createElement('div');
memory.id = '_memory';
memory.style.display = 'none';
memory.style.behavior = 'url(\'#default#userData\')';
document.body.appendChild(memory);

memory.load('myStoredData');
var userName = memory.getAttribute('userName');
if (!name) {
    userName = prompt('What is your name?');
    memory.setAttribute('userName', userName);
    memory.save('myStoredData');
}

var now = (new Date()).getTime();
var expires = now + 100 * 24 * 60 * 60 * 1000;
expires = new Date(expires).toUTCString();
memory.expires = expires;

