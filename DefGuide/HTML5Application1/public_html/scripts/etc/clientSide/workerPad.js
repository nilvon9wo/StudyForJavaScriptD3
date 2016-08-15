var worker = new Worker('scripts/utilities/workerLoader.js');
worker.postMessage('file.txt');

