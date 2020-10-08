import { Spine } from "components/taskbar/start-area/start-menu/Spine";
import type { FC } from "react";
import React from "react";
import styles from "./StartMenu.module.css";

type Props = {};

export const StartMenu: FC<Props> = ({ children }) => {
  return (
    <section className={styles.StartMenu} id="StartMenu">
      <Spine />
      <ul className={styles.ContentList}>{children}</ul>
    </section>
  );
};
