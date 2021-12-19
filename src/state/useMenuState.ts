import type { Alternative } from 'src/typings/Alternative';
import type { MenuState } from 'src/typings/state/MenuState';
import create from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly alternatives: readonly Alternative[];
  readonly isStartMenuOpen: boolean;
  readonly isContextMenuOpen: boolean;
};

export type Actions = {
  readonly closeContextMenu: (this: void) => void;
  readonly closeMenus: (this: void) => void;
  readonly closeStartMenu: (this: void) => void;
  readonly openContextMenu: (this: void, alternatives: readonly Alternative[]) => void;
  readonly toggleStartMenu: (this: void) => void;
};

export const useMenuState = create<MenuState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      alternatives: [],
      isContextMenuOpen: false,
      isStartMenuOpen: false,
      ///////////////////////////////////////////
    } as const,
    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        closeContextMenu: (): void => {
          set(() => {
            return { alternatives: [], isContextMenuOpen: false } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        closeMenus: (): void => {
          set(() => {
            return { alternatives: [], isContextMenuOpen: false, isStartMenuOpen: false } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        closeStartMenu: (): void => {
          set(() => {
            return { isStartMenuOpen: false } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        openContextMenu: (alternatives: readonly Alternative[]): void => {
          set(() => {
            if (!alternatives.length) console.error('The array of alternatives was empty!');

            return { alternatives: [...alternatives], isContextMenuOpen: true } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        toggleStartMenu: (): void => {
          set(({ isStartMenuOpen }) => {
            return { isContextMenuOpen: false, isStartMenuOpen: !isStartMenuOpen } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
