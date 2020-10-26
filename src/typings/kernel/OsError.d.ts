import type { OsState } from "typings/kernel/OsState";

export type OsError = Pick<OsState, "isBsod" | "bsodError" | "bsodMessage">;
