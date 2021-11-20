import type { PID } from 'typings/phantom-types/Pid';

export type ComparePid = <T extends { pid: PID }>({ pid: a }: T, { pid: b }: T) => number;
