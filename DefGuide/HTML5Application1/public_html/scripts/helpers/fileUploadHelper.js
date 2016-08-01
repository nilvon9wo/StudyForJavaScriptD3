whenReady(function(){
    var elements = document.getElementsByTagName('input');
    elements.toArray().forEach(function(input){
        if (input.type === 'file') {
            var url = input.getAttribute('data-uploadto');
            if (url) {
                input.addEventListener('change', function(){
                    var file = this.files[0];
                    if (!file) {
                        return;
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', url);
                    xhr.send(file);
                }, false);
            }
        }
    });
});