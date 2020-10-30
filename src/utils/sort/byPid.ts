import type { ByPID } from "typings/ByPID";

export const byPid: ByPID = ({ pid: a }, { pid: b }) => {
  return a < b ? -1 : 1;
};
