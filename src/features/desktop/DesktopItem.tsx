import png_unrecognized_file_extension from "assets/icons/file_question.png";
import { Icon } from "components/Icon";
import { Words } from "components/Words";
import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useBinaryAlternatives } from "hooks/alternatives/useBinaryAlternatives";
import { useDesktopLayoutOnMount } from "hooks/desktop/desktop-item/useDesktopLayoutOnMount";
import { useOnDragAndDrop } from "hooks/desktop/desktop-item/useOnDragAndDrop";
import { useExecuteBinary } from "hooks/syscalls/useExecuteBinary";
import { useLastSequence } from "hooks/useLastSequence";
import { useOnDoubleClick } from "hooks/useOnDoubleClick";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import { useMenuState } from "state/useMenuState";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import type { ActiveState } from "typings/state/ActiveState";
import type { MenuState } from "typings/state/MenuState";
import { css } from "utils/css";
import { blockNativeDrag } from "utils/os-window/blockNativeDrag";
import styles from "./DesktopItem.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activate, activeRef }: ActiveState) => ({
  activate,
  activeRef,
});

const fromMenu = ({ closeMenus, openContextMenu }: MenuState) => ({
  closeMenus,
  openContextMenu,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const activeStyle = css(styles.DesktopItem, styles.Active);

type Props = {
  getBinary: Linker;
};

export const DesktopItem: FC<Props> = ({ getBinary }) => {
  const { activate, activeRef } = useActiveState(fromActive);
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const desktopItemRef = useOsRef<HTMLElement>();
  const binary = getBinary(desktopItemRef);
  const executeBinary = useExecuteBinary(binary);
  const handleMove = useOnDragAndDrop(desktopItemRef);
  const alternatives = useBinaryAlternatives(binary);
  // NOTE: to work properly, this call depends on the parent component (`Desktop`) calling `useActivateOnMount()` as well.
  useDesktopLayoutOnMount(desktopItemRef);
  const sequence = useLastSequence(binary);

  /////////////////////////////////////////////////////////////////////////////////////////
  //  Hook Handlers
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleDoubleClick = () => {
    executeBinary();
  };

  // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
  const handleMouseDownCapture = useOnDoubleClick(desktopItemRef, handleDoubleClick);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleContextMenu = onRMB<HTMLElement>(() => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLMB<HTMLElement>((e) => {
    // NOTE: This makes `DesktopItem` selection sticky, which we want.
    e.stopPropagation();
    closeMenus();
    activate(desktopItemRef);
    handleMove(e);
  });

  /////////////////////////////////////////////////////////////////////////////////////////

  const desktopItemStyle = isRef(activeRef, desktopItemRef) ? activeStyle : styles.DesktopItem;

  const { fileName, icon, isBeingRenamed, isFileExtensionRecognized } = binary;

  const iconSrc = isFileExtensionRecognized ? icon : png_unrecognized_file_extension;

  const wordsOf = isBeingRenamed ? sequence : fileName;

  return (
    <article
      className={desktopItemStyle}
      onContextMenu={handleContextMenu}
      onDragStart={blockNativeDrag}
      onMouseDown={handleMouseDown}
      // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
      onMouseDownCapture={handleMouseDownCapture}
      ref={desktopItemRef}
    >
      <Icon alt={fileName} height={64} src={iconSrc} width={64} />
      <Words className={styles.Title} of={wordsOf} />
    </article>
  );
};
