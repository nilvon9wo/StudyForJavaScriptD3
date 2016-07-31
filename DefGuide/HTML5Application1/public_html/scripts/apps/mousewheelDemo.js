/* global mouseWheelHelper */

whenReady(function(){
    var content = document.getElementById('content');
    mouseWheelHelper.enclose(content, 400, 200, 10, 10);
});