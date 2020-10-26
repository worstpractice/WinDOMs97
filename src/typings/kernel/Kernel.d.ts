import type { OsState } from "typings/kernel/OsState";
import type { SysCalls } from "typings/kernel/SysCalls";

export type Kernel = OsState & SysCalls;
