import { default as React, useRef } from 'react';
import { Icon } from 'src/components/Icon';
import { OsButton } from 'src/components/OsButton';
import { useBinaryAlternatives } from 'src/hooks/alternatives/useBinaryAlternatives';
import { useExecuteBinary } from 'src/hooks/syscalls/useExecuteBinary';
import { useMenuState } from 'src/state/useMenuState';
import type { Linker } from 'src/typings/Linker';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { onRmb } from 'src/utils/event-filters/onRmb';
import { switchOn } from 'src/utils/event-filters/switchOn';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromMenu = from<MenuState>().select('closeMenus', 'openContextMenu');
////////////////////////////////////////////////////////////////

type Props = {
  readonly getBinary: Linker;
};

export const QuickstartAreaItem = ({ getBinary }: Props) => {
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const quickstartAreaItemRef = useRef<HTMLButtonElement>(null);
  const binary = getBinary(quickstartAreaItemRef);
  const executeBinary = useExecuteBinary(binary);
  const alternatives = useBinaryAlternatives(binary);

  const handleLmb = () => {
    executeBinary();
    closeMenus();
  };

  const handleContextMenu = onRmb<HTMLButtonElement>(() => {
    /** NOTE: reversing here corrects for the fact that layout otherwise lists the alternatives in the opposite order for `DesktopItem`s and `QuickstartAreaItems`. */
    openContextMenu([...alternatives].reverse());
  });

  const { icon, programName } = binary;

  return (
    <li style={styles.QuickstartAreaItem}>
      <OsButton style={styles.ButtonOverride} discreet onContextMenu={handleContextMenu} onMouseDown={switchOn({ lmb: handleLmb })} ref={quickstartAreaItemRef}>
        <Icon alt={programName} height={32} src={icon} width={32} />
      </OsButton>
    </li>
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
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
