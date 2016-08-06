/* global cookieHelper */

function CookieStorage(maxAge, path) {
    var cookies = cookieHelper.getCookies();
    var keys = cookieHelper.getKeys(cookies);
    
    this.length = keys.length;
    this.key = function(n){
        if (n < 0 || n >= keys.length) {
            return null;
        }
        return keys[n];
    };
    
    this.getItem = function(name) {
        return cookies[name] || null;
    };
    
    this.setItem = function(key, value){
        if (!(key in cookies)){
            keys.push(key);
            this.length++;
        }
        
        cookies[key] = value;
        cookieHelper.setCookie(key, value, {
            'max-age': maxAge,
            'path': path
        });
    };
    
    this.removeItem = function(key){
        if (!(key in cookies)) {
            return;
        }
        
        delete cookies[key];
        
        for (var index = 0; index < keys.length; index++){
            if (keys[index] === key) {
                keys.splice(index, 1);
                break;
            }
        }
        this.length--;
        
        cookieHelper.deleteCookie(key);
    };
    
    this.clear = function() {
        for (var index = 0; index < keys.length; index++){
            cookieHelper.deleteCookie(keys[index]);
        }
        cookies = {};
        keys = [];
        this.length = 0;
    };   
}