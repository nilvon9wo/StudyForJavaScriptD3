function handlePhoto (error, photo) {
    if (error) {
        console.error('Download error', error);
    } else {
        console.log('Download finished', photo);
    }
    
}

downloadPhoto('http://coolcats.com/cat.gif', handlePhoto);
console.log('Download started');