import type { MouseHandler } from 'src/typings/handlers/MouseHandler';

export type MouseHandlers<T extends NonNullable<HTMLElement | Document>> = {
  readonly LMB?: MouseHandler<T>;
  readonly MMB?: MouseHandler<T>;
  readonly RMB?: MouseHandler<T>;
};
