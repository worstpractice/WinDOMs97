import type { Collection } from "typings/Collection";

export type Immutable<T extends Collection> = {
  readonly [K in keyof T]: T[K] extends Collection ? Immutable<T[K]> : T[K];
};
