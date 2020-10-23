import { onRMB } from "event-filters/onRMB";
import type { ReactNode } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { Spine } from "views/taskbar/start-area/start-menu/Spine";
import styles from "./StartMenu.module.css";

type Props = {
  children: ReactNode;
};

export const StartMenu: FC<Props> = ({ children }) => {
  const handleContextMenu = onRMB((e) => {
    // NOTE: This is here because we want `StartMenu` to support showing a context menu.
    e.stopPropagation();
    // TODO: Import `Alternative` and get cracking on context menu options!
  });

  return (
    <section className={styles.StartMenu} onMouseDown={handleContextMenu}>
      <Spine />
      <ul className={styles.ContentList}>{children}</ul>
    </section>
  );
};
