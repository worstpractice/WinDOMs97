import type { Binary } from 'src/typings/Binary';
import type { Hash } from 'src/typings/phantom-types/Hash';
import { md5 } from 'src/utils/crypto/md5';

/** Admittedly quite an `ars` implementation. */
export const ars256 = (binary: Binary) => {
  const stringified = JSON.stringify(binary);

  const hashed = md5(stringified);

  return hashed as Hash;
};
