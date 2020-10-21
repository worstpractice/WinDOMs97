import { Icon } from "components/Icon";
import { Words } from "components/Words";
import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useDesktopLayoutOnMount } from "hooks/desktop/desktop-item/useDesktopLayoutOnMount";
import { useOnDragAndDrop } from "hooks/desktop/desktop-item/useOnDragAndDrop";
import { useBinaryAlternatives } from "hooks/useBinaryAlternatives";
import { useOnDoubleClick } from "hooks/useOnDoubleClick";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { Binary } from "typings/Binary";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import { blockNativeDrag } from "utils/os-window/blockNativeDrag";
import styles from "./DesktopItem.module.css";

type Props = {
  binary: Binary;
};

export const DesktopItem: FC<Props> = ({ binary }) => {
  const { activate, activeRef, closeMenus, executeBinary, openContextMenu } = useKernel();
  const desktopItemRef = useOsRef<HTMLElement>();
  const handleMove = useOnDragAndDrop(desktopItemRef);
  const alternatives = useBinaryAlternatives(binary);

  const handleContextMenu = onRMB<HTMLElement>(() => {
    openContextMenu(alternatives);
  });

  // NOTE: to work properly, this call depends on the parent component (`Desktop`) calling `useActivateOnMount()` as well.
  useDesktopLayoutOnMount(desktopItemRef);

  const handleDoubleClick = () => {
    executeBinary(binary);
  };

  // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
  const handleMouseDownCapture = useOnDoubleClick(desktopItemRef, handleDoubleClick);

  // NOTE: This is vital. This is the line where each `Binary` is given its very own `ContextMenuItem` handle.
  binary.desktopItemRef = desktopItemRef;

  const handleMouseDown = onLMB<HTMLElement>((e) => {
    // NOTE: This makes `DesktopItem` selection sticky, which we want.
    e.stopPropagation();
    closeMenus();
    activate(desktopItemRef);
    handleMove(e);
  });

  const style = isRef(activeRef, desktopItemRef) ? css(styles.DesktopItem, styles.Active) : styles.DesktopItem;

  const { fileName, icon } = binary;

  return (
    <article
      className={style}
      onContextMenu={handleContextMenu}
      onDragStart={blockNativeDrag}
      onMouseDown={handleMouseDown}
      // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
      onMouseDownCapture={handleMouseDownCapture}
      ref={desktopItemRef}
    >
      <Icon alt={fileName} height={48} src={icon} />
      <Words className={styles.Title} of={fileName} />
    </article>
  );
};
