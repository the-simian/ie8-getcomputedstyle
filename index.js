

function shimComputedStyle() {
  // ES5 15.4.4.19
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  if (!global.getComputedStyle) {

    function getComputedStyle(el, pseudo) {

      function argsToUppercase() {
        return arguments[2].toUpperCase();
      }

      function getPropertyValue(prop) {

        var re = /(\-([a-z]){1})/g;

        if (prop == 'float') {
          prop = 'styleFloat';
        }

        if (re.test(prop)) {
          prop = prop.replace(re, argsToUppercase);


        return el.currentStyle[prop] ? el.currentStyle[prop] : null;
      }
      this.el = el;
      this.getPropertyValue = getPropertyValue;
      return this;
    }
    global.getComputedStyle = getComputedStyle;
  }
}

// This handles multiple module systems
(function supportModuleTypes(definition, context) {
  // RequireJS
  if (typeof module != 'undefined' && module.exports) {
    module.exports = definition();
  } else if (typeof define == 'function') {
    define(definition);
    // YUI3
  } else if (typeof YUI == 'function') {
    YUI.add('es5', definition);
    // CommonJS and <script>
  } else {
    definition();
  }
})(shimComputedStyle);
