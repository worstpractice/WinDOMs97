import type { Binary } from 'src/typings/Binary';

export type Unhashed<T extends Binary> = Omit<T, 'fileHash'>;
