function smear(image) {
    'use strict';
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    var pixels = context.getImageData(0, 0, image.width, image.height);

    var worker = new Worker('scripts/utilities/SmearWorker.js');
    worker.postMessage(pixels);

    worker.onmessage = function(event) {
        if (typeof event.data === 'string') {
            console.error('Worker: ' + event.data);
            return;
        }

        var smearedPixels = event.data;

        var context = canvas.getContext('2d');
        console.log('smeared_pixels', smearedPixels);
        context.putImageData(smearedPixels, 0, 0);
        image.src = canvas.toDataURL();
        worker.terminate();
        canvas.width = canvas.height = 0;
    };
}