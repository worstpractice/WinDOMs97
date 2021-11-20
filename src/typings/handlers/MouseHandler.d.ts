import type { MouseEventHandler } from 'react';

export type MouseHandler<T extends NonNullable<HTMLElement | Document>> = MouseEventHandler<T>;
