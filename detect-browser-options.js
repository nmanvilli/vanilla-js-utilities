var browser = {
	options: {}
}

// --------------------------------------------------
// prefers-reduced-motion
// 	Requires: detect-browser-features.js | matchMedia
// --------------------------------------------------
browser.options.prefersReducedMotion = false;
if (browser.supports.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches )
	browser.options.prefersReducedMotion = true;