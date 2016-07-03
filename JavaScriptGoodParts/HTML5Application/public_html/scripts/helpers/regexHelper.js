RegExp.method('test', function(string){
   return this.exec(string !== null);
});