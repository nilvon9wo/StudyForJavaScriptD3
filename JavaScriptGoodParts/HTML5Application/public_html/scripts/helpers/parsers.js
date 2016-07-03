var parsers = {
        doubledWords : /[A-Za-z\u00C0-\u1FFF\u2800-\uFFFD'\-]+\s+\1/gi,
        parseNumber : /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i,
        parseUrl : /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
        tags : /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g
    };
