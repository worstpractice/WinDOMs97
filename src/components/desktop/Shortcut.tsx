import { useMutableRef } from "hooks/useMutableRef";
import { useOnMoveShortcut } from "hooks/useOnMoveShortcut";
import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import type { Binary } from "typings/Binary";
import { css } from "utils/css";
import { handleDragStart } from "utils/handleDragStart";
import { is } from "utils/is";
import styles from "./Shortcut.module.css";

type Props = {
  binary: Binary;
};

export const Shortcut: FC<Props> = ({ binary }) => {
  const { activate, activeRef, executeBinary } = useStore();
  const shortcutRef = useMutableRef();
  const handleMove = useOnMoveShortcut(shortcutRef);

  const handleActive: MouseEventHandler = (e) => {
    activate(shortcutRef);
    handleMove(e);
  };

  const handleLaunch = () => {
    executeBinary(binary);
  };

  const style = is(activeRef, shortcutRef) ? css(styles.Shortcut, styles.Active) : styles.Shortcut;

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
