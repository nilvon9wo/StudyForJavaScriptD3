String.method('charAT', function (position) {
  return this.slice(position, position + 1);
});

String.method('deentityify', function () {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };

    return function () {
        return this.replace(/&[^&;]+/g, function (a, b) {
            var replacement = entity[b];
            return typeof replacement === 'string'
                    ? replacement
                    : a;
        });
    };
}());

String.method('entityify', function () {
    var character = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;'
    };

    return function () {
        return this.replace(/[<>&"]/g, function (c) {
            return character[c];
        });
    };
}());

String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});

