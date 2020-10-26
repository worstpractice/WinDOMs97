import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel/useKernel";
import { default as React, useState } from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import styles from "./OsWindowButtons.module.css";

type Props = {
  process: Process;
};

export const OsWindowButtons: FC<Props> = ({ process }) => {
  const { activate, closeMenus, endProcess, maximize, minimize, unMaximize } = useKernel();
  const [isPressed, setIsPressed] = useState(false);

  //////////////////////////////////////////////////////////////////////////////
  // Domain-Specific
  //////////////////////////////////////////////////////////////////////////////

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
  // Event Handlers
  //////////////////////////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////////////////////////

  const buttonStyle = isPressed ? css(styles.Button, styles.Pressed) : styles.Button;

  return (
    <section className={styles.ButtonRow}>
      <button
        className={buttonStyle}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMinimize}
        type="button"
      >
        _
      </button>
      <button
        className={buttonStyle}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMaximize}
        type="button"
      >
        #
      </button>
      <button
        className={buttonStyle}
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
