var bytes = new Uint8Array(1024);
for (var index = 0; index < bytes.length; index ++) {
    bytes[index] = index & 0xFF;
}
var copy = new Uint8Array(bytes);
var ints = new new Int32Array([0,1,2,3]);

var matrix = new Float64Array(9);
var _3DPoint = new Int16Array(3);
var rgba = new Uint8Array(4);
var sudoku = new Uint8Array(81);

var bytes = new Uint8Array(1024);
var pattern = new Uint8Array([0,1,2,3]);
bytes.set(pattern);
bytes.set(pattern, 4);
bytes.set([0,1,2,3,], 8);

var ints = new Int16Array([0,1,2,3,4,5,6,7,8,9]);
var last3 = ints.subarray(ints.length - 3, ints.length);
last3[0];

ints[9] = -1;
last3[2];

var bytes = new Uint8Array(8);
bytes[0] = 1;
bytes.buffer[0];
bytes.buffer[1] = 255;
bytes.buffer[1];
bytes.[1];

var buffer = new ArrayBuffer(1024 * 1024);
var asBytes = new Uint8Array(buffer);
var asInts = new Int32Array(buffer);
var lastKilobyte = new Uint8Array(buffer, 1023 * 1024);
var ints2 = new Int32Array(buffer, 1024, 256);

var isLittleEndian === new Int8Array(new Int32Array([1]).buffer)[0] === 1;

var data;
var view= DataView(data);
var int = view.getInt32(0);
int = view.getInt32(4, false);
int = view.getInt32(8, true);
view.setInt32(8, int, false);
