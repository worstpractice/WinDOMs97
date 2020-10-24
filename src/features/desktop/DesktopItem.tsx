import { Icon } from "components/Icon";
import { Words } from "components/Words";
import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useBinaryAlternatives } from "hooks/alternatives/useBinaryAlternatives";
import { useDesktopLayoutOnMount } from "hooks/desktop/desktop-item/useDesktopLayoutOnMount";
import { useOnDragAndDrop } from "hooks/desktop/desktop-item/useOnDragAndDrop";
import { useOnDoubleClick } from "hooks/useOnDoubleClick";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import { default as React } from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import { css } from "utils/css";
import { blockNativeDrag } from "utils/os-window/blockNativeDrag";
import styles from "./DesktopItem.module.css";

type Props = {
  getBinary: Linker;
};

export const DesktopItem: FC<Props> = ({ getBinary }) => {
  const { activate, activeRef, closeMenus, executeBinary, openContextMenu } = useKernel();
  const desktopItemRef = useOsRef<HTMLElement>();
  const binary = getBinary(desktopItemRef);

  // NOTE: to work properly, this call depends on the parent component (`Desktop`) calling `useActivateOnMount()` as well.
  useDesktopLayoutOnMount(desktopItemRef);

  const handleMove = useOnDragAndDrop(desktopItemRef);
  const alternatives = useBinaryAlternatives(binary);

  const handleContextMenu = onRMB<HTMLElement>(() => {
    openContextMenu(alternatives);
  });

  const handleDoubleClick = () => {
    executeBinary(binary);
  };

  // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
  const handleMouseDownCapture = useOnDoubleClick(desktopItemRef, handleDoubleClick);

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
      <Icon alt={fileName} height={64} src={icon} width={64} />
      <Words className={styles.Title} of={fileName} />
    </article>
  );
};
