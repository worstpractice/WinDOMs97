export const compose = (...fns: CallableFunction[]) => {
  const inner = () => {
    for (const each of fns) {
      each();
    }
  };

  return inner;
};
