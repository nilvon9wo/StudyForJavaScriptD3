function updateTime() {
    var now = new Date();

    var minutes = now.getMinutes();
    setHand('minute', minutes, 6);

    var hours = (now.getHours() % 12) + minutes / 60;
    setHand('hour', hours, 30);
    
    setTimeout(updateTime, 60000);

    function setHand(unitName, units, degreesPerUnit){
        var angle = units * degreesPerUnit;
        var hand = document.getElementById(unitName+ 'Hand');
        hand.setAttribute('transform', 'rotate(' + angle + ' 50,50)');
    }
}