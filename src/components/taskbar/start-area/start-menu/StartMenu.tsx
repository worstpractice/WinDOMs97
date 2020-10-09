import { Spine } from "components/taskbar/start-area/start-menu/Spine";
import { useMutableRef } from "hooks/useMutableRef";
import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import type { Menu } from "typings/Menu";
import { is } from "utils/is";
import styles from "./StartMenu.module.css";

type Props = {
  openMenu: Menu;
};

export const StartMenu: FC<Props> = ({ children, openMenu }) => {
  const { activate, activeRef } = useStore();
  const startMenuRef = useMutableRef();

  if (openMenu === "StartMenu") {
    if (!is(activeRef, startMenuRef)) {
      activate(startMenuRef);
    }
  }

  return (
    <section className={styles.StartMenu} ref={startMenuRef}>
      <Spine />
      <ul className={styles.ContentList}>{children}</ul>
    </section>
  );
};
