Boolean.not = Boolean.not || Function.partialLeft(
        Function.compose,
        function(x){
            return !x;
        }
);
