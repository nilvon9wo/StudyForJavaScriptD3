'use strict';

function calculate() {
    var inputs = getElements(['loanAmount', 'annualInterest', 'repaymentPeriod', 'zipcode']);

    display(convert(inputs));
    save(inputs);
    setLenders(inputs);

    function getElements(elements) {
        var collection = {};
        elements.forEach(function(element){
            collection[element] = document.getElementById(element);
        });
        return collection;
    }

    function convert(inputs){
        var principal = parseFloat(inputs.loanAmount);
        var interest = parseFloat(inputs.annualInterest) / 100 / 12;
        var paymentQuantity = parseFloat(inputs.repaymentPeriod) * 12;

        var x = Math.pow(1 + interest, paymentQuantity);
        var monthlyPayment = (principal * x * interest)/(x - 1);

        var totalPayments = monthlyPayment * paymentQuantity;

        return {
            monthlyPayment: monthlyPayment,
            paymentQuantity: paymentQuantity,
            principal : principal,
            totalPayments: totalPayments
        }
    }

    function display(calculations){
        var outputs = getElements(['monthlyPayment', 'totalPayment', 'totalInterest']);

        if (isFinite(calculations.monthlyPayment)) {
            setInner('monthlyPayment', calculations.monthlyPayment);
            setInner('totalPayments', calculations.totalPayments);
            setInner('totalInterest', calculations.totalPayments - calculations.principal);
            chart(outputs);
        }
        else {
            setInner('monthlyPayment', '');
            setInner('totalPayments', '');
            setInner('totalInterest', '');
            chart();
        }


        function setInner(fieldName, value){
            outputs[fieldName].innerHTML = value.toFixed(2);
        }

        function chart(outputs){
            // TODO
        }
    }

    function save(inputs){
        if (window.localStorage){
            inputs.forEachOwnProperty(store);
        }

        function store(key){
            localStorage[key] = inputs[key];
        }

    }

    function setLenders(inputs){
        try {
            // TODO
        }
        catch (e) {}

    }
}