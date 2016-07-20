var table = new Array(10);
for (var i = 0; i < table.length; i++){
    table[i] = new Array(10);
}

for (var row = 0; row < table.length; row++) {
    for (var column = 0; column < table[row].length; column++) {
        table[row][column] = row * column;
    }
}

var product = table[5][7];

