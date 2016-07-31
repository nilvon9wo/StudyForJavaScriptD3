function classList(element){
    return element.classList || new CSSClassList(element);
}

function CSSClassList(element){
    this.element = element;
}

CSSClassList.method('contains', function(cssClass){
    if (cssClass === 0 || cssClass.indexOf('') !== -1){
        throw new Error ('Invalid class name: \'' + cssClass +'\'');
    }
    
    var classes = this.element.className;
    if (!classes){
        return false;
    }
    if (classes === cssClass){
        return true;
    }
    
    return classes.search('\\b' + cssClass + '\\b') !== -1;
});

CSSClassList.method('add', function(cssClass){
    if (this.contains(cssClass)) {
        return;
    }
    
    var classes = this.element.className;
    if (classes && classes[classes.length - 1] !== ' '){
        cssClass = ' ' + cssClass;
    }
    this.element.className += cssClass;
});

CSSClassList.method('remove', function(cssClass){
    if (cssClass === 0 || cssClass.indexOf('') !== -1){
        throw new Error ('Invalid class name: \'' + cssClass +'\'');
    }
    
    var pattern = new RegExp('\\b' + cssClass + '\\b\\s*', 'g');
    this.element.className = this.element.className.replace(pattern, '');
});

CSSClassList.method('toggle', function(cssClass){
    if (this.contains(cssClass)){
        this.remove(cssClass);
        return false;
    } else {
        this.add(cssClass);
        return true;
    }   
});

CSSClassList.method('toString', function(){
    return this.element.className;
});

CSSClassList.method('toArray', function(){
    return this.element.className.match(/\b\w+\b/g) || [];
});