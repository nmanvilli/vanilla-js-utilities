// --------------------------------------------------
// Iterate ancestors of given DOM element and return the first to have given class
// --------------------------------------------------
function getNearestAncestorByClass(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    if (el.classList.contains(cls)) return el;
    return null;
}

// --------------------------------------------------
// Get first child of given DOM element
// --------------------------------------------------
function getFirstChild(el) {
    var nodes = el.childNodes;
    for (var i = 0; i < nodes.length; i++)
        if (nodes[i].nodeType == 1) return nodes[i];
    return null;
}