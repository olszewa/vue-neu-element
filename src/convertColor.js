export default function convertColor(color, type, distance, intensity, blur) {
  // Convert HEX to RGB

  let r = 0,
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
  }

  // Convert RGB to HSL

  r /= 255;
  g /= 255;
  b /= 255;

  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;

  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  if (type === "flat") {
    return [
      `${color}`,
      `${distance}px ${distance}px ${blur}px hsl(${h},${s - 1}%,${l -
        intensity *
          100}%), -${distance}px -${distance}px ${blur}px hsl(${h},${s +
        1}%,${l + intensity * 100}%)`
    ];
  } else if (type === "concave") {
    return [
      `linear-gradient(145deg, hsl(${h},${s - 5}%,${l - 5}%), hsl(${h - 1},${s +
        5}%,${l + 5}%)`,
      `${distance}px ${distance}px ${blur}px hsl(${h},${s - 1}%,${l -
        intensity *
          100}%), -${distance}px -${distance}px ${blur}px hsl(${h},${s +
        1}%,${l + intensity * 100}%)`
    ];
  } else if (type === "convex") {
    return [
      `linear-gradient(145deg, hsl(${h - 1},${s + 5}%,${l + 5}%), hsl(${h},${s -
        5}%,${l - 5}%)`,
      `${distance}px ${distance}px ${blur}px hsl(${h},${s - 1}%,${l -
        intensity *
          100}%), -${distance}px -${distance}px ${blur}px hsl(${h},${s +
        1}%,${l + intensity * 100}%)`
    ];
  } else if (type === "pressed") {
    return [
      `${color}`,
      `inset ${distance}px ${distance}px ${blur}px hsl(${h},${s - 1}%,${l -
        intensity *
          100}%), inset -${distance}px -${distance}px ${blur}px hsl(${h},${s +
        1}%,${l + intensity * 100}%)`
    ];
  } else if (type === "surrounded") {
    return [
      `${color}`,
      `inset -3px -3px 7px hsl(${h},${s +
        1}%,100%), inset 3px 3px 5px hsl(${h},${s - 1}%,67%)`
    ];
  }
}
