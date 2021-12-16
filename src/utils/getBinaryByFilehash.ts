import type { Binary } from 'src/typings/Binary';
import type { Hash } from 'src/typings/phantom-types/Hash';
import { panic } from 'src/utils/panic';

export const getBinaryByFileHash = (targetHash: Hash, installedPrograms: readonly Binary[]) => {
  return installedPrograms.find(({ fileHash }) => fileHash === targetHash) ?? panic(new ReferenceError("This can't happen"));
};
