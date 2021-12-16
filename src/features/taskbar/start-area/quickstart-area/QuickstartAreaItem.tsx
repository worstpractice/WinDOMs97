import { default as React, useRef } from 'react';
import { Icon } from 'src/components/Icon';
import { OsButton } from 'src/components/OsButton';
import { switchOn } from 'src/event-filters/switchOn';
import { useExecuteBinary } from 'src/hooks/syscalls/useExecuteBinary';
import { useMenuState } from 'src/state/useMenuState';
import type { ButtonHandler } from 'src/typings/ButtonHandler';
import type { Linker } from 'src/typings/Linker';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromMenu = from<MenuState>().select('closeMenus');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly getBinary: Linker;
};

export const QuickstartAreaItem = ({ getBinary }: Props) => {
  const { closeMenus } = useMenuState(fromMenu);
  const quickstartAreaItemRef = useRef<HTMLButtonElement>(null);
  const binary = getBinary(quickstartAreaItemRef);
  const executeBinary = useExecuteBinary(binary);

  const handleLMB = () => {
    executeBinary();
    closeMenus();
  };

  const handleRMB: ButtonHandler = (event) => {
    // NOTE: This is here because we want `QuickstartAreaItem` to support `ContextMenu` clicks.
    event.stopPropagation();
    // TODO: Get cracking on context menu `Alternative`s!
  };

  const { icon, programName } = binary;

  return (
    <li style={styles.QuickstartAreaItem}>
      <OsButton style={styles.ButtonOverride} discreet onMouseDown={switchOn({ LMB: handleLMB, RMB: handleRMB })} ref={quickstartAreaItemRef}>
        <Icon alt={programName} height={32} src={icon} width={32} />
      </OsButton>
    </li>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  ButtonOverride: css({
    outlineColor: 'none',
    outlineStyle: 'none',
    outlineWidth: 'none',
  } as const),

  QuickstartAreaItem: css({
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    outlineColor: 'none',
    outlineStyle: 'none',
    outlineWidth: 'none',
  } as const),
} as const;
