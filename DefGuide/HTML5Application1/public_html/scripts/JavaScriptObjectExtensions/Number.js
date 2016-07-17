Number.extendPrototype({
    times : function(func, context){
        var n = Number(this);
        for (var i = 0; i < n; i++){
            func.call(context, i);
        }
    }
});