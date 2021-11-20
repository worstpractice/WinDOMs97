import type { CleanupFn } from 'typings/CleanupFn';
import type { Handler } from 'typings/handlers/Handler';

type Params<T extends NonNullable<HTMLElement | Document>> = {
  event: keyof WindowEventMap;
  handler: Handler<T>;
  options?: AddEventListenerOptions;
  /** Defaults to the `document` object. */
  on: EventTarget;
};

type Listen = <T extends NonNullable<HTMLElement | Document>>(params: Params<T>) => CleanupFn;

/** A more typesafe `addEventListener` that returns a convenient cleanup function. */
export const listen: Listen = ({ event, handler, options, on }) => {
  on.addEventListener(event, handler as unknown as EventListener, options);

  const cleanup = () => {
    on.removeEventListener(event, handler as unknown as EventListener);
  };

  return cleanup;
};
