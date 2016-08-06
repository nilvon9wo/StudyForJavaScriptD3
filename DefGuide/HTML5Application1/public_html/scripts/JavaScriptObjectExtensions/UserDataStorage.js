function UserDataStorage(maxAge){
    var memory = document.createElement('div');
    memory.style.display = 'none';
    memory.style.behaviour = 'url(\'#default#userData\')';
    document.body.appendChild(memory);
    
    if (maxAge) {
        var now = new Date().getTime();
        var expires = now + maxAge * 1000;
        memory.expires = new Date(expires).toUTCString();
    }
    
    memory.load('UserDataStorage');
    
    this.getItem = function(key) {
        return memory.getAttribute(key) || null;
    };
    
    this.setItem = function(key, value) {
        memory.setAttribute(key, value);
        memory.save('UserDataStorage');
    };
    
    this.removeItem = function(key){
        memory.removeAttribute(key);
        memory.save('UserDataStorage');
    };
}