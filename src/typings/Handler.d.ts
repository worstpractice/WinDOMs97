import type { MouseEventHandler } from "react";

export type Handler<T extends NonNullable<HTMLElement | Document>> = MouseEventHandler<T>;
