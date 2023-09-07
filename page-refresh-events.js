// --------------------------------------------------
//  Requires: detect-browser-features.js | requestAnimationFrame
//  Requires: events.js
// --------------------------------------------------


// --------------------
// Define custom events
// Use like this:
//    nm_add_event_listener( 'nm-scroll', function(e){ console.log("scroll"+lastScrollTop); } );
// --------------------
var nm_loop_event = nm_create_document_event('nm-loop');
var nm_resize_event = nm_create_document_event('nm-resize');
var nm_scroll_event = nm_create_document_event('nm-scroll');


// --------------------
// Called on window resize event
// --------------------
var resize = function() {
    document.body.dispatchEvent(nm_resize_event);
    scroll();
};


// --------------------
// Called on window scroll event
// --------------------
var scroll = function() {
    document.body.dispatchEvent(nm_scroll_event);
};


// --------------------
// Draw cycle
// --------------------
var lastScrollTop = 0;
var fallbackLoopTimeout = null;
var fallbackLoopInterval = 100;
var loop = function() {
    clearTimeout(fallbackLoopTimeout);
    document.body.dispatchEvent(nm_loop_event);

    var scrollTop = document.documentElement.scrollTop;
    if (lastScrollTop === scrollTop) {
      // Scroll position is the same
      if (browser.supports.requestAnimationFrame) raf(loop);
      else fallbackLoopTimeout = setTimeout(loop, fallbackLoopInterval);
      return;
    }

    // Scroll position has changed
    lastScrollTop = scrollTop;
    scroll();
    if (browser.supports.requestAnimationFrame) raf(loop);
    else fallbackLoopTimeout = setTimeout(loop, fallbackLoopInterval);
};


// --------------------
// Start all
// --------------------
document.addEventListener('DOMContentLoaded', function () {

    // Add listeners and start loop
    nm_add_event_listener('resize', resize);
    if (! browser.supports.requestAnimationFrame ) nm_add_event_listener('scroll', loop);

    resize();
    loop();
});
