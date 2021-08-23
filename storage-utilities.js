// --------------------------------------------------
// Set a cookie with given name and value that expires after given milliseconds (defaults to no expiration)
// --------------------------------------------------
function setCookie(name, value, millis = false) {
    var expires = '';
    if (millis) {
        var date = new Date();
        date.setTime(date.getTime()+millis);
        expires = '; expires='+date.toUTCString();
    }
    document.cookie = name+'='+value+expires+'; path=/';
}

// --------------------------------------------------
// Get value of cookie with given name (NULL if no cookie is set)
// --------------------------------------------------
function getCookie(name) {
    name += '=';
    var cookies = decodeURIComponent(document.cookie);
    cookies = cookies.split(';');
    for (let i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return null;
}
