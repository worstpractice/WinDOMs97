import { default as React, useRef, useState } from 'react';
import { MIN_HEIGHT, MIN_WIDTH } from 'src/constants/OsWindow';
import { OsWindowChromeArea } from 'src/features/os-window/chrome-area/OsWindowChromeArea';
import { ProgramArea } from 'src/features/os-window/program-area/ProgramArea';
import { ProgramContent } from 'src/features/os-window/program-area/ProgramContent';
import { useOnMoveOsWindow } from 'src/hooks/os-window/useOnMoveOsWindow';
import { useOnResizeOsWindow } from 'src/hooks/os-window/useOnResizeOsWindow';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import type { Loader } from 'src/typings/Loader';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { bringToFront } from 'src/utils/bringToFront';
import { onLmb } from 'src/utils/event-filters/onLmb';
import { blockNativeDrag } from 'src/utils/os-window/blockNativeDrag';
import { toFalse } from 'src/utils/setters/toFalse';
import { toTrue } from 'src/utils/setters/toTrue';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('setActiveRef');
const fromMenu = from<MenuState>().select('closeMenus');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly getProcess: Loader;
};

export const OsWindow = ({ getProcess }: Props) => {
  const { setActiveRef } = useActiveState(fromActive);
  const { closeMenus } = useMenuState(fromMenu);
  const osWindowRef = useRef<HTMLElement>(null);
  const process = getProcess(osWindowRef);
  const handleResize = useOnResizeOsWindow(osWindowRef);
  const [isResizable, setIsResizable] = useState(false);
  const handleMove = useOnMoveOsWindow(osWindowRef);
  useActivateOnMount(osWindowRef);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleEnter = (): void => {
    setIsResizable(toTrue);
  };

  const handleLeave = (): void => {
    setIsResizable(toFalse);
  };

  const handleMouseDown = onLmb<HTMLElement>((event): void => {
    closeMenus();
    setActiveRef(osWindowRef);
    bringToFront(osWindowRef);

    // Not resizable at the moment? That means we're done here.
    if (!isResizable) return;

    const { target } = event;
    const { current: osWindow } = osWindowRef;

    // Abort resizing if click target was not current `OsWindow`.
    if (target !== osWindow) return;

    handleResize(event);
  });

  /////////////////////////////////////////////////////////////////////////////////////////
  // Loaders
  /////////////////////////////////////////////////////////////////////////////////////////
  const toChromeArea: Loader = (chromeAreaRef) => {
    process.chromeAreaRef = chromeAreaRef;
    return process;
  };

  const toProgram: Loader = (programRef) => {
    process.programRef = programRef;
    return process;
  };

  ///////////////////////////////////////////////////////////////////////////////////
  const { binaryImage, isMaximized, isMinimized, pid } = process;

  const Program = binaryImage.instructions;

  const style = css({
    ...styles.OsWindow,
    ...(isResizable && styles.Resizable),
    ...(isMinimized && styles.Minimized),
    ...(isMaximized && styles.Maximized),
    left: 30 * pid,
    minHeight: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
    top: 20 * pid,
  } as const);

  return (
    <article
      //
      onDragStart={blockNativeDrag}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={osWindowRef}
      style={style}
    >
      <OsWindowChromeArea getProcess={toChromeArea} handleMove={handleMove} />
      <ProgramArea>
        <ProgramContent>
          <Program getProcess={toProgram} />
        </ProgramContent>
      </ProgramArea>
    </article>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Maximized: css({
    height: 'calc(100vh - var(--taskbar-height)) !important',
    left: '0 !important',
    top: '0 !important',
    width: '100vw !important',
  } as const),

  Minimized: css({
    display: 'none',
  } as const),

  OsWindow: css({
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    left: '40vw',
    padding: '6px',
    position: 'absolute',
    top: '400px',
    width: '600px',
    zIndex: 30,
  } as const),

  Resizable: css({
    cursor: 'move',
  } as const),
} as const;
