import type { Binary } from 'src/typings/Binary';
import type { Hash } from 'src/typings/phantom-types/Hash';

export const getBinaryByFileHash = (targetHash: Hash, installedPrograms: readonly Binary[]) => {
  for (const binary of installedPrograms) {
    const { fileHash } = binary;

    if (fileHash === targetHash) {
      return binary;
    }
  }

  throw new ReferenceError("This can't happen");
};
