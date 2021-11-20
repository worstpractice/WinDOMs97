import type { ComparePid } from 'typings/sorting/ComparePid';

export const byPid: ComparePid = ({ pid: a }, { pid: b }) => {
  return a < b ? -1 : 1;
};
