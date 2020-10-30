import type { Mutable } from "typings/Mutable";
import type { Process } from "typings/Process";

export type ByPID = (a: Mutable<Process>, b: Mutable<Process>) => number;
