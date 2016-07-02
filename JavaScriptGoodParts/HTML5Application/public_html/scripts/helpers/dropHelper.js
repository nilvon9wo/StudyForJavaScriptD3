// See: http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondrag

function allowDrop(event){
    event.preventDefault();
}

function dragStart(event){
    event.dataTransfer.setData("Text", event.target.id);
}

function dragging(){
    document.getElementById("demo").innerHTML = 
            "The p element is being dragged";
}

function drop(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
    document.getElementById("demo").innerHTML = "The p element was dropped";
}