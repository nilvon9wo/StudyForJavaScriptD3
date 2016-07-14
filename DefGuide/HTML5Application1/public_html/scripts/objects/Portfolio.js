var Portfolio = function(){ return new {
    addStock: function (stockName, shares){
        'use strict';
        this[stockName] = shares;
    },
    getValue: function(){
        'use strict';
        var total = 0.0;
        for (var stockName in this){
            var shares = this[stockName];
            var price = getQuote(stockName);
            total += shares * price;
        }
        return total;
    }
}};

function getQuote(stockName){
    'use strict';
    // ....     
}

