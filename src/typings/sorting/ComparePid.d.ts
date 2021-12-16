import type { Pid } from 'src/typings/phantom-types/Pid';

export type ComparePid = <T extends { pid: Pid }>({ pid: a }: T, { pid: b }: T) => number;
