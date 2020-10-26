import { onLMB } from "event-filters/onLMB";
import { OsWindowButtons } from "features/os-window/chrome-area/OsWindowButtons";
import { OsWindowLabel } from "features/os-window/chrome-area/OsWindowLabel";
import { useOnDoubleClick } from "hooks/useOnDoubleClick";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel/useKernel";
import { default as React } from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { OS } from "typings/kernel/OS";
import type { Loader } from "typings/Loader";
import { css } from "utils/css";
import styles from "./OsWindowChromeArea.module.css";

const selector = ({ activate, activeRef, maximize, unMaximize }: OS) => ({
  activate,
  activeRef,
  maximize,
  unMaximize,
});

const chromeAreaStyle = styles.OsWindowChromeArea;
const activeChromeAreaStyle = css(styles.OsWindowChromeArea, styles.Active);

type Props = {
  getProcess: Loader;
  handleMove: any;
};

export const OsWindowChromeArea: FC<Props> = ({ getProcess, handleMove }) => {
  const { activate, activeRef, maximize, unMaximize } = useKernel(selector);
  const chromeAreaRef = useOsRef<HTMLElement>();
  const process = getProcess(chromeAreaRef);

  /////////////////////////////////////////////////////////////////////////////////////////
  //  Hook Handlers
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleDoubleClick = () => {
    const { isMaximized, osWindowRef } = process;

    activate(osWindowRef);

    isMaximized ? unMaximize(process) : maximize(process);
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

  const style = isRef(activeRef, osWindowRef) ? activeChromeAreaStyle : chromeAreaStyle;

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
