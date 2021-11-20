import { default as React, useState } from 'react';
import { onLMB } from 'src/event-filters/onLMB';
import { OsWindowChromeArea } from 'src/features/os-window/chrome-area/OsWindowChromeArea';
import { ProgramArea } from 'src/features/os-window/program-area/ProgramArea';
import { ProgramContent } from 'src/features/os-window/program-area/ProgramContent';
import { useOnMoveOsWindow } from 'src/hooks/os-window/useOnMoveOsWindow';
import { useOnResizeOsWindow } from 'src/hooks/os-window/useOnResizeOsWindow';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import { useOsRef } from 'src/hooks/useOsRef';
import { MIN_HEIGHT, MIN_WIDTH } from 'src/os-constants/OsWindow';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import type { Loader } from 'src/typings/Loader';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import { bringToFront } from 'src/utils/bringToFront';
import { css } from 'src/utils/css';
import { blockNativeDrag } from 'src/utils/os-window/blockNativeDrag';
import styles from './OsWindow.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ setActiveRef }: ActiveState) => {
  return {
    setActiveRef,
  };
};

const fromMenu = ({ closeMenus }: MenuState) => {
  return {
    closeMenus,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getProcess: Loader;
};

export const OsWindow = ({ getProcess }: Props) => {
  const { setActiveRef } = useActiveState(fromActive);
  const { closeMenus } = useMenuState(fromMenu);
  const osWindowRef = useOsRef<HTMLElement>();
  const process = getProcess(osWindowRef);
  const handleResize = useOnResizeOsWindow(osWindowRef);
  const [isResizable, setIsResizable] = useState(false);
  const handleMove = useOnMoveOsWindow(osWindowRef);
  useActivateOnMount(osWindowRef);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleEnter = () => {
    setIsResizable(true);
  };

  const handleLeave = () => {
    setIsResizable(false);
  };

  const handleMouseDown = onLMB<HTMLElement>((e) => {
    closeMenus();
    setActiveRef(osWindowRef);
    bringToFront(osWindowRef);

    // Not resizable at the moment? That means we're done here.
    if (!isResizable) return;

    const { target } = e;
    const { current: osWindow } = osWindowRef;

    // Abort resizing if click target was not current `OsWindow`.
    if (target !== osWindow) return;

    handleResize(e);
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

  const style = css(styles.OsWindow, isMaximized ? styles.Maximized : '', isMinimized ? styles.Minimized : '', isResizable ? styles.Resizable : '');

  const left = 30 * pid;
  const top = 20 * pid;

  return (
    <article
      className={style}
      onDragStart={blockNativeDrag}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={osWindowRef}
      style={{
        left,
        minHeight: MIN_HEIGHT,
        minWidth: MIN_WIDTH,
        top,
      }}
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
