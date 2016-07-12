try {
    var number = Number(prompt('Please enter a positive integer', ''));
    var factorial = DefGuideMath.factorial(number);
    alert (number + "! = " + factorial);
}
catch (exception){
    alert(exception);
}