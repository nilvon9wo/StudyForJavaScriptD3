do {
  var name = prompt('What is your name?');
  var isCorrect = confirm(
    'You entered \'' + name + '\'.\n' + 
    'Click Okay to proceed or Cancel to re-enter.'
  );
} while (!isCorrect);
alert ('Hello, ' + name);