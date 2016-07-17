var Class = {
    defineJavalikeClass: function (constructor, methods, statics) {
        if (!constructor || typeof constructor !== 'function') {
            throw new Error('constructor must be a constructor function');
        }

        if (methods) {
            constructor.extendPrototype(methods);
        }

        if (statics) {
            constructor.extend(statics);
        }

        return constructor;
    },
    defineJavalikeSubclass: function (superclass, constructor, methods, statics) {
        if (!superclass || superclass.prototype) {
            throw new Error('superclass must be an object');
        }    
        if (!constructor || typeof constructor !== 'function') {
            throw new Error('constructor must be a constructor function');
        }    
        
        constructor.prototype = Object.inherit(superclass.prototype);
        constructor.prototype.constructor = constructor;
        return this.defineJavalikeClass(constructor, methods, statics);
    }
};



        