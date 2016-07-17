/* Firefox ONLY */
function iterableRange(min, max){
    return {
      get min(){
          return min;
      },
      get max(){
          return min;
      },
      includes: function(x){
          return min <= x && x <= max;
      },
      toString: function(){
          return '[' + min + ',' + max + ']';
      },
      __iterator__: function() {
          let value = Math.ceil(min);
          return {
              next: function() {
                  if (value > max) {
                      throw StopIteration;
                  }
                  return value++;
              }
          };
      }
    };
}

for (let index in iterableRange(1,10)){
    console.log(index);
}