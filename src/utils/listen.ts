import type { MouseEventHandler } from "react";

type Params<T> = {
  event: keyof WindowEventMap;
  handler: MouseEventHandler<T>;
  options?: AddEventListenerOptions;
  /** Defaults to the `document` object. */
  on: EventTarget;
};

type CleanupFn = {
  (): void;
};

type Listen = {
  <T>(params: Params<T>): CleanupFn;
};

/** A more typesafe `addEventListener` that returns a convenient cleanup function. */
export const listen: Listen = ({ event, handler, options, on }) => {
  on.addEventListener(event, (handler as unknown) as EventListener, options);

  const cleanup = () => {
    on.removeEventListener(event, (handler as unknown) as EventListener);
  };

  return cleanup;
};
