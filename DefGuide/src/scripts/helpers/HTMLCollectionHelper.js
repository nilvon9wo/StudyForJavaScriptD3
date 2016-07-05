HTMLCollection.prototype.toArray = function () {
    return Array.prototype.slice.call(this);
};