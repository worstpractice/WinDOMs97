import { default as React } from 'react';
import { OsButton } from 'src/components/OsButton';
import { onLMB } from 'src/event-filters/onLMB';
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
  const handleExit = onLMB<HTMLButtonElement>((): void => {
    endProcess(process);
  });

  const handleMaximize = onLMB<HTMLButtonElement>((): void => {
    const { isMaximized, osWindowRef } = process;
    setActiveRef(osWindowRef);
    bringToFront(osWindowRef);
    isMaximized ? unMaximize() : maximize();
  });

  const handleMinimize = onLMB<HTMLButtonElement>((): void => {
    minimize();
    unsetActiveRef();
  });

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleMouseDown = onLMB<HTMLButtonElement>((event): void => {
    // NOTE: This is necessary to stop the `OsWindow` from starting to move.
    event.stopPropagation();
    closeMenus();
  });

  //////////////////////////////////////////////////////////////////////////////

  return (
    <section style={styles.ButtonRow}>
      <OsButton onMouseDown={handleMouseDown} onMouseUp={handleMinimize}>
        _
      </OsButton>
      <OsButton onMouseDown={handleMouseDown} onMouseUp={handleMaximize}>
        #
      </OsButton>
      <OsButton onMouseDown={handleMouseDown} onMouseUp={handleExit}>
        X
      </OsButton>
    </section>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  ButtonRow: css({
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  } as const),
} as const;
