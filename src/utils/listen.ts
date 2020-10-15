import type { MouseEventHandler } from "react";

/** A more typesafe `addEventListener` that returns a convenient cleanup function. */
export const listen = (type: keyof WindowEventMap, listener: MouseEventHandler, opts?: AddEventListenerOptions) => {
  if (opts) {
    document.addEventListener(type, (listener as unknown) as EventListener, opts);
  } else {
    document.addEventListener(type, (listener as unknown) as EventListener);
  }

  const unsubscribe = () => {
    document.removeEventListener(type, (listener as unknown) as EventListener);
  };

  return unsubscribe;
};