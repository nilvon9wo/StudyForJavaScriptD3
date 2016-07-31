function ElementStream(element) {
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    this.element = element;
    this.buffer = '';
}

ElementStream.method('write', function(){
    this.buffer += Array.prototype.join.call(arguments, '');
});

ElementStream.method('writeln', function(){
    this.buffer += Array.prototype.join.call(arguments, '') + '\n';
});

ElementStream.method('close', function(){
    this.element.innerHTML = this.buffer;
    this.buffer = '';
});



