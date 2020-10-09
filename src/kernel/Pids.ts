import { isUndefined } from "utils/isUndefined";
import { from } from "utils/range";

/** Inclusive. */
const MAX = 10 as const;

const backingSet = new Set<number>(from(0).to(MAX));

export const Pids = {
  get available() {
    return Array.from(backingSet.values()).sort();
  },

  free(pid: number) {
    if (pid < 0) throw new RangeError(`Pids below 0 cannot be used! (Pid was ${pid})`);
    if (pid > MAX) throw new RangeError(`Pids above ${MAX} cannot be used! (Pid was ${pid})`);

    if (backingSet.has(pid)) {
      console.warn("Trying to free a pid that is already available.");
    }

    backingSet.add(pid);
  },

  use() {
    if (!backingSet.size) {
      throw new ReferenceError(`All ${MAX} pids are taken!`);
    }

    // NOTE: Sorting here is crucial, or else which windowbuttons affect which window gets jumbled!
    const availablePids = Array.from(backingSet.values()).sort();

    const pid = availablePids.pop();

    if (isUndefined(pid)) {
      throw new ReferenceError("We just ran out of pids!");
    }

    backingSet.delete(pid);

    return pid;
  },
} as const;