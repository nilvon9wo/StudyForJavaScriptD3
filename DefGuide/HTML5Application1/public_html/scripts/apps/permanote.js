/* global eventHelper */

var editor;
var statusLine;
var saveButton;
var idleTimer;

function save() {
    if (idleTimer) {
        clearTimeout(idleTimer);
    }
    idleTimer = null;

    if (navigator.onLine) {
        noteRequest('PUT', editor.value, function () {
            localStorage.lastSaved = Date.now();
            saveButton.disabled = true;
        });
    }
}

function noteRequest(method, data, callback) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method, '/note');
    xmlHttpRequest.send(data);
    xmlHttpRequest.onload = callback(xmlHttpRequest);
}

function sync() {
    if (navigator.onLine) {
        noteRequest('GET', undefined, function (xmlHttpRequest) {
            var remoteModTime = 0;
            if (xmlHttpRequest.status === 200) {
                var remoteModTime = xmlHttpRequest.getAllResponseHeader('Last-Modified');
                remoteModTime = new Date(remoteModTime).getTime();
            }

            if (remoteModTime > localStorage.lastModified) {
                confirmedSync(xmlHttpRequest);
            } else {
                status('You are editng the current version of the note.');
            }

            if (localStorage.lastModified > localStorage.lastSaved) {
                save();
            }
        });
    } else {
        status('Can\'t sync while offline');
    }

    editor.disabled = false;
    editor.focus();
    
    function confirmedSync(xmlHttpRequest) {
                status('Newer note found on server.');
                var useIt = confirm('There is a newer version of the note on the server.\n' +
                        'Click Ok to use that version\n' +
                        'or click Cancel to continue editing this version and overwrite the server.\n');
                var now = Date.now();
                if (useIt) {
                    editor.value = localStorage.note = xmlHttpRequest.responseText;
                    localStorage.lastSaved = now;
                    status('Newest version downloaded.');
                } else {
                    status('Ignoring newer version of the note.');
                }
                localStorage.lastModified = now;
    }
    
}

window.onbeforeload = function () {
    if (localStorage.lastModified > localStorage.lastSaved) {
        save();
    }
};

window.onoffline = function () {
    status('Offline');
};

window.ononline = function () {
    sync();
};


whenReady(function () {
    localStorage.note = localStorage.note || '';
    localStorage.lastModified = localStorage.lastModified || 0;
    localStorage.lastSaved = localStorage.lastSaved || 0;

    editor = prepareEditor();
    statusLine = document.getElementById('statusLine');
    saveButton = document.getElementById('saveButton');
    sync();

    function prepareEditor() {
        editor = document.getElementById('editor');
        editor.value = localStorage.note;
        editor.disabled = true;
        eventHelper.addEvent(editor, 'input', function() {
            localStorage.note = editor.value;
            localStorage.lastModified = Date.now();
            if (idleTimer) {
                setTimeout(save, 5000);
            }
            saveButton.disabled = false;
        });
        return editor;
    }
}); 