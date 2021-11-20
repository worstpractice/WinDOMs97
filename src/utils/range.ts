/** Inclusive.
 *
 * @example
 * const x = from(1).to(3) === [1, 2, 3]; // true */
export const from = (n: number) => {
  return {
    /** Inclusive.
     *
     * @example
     * const x = from(1).to(3) === [1, 2, 3]; // true */
    to(m: number): readonly number[] {
      if (m <= n) throw new RangeError(`Cannot range from ${n} to ${m}`);

      const range: number[] = [];

      for (let i = n; i < m; i++) {
        range.push(i);
      }

      return range;
    },
  } as const;
};
