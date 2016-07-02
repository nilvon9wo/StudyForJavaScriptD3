/* global DomHelper, sampleObject */

document.writeln('Hello, world!');

sampleObject.increment();
document.writeln(sampleObject.getValue());
sampleObject.increment(2);
document.writeln(sampleObject.getValue());
sampleObject.double();
document.writeln('Value: ' + sampleObject.getValue());

var confusedQuo = quo('confused');
document.writeln(confusedQuo.getStatus());

var amazedQuo = quo('amazed');
document.writeln(amazedQuo.getStatus());

document.writeln(sum(4,8,15,16,23,42));

(function(){
	try{
		add("seven");
	}
	catch (e){
		document.writeln(e.name + ':' + e.message);
	}
}());

document.writeln((-10/3).integer());
document.writeln('"' + "         neat       ".trim() + '"');

hanoi(3, 'Source', 'Aux', 'Destination');
document.writeln(factorial(4));

DomHelper.fade(document.body);

document.writeln('&lt;&quot;&gt;'.deentityify());

document.writeln(add1(16));

for (var i=0; i<=10; i += 1){
    document.writeln('// ' + i + ':' + fibonacci(i));
}