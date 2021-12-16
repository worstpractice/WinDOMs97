export const from = <State extends object = never>() => {
  const select = <Key extends keyof State>(...keys: readonly Key[]) => {
    const innerSelect = (state: State): { readonly [key in Key]: State[key] } => {
      const selection: any = {};

      for (const key of keys) {
        selection[key] = state[key];
      }

      return selection;
    };

    return innerSelect;
  };

  return {
    select,
  } as const;
};
