var matrix = get2dNumberArray();
var sum = 0;
var success = false;

computeSum: if (matrix){
    for (var x = 0; x < matrix.length; x++){
        var row = matrix[x];
        if (!row){
            break computeSum;
        }
        for (var y = 0; y < row.length; y++){
            var cell = row[y];
            if (isNaN(cell)) {
                break computeSum;
            }
            sum += cell;
        }
    }
    success = true;
}




function get2dNumberArray(){
    'use strict';

}