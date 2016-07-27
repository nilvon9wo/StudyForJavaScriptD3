window.onerror = function (message, url, lineNumber) {
  if (onerror.number++ < onerror.max) {
    alert ('ERRROR: ' + message + '\n' + url + ':' + lineNumber);
    return true;
  }
}

onerror.max = 3;
onerror.number = 0;
