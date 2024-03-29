import { useLayoutEffect } from 'react';
import { useActiveState } from 'src/state/useActiveState';
import type { OsRef } from 'src/typings/OsRef';
import type { ActiveState } from 'src/typings/state/ActiveState';
import { bringToFront } from 'src/utils/bringToFront';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('setActiveRef');
////////////////////////////////////////////////////////////////

export const useActivateOnMount = <T extends OsRef<HTMLElement>>(ref: T): void => {
  const { setActiveRef } = useActiveState(fromActive);

  useLayoutEffect((): void => {
    setActiveRef(ref);
    bringToFront(ref);
  }, [setActiveRef, ref]);
};
