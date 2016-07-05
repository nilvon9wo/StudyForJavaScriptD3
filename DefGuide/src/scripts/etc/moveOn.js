function moveOn(){
    var answer = confirm ('Ready to move on?');
    if (answer) {
        window.location = 'http://google.com';
    }
}
setTimeout(moveOn, 60000);

