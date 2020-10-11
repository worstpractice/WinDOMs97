import { useDesktopLayoutOnMount } from "hooks/useDesktopLayoutOnMount";
import { useMutableRef } from "hooks/useMutableRef";
import { useOnMoveShortcut } from "hooks/useOnMoveShortcut";
import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import type { Binary } from "typings/Binary";
import { blockNativeDrag } from "utils/blockNativeDrag";
import { css } from "utils/css";
import { isRef } from "type-predicates/isRef";
import { onLMB } from "event-filters/onLMB";
import styles from "./Shortcut.module.css";

type Props = {
  binary: Binary;
  closeMenus: () => void;
};

export const Shortcut: FC<Props> = ({ binary, closeMenus }) => {
  const { activate, activeRef, executeBinary } = useStore();
  const shortcutRef = useMutableRef();
  const handleMove = useOnMoveShortcut(shortcutRef);
  // NOTE: For React reasons, this call depends on `Desktop` (the parent component) calling `useActivateOnMount()` to work properly.
  useDesktopLayoutOnMount(shortcutRef.current);

  const handleActive: MouseEventHandler = (e) => {
    // NOTE: This makes shortcut selection sticky, which we want.
    e.stopPropagation();
    closeMenus();
    activate(shortcutRef);
    handleMove(e);
    console.log(e);
  };

  const handleLaunch = onLMB((e) => {
    executeBinary(binary);
    console.log(e);
  });

  const style = isRef(activeRef, shortcutRef) ? css(styles.Shortcut, styles.Active) : styles.Shortcut;

  const { fileName, icon } = binary;

  return (
    <article
      className={style}
      // TODO: OnDoubleClick not supported in Chrome? It works in firefox!
      onDoubleClick={handleLaunch}
      onDragStart={blockNativeDrag}
      onMouseDown={handleActive}
      ref={shortcutRef}
    >
      <img alt={fileName} className={styles.Icon} src={icon} />
      <p className={styles.Name}>{fileName}</p>
    </article>
  );
};
