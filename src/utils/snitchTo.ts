import type { SyntheticEvent } from 'react';

export const snitchTo = <T extends SyntheticEvent>(fn: (event: T) => void) => {
  const acceptsHandlerFn = (handlerFn: (event: T) => void) => {
    const acceptsEvent = (event: T) => {
      fn(event);
      handlerFn(event);
    };

    return acceptsEvent;
  };

  return acceptsHandlerFn;
};

// const snitch = snitchTo(console.log);
