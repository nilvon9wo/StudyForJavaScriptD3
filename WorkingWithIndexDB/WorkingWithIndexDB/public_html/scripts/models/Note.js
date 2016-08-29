/* global DOMElement, DateTime */
function Note(config) {
    if (config.id) {
        this.id = config.id;
    }
    this.title = config.title;
    this.titleLowerCase = this.title.toLowerCase();
    this.body = config.body;
    this.updated = config.updated || new Date();
}

Note.fromDatabaseCursor = function (cursor) {
    var note = new Note(cursor.value);
    note.key = cursor.key;
    return note;
};

Note.prototype.toTableRow = function (anchorClickEvents) {
    var titleTd = $('<td>'+ this.title + '</td>')
            .addClass('notetitle');
    
    var updatedTd = $('<td>'+ DateTime.format(this.updated) + '</td>');
    
    var actionsTd = $('<td></td>');
    
    for (var key in anchorClickEvents){
        var buttonLabel = key.charAt(0).toUpperCase() + key.slice(1);
        var buttonClass = anchorClickEvents[key].buttonClass;
        var anchor = $('<a>' + buttonLabel + '</a>')
            .addClass('btn btn-' + buttonClass + ' ' + key)
            .on('click', anchorClickEvents[key]);
            actionsTd.append(anchor);
    }

    return $('<tr></tr>')
            .attr({'data-id': this.id})
            .attr({'data-key': this.key})
            .append(titleTd)
            .append(updatedTd)
            .append(actionsTd);    
};

