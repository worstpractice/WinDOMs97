import { useDesktopLayoutOnMount } from "hooks/useDesktopLayoutOnMount";
import { useMutableRef } from "hooks/useMutableRef";
import { useOnMoveShortcut } from "hooks/useOnMoveShortcut";
import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import type { Binary } from "typings/Binary";
import { css } from "utils/css";
import { handleDragStart } from "utils/handleDragStart";
import { is } from "utils/is";
import { onLMB } from "utils/onLMB";
import styles from "./Shortcut.module.css";

type Props = {
  binary: Binary;
  closeMenus: () => void;
};

export const Shortcut: FC<Props> = ({ binary, closeMenus }) => {
  const { activate, activeRef, executeBinary } = useStore();
  const shortcutRef = useMutableRef();
  const handleMove = useOnMoveShortcut(shortcutRef);
  useDesktopLayoutOnMount(shortcutRef.current);

  const handleActive = onLMB((e) => {
    // NOTE: This makes shortcut selection sticky, which we want.
    e.stopPropagation();
    closeMenus();
    activate(shortcutRef);
    handleMove(e);
  });

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
