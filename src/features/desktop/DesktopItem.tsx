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
import { default as React, useState } from "react";
import { useActiveState } from "state/useActiveState";
import { useDraggedState } from "state/useDraggedState";
import { useKernelState } from "state/useKernelState";
import { useMenuState } from "state/useMenuState";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import { Hash } from "typings/phantom-types/Hash";
import type { ActiveState } from "typings/state/ActiveState";
import type { DraggedState } from "typings/state/DraggedState";
import { KernelState } from "typings/state/KernelState";
import type { MenuState } from "typings/state/MenuState";
import { css } from "utils/css";
import { getBinaryByFileHash } from "utils/getBinaryByFilehash";
import { blockNativeDrag } from "utils/os-window/blockNativeDrag";
import styles from "./DesktopItem.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activeRef, setActiveRef }: ActiveState) => ({
  activeRef,
  setActiveRef,
});

const fromDragged = ({ draggedRef }: DraggedState) => ({
  draggedRef,
});

const fromKernel = ({ installedPrograms, uninstallProgram }: KernelState) => ({
  installedPrograms,
  uninstallProgram,
});

const fromMenu = ({ closeMenus, openContextMenu }: MenuState) => ({
  closeMenus,
  openContextMenu,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getBinary: Linker;
};

export const DesktopItem: FC<Props> = ({ getBinary }) => {
  const { activeRef, setActiveRef } = useActiveState(fromActive);
  const { draggedRef } = useDraggedState(fromDragged);
  const { installedPrograms, uninstallProgram } = useKernelState(fromKernel);
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const desktopItemRef = useOsRef<HTMLElement>();
  const binary = getBinary(desktopItemRef);
  const executeBinary = useExecuteBinary(binary);
  const handleMove = useOnDragAndDrop(desktopItemRef);
  const alternatives = useBinaryAlternatives(binary);
  // NOTE: to work properly, this call depends on the parent component (`Desktop`) calling `useActivateOnMount()` as well.
  useDesktopLayoutOnMount(desktopItemRef);
  const sequence = useLastSequence(binary);
  const [isPotentialDropTarget, setIsPotentialDropTarget] = useState(false);

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
    setActiveRef(desktopItemRef);
    handleMove(e);
  });

  const handleMouseOut = () => {
    setIsPotentialDropTarget(false);
  };

  const handleMouseOver = () => {
    const { current } = draggedRef;

    if (!current) return;

    setIsPotentialDropTarget(true);
  };

  const handleMouseUpCapture = () => {
    const { current } = draggedRef;

    if (!current) return;

    const { id: fileHash } = current;

    if (!fileHash) return;

    const draggedBinary = getBinaryByFileHash(fileHash as Hash, installedPrograms);

    uninstallProgram(draggedBinary);
  };

  /////////////////////////////////////////////////////////////////////////////////////////

  const desktopItemStyle = css(
    styles.DesktopItem,
    isRef(activeRef, desktopItemRef) ? styles.Active : "",
    isPotentialDropTarget ? styles.DropTarget : "",
  );

  const { fileName, fileHash, icon, isBeingRenamed, isFileExtensionRecognized } = binary;

  const iconSrc = isFileExtensionRecognized ? icon : png_unrecognized_file_extension;

  const wordsOf = isBeingRenamed ? sequence : fileName;

  return (
    <article
      className={desktopItemStyle}
      id={fileHash}
      onContextMenu={handleContextMenu}
      onDragStart={blockNativeDrag}
      onMouseDown={handleMouseDown}
      // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
      onMouseDownCapture={handleMouseDownCapture}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseUpCapture={handleMouseUpCapture}
      ref={desktopItemRef}
    >
      <Icon alt={fileName} height={64} src={iconSrc} width={64} />
      <Words className={styles.Title} of={wordsOf} />
    </article>
  );
};
