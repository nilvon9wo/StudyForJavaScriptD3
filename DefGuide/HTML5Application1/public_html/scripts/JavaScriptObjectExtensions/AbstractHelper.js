var AbstractHelper = {
    constructor: function () {
        throw new Error('Can\'t instantiate abstract classes');
    },
    method: function () {
        throw new Error('abstact method');
    }
};