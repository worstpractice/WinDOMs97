import type { MutableRefObject } from 'react';

export type OsRef<T extends NonNullable<HTMLElement | HTMLLIElement | HTMLButtonElement>> = MutableRefObject<T | null>;
