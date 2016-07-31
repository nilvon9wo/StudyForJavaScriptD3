var tableHelper = {
  makeSortable: function (table) {
      var headers = table.getElementsByTagName('th');
      for (var index = 0; index < headers.length; index++) {
          (function(n){
              headers[index].onclick = function() {
                  sortrows(table, n);
              };
          })(index);
      }
  },
    
  sortRows: function (table, n, comparator) {
      var tbody = table.tBodies[0];
      var rows = tbody.getElementsByTagName('tr');
      rows = Array.prototype.slice.call(rows, 0);
      
      rows.sort(function (row1, row2){
        function getCellValue(row){
            var cell = row.getElementByTagName('td')[n];
            return cell.textContent || cell.innerText;
        }
            
        var value1 = getCellValue(row1);
        var value2 = getCellValue(row2);
        if (comparator) {
            return comparator(value1, value2);
        }
        
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
      });
      
      for (var index = 0; index < rows.length; index++) {
          tbody.appendChild(rows[index]);
      }
  }
};


