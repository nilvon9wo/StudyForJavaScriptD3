whenReady(function(){
    document.images.toArray().forEach(function(image){
        var rollover = image.getAttribute('data-rollover');
        if (rollover) {
            (new Image()).src = rollover;
            image.setAttribute('data-rollout', image.src);
            setToggle('over');
            setToggle('out');
        }
        function setToggle(preposition) {
            image['onmouse' + preposition] = function() {
                this.src = this.getAttribute('data-roll' + preposition);
            };
        }
    });
});