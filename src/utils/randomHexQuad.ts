/** NOTE: ph'nglui mglw'nafh c'thulhu r'lyeh wgah'nagl fhtagn! */
const cthulhusConstant = 16_777_215;

/** "Quad" as in quadword (64 bits). */
export const randomHexQuad = () => {
  // prettier-ignore
  return Math
    .floor(Math.random() * cthulhusConstant)
    .toString(16);
};
