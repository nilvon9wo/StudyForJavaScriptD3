var userName = localStorage.userName;
userName = localStorage['userName'];
if (!userName) {
    userName = prompt('What is your name?');
    localStorage.userName = userName;
}

for (var property in localStorage) {
    var value = localStorage[property];
}

localStorage.x = 10;
var x = parseInt(localStorage.x);

localStorage.lastRead = (new Date().toUTCString());
var lastRead = new Date(Date.parse(localStorage.lastRead));

localStorage.data = JSON.stringify(data);
var data = JSON.parse(localStorage.data);

localStorage.setItem('x', 1);
localStorage.getItem('x');

for (var index = 0; index < localStorage.length; index++){
    var name = localStorage.key(index);
    var value = localStorage.getItem(name);
}

localStorage.removeItem('x');
localStorage.clear();

localStorage.original = {x:1};
localStorage.original.x = 2;
localStorage.original.x;
localStorage.getItem('o').x = 2;

var memory = window.localStorage || 
        (window.UserDataStorage && new UserDataStorate()) ||
        new CookieStorage();
userName = memory.getItem('userName');