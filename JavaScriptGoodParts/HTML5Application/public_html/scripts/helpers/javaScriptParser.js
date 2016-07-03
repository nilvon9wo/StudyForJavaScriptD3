var block = function(){
    var oldScope = scope;
    scope = Object.create(scope);
    advance('{');
    parse(scope);
    advance('}');
    scope = oldScope;
};