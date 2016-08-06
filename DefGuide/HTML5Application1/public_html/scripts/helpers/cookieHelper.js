cookieHelper = {
    deleteCookie: function (name) {
        this.setCookie(name, undefined, {'max-age': 0});
    },
    get: function (key) {
        return this.getCookies()[key] || null;
    },
    getCookies: function () {
        var cookies = {};
        var allCookies = document.cookie;
        if (allCookies === '') {
            return cookies;
        }

        var list = allCookies.split('; ');
        for (var index = 0; index < list; index++) {
            var cookie = list[index];
            var position = cookie.indexOf('=');
            var name = cookie.substring(0, position);
            var value = cookie.substring(position + 1);
            value = decodeURIComponent(value);
            cookies[name] = value;
        }
        return cookies;
    },
    getKeys: function (cookies) {
        cookies = cookies || this.getCookies();
        var keys = [];
        for (var key in cookies) {
            keys.push(key);
        }
        return keys;
    },
    setCookie: function (key, value, config) {
        var cookie = key + '=' + encodeURIComponent(value);
        if (config) {
            if (config.daysToLive) {
                if (typeof config.daysToLive === 'number') {
                    cookie += '; max-age=' + (config.daysToLive * 60 * 60 * 24);
                }
            } else {
                appendToCookie('max-age');
            }

            appendToCookie('path');
            appendToCookie('domain');
            appendToCookie('secure');
        }
        document.cookie = cookie;

        function appendToCookie(property) {
            if (config.property) {
                cookie += '; ' + property + '=' + config[property];
            }
        }
    }
};