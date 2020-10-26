import type { Kernel } from "typings/kernel/Kernel";

export type BSOD = Pick<Kernel, "isBsod" | "bsodError" | "bsodMessage">;
