import { Spine } from "features/taskbar/start-area/start-menu/Spine";
import type { ReactNode } from "react";
import * as React from "react";
import type { FC } from "typings/FC";
import styles from "./StartMenu.module.css";

type Props = {
  children: ReactNode;
};

export const StartMenu: FC<Props> = ({ children }) => {
  return (
    <section className={styles.StartMenu}>
      <Spine />
      <ul className={styles.ContentList}>{children}</ul>
    </section>
  );
};
