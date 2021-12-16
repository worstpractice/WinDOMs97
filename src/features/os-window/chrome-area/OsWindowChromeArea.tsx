import { default as React, useRef } from 'react';
import { onLMB } from 'src/event-filters/onLMB';
import { OsWindowButtons } from 'src/features/os-window/chrome-area/OsWindowButtons';
import { OsWindowLabel } from 'src/features/os-window/chrome-area/OsWindowLabel';
import { useOsWindowControls } from 'src/hooks/os-window/useOsWindowControls';
import { useOnDoubleClick } from 'src/hooks/useOnDoubleClick';
import { useActiveState } from 'src/state/useActiveState';
import { isRef } from 'src/type-predicates/isRef';
import type { Loader } from 'src/typings/Loader';
import type { ActiveState } from 'src/typings/state/ActiveState';
import { css } from 'src/utils/as/css';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('activeRef', 'setActiveRef');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly getProcess: Loader;
  readonly handleMove: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

export const OsWindowChromeArea = ({ getProcess, handleMove }: Props) => {
  const { activeRef, setActiveRef } = useActiveState(fromActive);
  const chromeAreaRef = useRef<HTMLElement>(null);
  const process = getProcess(chromeAreaRef);
  const { maximize, unMaximize } = useOsWindowControls(process);

  /////////////////////////////////////////////////////////////////////////////////////////
  //  Hook Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleDoubleClick = (): void => {
    const { isMaximized, osWindowRef } = process;

    setActiveRef(osWindowRef);

    isMaximized ? unMaximize() : maximize();
  };

  // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
  const handleMouseDownCapture = useOnDoubleClick(chromeAreaRef, handleDoubleClick);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleMouseDown = onLMB<HTMLSpanElement>((event): void => {
    const { isMaximized } = process;

    // Trying to drag a maximized `OsWindow`? That's a paddling.
    if (isMaximized) return;

    handleMove(event);
  });

  /////////////////////////////////////////////////////////////////////////////////////////

  const { osWindowRef } = process;

  const style = isRef(activeRef, osWindowRef) ? activeStyle : styles.OsWindowChromeArea;

  return (
    <span
      style={styles.Outline}
      // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
      onMouseDownCapture={handleMouseDownCapture}
      onMouseDown={handleMouseDown}
    >
      <header style={style} ref={chromeAreaRef}>
        <OsWindowLabel process={process} />
        <OsWindowButtons process={process} />
      </header>
    </span>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Active: css({
    background: 'linear-gradient(90deg, var(--titlebar-active-dim), var(--titlebar-active-bright))',
  } as const),

  OsWindowChromeArea: css({
    alignItems: 'center',
    background: 'linear-gradient(90deg, var(--titlebar-passive-dim), var(--gray))',
    cursor: 'grab',
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
    minHeight: '48px',
    paddingBottom: '4px',
    paddingLeft: '10px',
    paddingRight: '10px',
  } as const),

  Outline: css({
    outlineColor: 'var(--oswindow-outline)',
    outlineStyle: 'inset',
    outlineWidth: '4px',
  } as const),
} as const;

const activeStyle = css({
  ...styles.OsWindowChromeArea,
  ...styles.Active,
} as const);
