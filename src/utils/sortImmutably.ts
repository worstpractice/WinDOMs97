import type { Process } from 'src/typings/Process';
import type { ComparePid } from 'src/typings/sorting/ComparePid';

export const sortProcesses = <T extends Process, U extends ComparePid>(immutable: readonly T[], by: U) => {
  // @ts-expect-error To mutable...
  const mutable: T[] = immutable;

  // ...then back to immutable (right after sorting).
  const sortedImmutable: readonly T[] = mutable.sort(by);

  return sortedImmutable;
};
