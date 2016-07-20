function reveal() {
    var elements = document.getElementsByClassName('reveal');
    elements.toArray().forEach(function (element) {
        element.className = 'revealed';
    });
}

window.onload = function () {
    var title = document.getElementsByClassName('handle')[0];
    title.onclick = reveal;
};