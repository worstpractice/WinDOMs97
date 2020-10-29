import { onLMB } from "event-filters/onLMB";
import { OsWindowButtons } from "features/os-window/chrome-area/OsWindowButtons";
import { OsWindowLabel } from "features/os-window/chrome-area/OsWindowLabel";
import { useOnDoubleClick } from "hooks/useOnDoubleClick";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import { useKernelState } from "state/useKernelState";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Loader } from "typings/Loader";
import type { KernelState } from "typings/state/KernelState";
import { css } from "utils/css";
import styles from "./OsWindowChromeArea.module.css";
import { useOsWindowControls } from "hooks/os-window/useOsWindowControls";


type Props = {
  getProcess: Loader;
  handleMove: any;
};

export const OsWindowChromeArea: FC<Props> = ({ getProcess, handleMove }) => {
  const { activate, activeRef } = useActiveState();
  const chromeAreaRef = useOsRef<HTMLElement>();
  const process = getProcess(chromeAreaRef);
  const { maximize, unMaximize } = useOsWindowControls(process);

  /////////////////////////////////////////////////////////////////////////////////////////
  //  Hook Handlers
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleDoubleClick = () => {
    const { isMaximized, osWindowRef } = process;

    activate(osWindowRef);

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

  const style = isRef(activeRef, osWindowRef)
    ? css(styles.OsWindowChromeArea, styles.Active)
    : styles.OsWindowChromeArea;

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
