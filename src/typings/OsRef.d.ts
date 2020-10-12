import type { MutableRefObject } from "react";

export type OsRef<T extends NonNullable<HTMLElement>> = MutableRefObject<T | null>;
