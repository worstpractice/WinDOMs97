import { default as React } from 'react';
import { onLMB } from 'src/event-filters/onLMB';
import { OsWindowButtons } from 'src/features/os-window/chrome-area/OsWindowButtons';
import { OsWindowLabel } from 'src/features/os-window/chrome-area/OsWindowLabel';
import { useOsWindowControls } from 'src/hooks/os-window/useOsWindowControls';
import { useOnDoubleClick } from 'src/hooks/useOnDoubleClick';
import { useOsRef } from 'src/hooks/useOsRef';
import { useActiveState } from 'src/state/useActiveState';
import { isRef } from 'src/type-predicates/isRef';
import type { Loader } from 'src/typings/Loader';
import type { ActiveState } from 'src/typings/state/ActiveState';
import { css } from 'src/utils/css';
import styles from './OsWindowChromeArea.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activeRef, setActiveRef }: ActiveState) => {
  return {
    activeRef,
    setActiveRef,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const activeStyle = css(styles.OsWindowChromeArea, styles.Active);

type Props = {
  getProcess: Loader;
  handleMove: any;
};

export const OsWindowChromeArea = ({ getProcess, handleMove }: Props) => {
  const { activeRef, setActiveRef } = useActiveState(fromActive);
  const chromeAreaRef = useOsRef<HTMLElement>();
  const process = getProcess(chromeAreaRef);
  const { maximize, unMaximize } = useOsWindowControls(process);

  /////////////////////////////////////////////////////////////////////////////////////////
  //  Hook Handlers
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleDoubleClick = () => {
    const { isMaximized, osWindowRef } = process;

    setActiveRef(osWindowRef);

    isMaximized ? unMaximize() : maximize();
  };

  // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
  const handleMouseDownCapture = useOnDoubleClick(chromeAreaRef, handleDoubleClick);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleMouseDown = onLMB<HTMLSpanElement>((e) => {
    const { isMaximized } = process;

    // Trying to drag on a maximized `OsWindow`? That's a paddling.
    if (isMaximized) return;

    handleMove(e);
  });

  /////////////////////////////////////////////////////////////////////////////////////////

  const { osWindowRef } = process;

  const style = isRef(activeRef, osWindowRef) ? activeStyle : styles.OsWindowChromeArea;

  return (
    <span
      className={styles.Outline}
      // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
      onMouseDownCapture={handleMouseDownCapture}
      onMouseDown={handleMouseDown}
    >
      <header className={style} ref={chromeAreaRef}>
        <OsWindowLabel process={process} />
        <OsWindowButtons process={process} />
      </header>
    </span>
  );
};
