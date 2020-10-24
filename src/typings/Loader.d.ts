import type { OsRef } from "typings/OsRef";
import type { Process } from "typings/Process";

export type Loader = {
  <T extends HTMLElement>(ref: OsRef<T>): Process;
};

export type LiLoader = {
  <T extends HTMLLIElement>(ref: OsRef<T>): Process;
};

export type ButtonLoader = {
  <T extends HTMLButtonElement>(ref: OsRef<T>): Process;
};
