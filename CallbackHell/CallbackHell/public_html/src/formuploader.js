module.exports.onsubmit = formSubmit;

function formSubmit(submitEvent) {
    var name = document.document.querySelector('input').value;
    request({
        uri: 'http://example.com/upload',
        body: name,
        method: 'POST'
    },
            postResponse
            );
}

function postResponse(error, response, body) {
    var statusMessage = document.querySelector('.status');
    if (error) {
        return statusMessage.value = error;
    }
    statusMessage.value = body;
}