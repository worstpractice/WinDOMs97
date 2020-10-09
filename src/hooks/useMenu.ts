import { useState } from "react";
import type { Menu } from "typings/Menu";

export const useMenu = () => {
  const [openMenu, setOpenMenu] = useState<Menu>("");

  const closeMenus = () => {
    setOpenMenu("");
  };

  const openContextMenu = () => {
    setOpenMenu("ContextMenu");
  };

  const toggleStartMenu = () => {
    openMenu === "StartMenu" ? setOpenMenu("") : setOpenMenu("StartMenu");
  };

  return { openMenu, closeMenus, openContextMenu, toggleStartMenu } as const;
};
