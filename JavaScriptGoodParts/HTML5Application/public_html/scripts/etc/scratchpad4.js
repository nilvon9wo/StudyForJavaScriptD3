var text = "This oracle of comfort has so pleased me, " +
        "That when I am in heaven I shall desire " + 
        "To see what this child does, " + 
        "and praise my Constructor.";

var words = text.toLowerCase().split(/[\s,.]+/);
var count = {};

words.forEach(function(word){
    var alreadyCounted = typeof count[word] === 'number';
    count[word] = (alreadyCounted ? count[word] : 0) + 1;
});
