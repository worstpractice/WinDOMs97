import { OutsetButton } from "components/OutsetButton";
import { onLMB } from "event-filters/onLMB";
import { useOsWindowControls } from "hooks/os-window/useOsWindowControls";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import { useKernelState } from "state/useKernelState";
import { useMenuState } from "state/useMenuState";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import type { ActiveState } from "typings/state/ActiveState";
import type { KernelState } from "typings/state/KernelState";
import type { MenuState } from "typings/state/MenuState";
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

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    // NOTE: This is necessary to stop the `OsWindow` from starting to move.
    e.stopPropagation();
    closeMenus();
  });

  /////////////////////////////////////////////////////////////////////////////////////////
  // Domain-Specific Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleExit = onLMB<HTMLButtonElement>(() => {
    endProcess(process);
  });

  const handleMaximize = onLMB<HTMLButtonElement>(() => {
    const { isMaximized, osWindowRef } = process;
    activate(osWindowRef);
    moveInFront(osWindowRef);
    isMaximized ? unMaximize() : maximize();
  });

  const handleMinimize = onLMB<HTMLButtonElement>(() => {
    minimize();
    activate({ current: null });
  });

  //////////////////////////////////////////////////////////////////////////////

  return (
    <section className={styles.ButtonRow}>
      <OutsetButton onMouseDown={handleMouseDown} onMouseUp={handleMinimize}>
        _
      </OutsetButton>
      <OutsetButton onMouseDown={handleMouseDown} onMouseUp={handleMaximize}>
        #
      </OutsetButton>
      <OutsetButton onMouseDown={handleMouseDown} onMouseUp={handleExit}>
        X
      </OutsetButton>
    </section>
  );
};
