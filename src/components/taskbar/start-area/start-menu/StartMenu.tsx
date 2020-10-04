import cdRomDrive from "assets/icons/cd_drive-0.png";
import folder from "assets/icons/directory_closed_cool-0.png";
import paint from "assets/icons/paint_file-5.png";
import { Spine } from "components/taskbar/start-area/start-menu/Spine";
import { StartMenuItem } from "components/taskbar/start-area/start-menu/StartMenuItem";
import { useOnMouseDownOutside } from "hooks/useOnMouseDownOutside";
import type { FC } from "react";
import React, { useRef } from "react";
import styles from "./StartMenu.module.css";

type Props = {
  onMouseDownOutside: EventListener;
};

export const StartMenu: FC<Props> = ({ children, onMouseDownOutside }) => {
  const startMenuRef = useRef<HTMLDivElement | null>(null);
  useOnMouseDownOutside(startMenuRef, onMouseDownOutside);

  return (
    <div className={styles.StartMenu} id="StartMenu" ref={startMenuRef}>
      <Spine />
      <div className={styles.ContentList}>
        {children}
      </div>
    </div>
  );
};
