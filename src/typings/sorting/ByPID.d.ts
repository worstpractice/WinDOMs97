import type { Mutable } from "typings/Mutable";
import type { Process } from "typings/Process";

export type ByPID = <T extends Mutable<Process>>(a: T, b: T) => number;
