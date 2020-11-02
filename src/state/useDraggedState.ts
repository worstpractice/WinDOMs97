import { is } from "type-predicates/is";
import type { OsRef } from "typings/OsRef";
import type { DraggedState } from "typings/state/DraggedState";
import create from "zustand";
import { combine } from "zustand/middleware";

export type Data = {
  draggedRef: OsRef<HTMLElement>;
};

export type Actions = {
  setDraggedRef: <T extends HTMLElement>(to: OsRef<T>) => void;
  unsetDraggedRef: () => void;
};

let debugLogCounter = 0;

const nullRef: OsRef<HTMLElement> = { current: null } as const;

export const useDraggedState = create<DraggedState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      draggedRef: nullRef,
      ///////////////////////////////////////////
    } as const,
    (set) =>
      ({
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setDraggedRef: <T extends HTMLElement>({ current }: OsRef<T>) => {
          set(({ draggedRef }) => {
            if (is(draggedRef.current, current)) {
              return { draggedRef } as const;
            }

            console.groupCollapsed(`${++debugLogCounter}.  DraggedRef Changed `);
            console.debug("FROM:", draggedRef.current);
            console.debug("TO:", current);
            console.groupEnd();

            return { draggedRef: { current } } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        unsetDraggedRef: () => {
          set(({ draggedRef }) => {
            if (is(draggedRef.current, null)) {
              return { draggedRef } as const;
            }

            console.groupCollapsed(`${++debugLogCounter}.  DraggedRef Changed `);
            console.debug("FROM:", draggedRef.current);
            console.debug("TO:", null);
            console.groupEnd();

            return { draggedRef: nullRef } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const),
  ),
);