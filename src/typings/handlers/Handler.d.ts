import type { KeyboardHandler } from 'src/typings/handlers/KeyboardHandler';
import type { MouseHandler } from 'src/typings/handlers/MouseHandler';

export type Handler<T extends HTMLElement | Document> = KeyboardHandler<T> | MouseHandler<T>;
