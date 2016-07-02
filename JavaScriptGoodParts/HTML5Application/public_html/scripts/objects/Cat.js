/* global mammal_prototypal, mammal_pseudoclassical */

function purr(n) {
    var string = '';
    for (var i = 0; i < n; i++) {
        if (string) {
            string += '-';
        }
        string += 'r';
    }
    return string;
}

var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
}.
        inherits(mammal_pseudoclassical).
        method('purr', purr).
        method('getName', function(){
            return this.says() + ' ' + this.name + ' ' + this.says();
        });

var cat_pseudoclassical = new Cat('Henrietta');
var says = cat_pseudoclassical.says();
var purr = cat_pseudoclassical.purr(5);
var name = cat_pseudoclassical.getName();

var cat_prototypal = Object.create(mammal_prototypal);
cat_prototypal.name = 'Henrietta';
cat_prototypal.saying = 'meow';
cat_prototypal.purr = purr;
cat_prototypal.getName = function(){
    return this.says() + ' ' + this.name + ' ' + this.says();
};

var cat_functional = function(spec){
    spec.saying = spec.saying || 'meow';
    var that = myMammal_functional(spec);
    that.purr = purr;
    that.getName = function(){
        return this.says() + ' ' + spec.name + ' ' + this.says();
    };
    return that;
};
var myCat = cat_functional({name:'Henrietta'});

var coolCat = function(spec){
    var that = cat_functional(spec);
    var superGetName = that.superior('getName');
    that.getName = function(n){
        return 'like ' + superGetName() + ' baby';
    };
    return that;
};
var myCoolCat = ({name:'Bix'});
var name = myCoolCat.getName();