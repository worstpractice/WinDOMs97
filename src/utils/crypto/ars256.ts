import type { Binary } from 'src/typings/Binary';
import type { Hash } from 'src/typings/phantom-types/Hash';
import type { Unhashed } from 'src/typings/Unhashed';
import { md5 } from 'src/utils/crypto/md5';

/** Admittedly quite an `ars` implementation. */
export const ars256 = <T extends Binary>(binary: Unhashed<T>) => {
  const stringified = JSON.stringify(binary);

  const hashed = md5(stringified);

  return hashed as Hash;
};
