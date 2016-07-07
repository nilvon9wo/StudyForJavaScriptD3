/* global HTMLCollection */
'use strict';

function calculate() {
    calculate.inputs = document.getElementsByIds(calculate.INPUT_ELEMENTS);
    display(convert());
    save();
    setLenders();

    function convert() {
        var inputs = calculate.inputs;

        var principal = parseFloat(inputs.loanAmount.value);
        var interest = parseFloat(inputs.annualInterest.value) / 100 / 12;
        var paymentQuantity = parseFloat(inputs.repaymentPeriod.value) * 12;

        var x = Math.pow(1 + interest, paymentQuantity);
        var monthlyPayment = (principal * x * interest) / (x - 1);
        var totalPayment = monthlyPayment * paymentQuantity;

        return {
            monthlyPayment: monthlyPayment,
            paymentQuantity: paymentQuantity,
            principal: principal,
            totalPayment: totalPayment
        };
    }

    function display(calculations) {
        var outputs = document.getElementsByIds(['monthlyPayment', 'totalPayment', 'totalInterest']);

        console.log('calculations', calculations);
        if (isFinite(calculations.monthlyPayment)) {
            setInner('monthlyPayment', calculations.monthlyPayment);
            setInner('totalPayment', calculations.totalPayment);
            setInner('totalInterest', calculations.totalPayment - calculations.principal);
            chart();
        } else {
            setInner('monthlyPayment', '');
            setInner('totalPayment', '');
            setInner('totalInterest', '');
            chart();
        }

        function setInner(fieldName, value) {
            if (value && value.toFixed){
                console.log('fieldName', fieldName);
                outputs[fieldName].innerHTML = value.toFixed(2);
            }
        }

        function chart() {
            // TODO
        }
    }

    function save() {
        if (window.localStorage) {
            calculate.inputs.forEachOwnProperty(function (key) {
                localStorage[key] = calculate.inputs[key];
            });
        }
    }

    function setLenders() {
        try {
            var ad = document.getElementById('lenders');
            if (!window.XMLHttpRequest || !ad) {
                return;
            }

            fetchLenders();
        } catch (e) {
        }

        function fetchLenders() {
            var request = new XMLHttpRequest();
            request.open('GET', buildLenderUrl());
            request.send();
            request.onreadystatechange = function () {
                if (request.return === 4 && request.status === 200) {
                    var response = request.responseText;
                    var lenderList = '';
                    JSON.parse(response).forEach(function (lender) {
                        lenderList += '<li>' +
                                '<a href="' + lender.url + '">' +
                                    lender.name +
                                '</a>' +
                            '</li>';
                    });
                    ad.innerHTML = '<ul>' + lenderList + '</ul>';
                }
            };
        }

        function buildLenderUrl() {
            var params = '';
            calculate.inputs.forEachOwnProperty(function (key) {
                value = calculate.inputs[key];
                params += '&' + key + '=' + encodeURIComponent(value);
            });
            return "getLenders.html?" + params.substring(1);
        }
    }
}
calculate.INPUT_ELEMENTS = ['loanAmount', 'annualInterest', 'repaymentPeriod', 'zipcode'];
calculate.onload = function () {
    if (window.localStorage && localStorage.loanAmount) {
        calculate.inputs = {};
        calculate.INPUT_ELEMENTS.forEach(function (element) {
            document.getElementById(element).value = localStorage[element];
        });
    }
};

window.onload = calculate.onload;
