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