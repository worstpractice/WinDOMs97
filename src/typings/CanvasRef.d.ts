import type { MutableRefObject } from "react";

type Default = NonNullable<CanvasRenderingContext2D>;

export type CanvasRef<T extends NonNullable<CanvasRenderingContext2D> = Default> = MutableRefObject<T | null>;
