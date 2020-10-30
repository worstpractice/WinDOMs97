import type { PID } from "typings/phantom-types/PID";

export type ComparePid = <T extends { pid: PID }>({ pid: a }: T, { pid: b }: T) => number;
