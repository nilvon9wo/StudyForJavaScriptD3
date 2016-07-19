
var getId = function(){
    return this.id;
};
$(':header')
        .map(getId)
        .get()
        .sort();

