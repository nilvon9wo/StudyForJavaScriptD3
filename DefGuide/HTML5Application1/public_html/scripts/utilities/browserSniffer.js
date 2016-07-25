var browser = (function(){
    function agentTest(agentExpression) {
        return agentExpression.exec(userAgentString);
    }

    var userAgentString = navigator.userAgent.toLowerCase();

    var webkitEx = /(webkit)[ \/]([\w.]+)/;
    var operaEx = /(opera)(?:.*version)?[ \/]([\w.]+)/;
    var ieEx = /(msie)([\w.]+)/;
    var mozillaEx = /(mozilla)(?:.*? rv:([\w.]+))?/;
    
    var match = agentTest(webkitEx) ||
                agentTest(operaEx) ||
                agentTest(ieEx) ||
                !/compatible/.test(userAgentString) && agentTest(mozillaEx) ||
                [];
        
     return {
         name: match[1] || '',
         version: match[2] || '0'
     };   
});