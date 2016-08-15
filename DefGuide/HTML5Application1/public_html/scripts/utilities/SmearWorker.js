onmessage = function(event) {
    'use strict';
    postMessage(smear(event.data));
};

function smear(pixels) {
    'use strict';
    var data = pixels.data;
    var width = pixels.width;
    var height = pixels.height;
    var n = 10;
    var m = n - 1;

    for(var row = 0; row < height; row++) {
        var index = row * width * 4 + 4;
        for (var column = 1; column < width; column++, index +=4) {
            transcribe(index, 0);
            transcribe(index, 1);
            transcribe(index, 2);
            transcribe(index, 3);
        }
    }

    return pixels;

    function transcribe(index, diff){
        data[index+diff] = (data[index+diff] + data[index-4-diff] * m)/n;
    }

}