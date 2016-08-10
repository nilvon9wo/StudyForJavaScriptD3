/* global eventHelper */

(function () {
    var helpRolloverImageSource =
            'https://www04.wellsfargomedia.com/assets/images/icons/personal/icon-gray-question-mark-40x39.png';
    (new Image()).src = helpRolloverImageSource;

    whenReady(function () {
        var helpImage = document.getElementById('help');
        helpImage.default = helpImage.src;
        helpImage.toggle = function (preposition, source) {
            eventHelper.addEvent(this, 'mouse' + preposition, function () {
                this.src = source;
            });
        };
        helpImage.toggle('over', helpRolloverImageSource);
        helpImage.toggle('out', helpImage.default);
    });
}());

