if (!browser) var browser = {};
browser.supports = {};

// --------------------------------------------------
// classList
// --------------------------------------------------
browser.supports.classList = 'classList' in document.createElement('p');


// --------------------------------------------------
// matchMedia
// --------------------------------------------------
browser.supports.matchMedia = false;
if (typeof window.matchMedia !== 'undefined') browser.supports.matchMedia = true;


// --------------------------------------------------
// requestAnimationFrame (also save handler in 'raf' variable)
// --------------------------------------------------
browser.supports.requestAnimationFrame = false;
var raf = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame;
if (raf) browser.supports.requestAnimationFrame = true;


// --------------------------------------------------
// scrollTo
// --------------------------------------------------
browser.supports.scrollTo = false;
if (typeof window.scrollTo !== 'undefined') browser.supports.scrollTo = true;


// --------------------------------------------------
// SVG 1.1 support
// --------------------------------------------------
browser.supports.svg = false;
if (document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1'))
	browser.supports.svg = true;
