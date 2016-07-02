var sampleObject = function(){
    var value = 0;

    return {
        getValue: function(){
            return value;
        },
        double: function(){
            var helper = function(){
                    value = add(value, value);
            };

            helper();
        },
        increment: function(_increment){
            value += typeof _increment === 'number' ? _increment : 1;
        }
    };
}();