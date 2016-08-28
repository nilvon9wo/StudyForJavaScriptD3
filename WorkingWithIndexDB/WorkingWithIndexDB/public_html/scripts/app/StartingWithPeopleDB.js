/* global IndexedDB, Page, Event, Person, DOMElement */
// See http://code.tutsplus.com/tutorials/working-with-indexeddb--net-34673

Page.onReady(function () {
    var DATABASE_NAME = 'people';
    var DATABASE_VERSION = '23';

    if (!IndexedDB.isSupported) {
        throw new Error('No, this browser can not support IndexDB.');
    }

    console.info('Yes, this browser can support IndexDB.');
    IndexedDB.openRequest({
        database: {
            name: DATABASE_NAME,
            version: DATABASE_VERSION
        },
        events: {
            upgradeneeded: IndexedDB.defaultUpgrade({
                people: {
                    keyDefinition: {autoIncrement: true},
                    indexes: [
                        {propertyName: 'name', options: {unique: false}},
                        {propertyName: 'email', options: {unique: true}}
                    ]
                }
            }),
            success: addEventsToButtons
        }
    });

    function addEventsToButtons(event) {
        Event.addClick('#addPerson', function () {
            addPersonFromForm(event);
        });

        ['Key', 'Email'].forEach(function (property) {
            Event.addClick('#getPersonBy' + property, function () {
                displayDetails(event, property);
            });
        });

        Event.addClick('#getPeopleByNameRange', function () {
            displayPeople(event);
        });

        Event.addClick('#getPeople', function () {
            displayPeople(event, true);
        });
    }

    function addPersonFromForm(event) {
        Person.fromForm()
                .addToDatabase({
                    database: event.target.result,
                    store: 'people'
                });
    }

    function displayDetails(event, property) {
        var config = {
            database: event.target.result,
            store: 'people',
            callback: function (person) {
                var results = document.querySelector('#results');
                Person.displayDetails(results, person);
            }
        };
        config[property.toLowerCase()] = document.querySelector('#queryField').value;
        Person['fromDatabaseBy' + property](config);
    }

    function displayPeople(event, displayAll) {
        var personList = document.createElement('ol');

        var results = document.querySelector('#results');
        results.innerHTML = '';
        results.appendChild(personList);

        var config = {
            database: event.target.result,
            store: 'people',
            cursorCallback: function (cursor) {
                var item = document.createElement('li');
                var person = cursor.value;
                Person.displayDetails(item, new Person({
                    key: cursor.key,
                    name: person['name'],
                    email: person['email'],
                    created: person['created']
                }));
                personList.append(item);
            }
        };

        if (!displayAll) {
            config.index = 'name';
            config.range = {
                lowerBound: document.querySelector('#nameSearchStart').value,
                upperBound: document.querySelector('#nameSearchEnd').value
            };
        }

        IndexedDB.withCursor(config);
    }
});

