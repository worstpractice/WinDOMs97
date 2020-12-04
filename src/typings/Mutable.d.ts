import type { ImmutableBrand } from "typings/brands/ImmutableBrand";

export type Mutable<T> = T extends ImmutableBrand
  ? never
  : {
      -readonly [K in keyof T]: T[K] extends never ? T : Mutable<T[K]>;
    };
