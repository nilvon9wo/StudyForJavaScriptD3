var net = {
    nowhereatall: {
        collection: {
            sets: []
        },
        factories: [],
        registerSet: function(name,obj){
            this.collection.set[name] = obj;
        }, 
        registerFactory: function(name,obj){
            this.factories[name] = obj;
        }
    }
};

