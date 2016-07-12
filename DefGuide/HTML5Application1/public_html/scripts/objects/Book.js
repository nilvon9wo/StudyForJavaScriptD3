var Book = function (config){
    'use strict';
    this.mainTitle = config.mainTitle;
    this.subTitle = config.subTitle;
    this.for = config.for;
    this.author = config.author;
};


var book = new Book({
    mainTitle: 'JavaScript',
    subTitle: 'The Definitive Guide',
    for: 'all audiences',
    author: new Person({
        firstName: 'David',
        surName: 'Flanagan'
    })
});

var author = book.author;
var name = author.surName;
var title = book.mainTitle;

book.edition = 6;
book.mainTitle = "ECMAScript";

var length = book && book.subTitle && book.subTitle.length;

delete book.author;
delete book.mainTitle;