import type { Binary } from "typings/Binary";
import type { OsRef } from "typings/OsRef";

export type Linker = {
  <T extends HTMLElement>(ref: OsRef<T>): Binary;
};
