export const from = (rangeFrom: number) => {
  const fluentInterface = {
    /** Inclusively counted.
     *
     * @example
     * const x = from(1).to(3) === [1, 2, 3]; // true */
    to(upTo: number) {
      const range: number[] = [];

      for (let nr = rangeFrom; nr < upTo; nr++) {
        range.push(nr);
      }

      return range;
    },
  } as const;

  return fluentInterface;
};
