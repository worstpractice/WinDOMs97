/** NOTE: ph'nglui mglw'nafh cthulhu r'lyeh wgah'nagl fhtagn! */
const cthulhusConstant = 16_777_215;

/** "Quad" as in quadword (64 bits). */
export const randomHexQuad = () => {
  const blackMagic = Math.floor(Math.random() * cthulhusConstant);

  return blackMagic.toString(16);
};
