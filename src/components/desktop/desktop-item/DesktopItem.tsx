import { DesktopItemIcon } from "components/desktop/desktop-item/DesktopItemIcon";
import { DesktopItemTitle } from "components/desktop/desktop-item/DesktopItemTitle";
import { onLMB } from "event-filters/onLMB";
import { useDesktopLayoutOnMount } from "hooks/useDesktopLayoutOnMount";
import { useOnDoubleClick } from "hooks/useOnDoubleClick";
import { useOnDragAndDrop } from "hooks/useOnDragAndDrop";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { Binary } from "typings/Binary";
import type { FC } from "typings/FC";
import { blockNativeDrag } from "components/os-window/utils/blockNativeDrag";
import { css } from "utils/css";
import styles from "./DesktopItem.module.css";

type Props = {
  binary: Binary;
  closeMenus: () => void;
};

export const DesktopItem: FC<Props> = ({ binary, closeMenus }) => {
  const { activate, activeRef, executeBinary } = useKernel();
  const desktopItemRef = useOsRef<HTMLElement>();
  const handleMove = useOnDragAndDrop(desktopItemRef);
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

  return (
    <article
      className={style}
      onDragStart={blockNativeDrag}
      onMouseDown={handleMouseDown}
      // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
      onMouseDownCapture={handleMouseDownCapture}
      ref={desktopItemRef}
    >
      <DesktopItemIcon binary={binary} />
      <DesktopItemTitle binary={binary} />
    </article>
  );
};
