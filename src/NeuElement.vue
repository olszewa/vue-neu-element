<template>
  <component :is="tag" :class="classes" :style="styles">
    <slot></slot>
  </component>
</template>

<script>
import convertColor from "./convertColor";
const prefixCls = "neu-element";

export default {
  name: "NeuElement",
  props: {
    tag: {
      type: String,
      default: "div"
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
      default: false
    },
    color: {
      type: String,
      required: true
    },
    radius: {
      type: String,
      default: "50px"
    },
    distance: {
      type: Number,
      default: 30
    },
    intensity: {
      type: Number,
      default: 0.15
    },
    blur: {
      type: Number,
      default: 60
    },
    type: {
      validator(value) {
        return ["flat", "concave", "convex", "pressed"].includes(value);
      },
      default: "flat"
    }
  },
  computed: {
    styles() {
      const style = {};
      style["width"] = this.width ? this.width : "";
      style["height"] = this.height ? this.height : "";
      style["border-radius"] = this.radius;
      (style["background"] = convertColor(
        this.color,
        this.type,
        this.distance,
        this.intensity,
        this.blur
      )[0]),
        (style["box-shadow"] = convertColor(
          this.color,
          this.type,
          this.distance,
          this.intensity,
          this.blur
        )[1]);
      style["--width"] = this.surroundWidth ? this.surroundWidth : "90%";
      style["--height"] = this.surroundHeight ? this.surroundHeight : "90%";
      style["--borderRadius"] = this.radius;
      style["--boxShadow"] = convertColor(
        this.color,
        "surrounded",
        this.distance,
        this.intensity,
        this.blur
      )[1];
      return style;
    },
    classes() {
      if (this.surrounded === true && this.classList) {
        return [`${prefixCls}`, `${prefixCls}-surrounded`, ...this.classList];
      } else if (this.classList) {
        return [`${prefixCls}`, ...this.classList];
      } else {
        return [`${prefixCls}`];
      }
    }
  }
};
</script>

<style>
.neu-element-surrounded {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.neu-element-surrounded:after {
  display: flex;
  content: "";
  position: absolute;
  height: var(--height);
  width: var(--width);
  background-color: transparent;
  border-radius: var(--borderRadius);
  box-shadow: var(--boxShadow);
}
</style>
