const convertOpacityToHex = (alpha: number) =>
  Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0');

const opacity = {
  0: convertOpacityToHex(0),
  5: convertOpacityToHex(0.05),
  10: convertOpacityToHex(0.1),
  20: convertOpacityToHex(0.2),
  25: convertOpacityToHex(0.25),
  30: convertOpacityToHex(0.3),
  40: convertOpacityToHex(0.4),
  50: convertOpacityToHex(0.5),
  60: convertOpacityToHex(0.6),
  70: convertOpacityToHex(0.7),
  75: convertOpacityToHex(0.75),
  80: convertOpacityToHex(0.8),
  90: convertOpacityToHex(0.9),
  95: convertOpacityToHex(0.95),
  100: convertOpacityToHex(1),
} as const;

export default opacity;
