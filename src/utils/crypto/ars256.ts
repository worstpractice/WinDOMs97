import type { Binary } from "typings/Binary";
import type { Hash } from "typings/phantom-types/Hash";
import { md5 } from "utils/crypto/md5";

/** Admittedly quite an `ars` implementation. */
export const ars256 = (binary: Binary) => {
  const stringified = JSON.stringify(binary);

  const hashed = md5(stringified);

  return hashed as Hash;
};
