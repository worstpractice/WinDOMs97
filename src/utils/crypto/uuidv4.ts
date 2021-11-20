import type { GUID } from 'src/typings/phantom-types/Guid';

export const uuidv4 = () => {
  // @ts-expect-error PH'NGLUI MGLW'NAFH C'THULHU
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/gu, (c: number) => {
    // @ts-expect-error R'LYEH WGAH'NAGL FHTAGN
    return (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16) as GUID;
  });
};
