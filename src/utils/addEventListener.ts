/** A more typesafe `addEventListener` that returns a convenient cleanup function. */
export const addEventListener = (type: keyof WindowEventMap, listener: EventListener) => {
  document.addEventListener(type, listener);

  const unsubscribe = () => {
    document.removeEventListener(type, listener);
  };

  return unsubscribe;
};
