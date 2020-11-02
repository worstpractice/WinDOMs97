import { onLMB } from "event-filters/onLMB";
import { OsWindowButtons } from "features/os-window/chrome-area/OsWindowButtons";
import { OsWindowLabel } from "features/os-window/chrome-area/OsWindowLabel";
import { useOsWindowControls } from "hooks/os-window/useOsWindowControls";
import { useOnDoubleClick } from "hooks/useOnDoubleClick";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Loader } from "typings/Loader";
import type { ActiveState } from "typings/state/ActiveState";
import { css } from "utils/css";
import styles from "./OsWindowChromeArea.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activeRef, setActiveRef }: ActiveState) => ({
  activeRef,
  setActiveRef,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const activeStyle = css(styles.OsWindowChromeArea, styles.Active);

type Props = {
  getProcess: Loader;
  handleMove: any;
};

export const OsWindowChromeArea: FC<Props> = ({ getProcess, handleMove }) => {
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
