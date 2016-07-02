// Global ----------------------------------------------

function isArray (value){
    return value &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            typeof value.splice === 'function' &&
            !(value.propertyIsEnumerable('length'));
};

// Instance ---------------------------------------

Array.method('flatten', function makeFlat(){
    function makeFlat(item, newArray){
        if (item.isArray()){
            item.forEach(function(innerItem){
                if (innerItem.isArray){
                    return makeFlat(innerItem, newArray);
                }
                else {
                    newArray.push(innerItem);
                    return newArray;
                }
            });
        }
        else {
            newArray.push(item);
            return newArray;
        }
        
        return newArray;
    }
    return makeFlat(this, []);
});

Array.method('isArray', function(){
   return isArray(this);
});

Array.method('reduce', function(func, value){
    for (var i = 0; i < this.length; i += 1){
        value = func(this[i], value);
    }
    return value;
});

// Static --------------------------------------------

Array.dim = function(dimension, initial){
    var array = [];
    for (var i = 0; i < dimension; i++){
        array[i] = initial;
    }
    return array;
};

Array.identity = function(n){
  var matrix = Array.matrix(n, n, 0);
  for (var i = 0; i < n; i++){
      matrix[i][i] = 1;
  };
  return matrix;
};

Array.matrix = function(m, n, initial){
    var matrix = [];
    for (var i = 0; i < m; i++){
        var innerArray = [];
        for (var j = 0; j < n; j++){
            innerArray[j] = initial;
        }
        matrix[i] = innerArray;
    }
    
    return matrix;
};
