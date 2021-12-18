import type { Pid } from 'src/typings/phantom-types/Pid';
import { panic } from 'src/utils/panic';
import { rangeFrom } from 'src/utils/rangeFrom';
import { ascending } from 'src/utils/sort/ascending';

/** Inclusive. */
const HIGHEST_PID = 16 as const;

const BACKING_SET = new Set<Pid>(rangeFrom(0).to(HIGHEST_PID) as Pid[]);

export const Pids = {
  alloc(): Pid | null {
    if (!BACKING_SET.size) return null;

    const pid = Pids.available.at(-1) ?? panic(new ReferenceError('We just ran out of pids!'));

    BACKING_SET.delete(pid);

    return pid;
  },

  get available(): readonly Pid[] {
    // NOTE: Sorting here is CRUCIAL, or (for starters:) random buttons start controlling random `OsWindow`s!
    return [...BACKING_SET].sort(ascending);
  },

  free(pid: Pid): void {
    if (pid < 0) throw new RangeError(`Pids below 0 cannot be used! (Pid was ${pid})`);
    if (pid > HIGHEST_PID) throw new RangeError(`Pids above ${HIGHEST_PID} cannot be used! (Pid was ${pid})`);

    if (BACKING_SET.has(pid)) console.warn(`Trying to free a pid that was not in use! (Pid was ${pid})`);

    BACKING_SET.add(pid);
  },
} as const;
