import png_unrecognized_file_extension from 'assets/icons/file_question.png';
import { Icon } from 'components/Icon';
import { Words } from 'components/Words';
import { onLMB } from 'event-filters/onLMB';
import { onRMB } from 'event-filters/onRMB';
import { useBinaryAlternatives } from 'hooks/alternatives/useBinaryAlternatives';
import { useDesktopLayoutOnMount } from 'hooks/desktop/desktop-item/useDesktopLayoutOnMount';
import { useOnDragAndDrop } from 'hooks/desktop/desktop-item/useOnDragAndDrop';
import { useExecuteBinary } from 'hooks/syscalls/useExecuteBinary';
import { useLastSequence } from 'hooks/useLastSequence';
import { useOnDoubleClick } from 'hooks/useOnDoubleClick';
import { useOsRef } from 'hooks/useOsRef';
import { useState } from 'react';
import { useActiveState } from 'state/useActiveState';
import { useDraggedState } from 'state/useDraggedState';
import { useMenuState } from 'state/useMenuState';
import { isRef } from 'type-predicates/isRef';
import type { MouseHandler } from 'typings/handlers/MouseHandler';
import type { Linker } from 'typings/Linker';
import type { ActiveState } from 'typings/state/ActiveState';
import type { DraggedState } from 'typings/state/DraggedState';
import type { MenuState } from 'typings/state/MenuState';
import { css } from 'utils/css';
import { blockNativeDrag } from 'utils/os-window/blockNativeDrag';
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
