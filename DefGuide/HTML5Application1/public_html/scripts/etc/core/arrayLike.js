var arrayLike = {};
var index = 0;
while (index < 10){
    arrayLike[index] = index * index;
    index++;
}
array.length = index;

var total = 0;
for (var j = 0; j < arrayLike.length; j++){
    total += arrayLike[j];
}

