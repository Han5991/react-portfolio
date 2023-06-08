export const transformCount = (count: number) => {
  if (count === 0) {
    return 0;
  }
  if (count <= 2) {
    return 1;
  }
  if (count <= 4) {
    return 2;
  }
  if (count <= 6) {
    return 3;
  }
  return 4;
};

export const transformPixelsToNumber = (pixel: string) => {
  const matches = pixel.match(/-?\d+/g);
  if (matches && matches.length > 0) {
    return parseInt(matches[0], 10);
  }
  return 0;
};
