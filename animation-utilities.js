// --------------------------------------------------
// Remove given DOM element from DOM with a fade-out animation
// --------------------------------------------------
function removeFadeOut(el, millis = 400) {
    el.style.transition = 'opacity '+millis+'ms ease';
    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, millis);
}


// --------------------------------------------------
// Scroll viewport to given y value (skip animation if "prefers reduced motion" is set)
// 	Requires: detect-browser-features.js | scrollTo
//	Requires: detect-browser-options.js | prefers-reduced-motion
// --------------------------------------------------
function scrollViewportTo(y) {
	if (browser.supports.scrollTo) {
		var opts = {top: y};
    	if (!browser.options.prefersReducedMotion) opts.behavior = 'smooth';
		window.scrollTo(opts);
	}
	else document.body.scrollTop = document.documentElement.scrollTop = y;
}


// --------------------------------------------------
// Scroll viewport to given DOM element (skip animation if "prefers reduced motion" is set)
// 	Requires: detect-browser-options.js | prefers-reduced-motion
// --------------------------------------------------
function scrollViewportToElement(el) {
	var opts = {};
	if (!browser.options.prefersReducedMotion) opts.behavior = 'smooth';
	el.scrollIntoView(opts);
}


// --------------------------------------------------
// Detect if given DOM element is in the viewport.
//    If partiallyVisible is true, returns true even if the
//    element is not completely contained in the viewport.
// --------------------------------------------------
function isElementInViewport(el, partiallyVisible = false) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    if (partiallyVisible) {
       return (
		(top >= 0 && top <= innerHeight) || (bottom >= 0 && bottom <= innerHeight) || (top < 0 && bottom > innerHeight)
	) &&
	(
		(left >= 0 && left <= innerWidth) || (right >= 0 && right <= innerWidth) || (left < 0 && right > innerWidth)
	);
    }  
    return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}


// --------------------------------------------------
// Make given DOM element fullscreen.
// --------------------------------------------------
function makeElementFullscreen(el) {
	var elementRequestFullscreen = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
	if (elementRequestFullscreen) elementRequestFullscreen.call(el);
}

// --------------------------------------------------
//  Cancel fullscreen for given DOM element
// --------------------------------------------------
function cancelElementFullscreen(el) {
	var elementExitFullscreen = el.exitFullscreen || el.webkitExitFullscreen || el.mozCancelFullscreen || el.msExitFullscreen;
	if (elementExitFullscreen) {
		elementExitFullscreen.call(el);
		return;
	}
	var documentExitFullscreen = document.documentElement.exitFullscreen || document.documentElement.webkitExitFullscreen || document.documentElement.mozExitFullscreen || document.documentElement.msExitFullscreen;
	documentExitFullscreen.call(document.documentElement);
}

/*
function makeElementFullscreen(el) {
    if (el.webkitEnterFullScreen) el.webkitEnterFullScreen();
    else if (el.requestFullscreen) el.requestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
    else {
        var requestFullscreen = document.documentElement.requestFullscreen ||
            document.documentElement.webkitRequestFullscreen ||
            document.documentElement.mozRequestFullscreen ||
            document.documentElement.requestFullScreen ||
            document.documentElement.webkitRequestFullScreen ||
            document.documentElement.mozRequestFullScreen;
        if (requestFullscreen) requestFullscreen.call(document.documentElement);
    }
}
*?
