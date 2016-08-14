$(window).on('message', handleMessage);

function handleMessage(event) {
    if (event.originalEvent.source !== window.parent) {
        return;
    }

    var searchTerm = event.data;

    $.getJSON(
            'http://search.twitter.com/search.json?callback=?',
            {q: searchTerm},
            displayResults);

    function displayResults(data) {
        var tweets = data.results;
        var h2 = $('<h2>').text(searchTerm);
        if (tweets.length === 0) {
            var noContent = $('<p>').text('No tweets found');
            noContent.insertAfter(h2);
        } else {
            var resultLit = $('<dl>');
            tweets.toArray().forEach(function (tweet) {
                var fromUser = tweet.from_user;
                var url = 'http://twitter.com/#!/' + fromUser + '/status/' + tweet.id_str;

                var result = $('<dt>');
                var anchor = $('<a>').attr({
                    target: 'blank',
                    href: url
                }).text(fromUser);
                resultLit.append(result);
                result.append(anchor);

                var tweetText = $('<dd>').text(tweet.text);
                tweetText.insertAfter(result);
            });

            resultLit.insertAfter(h2);
        }
    }
}

$(function () {
    window.parent.postMessage('Twitter Search v0.1', '*');
});
