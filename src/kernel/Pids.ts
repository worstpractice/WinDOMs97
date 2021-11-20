import type { PID } from 'typings/phantom-types/Pid';
import { ascending } from 'utils/compare/ascending';
import { from } from 'utils/range';

/** Inclusive. */
const HIGHEST_PID = 16 as const;

const backingSet = new Set<PID>(from(0).to(HIGHEST_PID) as PID[]);

export const Pids = {
  get available(): readonly PID[] {
    return [...backingSet].sort(ascending);
  },

  free(pid: PID): void {
    if (pid < 0) throw new RangeError(`Pids below 0 cannot be used! (Pid was ${pid})`);
    if (pid > HIGHEST_PID) throw new RangeError(`Pids above ${HIGHEST_PID} cannot be used! (Pid was ${pid})`);

    if (backingSet.has(pid)) {
      console.warn(`Trying to free a pid that was not in use! (Pid was ${pid})`);
    }

    backingSet.add(pid);
  },

  use(): PID | null {
    if (!backingSet.size) return null;

    // NOTE: Sorting here is CRUCIAL, or (for starters:) random buttons start controlling random `OsWindow`s!
    const availablePids = [...backingSet].sort(ascending);

    const pid = availablePids.pop();

    if (pid === undefined) {
      throw new ReferenceError('We just ran out of pids!');
    }

    backingSet.delete(pid);

    return pid;
  },
} as const;
