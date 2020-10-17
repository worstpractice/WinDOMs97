import { isUndefined } from "type-predicates/isUndefined";
import type { Pid } from "typings/phantom-types/Pid";
import { from } from "utils/range";

/** Inclusive. */
const MAX = 10 as const;

const backingSet = new Set<Pid>(from(0).to(MAX) as Pid[]);

export const Pids = {
  get available() {
    return [...backingSet].sort();
  },

  free(pid: Pid) {
    if (pid < 0) throw new RangeError(`Pids below 0 cannot be used! (Pid was ${pid})`);
    if (pid > MAX) throw new RangeError(`Pids above ${MAX} cannot be used! (Pid was ${pid})`);

    if (backingSet.has(pid)) {
      console.warn(`Trying to free a pid that was not in use! (Pid was ${pid})`);
    }

    backingSet.add(pid);
  },

  use() {
    if (!backingSet.size) return null;

    // NOTE: Sorting here is CRUCIAL, or (for starters:) random buttons start controlling random `OsWindow`s!
    const availablePids = [...backingSet].sort();

    const pid = availablePids.pop();

    if (isUndefined(pid)) {
      throw new ReferenceError("We just ran out of pids!");
    }

    backingSet.delete(pid);

    return pid as Pid;
  },
} as const;
