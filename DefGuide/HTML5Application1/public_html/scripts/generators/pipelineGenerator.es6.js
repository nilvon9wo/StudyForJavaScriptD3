/* global string */

function * eachLine(string) {
    let property;
    while ((property = string.indexOf('\n')) !== -1) {
        let result = string.substring(0, property)
        yield result;
        string = string.substring(property + 1);
    }
    if (string.length > 0) {
        yield string;
    }
}

function * map (index, func) {
    for (let x of index){
        yield func(x);
    }
}

function * select (index, func) {
    for (let x of index){
        if (func(x)){
            yield x;
        }
    }
}

let text = ' #comment \n \n hello \nworld\n quit \n unreached \n';
let lines = eachLine(text);


let trimmed = map(lines, function(line){
    return line.trim();
});

let nonBlank = select(trimmed, function(line){
    return line && line.length > 0 && line[0] != '#';
});

for (let line of nonBlank){
    if (line === 'quit'){
        break;
    }
    console.log(line);
}