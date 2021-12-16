export const rangeFrom = (n: number) => {
  return {
    to(m: number): readonly number[] {
      if (m <= n) throw new RangeError(`Cannot range from ${n} to ${m}`);

      const range: number[] = [];

      for (let i = n; i < m; i++) range.push(i);

      return range;
    },
  } as const;
};
