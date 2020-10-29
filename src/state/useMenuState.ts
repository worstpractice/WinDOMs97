import type { Alternative } from "typings/Alternative";
import create from "zustand";
import { combine } from "zustand/middleware";

type Data = {
  alternatives: readonly Alternative[];
  openMenu: "ContextMenu" | "StartMenu" | "";
};

type Actions = {
  closeMenus: () => void;
  openContextMenu: (alternatives: readonly Alternative[]) => void;
  toggleStartMenu: () => void;
};

export type MenuState = Data & Actions;

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
