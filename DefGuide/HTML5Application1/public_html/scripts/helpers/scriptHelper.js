scriptHelper = {
    loadasync: function (url) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.create('script');
        script.src = url;
        head.appendChild(script);
    }
};