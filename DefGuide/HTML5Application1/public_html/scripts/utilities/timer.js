function invoke (_func, _start, _interval, _end) {
    function repeat() {
        var h = setInterval(_func, _interval);
        if (_end){
            setTimeout(function() { clearInterval(h); }, _end);
        }
    }

    start = _start || 0;
    func = (arguments.length <= 2) ? _func : repeat;
    setTimeout(func, start);
}