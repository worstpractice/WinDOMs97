import type { ObSet } from 'obset';
import type { Softlink } from 'src/typings/Softlink';

export const isOnDesktop = <T extends { readonly softlinks: ObSet<Softlink> }>({ softlinks }: T): boolean => softlinks.has('desktop');
