import type { GUID } from "typings/phantom-types/GUID";

export const uuidv4 = () => {
  // @ts-expect-error ph'nglui mglw'nafh cthulhu r'lyeh wgah'nagl fhtagn
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number) => {
    return (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16) as GUID;
  });
};
