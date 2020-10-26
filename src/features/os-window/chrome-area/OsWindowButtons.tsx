import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel/useKernel";
import { default as React, useState } from "react";
import type { FC } from "typings/FC";
import type { OS } from "typings/kernel/OS";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import styles from "./OsWindowButtons.module.css";

const selector = ({ activate, closeMenus, endProcess, maximize, minimize, unMaximize }: OS) => ({
  activate,
  closeMenus,
  endProcess,
  maximize,
  minimize,
  unMaximize,
});

const buttonStyle = styles.Button;
const pressedButtonStyle = css(styles.Button, styles.Pressed);

type Props = {
  process: Process;
};

export const OsWindowButtons: FC<Props> = ({ process }) => {
  const { activate, closeMenus, endProcess, maximize, minimize, unMaximize } = useKernel(selector);
  const [isPressed, setIsPressed] = useState(false);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleMouseLeave = () => {
    if (!isPressed) return;

    setIsPressed(false);
  };

  const handleMouseDown = onLMB((e) => {
    // NOTE: This is necessary to stop the `OsWindow` from starting to move.
    e.stopPropagation();
    closeMenus();
    setIsPressed(true);
  });

  /////////////////////////////////////////////////////////////////////////////////////////
  // Domain-Specific Handlers
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleExit = onLMB(() => {
    if (!isPressed) return;

    setIsPressed(false);
    endProcess(process);
  });

  const handleMaximize = onLMB(() => {
    if (!isPressed) return;

    setIsPressed(false);
    const { isMaximized, osWindowRef } = process;
    activate(osWindowRef);
    isMaximized ? unMaximize(process) : maximize(process);
  });

  const handleMinimize = onLMB(() => {
    if (!isPressed) return;

    setIsPressed(false);
    minimize(process);
    activate({ current: null });
  });

  //////////////////////////////////////////////////////////////////////////////

  const style = isPressed ? pressedButtonStyle : buttonStyle;

  return (
    <section className={styles.ButtonRow}>
      <button
        className={style}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMinimize}
        type="button"
      >
        _
      </button>
      <button
        className={style}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMaximize}
        type="button"
      >
        #
      </button>
      <button
        className={style}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleExit}
        type="button"
      >
        X
      </button>
    </section>
  );
};
