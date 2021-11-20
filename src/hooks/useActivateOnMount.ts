import { useLayoutEffect } from 'react';
import { useActiveState } from 'src/state/useActiveState';
import type { OsRef } from 'src/typings/OsRef';
import type { ActiveState } from 'src/typings/state/ActiveState';
import { bringToFront } from 'src/utils/bringToFront';

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
