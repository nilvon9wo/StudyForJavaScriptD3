/* global IndexedDB, DOMElement, DateTime, Note */
// See http://code.tutsplus.com/tutorials/working-with-indexeddb-part-2--net-35355

var DATABASE_NAME = 'nettutorial_notes';
var DATABASE_VERSION = 1;
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

    var openRequest = IndexedDB.openRequest({
        database: DATABASE,
        events: {
            upgradeneeded: IndexedDB.defaultUpgrade({
                note: {
                    keyDefinition: {keyPath: 'id', autoIncrement: true}
                }
            }),
            success: function (event) {
                var database = event.target.result;
                displayNotes(database);
                addGlobalClickEvents(database);
            }
        }
    });
});

function displayNotes(database) {
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
    IndexedDB.withCursor({
        transaction: transaction,
        store: DATABASE_STORE,
        cursorCallback: function (cursor) {
            var content = Note.fromDatabaseCursor(cursor)
                    .toTableRow(getAnchorClickEvents(database));
            $('#noteTableBody').append(content);
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

function addRowClickEvents(database) {
    $('#noteList').on('click', 'td', function () {
        var noteId = $(this).parent().data('key');
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
        var noteId = $(this).parent().parent().data('key');
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
        var noteId = $(this).parent().parent().data('key');
        IndexedDB.readRecordByKey({
            database: database,
            store: DATABASE_STORE,
            key: noteId,
            events: {
                success: function (event) {
                    var note = new Note(event.target.result);
                    $('#key').val(note.id);
                    $('#title').val(note.title);
                    $('#body').val(note.body);
                    $('#noteDetail').hide();
                    $('#noteForm').show();
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
    $('#title').val('');
    $('#body').val('');
    $('#key').val('');
    displayNotes(database);
    $('#noteDetail').hide();
    $('#noteForm').hide();
}

