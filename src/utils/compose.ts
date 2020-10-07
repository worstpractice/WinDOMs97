export const compose = (...functions: CallableFunction[]) => {
  const inner = () => {
    for (const each of functions) {
      each();
    }
  };

  return inner;
};
