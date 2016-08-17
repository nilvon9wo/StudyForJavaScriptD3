Blob.getBlob = Blob.getBlob || function(url, callback) {
        'use strict';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.onload = function() {
            callback(xhr.response);
        };
        xhr.send(null);
    };

Blob.getBlobUrl = Blob.getBlobUrl ||
    (window.URL && URL.createObjectURL.bind(URL)) ||
    (window.webkitURL && webkitURL.createObjectURL.bind(webkitURL)) ||
    window.createObjectURL;

Blob.revokeBlobUrl = Blob.revokeBlobUrl ||
    (window.URL && URL.revokeObjectURL.bind(URL)) ||
    (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL)) ||
    window.revokeObjectURL;

Blob.read = Blob.read || function(file) {
        'use strict';
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            var text = reader.result;
            var output = document.getElementById('output');
            output.innerHTML = '';
            output.appendChild(document.createTextNode(text));
        };
        reader.onerror = function(event) {
            console.error('Error', event);
        };
    };

Blob.typefile = Blob.typefile || function(file) {
        'use strict';
        var slice = file.slice(0, 4);
        var reader = new FileReader();
        reader.readAsArrayBuffer(slice);
        reader.onload = function(event) {
            var buffer = reader.result;
            var view = new DataView(buffer);
            var magic = view.getUint32(0, false);

            switch (magic) {
                case 0x89504E47:
                    file.verified_type = "image/png";
                    break;
                case 0x47494638:
                    file.verified_type = "image/gif";
                    break;
                case 0x25504446:
                    file.verified_type = "application/pdf";
                    break;
                case 0x504b0304:
                    file.verified_type = "application/zip";
                    break;
            }

            console.info(file.name, file.verified_type);
        }
    };



