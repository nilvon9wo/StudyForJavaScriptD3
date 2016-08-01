whenReady(function() {
    var targetElements = document.getElementsByClassName('fileDropTarget');
    targetElements.toArray().forEach(function(target) {
        'use strict';
        var url = target.getAttribute('data-uploadto');
        if (url) {
            createFileUploadDropTarget(target, url);
        }
    });

    function createFileUploadDropTarget(target, url) {
        'use strict';
        var uploading = false;
        console.warn(target, url);

        target.ondragenter = function(event) {
            console.warn('dragenter');
            if (uploading) {
                return;
            }

            var types = event.dataTransfer.types;
            if (
                types &&
                (
                    (types.contains && types.contains('Files')) ||
                    (types.indexOf && types.indexOf('Files') !== -1)
                )
            ) {
                target.classList.add('wantdrop');
                return false;
            }
        };

        target.ondragover = function() {
            if (!uploading) {
                return false;
            }
        };

        target.ondragleave = function() {
            if (!uploading) {
                target.classList.remove('wantdrop');
            }
        };

        target.ondrop = function(event) {
            if (uploading) {
                return false;
            }

            var files = event.dataTransfer.files;
            if (files && files.length) {
                uploading = true;
                var message = 'Uploading files:' + createList(files);
                updateTarget(target, message);
                postFiles(files);
                return false;
            }
            target.classList('wantdrop');
        };
    }

    function createList(files) {
        return createElement('ul', undefined, function() {
            files.toArray().forEach(function(file) {
                createElement('li', undefined, file.name);
            });
        });
    }

    function updateTarget(target, message) {
        target.innerHTML = message;
        target.classList.remove('wantdrop');
        target.classList.add('uploading');
    }

    function postFiles(files) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        var body = new FormData();
        files.toArray().forEach(function(file, index) {
            body.append(index, file);
        });
        xhr.upload.onprogress = xmlHttpRequestProgressHelper.percentCompleteText;
        xhr.upload.onload = function(event) {
            uploading = false;
            target.classList.remove('uploading');
            target.innerHTML = 'Drop files to upload';
        };
        xhr.send(body);
    }
});