var stacktraceHelper = {
    trace: function (obj, method) {
        var original = obj[method];
        obj[method] = function () {
            console.log(new Date(), 'Entering: ', method);
            var result = original.apply(this, arguments);
            console.log(new Date(), 'Exiting: ', method);
            return result;
        }
    }
};

