import type { ObSet } from 'obset';
import type { Softlink } from 'src/typings/Softlink';

export const isInQuickstartArea = <T extends { readonly softlinks: ObSet<Softlink> }>({ softlinks }: T) => {
  return softlinks.has('quickstartarea');
};
