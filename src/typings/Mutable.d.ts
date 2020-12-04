import type { ImmutableBrand } from "typings/phantom-types/brands/ImmutableBrand";

export type Mutable<T> = T extends ImmutableBrand
  ? never
  : {
      -readonly [K in keyof T]: T[K] extends never ? T & ImmutableBrand : Mutable<T[K]>;
    };
