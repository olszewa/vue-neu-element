import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.number.to-fixed';
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.number.constructor';

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function convertColor(color, type, distance, intensity, blur) {
  // Convert HEX to RGB
  var r = 0,
      g = 0,
      b = 0;

  if (color.length == 4) {
    r = "0x" + color[1] + color[1];
    g = "0x" + color[2] + color[2];
    b = "0x" + color[3] + color[3];
  } else if (color.length == 7) {
    r = "0x" + color[1] + color[2];
    g = "0x" + color[3] + color[4];
    b = "0x" + color[5] + color[6];
  } // Convert RGB to HSL


  r /= 255;
  g /= 255;
  b /= 255;
  var cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
  if (delta == 0) h = 0;else if (cmax == r) h = (g - b) / delta % 6;else if (cmax == g) h = (b - r) / delta + 2;else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  if (type === "flat") {
    return ["".concat(color), "".concat(distance, "px ").concat(distance, "px ").concat(blur, "px hsl(").concat(h, ",").concat(s - 1, "%,").concat(l - intensity * 100, "%), -").concat(distance, "px -").concat(distance, "px ").concat(blur, "px hsl(").concat(h, ",").concat(s + 1, "%,").concat(l + intensity * 100, "%)")];
  } else if (type === "concave") {
    return ["linear-gradient(145deg, hsl(".concat(h, ",").concat(s - 5, "%,").concat(l - 5, "%), hsl(").concat(h - 1, ",").concat(s + 5, "%,").concat(l + 5, "%)"), "".concat(distance, "px ").concat(distance, "px ").concat(blur, "px hsl(").concat(h, ",").concat(s - 1, "%,").concat(l - intensity * 100, "%), -").concat(distance, "px -").concat(distance, "px ").concat(blur, "px hsl(").concat(h, ",").concat(s + 1, "%,").concat(l + intensity * 100, "%)")];
  } else if (type === "convex") {
    return ["linear-gradient(145deg, hsl(".concat(h - 1, ",").concat(s + 5, "%,").concat(l + 5, "%), hsl(").concat(h, ",").concat(s - 5, "%,").concat(l - 5, "%)"), "".concat(distance, "px ").concat(distance, "px ").concat(blur, "px hsl(").concat(h, ",").concat(s - 1, "%,").concat(l - intensity * 100, "%), -").concat(distance, "px -").concat(distance, "px ").concat(blur, "px hsl(").concat(h, ",").concat(s + 1, "%,").concat(l + intensity * 100, "%)")];
  } else if (type === "pressed") {
    return ["".concat(color), "inset ".concat(distance, "px ").concat(distance, "px ").concat(blur, "px hsl(").concat(h, ",").concat(s - 1, "%,").concat(l - intensity * 100, "%), inset -").concat(distance, "px -").concat(distance, "px ").concat(blur, "px hsl(").concat(h, ",").concat(s + 1, "%,").concat(l + intensity * 100, "%)")];
  } else if (type === "surrounded") {
    return ["".concat(color), "inset -3px -3px 7px hsl(".concat(h, ",").concat(s + 1, "%,100%), inset 3px 3px 5px hsl(").concat(h, ",").concat(s - 1, "%,67%)")];
  }
}

var prefixCls = "neu-element";
var script = {
  name: "NeuElement",
  props: {
    tag: {
      type: String,
      "default": "div"
    },
    classList: {
      type: Array
    },
    width: String,
    height: String,
    surroundWidth: String,
    surroundHeight: String,
    surrounded: {
      type: Boolean,
      "default": false
    },
    color: {
      type: String,
      required: true
    },
    radius: {
      type: String,
      "default": "50px"
    },
    distance: {
      type: Number,
      "default": 30
    },
    intensity: {
      type: Number,
      "default": 0.15
    },
    blur: {
      type: Number,
      "default": 60
    },
    type: {
      validator: function validator(value) {
        return ["flat", "concave", "convex", "pressed"].includes(value);
      },
      "default": "flat"
    }
  },
  computed: {
    styles: function styles() {
      var style = {};
      style["width"] = this.width ? this.width : "";
      style["height"] = this.height ? this.height : "";
      style["border-radius"] = this.radius;
      style["background"] = convertColor(this.color, this.type, this.distance, this.intensity, this.blur)[0], style["box-shadow"] = convertColor(this.color, this.type, this.distance, this.intensity, this.blur)[1];
      style["--width"] = this.surroundWidth ? this.surroundWidth : "90%";
      style["--height"] = this.surroundHeight ? this.surroundHeight : "90%";
      style["--borderRadius"] = this.radius;
      style["--boxShadow"] = convertColor(this.color, "surrounded", this.distance, this.intensity, this.blur)[1];
      return style;
    },
    classes: function classes() {
      if (this.surrounded === true && this.classList) {
        return ["".concat(prefixCls), "".concat(prefixCls, "-surrounded")].concat(_toConsumableArray(this.classList));
      } else if (this.classList) {
        return ["".concat(prefixCls)].concat(_toConsumableArray(this.classList));
      } else {
        return ["".concat(prefixCls)];
      }
    }
  }
};

/* script */
            const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",class:_vm.classes,style:(_vm.styles)},[_vm._t("default")],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "NeuElement.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NeuElement = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export default NeuElement;
