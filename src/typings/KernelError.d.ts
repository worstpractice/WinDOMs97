import type { KernelState } from "kernel";

export type KernelError = Pick<KernelState, "isBsod" | "bsodError" | "bsodMessage">;
