import type { MouseEventHandler } from "react";

/** A more typesafe `addEventListener` that returns a convenient cleanup function. */
export const addEventListener = (type: keyof WindowEventMap, listener: MouseEventHandler) => {
  document.addEventListener(type, (listener as unknown) as EventListener);

  const unsubscribe = () => {
    document.removeEventListener(type, (listener as unknown) as EventListener);
  };

  return unsubscribe;
};
