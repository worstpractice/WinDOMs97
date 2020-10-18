import { isObject } from "type-predicates/isObject";

const snapshotInTime = (t: unknown) => {
  return JSON.parse(JSON.stringify(t));
};

/** Overcoming the lazily evaluted arrays shown in the developer console.
 *
 * See: https://stackoverflow.com/questions/42260524/array-length-is-zero-but-the-array-has-elements-in-it */
export const snapshot = (...args: unknown[]) => {
  for (const each of args) {
    if (isObject(each)) {
      console.log(snapshotInTime(each));
    }
  }
};
