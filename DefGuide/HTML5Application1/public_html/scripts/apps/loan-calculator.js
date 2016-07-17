/* global HTMLCollection */
'use strict';

function calculate() {
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
        var totalPayments = monthlyPayment * paymentQuantity;

        return {
            interest: interest,
            monthlyPayment: monthlyPayment,
            paymentQuantity: paymentQuantity,
            principal: principal,
            totalPayments: totalPayments
        };
    }

    function display(calculations) {
        var outputs = document.getElementsByIds(['monthlyPayment', 'totalPayments', 'totalInterest']);
        var isValid = isFinite(calculations.monthlyPayment);

        var interest = calculations.interest;
        var monthlyPayment = calculations.monthlyPayment;
        var paymentQuantity = calculations.paymentQuantity;
        var totalPayments = calculations.totalPayments;
        var principal = calculations.principal;
        
        if (isValid) {
            setInner('monthlyPayment', monthlyPayment);
            setInner('totalPayments', totalPayments);
            setInner('totalInterest', totalPayments - principal);
            chart();
        } else {
            setInner('monthlyPayment', '');
            setInner('totalPayments', '');
            setInner('totalInterest', '');
            chart();
        }

        function setInner(fieldName, value) {
            if (value && value.toFixed){
                outputs[fieldName].innerHTML = value.toFixed(2);
            }
        }

        function chart() {
            var graph = document.getElementById('graph');
            if (!isValid || !graph || !graph.getContext){
                return;
            }

            clearAndResetCanvas();
            var graphWidth = graph.width;
            var graphHeight = graph.height;
            var graphContext = graph.getContext('2d');
            graphContext.font = 'bold 12px sans-serif';
            
            chartPayments();
            chartCumulativeEquity();
            chartLoanBalance();

            addYearlyTicks();
            markPaymentAmounts();
            
            function chartPayments(){
                plotCurve({
                    legend : 'Total Interest Payments',
                    legendY : 20,
                    color : '#f88',
                    isClosed: true,
                    isFilled : true,
                    makeLine: function(){
                        moveTo(0,0);
                        lineTo(paymentQuantity, monthlyPayment * paymentQuantity);
                        lineTo(paymentQuantity, 0);
                   }
                });
            }
            
            function chartCumulativeEquity(){
                plotCurve({
                    legend : 'Total Equity',
                    legendY : 35,
                    color : 'green',
                    isClosed : true,
                    isFilled : true,
                    makeLine: function(){
                        var equity = 0;
                        moveTo(0,0);
                        for (var payment = 1; payment <= paymentQuantity; payment++){
                            var thisMonthsInterest = (principal - equity) * interest;
                            equity += (monthlyPayment - thisMonthsInterest);
                            lineTo(payment, equity);
                        }
                        lineTo(paymentQuantity, 0);
                   }
                });
            }
            
            function chartLoanBalance(){
                plotCurve({
                    legend : 'Loan Balance',
                    legendY : 50,
                    isStroked: true,
                    makeLine: function(){
                        var balance = principal;
                        moveTo(0,balance);
                        for (var payment = 1; payment <= paymentQuantity; payment++){
                            var thisMonthsInterest = balance * interest;
                            balance -= (monthlyPayment - thisMonthsInterest);
                            lineTo(payment, balance);
                        }
                   }
               });
            }
            
            function plotCurve(config){
                if (!config || !config.makeLine || !config.legend || !config.legendY){
                    throw "Chart config is invalid.";
                }
                
                var color  = config.color || 'black';
                var isClosed = config.isClosed || false;
                var isFilled = config.isFilled || false;
                var isStroked = config.isStroked || false;
                var legendX = 20;
                
                graphContext.beginPath();
                config.makeLine();
                if (isClosed){
                    graphContext.closePath();
                }
                graphContext.fillStyle = color;
                if (isFilled){
                    graphContext.fill();
                }
                if (isStroked){
                    graphContext.lineWidth = 3;
                    graphContext.stroke();
                }
                graphContext.fillText(config.legend, legendX, config.legendY);
            }

            function addYearlyTicks(){
                graphContext.textAlign = 'center';
                var y = amountToPixels(0);
                for (var year = 1; year * 12 <= paymentQuantity; year++){
                    var x = paymentToPixels(year * 12);
                    graphContext.fillRect(x - 0.5, y - 3, 1, 3);
                    if (year === 1){
                        graphContext.fillText('Year', x, y - 5);
                    } else if ((year % 5 ===0) && (year * 12 !== paymentQuantity)){
                        graphContext.fillText(String(year), x, y - 5);
                    }
                }
            }
            
            function markPaymentAmounts(){
                graphContext.textAlign = 'right';
                graphContext.textBaseline = 'middle';
                var ticks = [monthlyPayment * paymentQuantity, principal ];
                var rightEdge = paymentToPixels(paymentQuantity);
                for (var i = 0; i < ticks.length; i++){
                    var y = amountToPixels(ticks[i]);
                    graphContext.fillRect(rightEdge - 3, y - 0.5, 3, 1);
                    graphContext.fillText(String(ticks[i].toFixed(0)), rightEdge - 5, y);
                }
            }

            function moveTo(payment, amount){
                graphContext.moveTo(paymentToPixels(payment), amountToPixels(amount));
            }
            
            function lineTo(payment, amount){
                graphContext.lineTo(paymentToPixels(payment), amountToPixels(amount));
            }

            function paymentToPixels(paymentNumber){
                return paymentNumber * graphWidth/paymentQuantity;
            }
            
            function amountToPixels(dollarAmount){
                var pixelsPerDollar = graphHeight/
                            (monthlyPayment * paymentQuantity * 1.05 );
                return graphHeight - (dollarAmount * pixelsPerDollar);
            }

            function clearAndResetCanvas(){
                graph.width = graph['width'];  // Magic!                
            }
            
        }
    }

    function save() {
        if (window.localStorage) {
            localStorage.loan = {};
            calculate.INPUT_ELEMENTS.forEach(function(key){
                localStorage['loan_' + key] = calculate.inputs[key].value;
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
                if (request.readyState === 4 && request.status === 200) {
                    var response = request.responseText;
                    var lenderList = '';
                    JSON.parse(response).toArray().forEach(function (lender) {
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
                currentValue = calculate.inputs[key];
                params += '&' + key + '=' + encodeURIComponent(currentValue);
            });
            return "./lenders/getLenders.json?" + params.substring(1);
        }
    }
}
calculate.INPUT_ELEMENTS = ['loanAmount', 'annualInterest', 'repaymentPeriod', 'zipcode'];
calculate.inputs = calculate.inputs || document.getElementsByIds(calculate.INPUT_ELEMENTS);
calculate.onload = function () {
    if (window.localStorage && localStorage.loan) {
            calculate.INPUT_ELEMENTS.forEach(function(key){
                calculate.inputs[key].value = localStorage['loan_' + key];
            });
            calculate();
    }
};

window.onload = calculate.onload;
