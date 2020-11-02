import { is } from "type-predicates/is";
import type { OsRef } from "typings/OsRef";
import type { ActiveState } from "typings/state/ActiveState";
import create from "zustand";
import { combine } from "zustand/middleware";

export type Data = {
  activeRef: OsRef<HTMLElement>;
};

export type Actions = {
  setActiveRef: <T extends HTMLElement>(to: OsRef<T>) => void;
  unsetActiveRef: () => void;
};

let debugLogCounter = 0;

const nullRef: OsRef<HTMLElement> = { current: null } as const;

export const useActiveState = create<ActiveState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      activeRef: nullRef,
      ///////////////////////////////////////////
    } as const,
    (set) =>
      ({
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setActiveRef: <T extends OsRef<HTMLElement>>({ current }: T) => {
          set(({ activeRef }) => {
            if (is(activeRef.current, current)) {
              return { activeRef } as const;
            }

            console.groupCollapsed(`${++debugLogCounter}.  ActiveRef Changed `);
            console.debug("FROM:", activeRef.current);
            console.debug("TO:", current);
            console.groupEnd();

            return { activeRef: { current } } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        unsetActiveRef: () => {
          set(({ activeRef }) => {
            if (is(activeRef.current, null)) {
              return { activeRef } as const;
            }

            console.groupCollapsed(`${++debugLogCounter}.  ActiveRef Changed `);
            console.debug("FROM:", activeRef.current);
            console.debug("TO:", null);
            console.groupEnd();

            return { activeRef: nullRef } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const),
  ),
);
