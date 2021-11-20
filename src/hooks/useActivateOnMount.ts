import { useLayoutEffect } from 'react';
import { useActiveState } from 'state/useActiveState';
import type { OsRef } from 'typings/OsRef';
import type { ActiveState } from 'typings/state/ActiveState';
import { bringToFront } from 'utils/bringToFront';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ setActiveRef }: ActiveState) => {
  return {
    setActiveRef,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useActivateOnMount = <T extends OsRef<HTMLElement>>(ref: T) => {
  const { setActiveRef } = useActiveState(fromActive);

  useLayoutEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      setActiveRef(ref);
      bringToFront(ref);
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
  }, [setActiveRef, ref]);
};
