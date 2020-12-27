/** See: https://stackoverflow.com/a/43053803 */
export const cartesianProduct = (...a: readonly (readonly unknown[])[]) => {
  return a.reduce((a, b) => {
    return a.flatMap((c) => {
      return b.map((d) => {
        return [c, d].flat();
      });
    });
  });
};
