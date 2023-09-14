// --------------------------------------------------
// Function.prototype.bind
// --------------------------------------------------
if (!('bind' in Function.prototype)) {
    Function.prototype.bind = function(owner) {
        var that = this;
        if (arguments.length <= 1) {
            return function() {
                return that.apply(owner, arguments);
            };
        } else {
            var args= Array.prototype.slice.call(arguments, 1);
            return function() {
                return that.apply( owner, arguments.length === 0 ? args : args.concat(Array.prototype.slice.call(arguments)) );
            };
        }
    };
}

// --------------------------------------------------
// String.prototype.trim
// --------------------------------------------------
if (!('trim' in String.prototype)) {
    String.prototype.trim = function() {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}

// --------------------------------------------------
// Array.prototype.indexOf
// --------------------------------------------------
if (!('indexOf' in Array.prototype)) {
  Array.prototype.indexOf= function(find, i) {
        if (i === undefined) i = 0;
        if (i < 0) i += this.length;
        if (i < 0) i = 0;
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find) return i;
        return -1;
    };
}

// --------------------------------------------------
// Array.prototype.lastIndexOf
// --------------------------------------------------
if (!('lastIndexOf' in Array.prototype)) {
  Array.prototype.lastIndexOf = function(find, i) {
        if (i === undefined) i = this.length - 1;
        if (i < 0) i += this.length;
        if (i > this.length - 1 ) i = this.length - 1;
        for (i++; i-- > 0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i] === find) return i;
        return -1;
    };
}

// --------------------------------------------------
// Array.prototype.forEach
// --------------------------------------------------
if (!('forEach' in Array.prototype)) {
  Array.prototype.forEach = function(action, that) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this) action.call(that, this[i], i, this);
    };
}

// --------------------------------------------------
// Array.prototype.map
// --------------------------------------------------
if (!('map' in Array.prototype)) {
  Array.prototype.map = function(mapper, that) {
        var other = new Array(this.length);
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this) other[i] = mapper.call(that, this[i], i, this);
        return other;
    };
  }

// --------------------------------------------------
// Array.prototype.filter
// --------------------------------------------------
  if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that) {
        var other = [], v;
        for (var i = 0, n = this.length; i < n; i++)
            if ( i in this && filter.call(that, v = this[i], i, this) )
                other.push(v);
        return other;
    };
}

// --------------------------------------------------
// Array.prototype.every
// --------------------------------------------------
if (!('every' in Array.prototype)) {
    Array.prototype.every= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}

// --------------------------------------------------
// Array.prototype.some
// --------------------------------------------------
if (!('some' in Array.prototype)) {
    Array.prototype.some= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}

// --------------------------------------------------
// string.endsWith
// --------------------------------------------------
if (!('endsWith' in String.prototype)) {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

// --------------------------------------------------
// window.scrollTo
// --------------------------------------------------
if (typeof window.scrollTo !== 'function') {
  window.scrollTo = function(options) {
    if (options.top) document.body.scrollTop = options.top;
    if (options.left) document.body.scrollLeft = options.left;
  }
}

// --------------------------------------------------
// classList
// --------------------------------------------------
if (! 'classList' in document.createElement('p') ) {
  Object.defineProperty(Element.prototype, 'classList', { get: function() {
    var el = this,
      classes = (el.getAttribute('class') || '').replace(/^\s+|\s$/g,'').split(/\s+/g);
    if (classes[0]==='') classes.splice(0,1);
    function setClass() {
      if (classes.length > 0) el.setAttribute('class', classes.join(' '));
      else el.removeAttribute('class');
    }
    classes.toggle = function(className, force) {
      if (force !== undefined){
        if (force) classes.add(className);
        else classes.remove(className);
      }
      else {
        if (classes.indexOf(className) !== -1) classes.splice(classes.indexOf(className), 1);
        else classes.push(className);
      }
      setClass();
    };
    classes.add = function() {
      var args = [].slice.call(arguments);
      for (var i = 0, l = args.length; i < l; i++) {
        if (classes.indexOf(args[i]) === -1) classes.push(args[i])
      };
      setClass();
    };
    classes.remove = function() {
      var args = [].slice.call(arguments);
      for (var i = 0, l = args.length; i < l; i++) {
        if (classes.indexOf(args[i]) !== -1) classes.splice(classes.indexOf(args[i]), 1);
      };
      setClass();
    };
    classes.item = function(i) {
      return classes[i];
    };
    classes.contains = function(className) {
      return classes.indexOf(className) !== -1;
    };
    classes.replace = function(oldClass, newClass) {
      if (classes.indexOf(oldClass) !== -1) classes.splice(classes.indexOf(oldClass), 1, newClass);
      setClass();
    };
    classes.value = (el.getAttribute('class') || '');
    return classes;
  } });
}
