import type { KeyboardEventHandler } from 'react';

export type KeyboardHandler<T extends NonNullable<HTMLElement | Document>> = KeyboardEventHandler<T>;
