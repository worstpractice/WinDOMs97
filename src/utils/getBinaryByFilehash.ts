import { Binary } from "typings/Binary";
import type { Hash } from "typings/phantom-types/Hash";

export const getBinaryByFileHash = (targetHash: Hash, installedPrograms: readonly Binary[]) => {
  for (const binary of installedPrograms) {
    const { fileHash } = binary;

    if (fileHash === targetHash) {
      return binary;
    }
  }

  throw new ReferenceError("This can't happen");
};
