import type { CleanupFn } from 'src/typings/CleanupFn';
import type { Handler } from 'src/typings/handlers/Handler';

type Params<T extends NonNullable<HTMLElement | Document>> = {
  readonly event: keyof WindowEventMap;
  readonly handler: Handler<T>;
  readonly options?: AddEventListenerOptions;
  /** Defaults to the `document` object. */
  readonly on: EventTarget;
};

type Listen = <T extends NonNullable<HTMLElement | Document>>(params: Params<T>) => CleanupFn;

/** A more typesafe `addEventListener` that returns a convenient cleanup function. */
export const listen: Listen = ({ event, handler, options = { passive: true }, on }) => {
  on.addEventListener(event, handler as unknown as EventListener, options);

  const cleanup = () => {
    on.removeEventListener(event, handler as unknown as EventListener, options);
  };

  return cleanup;
};
