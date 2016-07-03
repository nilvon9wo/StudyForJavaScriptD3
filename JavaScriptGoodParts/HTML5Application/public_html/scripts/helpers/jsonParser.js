var jsonParse = function () {
    var text;
    var currentCharacter;
    var currentCharacterIndex;

    return function (source, reviver) {
        text = source;
        currentCharacterIndex = 0;
        currentCharacter = ' ';

        var result = parseJsonValue();
        skipWhiteSpace();
        if (currentCharacter) {
            throwError("Syntax error");
        }

        var hasValidReviver = typeof reviver === 'function';
        return hasValidReviver ? transformStructure({'': result}, '') : result;

        // Transform Result --------------------------------------

        function transformStructure(holder, holderKey) {
            var holderValue = holder[holderKey];
            if (holderValue && typeof holderValue === 'object') {
                for (var key in holderValue) {
                    if (Object.hasOwnProperty.call(holderValue, key)) {
                        var value = transformStructure(holderValue, key);
                        if (value !== undefined) {
                            holderValue[key] = value;
                        } else {
                            delete holderValue[key];
                        }
                    }
                }
            }
            return reviver.call(holder, holderKey, holderValue);
        }
    };

    // Parser functions =====================================================

    // Parse JSON -------------------------------------------------------------

    function parseJsonValue() {
        skipWhiteSpace();
        switch (currentCharacter) {
            case '{':
                return parseObjectValue();
            case '[':
                return parseArrayValue();
            case '"':
                return parseStringValue();
            case '-':
                return parseNumberValue();
            default:
                return currentCharacter >= '0' && currentCharacter <= '9' ?
                        parseNumberValue() :
                        parseSpecialWords();
        }
    }

    // Parse Objects ----------------------------------------------------------

    function parseObjectValue() {
        parseObjectContent('object', {}, '{', '}', function(object){
                var key = string();
                skipWhiteSpace();
                getNextCharacter(':');
                object[key] = parseJsonValue();
                skipWhiteSpace();
                if (currentCharacter === '}') {
                    getNextCharacter('}');
                    return object;
                }
                getNextCharacter(',');
                skipWhiteSpace();
        });
    }

    function parseArrayValue() {
        parseObjectContent('array', [], '[', ']', function(array){
                array.push(parseJsonValue());
                skipWhiteSpace();
                if (currentCharacter === ']') {
                    getNextCharacter(']');
                    return array;
                }
                getNextCharacter(',');
                skipWhiteSpace();
        });
    }

    function parseObjectContent(type, empty, open, close, parseInnerContext){
        var obj = empty;
        if (currentCharacter === open) {
            getNextCharacter(open);
            skipWhiteSpace();
            if (currentCharacter === close) {
                getNextCharacter(close);
                return obj;
            }
            while (currentCharacter) {
                parseInnerContext(obj);
            }
        }
        throwError('Bad ' + type);
    }

    // Parser Strings  -------------------------------------------------------
    function parseStringValue() {
        var string = '';

        if (currentCharacter === '"') {
            while (getNextCharacter()) {
                if (currentCharacter === '"') {
                    getNextCharacter();
                    return string;
                } else if (currentCharacter === '\\') {
                    string += parseEscaped();
                } else {
                    string += currentCharacter;
                }
            }
        } else {
            throwError("Bad string");
        }

        // String parsing Helpers -----------------------------

        function parseEscaped() {
            var escapee = {
                '"': '"',
                '\\': '\\',
                '/': '/',
                b: 'b',
                f: '\f',
                n: '\n',
                r: '\r',
                t: '\t',
                u: parseUnicode
            };

            getNextCharacter();
            var escapedChar = escapee[currentCharacter];
            
            switch (typeof escapedChar){
                case 'function' : return escapedChar();
                case 'string'   : return escapedChar;
                default         : return '';
            }
        }

        function parseUnicode(){
            var uffff = 0;
            for (var i = 0; i < 4; i++) {
                var hex = parseInt(getNextCharacter(), 16);
                if (!isFinite(hex)) {
                    break;
                }
                uffff = uffff * 16 + hex;
            }
            return String.fromCharCode(uffff);
        }
    }
   
    // Parser Numbers  -------------------------------------------------------

    function parseNumberValue() {
        var string = getSymbol(['-']) +
                getDigits() +
                getSymbol(['.'], [
                    {func: getDigits, required: true}
                ]) +
                getSymbol(['e', 'E'], [
                    {func: getSymbol, arg: ['-', '+']},
                    {func: getDigits, required: true}
                ]);

        var number = +string;
        if (isNaN(number)) {
            throwError('Bad number');
        } else {
            return number;
        }

        // Number parsing Helpers -----------------------------

        function getSymbol(acceptable, qualifiers) {
            var string = '';
            if (acceptable.includes(currenctCharacter)) {
                string = currentCharacter;
                getNextCharacter('-');
            }

            if (string && qualifiers) {
                qualifiers.forEach(function (qualifier) {
                    var followup = qualifier.func(qualifier.arg);
                    if (!followup && qualifier.required) {
                        throwError('Something is missing!');
                    }
                    string += followup;
                });
            }

            return string;
        }

        function getDigits() {
            var string = '';
            while (currentCharacter >= '0' && currentCharacter <= '9') {
                string += currentCharacter;
                getNextCharacter();
            }
            return string;
        }
    }

    // Parse Special words (true, false, null)---------------------------------
    function parseSpecialWords() {
        switch (currentCharacter) {
            case 't': return parseForValue(true);
            case 'f': return parseForValue(false);
            case 'n': return parseForValue(null);
        }
        throwError("Unexpected '" + currentCharacter + "'");
        
        function parseForValue(value){
            var word = "" + value;
            for (var i = 0; i < word.length; i++){
                getNextCharacter(word.charAt(i));
            }
            return value;
        }
    }

    // Common Functions -----------------------------------------------------

    function getNextCharacter(expectedCharacter) {
        if (expectedCharacter && expectedCharacter !== currentCharacter) {
            throwError("Expected '" + expectedCharacter + "' instead of + '" +
                    currentCharacter + "'");
        }

        currenctCharacter = text.charAt(currentCharacterIndex);
        currentCharacterIndex++;
        return currenctCharacter;
    }

    function skipWhiteSpace() {
        while (currentCharacter && currentCharacter <= '') {
            getNextCharacter();
        }
    }

    function throwError(message) {
        throw {
            name: 'SyntaxError',
            message: message,
            at: currentCharacterIndex,
            text: text
        };
    }

}();




