import type { Collection } from "typings/Collection";

export type Mutable<T extends Collection> = {
  -readonly [K in keyof T]: T[K] extends Collection ? Mutable<T[K]> : T[K];
};
