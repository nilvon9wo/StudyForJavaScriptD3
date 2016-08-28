/* global IndexedDB, DOMElement */

function Person(config) {
    this.key = config.key;
    this.name = config.name;
    this.email = config.email;
    this.created = new Date();
}

Person.prototype.addToDatabase = function (config) {
    config.record = this;
    IndexedDB.addRecord(config);
};

Person.fromForm = function () {
    return new Person({
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value
    });
};

Person.fromDatabaseByKey = function (config) {
    if (!config || !config.key || isNaN(config.key)) {
        throw new Error('fromDatabaseById requires Number key.');
    }
    config.key = Number(config.key);
    config.findMethod = 'Key';
    Person.fromDatabaseByProperty(config);
};

Person.fromDatabaseByName = function (config) {
    if (!config || !config.name) {
        throw new Error('fromDatabaseByEmail requires a name.');
    }
    config.indexName = 'name';
    config.indexValue = config.name;
    config.findMethod = 'Index';
    Person.fromDatabaseByProperty(config);
};

Person.fromDatabaseByEmail = function (config) {
    if (!config || !config.email) {
        throw new Error('fromDatabaseByEmail requires an email address.');
    }
    config.indexName = 'email';
    config.indexValue = config.email;
    config.findMethod = 'Index';
    Person.fromDatabaseByProperty(config);
};

Person.fromDatabaseByProperty = function(config) {
    var dbConfig = config;
    var personCallback = config.callback;
    dbConfig.callback = function (event) {
        console.log(event);
        personCallback(Person.fromDatabaseEvent(event, config.key));
    };

    IndexedDB['readRecordBy' + config.findMethod](dbConfig);
};

Person.fromDatabaseEvent = function (event, key) {
    var result = event.target.result;
    var personConfig = {};
    for (var field in result) {
        personConfig[field] = result[field];
    }
    personConfig.key = key;
    return new Person(personConfig);
};

Person.displayDetails = function (container, person) {
    container.innerHTML = DOMElement.createElement('div', {}, function () {
        if (!person || !person.email) {
            return DOMElement.createElement('h2', {}, 'No Match');
        }
        
        var header = DOMElement.createElement('h2', {}, 'Key ' + person.key);

        var descriptionlist = DOMElement.createElement('dl', {}, function () {
            var children = '';
            for (var field in person) {
                if ((field !== 'key') && (typeof person[field] !== 'function')) {
                    children += DOMElement.createElement('dt', {}, field);
                    children += DOMElement.createElement('dd', {}, person[field]);
                }
            }
            return children;
        });

        return header + descriptionlist;
    });
};