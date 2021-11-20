import type { Binary } from 'src/typings/Binary';
import type { OsRef } from 'src/typings/OsRef';

export type Linker = <T extends HTMLElement>(ref: OsRef<T>) => Binary;
