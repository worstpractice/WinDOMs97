import type { ImmutableBrand } from "typings/brands/ImmutableBrand";

export type Immutable<T> = T extends ImmutableBrand
  ? never
  : {
      readonly [K in keyof T]: T[K] extends never ? T & ImmutableBrand : Immutable<T[K]>;
    };
