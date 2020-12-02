export const css = (...args: (string | undefined)[]) => {
  return args.filter(Boolean).join(" ").trim();
};
