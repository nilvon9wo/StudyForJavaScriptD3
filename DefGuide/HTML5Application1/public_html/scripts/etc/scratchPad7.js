/* global DefGuideMath */

var data = {
    sort: function(){
        // ... 
    }
};
data.sort(function (a,b){
    return a - b;
});

var tenSquared = (function(x){return x*x;}(10));
({x:1}).logProprties();

var distance = DefGuideMath.distance;
var total = distance(new Point(0,0), new Point(2,1)) + 
                distance(new Point(2,1), new Point(3,5));
        
var factorial = DefGuideMath.factorial;
var probability = DefGuideMath.factorial(5)/DefGuideMath.factorial(5);

var obj = {};
function func(){
    return { method:function(){} };
}
obj.method = func;
obj.method();
var x;
var y;
obj.method(x, y);
obj['method'](x, y);
var array = [];
var z;
array['method'](z);

var customer = new Person();
customer.surname.toUpperCase();
func().method();

var obj2 = {
    method: function(){
        var self = this;
        console.log(this === 0);
        func();
        
        function func(){
            console.log(this === 0);
            console.log(self === 0);
        }
    }
};
obj2.method();
