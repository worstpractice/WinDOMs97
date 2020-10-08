import { useOnMoveShortcut } from "hooks/useOnMoveShortcut";
import type { FC, MouseEventHandler } from "react";
import React, { useRef } from "react";
import { useStore } from "store";
import type { Binary } from "typings/Binary";
import { css } from "utils/css";
import { handleDragStart } from "utils/handleDragStart";
import styles from "./Shortcut.module.css";

type Props = {
  binary: Binary;
};

export const Shortcut: FC<Props> = ({ binary }) => {
  const { activeWidget, executeBinary, setActiveWidget } = useStore();
  const shortcutRef = useRef<HTMLDivElement | null>(null);
  const handleMove = useOnMoveShortcut(shortcutRef);

  const handleActive: MouseEventHandler = (e) => {
    e.stopPropagation();
    setActiveWidget("Shortcut");
    handleMove(e);
  };

  const handleLaunch: MouseEventHandler = (e) => {
    e.stopPropagation();
    executeBinary(binary);
    setActiveWidget("Window");
  };

  const style = activeWidget === "Shortcut" ? css(styles.Shortcut, styles.Active) : styles.Shortcut;

  const { fileName, icon } = binary;

  return (
    <article
      className={style}
      onDoubleClick={handleLaunch}
      onDragStart={handleDragStart}
      onMouseDown={handleActive}
      ref={shortcutRef}
    >
      <img alt={fileName} className={styles.Icon} src={icon} />
      <p className={styles.Name}>{fileName}</p>
    </article>
  );
};
