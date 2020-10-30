import { is } from "type-predicates/is";
import type { OsRef } from "typings/OsRef";
import type { ActiveState } from "typings/state/ActiveState";
import create from "zustand";
import { combine } from "zustand/middleware";

export type Data = {
  activeRef: OsRef<HTMLElement>;
};

export type Actions = {
  activate: <T extends OsRef<HTMLElement>>(to: T) => void;
};

let debugLogCounter = 0;

export const useActiveState = create<ActiveState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      activeRef: { current: null },
      ///////////////////////////////////////////
    } as const,
    (set) =>
      ({
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        activate: <T extends OsRef<HTMLElement>>({ current }: T) => {
          set(({ activeRef }) => {
            if (is(activeRef.current, current)) {
              return { activeRef };
            }

            console.groupCollapsed(`${++debugLogCounter}.  ActiveRef Changed `);
            console.debug("FROM:", activeRef.current);
            console.debug("TO:", current);
            console.groupEnd();

            return { activeRef: { current } } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const),
  ),
);