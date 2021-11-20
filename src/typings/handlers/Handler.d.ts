import type { KeyboardHandler } from 'typings/handlers/KeyboardHandler';
import type { MouseHandler } from 'typings/handlers/MouseHandler';

export type Handler<T extends HTMLElement | Document> = KeyboardHandler<T> | MouseHandler<T>;
