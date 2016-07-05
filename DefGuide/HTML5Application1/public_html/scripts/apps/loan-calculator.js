'use strict';
function calculate(){
    var getElementById = document.getElementById.bind(document);
    
    var inputs = getElements([
        'loanAmount', 'annualInterest', 'repaymentPeriod', 'zipcode'
    ]);
    var outputs = getElements([
        'monthlyPayment', 'totalPayment', 'totalInterest'
    ]);
            
    
    function getElements (keys){
        var elements = {};
        keys.forEach(function(key){
            elements[key] = getElementById(key);
        });
        return elements;
    }
}