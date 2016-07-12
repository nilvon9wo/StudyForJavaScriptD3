'use strict';

var randomNumberGenerator = {
    $random: function (multiplier) {
        return Math.floor(Math.random() * multiplier);
    },
    get octet() {
        return this.$random(256);
    },
    get unsignedInt16() {
        return this.$random(65536);
    },
    get int16() {
        return this.unsignedInt16 - 32768;
    }
};