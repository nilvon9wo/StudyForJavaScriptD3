whenReady(function () {
    var clock = document.getElementById('clock');
    var icon = new Image();
    icon.src = 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/clock-icon.png';

    displayTime();
    
    clock.draggable = true;
    clock.ondragstart = function(event) {
      event = event || window.event;
      var dataTransfer = event.dataTransfer;
      dataTransfer.setData('Text', Date() + '\n');
      
      if (dataTransfer.setDragImage) {
          dataTransfer.setDragImage(icon, 0, 0);
      }
    };
    
    function displayTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        clock.innerHTML = hours + ':' + minutes;
        var ONE_MINUTE = 60000;
        setTimeout(displayTime, ONE_MINUTE);
    }
});