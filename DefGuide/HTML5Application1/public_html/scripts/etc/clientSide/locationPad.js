if (!XMLHttpRequest) {
  location.replace("staticpage.html");
}

location = 'http://www.oreilly.com';

location = 'page2.html';

location = '#top';

var pageNumber = 0;
location.search = '?page' + (pageNumber + 1);

history.go(-2);