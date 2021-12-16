import type { Position } from 'src/typings/Position';

export const toInitialPosition = (): Position => ({ x: 0, y: 0 } as const);
