import png_unrecognized_file_extension from 'assets/icons/file_question.png';
import { default as React, useState } from 'react';
import { Icon } from 'src/components/Icon';
import { Words } from 'src/components/Words';
import { onLMB } from 'src/event-filters/onLMB';
import { onRMB } from 'src/event-filters/onRMB';
import { useBinaryAlternatives } from 'src/hooks/alternatives/useBinaryAlternatives';
import { useDesktopLayoutOnMount } from 'src/hooks/desktop/desktop-item/useDesktopLayoutOnMount';
import { useOnDragAndDrop } from 'src/hooks/desktop/desktop-item/useOnDragAndDrop';
import { useExecuteBinary } from 'src/hooks/syscalls/useExecuteBinary';
import { useLastSequence } from 'src/hooks/useLastSequence';
import { useOnDoubleClick } from 'src/hooks/useOnDoubleClick';
import { useOsRef } from 'src/hooks/useOsRef';
import { useActiveState } from 'src/state/useActiveState';
import { useDraggedState } from 'src/state/useDraggedState';
import { useMenuState } from 'src/state/useMenuState';
import { isRef } from 'src/type-predicates/isRef';
import type { MouseHandler } from 'src/typings/handlers/MouseHandler';
import type { Linker } from 'src/typings/Linker';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { DraggedState } from 'src/typings/state/DraggedState';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/css';
import { blockNativeDrag } from 'src/utils/os-window/blockNativeDrag';
import styles from './DesktopItem.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activeRef, setActiveRef }: ActiveState) => {
  return {
    activeRef,
    setActiveRef,
  };
};

const fromDragged = ({ draggedRef }: DraggedState) => {
  return {
    draggedRef,
  };
};

const fromMenu = ({ closeMenus, openContextMenu }: MenuState) => {
  return {
    closeMenus,
    openContextMenu,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getBinary: Linker;
};

export const DesktopItem = ({ getBinary }: Props) => {
  const { activeRef, setActiveRef } = useActiveState(fromActive);
  const { draggedRef } = useDraggedState(fromDragged);
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const desktopItemRef = useOsRef<HTMLElement>();
  const binary = getBinary(desktopItemRef);
  const executeBinary = useExecuteBinary(binary);
  const handleMove = useOnDragAndDrop(desktopItemRef);
  const alternatives = useBinaryAlternatives(binary);
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

  const handleMouseUp: MouseHandler<HTMLElement> = ({ target: dropZone }) => {
    const { current: faller } = draggedRef;

    if (!faller) return;

    console.log(faller); // I landed on something
    console.log(dropZone); // Something landed on me
  };

  /////////////////////////////////////////////////////////////////////////////////////////

  const desktopItemStyle = css(styles.DesktopItem, isRef(activeRef, desktopItemRef) ? styles.Active : '', isPotentialDropTarget ? styles.DropTarget : '');

  const { fileName, fileHash, icon, isBeingRenamed, isFileExtensionRecognized } = binary;

  const iconSrc = isFileExtensionRecognized ? icon : png_unrecognized_file_extension;

  const text = isBeingRenamed ? sequence : fileName;

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
      onMouseUp={handleMouseUp}
      ref={desktopItemRef}
    >
      <Icon alt={fileName} height={64} src={iconSrc} width={64} />
      <Words className={styles.Title} of={text} />
    </article>
  );
};
