function cancel() {
    window.close();
}

function okay() {
    returnValue = [];
    for (var index = 1; index < args.length; index++) {
        returnValue[index - 1] = document.getElementById('f' + index).value;
    }
    window.setModalDialogReturn(returnValue);
    window.close();
}

var dailogArguments = dailogArguments || false;
if (dailogArguments) {
    var args = dailogArguments;
    var text = createElement('legend', undefined, args[0]);

    for (var index = 1; index < args.length; index++) {
        text += createElement('label', undefined, args[index] + ': ' +
                createElement('input', {id: 'f' + index})
                ) + createElement('br');
    }
    document.getElementById('fields').innerHTML = text;
} else {
    cancel();
}
