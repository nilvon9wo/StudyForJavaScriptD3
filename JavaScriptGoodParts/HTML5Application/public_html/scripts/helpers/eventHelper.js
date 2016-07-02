var eventually = function(that){
    var registry = {};
    
    that.fire = function(event){
      var type = typeof event === 'string' ? event : event.type;
      
      if (registry.hasOwnProperty(type)){
          var array = registry[type];
          for (var i=0; i < array.length; i++){
              var handler = array[i];
              var func = handler.method;
              if (typeof func === 'string'){
                  func = this[func];
              }
              func.apply(this, handler.parameters || [event]);
          }
      }
      return this;
    };
    
    that.on = function(type, method, parameters){
        var handler = {
            method: method,
            parameters: parameters
        };
        if (registry.hasOwnProperty(type)){
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };
    
    return that;
};

eventually(that);