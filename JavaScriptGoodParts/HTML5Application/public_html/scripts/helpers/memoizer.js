var memoizer = function(memo, fundamental){
    var shell = function(n){
        var result = memo[n];
        if (typeof result !== 'number'){
            result = fundamental(shell, n);
            memo[n] = result;
        }
        return result;
    };
    return shell;
};