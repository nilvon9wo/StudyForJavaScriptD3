var blob = null;
blob.size
blob.type
var subBlob = blob.slice(0, 1024, 'text/plain');
var last = blob.slice(blob.size - 1024, 1024);

var blobBuilder = new BlobBuilder();
blobBuilder.append('This blob contains this text and 10 big-endian 32-bit signed ints');
blobBuilder.append('\0');

var arrayBuffer = new ArrayBuffer(4 * 10);
var dataView = new DataView(arrayBuffer);
for (var index = 0; index < 10; index++) {
    dataView.setInt32(index * 4, index);
}
blobBuilder.append(arrayBuffer);
var blob = blobBuilder.getBlob('x-optional/mime-type-here');