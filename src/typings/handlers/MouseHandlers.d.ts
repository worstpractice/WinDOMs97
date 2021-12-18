import type { MouseHandler } from 'src/typings/handlers/MouseHandler';

export type MouseHandlers<T extends NonNullable<HTMLElement | Document>> = {
  readonly lmb?: MouseHandler<T>;
  readonly mmb?: MouseHandler<T>;
  readonly rmb?: MouseHandler<T>;
};
