import png_unrecognized_file_extension from 'assets/icons/file_question.png';
import { default as React, useRef, useState } from 'react';
import { Icon } from 'src/components/Icon';
import { useBinaryAlternatives } from 'src/hooks/alternatives/useBinaryAlternatives';
import { useDesktopLayoutOnMount } from 'src/hooks/desktop/desktop-item/useDesktopLayoutOnMount';
import { useOnDragAndDrop } from 'src/hooks/desktop/desktop-item/useOnDragAndDrop';
import { useExecuteBinary } from 'src/hooks/syscalls/useExecuteBinary';
import { useLastSequence } from 'src/hooks/useLastSequence';
import { useOnDoubleClick } from 'src/hooks/useOnDoubleClick';
import { useActiveState } from 'src/state/useActiveState';
import { useDragState } from 'src/state/useDragState';
import { useMenuState } from 'src/state/useMenuState';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import type { MouseHandler } from 'src/typings/handlers/MouseHandler';
import type { Linker } from 'src/typings/Linker';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { DragState } from 'src/typings/state/DragState';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { onLmb } from 'src/utils/event-filters/onLmb';
import { onRmb } from 'src/utils/event-filters/onRmb';
import { blockNativeDrag } from 'src/utils/os-window/blockNativeDrag';
import { toFalse } from 'src/utils/setters/toFalse';
import { toTrue } from 'src/utils/setters/toTrue';
import { from } from 'src/utils/state/from';
import { isRef } from 'src/utils/type-predicates/isRef';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('activeRef', 'setActiveRef');
const fromDrag = from<DragState>().select('dragRef');
const fromMenu = from<MenuState>().select('closeMenus', 'openContextMenu');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly getBinary: Linker;
};

export const DesktopItem = ({ getBinary }: Props) => {
  const { activeRef, setActiveRef } = useActiveState(fromActive);
  const { dragRef } = useDragState(fromDrag);
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const desktopItemRef = useRef<HTMLElement>(null);
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
  const handleDoubleClick = (): void => {
    executeBinary();
  };

  // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
  const handleMouseDownCapture = useOnDoubleClick(desktopItemRef, handleDoubleClick);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleContextMenu = onRmb<HTMLElement>((): void => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLmb<HTMLElement>((event): void => {
    // NOTE: This makes `DesktopItem` selection sticky, which we want.
    event.stopPropagation();
    closeMenus();
    setActiveRef(desktopItemRef);
    handleMove(event);
  });

  const handleMouseOut = () => {
    setIsPotentialDropTarget(toFalse);
  };

  const handleMouseOver = () => {
    const { current } = dragRef;

    if (!current) return;

    setIsPotentialDropTarget(toTrue);
  };

  const handleMouseUp: MouseHandler<HTMLElement> = ({ target: dropZone }): void => {
    const { current: faller } = dragRef;

    if (!faller) return;

    console.log(faller); // I landed on something
    console.log(dropZone); // Something landed on me
  };

  /////////////////////////////////////////////////////////////////////////////////////////

  const desktopItemStyle = css({
    ...styles.DesktopItem,
    ...(isRef(activeRef, desktopItemRef) && styles.Active),
    ...(isPotentialDropTarget && styles.DropTarget),
  } as const);

  const { fileName, fileHash, icon, isBeingRenamed, isFileExtensionRecognized } = binary;

  const iconSrc = isFileExtensionRecognized ? icon : png_unrecognized_file_extension;

  const text = isBeingRenamed ? sequence : fileName;

  return (
    <article
      style={desktopItemStyle}
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
      <Icon
        //
        alt={fileName}
        height={64}
        src={iconSrc}
        width={64}
      />
      <p style={styles.Title}>{text}</p>
    </article>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  /*** WARN: Must come last? ***/
  Active: css({
    backgroundColor: 'var(--desktopitem-background)',
    cursor: 'pointer',
    outlineColor: 'var(--white-transparent)',
    outlineStyle: 'dotted',
    outlineWidth: '1px',
    ...INTERACTIVE,
  } as const),

  DesktopItem: css({
    alignItems: 'center',
    color: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '28px',
    gap: '10px',
    height: 'var(--desktopitem-height)',
    justifyContent: 'center',
    position: 'absolute',
    width: 'var(--desktopitem-width)',
    ...INTERACTIVE,
  } as const),

  DropTarget: css({
    backgroundColor: 'darkslateblue',
    ...INTERACTIVE,
  } as const),

  Title: css({
    color: 'var(--white)',
    overflowWrap: 'break-word',
    textAlign: 'center',
    width: '100%',
    ...INTERACTIVE,
  } as const),
} as const;
