/* global IndexedDB, DOMElement, DateTime, Note */
// See http://code.tutsplus.com/tutorials/working-with-indexeddb-part-2--net-35355

var DATABASE_NAME = 'nettutorial_notes';
var DATABASE_VERSION = 6;
var DATABASE = {
    name: DATABASE_NAME,
    version: DATABASE_VERSION
};

var DATABASE_STORE = 'note';

$(document).ready(function () {
    if (!IndexedDB.isSupported) {
        message = 'IndexedDB support is required for this demo!';
        alert(message);
        throw new error(message);
    }

    IndexedDB.openRequest({
        database: DATABASE,
        events: {
            upgradeneeded: IndexedDB.defaultUpgrade({
                note: {
                    keyDefinition: {keyPath: 'id', autoIncrement: true},
                    indexes: [
                        {propertyName: 'titleLowerCase', options: {unique: false}}
                    ],
                    forceRecreate: true
                }
            }),
            success: function (event) {
                var database = event.target.result;
                updatePage({
                    database: database
                });
                addGlobalClickEvents(database);
                addFilter(database);
            }
        }
    });
});

function updatePage(config) {
    var database = config.database;
    if (database) {
        displayNotes(config);
        doCount(database);
    }

    var note = config.note;
    $('#key').val(note ? note.id : '');
    $('#title').val(note ? note.title : '');
    $('#body').val(note ? note.body : '');

    if (config.detailMethod) {
        $('#noteDetail')[config.detailMethod]();
    }

    if (config.formMethod) {
        $('#noteForm')[config.formMethod]();
    }
}

function displayNotes(config) {
    var database = config.database;
    var filter = config.filter;

    var transaction = IndexedDB.monitorTransaction({
        database: database,
        store: DATABASE_STORE,
        events: {
            complete: function () {
                addRowClickEvents(database);
                $('#noteTable').show();
            }
        }
    });
    $('#noteTableBody').empty();
    var range;
    if (filter) {
        range = {
            lowerBound: filter,
            upperBound: filter + '\uffff'
        };
    }
    ;

    IndexedDB.withCursor({
        transaction: transaction,
        store: DATABASE_STORE,
        range: range,
        index: 'titleLowerCase',
        cursorCallback: function (cursor) {
            var content = Note.fromDatabaseCursor(cursor)
                    .toTableRow(getAnchorClickEvents(database));
            $('#noteTableBody').append(content);
        }
    });
}

function doCount(database) {
    IndexedDB.doCount({
        database: database,
        store: DATABASE_STORE,
        events: {
            success: function (event) {
                var size = event.target.result;
                $('#sizeSpan').text('(' + size + ' Notes Total)');
            }
        }
    });
}

function addGlobalClickEvents(database) {
    $('#addNoteButton').on('click', function () {
        $('#title').val('');
        $('#body').val('');
        $('#key').val('');
        $('#noteDetail').hide();
        $('#noteForm').show();
    });

    $('#saveNoteButton').on('click', function () {
        var keyVal = $('#key').val();
        var note = new Note({
            id: (keyVal.trim() !== '') ? Number(keyVal) : undefined,
            title: $('#title').val(),
            body: $('#body').val()
        });
        var method = ((note.id) ? 'put' : 'add') + 'Record';
        IndexedDB[method]({
            database: database,
            store: DATABASE_STORE,
            record: note,
            transactionEvents: {
                complete: function () {
                    refreshTable(database);
                }
            }
        });
    });
}

function addFilter(database) {
    $('#filterField').on('keyup', function () {
        var filter = $(this).val();
        updatePage({database: database, filter: filter});
    });
}

function addRowClickEvents(database) {
    $('#noteList').on('click', 'td', function () {
        var noteId = $(this).parent().data('id');
        IndexedDB.readRecordByKey({
            database: database,
            store: DATABASE_STORE,
            key: noteId,
            events: {
                success: function (event) {
                    var result = event.target.result;
                    if (result) {
                        var note = new Note(event.target.result);
                        var title = DOMElement.createElement('h2', {}, note.title);
                        var body = DOMElement.createElement('p', {}, note.body);
                        $('#noteDetail').html(title + body).show;
                    }
                }
            }
        });
    });
}

function getAnchorClickEvents(database) {
    function deleteNote() {
        var noteId = $(this).parent().parent().data('id');
        IndexedDB.deleteRecord({
            database: database,
            store: DATABASE_STORE,
            key: noteId,
            transactionEvents: {
                complete: function () {
                    refreshTable(database);
                }
            }
        });
    }
    deleteNote.buttonClass = 'danger';

    function editNote() {
        var noteId = $(this).parent().parent().data('id');
        IndexedDB.readRecordByKey({
            database: database,
            store: DATABASE_STORE,
            key: noteId,
            events: {
                success: function (event) {
                    updatePage({
                        note: new Note(event.target.result),
                        detailMethod: 'hide',
                        formMethod: 'show'
                    });
                }
            }
        });
    }
    editNote.buttonClass = 'primary';

    return {
        'edit': editNote,
        'delete': deleteNote
    };
}

function refreshTable(database) {
    updatePage({
        database: database,
        detailMethod: 'hide',
        formMethod: 'hide'
    });
}

