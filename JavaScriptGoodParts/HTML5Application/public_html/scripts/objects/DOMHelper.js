var fade = function(node){
	var level = 1;
	var step = function(){
		var hex = level.toString(16);
		node.style.backgroundColor = '#FFFF' + hex + hex;
		if (level < 15){
			level += 1;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
};

var getElementsByAttribute = function(attribute, value){
	var results = [];
	
	walk_the_DOM(document.body, function(node){
		var actual = node.nodeType === 1 && node.getAttribute(attribute);
		
		if (isActualString() && isActualValue() || !isValueString()) {
			results.push(node);
		} 
		
		function isActualString(){ return (actual === 'string'); } 
		function isActualValue (){ return (actual ===  value  ); } 
		function isValueString (){ return (value  === 'string'); } 
	});
}

var walk_the_DOM = function(node, func){
	func(node);
	node = node.firstChild;
	while(node){
		walk(node, func);
		node = node.nextSibling;
	}
};

var addTheHandlers = function(nodes){
	var i;
	for(i = 0; i < nodes.length; i++){
		node[i].onclick = function(i){
			return function(e){
				alert(e);
			};
		}(i);
	}
};

var DomHelper = {
	addTheHandlers: addTheHandlers,
	fade : fade,
	getElementsByAttribute : getElementsByAttribute, 
};
