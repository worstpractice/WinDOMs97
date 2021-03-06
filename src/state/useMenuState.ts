import type { Alternative } from "typings/Alternative";
import type { MenuState } from "typings/state/MenuState";
import create from "zustand";
import { combine } from "zustand/middleware";

export type Data = {
  readonly alternatives: readonly Alternative[];
  readonly openMenu: "ContextMenu" | "StartMenu" | "";
};

export type Actions = {
  readonly closeMenus: () => void;
  readonly openContextMenu: (alternatives: readonly Alternative[]) => void;
  readonly toggleStartMenu: () => void;
};

export const useMenuState = create<MenuState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      alternatives: [],
      openMenu: "",
      ///////////////////////////////////////////
    } as const,
    (set) =>
      ({
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        closeMenus: () => {
          set(() => {
            return { openMenu: "" } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        openContextMenu: (alternatives: readonly Alternative[]) => {
          set(() => {
            if (!alternatives.length) {
              console.error("The array of alternatives was empty!");
            }

            return { openMenu: "ContextMenu", alternatives: [...alternatives] } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        toggleStartMenu: () => {
          set(({ openMenu }) => {
            const newMenu = openMenu === "StartMenu" ? "" : "StartMenu";

            return { openMenu: newMenu } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const),
  ),
);
