window.onload = function() {
    'use strict';
    var dropTarget = document.getElementById('dropTarget');

    dropTarget.ondragenter = function(event) {
        var types = event.dataTransfer.types;
        if (!types ||
            (types.contains && types.contains('Files')) ||
            (types.indexOf && types.indexOf('Files') !== -1)
        ) {
            dropTarget.classList.add('active');
            return false;
        }
    };

    dropTarget.ondragleave = function() {
        dropTarget.classList.remove('active');
    };

    dropTarget.ondragover = function() {
        return false;
    };

    dropTarget.ondrop = function(event) {
        var files = event.dataTransfer.files;

        files.toArray().forEach(function(file) {
            var type = file.type;
            if (type.substring(0, 6) === 'image/') {
                var image = document.createElement('img');
                image.src = Blob.getBlobUrl(file);
                image.onload = function() {
                    this.width = 100;
                    document.body.appendChild(this);
                    Blob.revokeBlobUrl(this.src);
                }
            }
        });

        dropTarget.classList.remove('active');
        return false;
    }
};