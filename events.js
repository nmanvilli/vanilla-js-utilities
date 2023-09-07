function nm_create_document_event( name ) {
    var event = null;
    if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(name, true, true);
    }
    else { // MSIE
        var nm_loop_event = document.createEventObject();
        nm_loop_event.eventType = name;
    }
    return event;
}

function nm_add_event_listener( name, callback ) {
    if (window.addEventListener) {
        window.addEventListener(name, callback);
    }
    else if ( window.attachEvent ) { // MSIE
        window.attachEvent(name, callback);
    }
}
