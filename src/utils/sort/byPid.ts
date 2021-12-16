import type { Pid } from 'src/typings/phantom-types/Pid';
import { descending } from 'src/utils/sort/descending';

export const byPid = <T extends { readonly pid: Pid }>({ pid: a }: T, { pid: b }: T) => descending(a, b);
