// --------------------------------------------------
//	Requires: detect-browser-features.js | requestAnimationFrame
// --------------------------------------------------


// --------------------
// Define custom events
// Use like this:
//    document.body.addEventListener( 'nm-scroll', function(e){ console.log("scroll"+lastScrollTop); }, false );
// --------------------

// Draw loop event
var nm_loop_event = document.createEvent('Event');
nm_loop_event.initEvent('nm-loop', true, true);

// Resize event
var nm_resize_event = document.createEvent('Event');
nm_resize_event.initEvent('nm-resize', true, true);

// Scroll event
var nm_scroll_event = document.createEvent('Event');
nm_scroll_event.initEvent('nm-scroll', true, true);


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
    window.addEventListener('resize', resize);
    if (! browser.supports.requestAnimationFrame ) window.addEventListener('scroll', loop);
    resize();
    loop();
});
