import { default as React } from 'react';
import { OsButton } from 'src/components/OsButton';
import { useOsWindowControls } from 'src/hooks/os-window/useOsWindowControls';
import { useActiveState } from 'src/state/useActiveState';
import { useKernelState } from 'src/state/useKernelState';
import { useMenuState } from 'src/state/useMenuState';
import type { Process } from 'src/typings/Process';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { KernelState } from 'src/typings/state/KernelState';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { bringToFront } from 'src/utils/bringToFront';
import { onLmb } from 'src/utils/event-filters/onLmb';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('setActiveRef', 'unsetActiveRef');
const fromKernel = from<KernelState>().select('endProcess');
const fromMenu = from<MenuState>().select('closeMenus');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly process: Process;
};

export const OsWindowButtons = ({ process }: Props) => {
  const { setActiveRef, unsetActiveRef } = useActiveState(fromActive);
  const { closeMenus } = useMenuState(fromMenu);
  const { endProcess } = useKernelState(fromKernel);
  const { maximize, minimize, unMaximize } = useOsWindowControls(process);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Domain-Specific Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const quitApplication = onLmb<HTMLButtonElement>((): void => {
    endProcess(process);
  });

  const maximizeWindow = onLmb<HTMLButtonElement>((): void => {
    const { isMaximized, osWindowRef } = process;
    setActiveRef(osWindowRef);
    bringToFront(osWindowRef);
    isMaximized ? unMaximize() : maximize();
  });

  const minimizeWindow = onLmb<HTMLButtonElement>((): void => {
    minimize();
    unsetActiveRef();
  });

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleMouseDown = onLmb<HTMLButtonElement>((event): void => {
    // NOTE: This is necessary to stop the `OsWindow` from starting to move.
    event.stopPropagation();
    closeMenus();
  });

  //////////////////////////////////////////////////////////////////////////////

  return (
    <section style={styles.ButtonRow}>
      <OsButton onMouseDown={handleMouseDown} onMouseUp={minimizeWindow} style={styles.Button}>
        _
      </OsButton>
      <OsButton onMouseDown={handleMouseDown} onMouseUp={maximizeWindow} style={styles.Button}>
        #
      </OsButton>
      <OsButton onMouseDown={handleMouseDown} onMouseUp={quitApplication} style={styles.Button}>
        X
      </OsButton>
    </section>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Button: css({
    height: '25px',
    paddingTop: '4px',
    width: '25px',
  } as const),

  ButtonRow: css({
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  } as const),
} as const;
