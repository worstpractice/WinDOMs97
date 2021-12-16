import type { OsRef } from 'src/typings/OsRef';
import type { DragState } from 'src/typings/state/DragState';
import create from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly dragRef: OsRef<HTMLElement>;
};

export type Actions = {
  readonly setDragRef: <T extends HTMLElement>(this: void, to: OsRef<T>) => void;
  readonly unsetDragRef: (this: void) => void;
};

let debugLogCounter = 0;

const nullRef: OsRef<HTMLElement> = { current: null } as const;

export const useDragState = create<DragState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      dragRef: nullRef,
      ///////////////////////////////////////////
    } as const,
    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setDragRef: <T extends HTMLElement>({ current }: OsRef<T>): void => {
          set(({ dragRef }) => {
            if (dragRef.current === current) return { dragRef } as const;

            console.groupCollapsed(`${++debugLogCounter}.  DragRef Changed `);
            console.debug('FROM:', dragRef.current);
            console.debug('TO:', current);
            console.groupEnd();

            return { dragRef: { current } } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        unsetDragRef: (): void => {
          set(({ dragRef }) => {
            if (dragRef.current === null) return { dragRef } as const;

            console.groupCollapsed(`${++debugLogCounter}.  DragRef Changed `);
            console.debug('FROM:', dragRef.current);
            console.debug('TO:', null);
            console.groupEnd();

            return { dragRef: nullRef } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
