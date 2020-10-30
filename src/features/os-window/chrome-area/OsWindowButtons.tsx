import { onLMB } from "event-filters/onLMB";
import { useOsWindowControls } from "hooks/os-window/useOsWindowControls";
import { default as React, useState } from "react";
import { useActiveState } from "state/useActiveState";
import { useKernelState } from "state/useKernelState";
import { useMenuState } from "state/useMenuState";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import type { ActiveState } from "typings/state/ActiveState";
import type { KernelState } from "typings/state/KernelState";
import type { MenuState } from "typings/state/MenuState";
import { css } from "utils/css";
import { moveInFront } from "utils/moveInFront";
import styles from "./OsWindowButtons.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activate }: ActiveState) => ({
  activate,
});

const fromKernel = ({ endProcess }: KernelState) => ({
  endProcess,
});

const fromMenu = ({ closeMenus }: MenuState) => ({
  closeMenus,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  process: Process;
};

export const OsWindowButtons: FC<Props> = ({ process }) => {
  const { activate } = useActiveState(fromActive);
  const { closeMenus } = useMenuState(fromMenu);
  const { endProcess } = useKernelState(fromKernel);
  const { maximize, minimize, unMaximize } = useOsWindowControls(process);
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
    moveInFront(osWindowRef);
    isMaximized ? unMaximize() : maximize();
  });

  const handleMinimize = onLMB(() => {
    if (!isPressed) return;

    setIsPressed(false);
    minimize();
    activate({ current: null });
  });

  //////////////////////////////////////////////////////////////////////////////

  const style = isPressed ? css(styles.Button, styles.Pressed) : styles.Button;

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
