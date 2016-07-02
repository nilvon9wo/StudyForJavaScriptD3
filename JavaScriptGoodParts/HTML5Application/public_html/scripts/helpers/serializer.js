var serialMaker = function(){
  var prefix = '';
  var sequence = 0;
  
  return {
      setPrefix: function(_prefix){
          prefix = String(_prefix);
      },
      setSequence: function(_sequence){
          sequence = _sequence;
      },
      generateSymbol: function(){
          var result = prefix + sequence;
              sequence++;
              return result;
      }
  };
};

var seqer = serialMaker();
    seqer.setPrefix('Q');
    seqer.setSequence(1000);
    
var unique = seqer.generateSymbol();