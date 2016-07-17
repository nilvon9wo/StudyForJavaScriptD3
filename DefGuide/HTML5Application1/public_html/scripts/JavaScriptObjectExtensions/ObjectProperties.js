(function () {
    
    function ObjectProperties(obj, propertyNames) {
        this.obj = obj;
        this.propertyNames = propertyNames;
    }

    ObjectProperties.extendPrototype({
        descriptors: function () {
            var obj = this.obj;
            var description = {};
            this.propertyNames.forEach(function (propertyName) {
                if (obj.hasOwnProperty(propertyName)) {
                    description[propertyName] = Object.getOwnPropertyDescriptor(obj, propertyName);
                }
            });
            return description;
        },
        freeze: function () {
            this.modifyProperty({writable: false, configurable: false});
        },
        hide: function () {
            this.modifyProperty({enumerable: false});
        },
        modifyProperty: function (config) {
            var obj = this.obj;
            this.propertyNames.forEach(function (propertyName) {
                if (obj.hasOwnProperty(propertyName)) {
                    Object.defineProperty(obj, propertyName, config);
                }
            });
            return this;
        },
        toString: function () {
            var obj = this.obj;
            var lines = this.propertyNames.map(nameToString);
            return '{\n ' + lines.join(',\n ') + '\n}';

            function nameToString(name) {
                var string = '';
                var description = Object.getOwnPropertyDescriptor(obj, name);
                if (!description) {
                    return 'nonexistent ' + name + ': undefined';
                }
                if (!description.configurable) {
                    string += 'permanent ';
                }
                if ((description.get && !description.set) || !description.writable) {
                    string += 'readonly ';
                }
                if (!description.enumerable) {
                    string += 'hidden ';
                }
                if (description.get || description.set) {
                    string += 'accessor ' + name;
                } else {
                    var value = (typeof description.value === 'function') ?
                            'function' :
                            description.value;
                    string += name + ': ' + value;
                }
                return string;
            }
        }
    });

    function properties() {
        var propertyNames;
        switch (arguments.length) {
            case 0 :
                propertyNames = Object.getOwnPropertyNames(this);
                break;
            case 1 :
                propertyNames = arguments[0];
                break;
            default :
                propertyNames = Array.prototype.splice.call(arguments, 0);
        }
        return new ObjectProperties(this, propertyNames);
    }

    Object.defineProperty(Object.prototype, 'properties', {
        value: properties,
        enumerable: false,
        writable: true,
        configurable: true
    });

    ObjectProperties.prototype.properties().hide();
}());