function FilteredSetSubclassFactory(superclass, filter) {
    var constructor = function () {
        superclass.apply(this, arguments);
    };

    constructor.prototype = Object.inherit(superclass.prototype);
    var prototype = constructor.prototype;
    prototype.constructor = constructor;

    prototype.add = function () {
        for (var index = 0; index < arguments.length; index++) {
            var value = arguments[index];
            if (!filter(value)) {
                throw new ('value ' + value + ' rejected by filter');
            }
        }
        superclass.prototype.add.apply(this, arguments);
    };

    return constructor;
}