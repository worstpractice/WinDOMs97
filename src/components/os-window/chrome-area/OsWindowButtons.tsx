import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import * as React from "react";
import { useState } from "react";
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

  const handleExit = onLMB<HTMLButtonElement>(() => {
    if (!isPressed) return;

    setIsPressed(false);
    endProcess(process);
  });

  const handleMouseLeave = () => {
    if (!isPressed) return;

    setIsPressed(false);
  };

  const handleMaximize = onLMB<HTMLButtonElement>(() => {
    if (!isPressed) return;

    setIsPressed(false);
    const { isMaximized, osWindowRef } = process;
    activate(osWindowRef);
    isMaximized ? unMaximize(process) : maximize(process);
  });

  const handleMinimize = onLMB<HTMLButtonElement>(() => {
    if (!isPressed) return;

    setIsPressed(false);
    minimize(process);
    activate({ current: null });
  });

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    // NOTE: This is necessary to stop the `OsWindow` from starting to move.
    e.stopPropagation();
    closeMenus();
    setIsPressed(true);
  });

  const buttonStyle = isPressed ? css(styles.OsWindowButton, styles.Pressed) : styles.OsWindowButton;

  return (
    <section className={styles.OsWindowButtons}>
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
