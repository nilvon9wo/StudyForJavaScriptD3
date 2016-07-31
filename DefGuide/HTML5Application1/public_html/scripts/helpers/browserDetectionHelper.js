var browserDetectionHelper = {
    isFirefox: navigator.userAgent.indexOf('Gecko') !== -1,
    
    isMacWebkit: navigator.userAgent.indexOf('Macintosh') !== -1 &&
                navigator.userAgent.indexOf('WebKit') !== -1
};