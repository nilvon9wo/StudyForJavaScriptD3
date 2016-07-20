window.onload = function displayTime(){
    var clock = document.getElementById('clock');
    var now = new Date();
    clock.innerHTML = now.toLocaleTimeString();
    setTimeout(displayTime, 1000);
};

