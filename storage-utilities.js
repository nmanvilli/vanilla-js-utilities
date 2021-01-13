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