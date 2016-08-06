applicationCache.onchecking = function () {
    status('Checking for a new version.');
    return false;
};

applicationCache.onnoupdate = function () {
    status('You are running the latest version of the application.');
    return false;
};

applicationCache.ondownloading = function () {
    status('Downloading new version.');
    window.progresscount = 0;
    return false;
};

applicationCache.onprogress = function (event) {
    var progress = '';
    progress = (event && event.lengthComputable) ?
            ' ' + Math.round(100 * event.loaded / event.total) + '%' :
            ' (' + ++window.progresscount + ')';
    status('Downloading new version:' + progress);
    return false;
};

applicationCache.oncached = function () {
    status('This application is now cached locally.');
    return false;
};

applicationCache.onupdateready = function () {
    status('A new version of this application is available.');
    offerReload('A new version of this application is available\n' +
            'and will be used the next time you reload.'
            );
};

applicationCache.onerror = function (event) {
    status('Couldn\'t load manifest or cache application');
    return false;
};

applicationCache.onobsolete = function () {
    status('This application is no longer cached. ' +
            'Reload to get the latest version from the network');
    offerReload('This application is no longer cached\n' +
            'and the network will be used the next time you reload.');
};

function status(message) {
    document.getElementById('statusLine').innerHTML = message;
    console.warn(message);
}

function offerReload(message) {
    var reload = confirm(message +
            '\nDo you want to reload now?'
            );
    if (reload) {
        location.reload();
    }
}

