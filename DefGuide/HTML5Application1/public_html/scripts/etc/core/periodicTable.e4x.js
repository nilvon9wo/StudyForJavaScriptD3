let periodicTable = <periodictable>
        <element id='1'>
            <name>Hydrogen</name>
        </element>
        <element id='2'>
            <name>Helium</name>
        </element>
        <element id='3'>
            <name>Lithium</name>
        </element>
    </periodictable>;

periodicTable.element += <element id="4">
        <name>Beryllium</name>
    </element>;

periodicTable = <periodictable></periodictable>;

let elements = ['Hydrogen', 'Helium', 'Lithium'];
for (let n = 0; n < elements.length; n++) {
    periodicTable.element += <element id={n + 1}>
        <name>{elements[n]}</name>
    </element>;
}

periodicTable.element += new XML('<element id=\'5\'><name>Boron</name></element>');

periodicTable.element += new XMLList(
    '<element id=\'6\'><name>Carbon</name></element>' +
    '<element id=\'7\'><name>Nitrogen</name></element>'
);

let elements = periodicTable.element;
let names = periodicTable.element.name;
let name = names[0];

let names2 = periodicTable..name;
let names3 = periodicTable.element.*;

let atomicNumber = periodicTable.element[1].@id;
let atomicNumbers =  periodicTable.element.@*;

let lightElements = periodicTable.element.(@id < 3);
let bElementNames = periodicTable.element.(name.charAt(0) === 'B').name;

for each (let element in periodicTable){
    console.log(element.name);
}

for each (let number in periodicTable.element.@*){
    console.log(number);
}

periodicTable.element[0].@symbol = 'H';
periodicTable.element[0].weight = 1.00794;

delete periodicTable.element[0].@symbol;
delete periodicTable..weight;

periodicTable.insertChildBefore(periodicTable.element[1], <element id='1'><name>Deuterium</name></element>);

default xml namespace = 'http://www.w3.org/1999/xhtml';
let document = <html>
    <body>
        This is a small red square:
        <svg xmlns='http://wwww.w3.org/2000/svg' width='10' height='10'>
            <rect x='0' y='0' width='10' height='10' fill='red' />
        </svg>
    </body>
</html>

let tagname = document.body.name();
let bodyns = tagname.uri;
let localname = tagname.localName;

let svg = new Namespace('http://wwww.w3.org/2000/svg');
let color = document..svg::rect.@fill;




















