import { Icon } from 'components/Icon';
import { OsButton } from 'components/OsButton';
import { switchOn } from 'event-filters/delegate';
import { useExecuteBinary } from 'hooks/syscalls/useExecuteBinary';
import { useOsRef } from 'hooks/useOsRef';
import { useMenuState } from 'state/useMenuState';
import type { ButtonHandler } from 'typings/ButtonHandler';
import type { Linker } from 'typings/Linker';
import type { MenuState } from 'typings/state/MenuState';
import styles from './QuickstartAreaItem.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromMenu = ({ closeMenus }: MenuState) => {
  return {
    closeMenus,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getBinary: Linker;
};

export const QuickstartAreaItem = ({ getBinary }: Props) => {
  const { closeMenus } = useMenuState(fromMenu);
  const quickstartAreaItemRef = useOsRef<HTMLButtonElement>();
  const binary = getBinary(quickstartAreaItemRef);
  const executeBinary = useExecuteBinary(binary);

  const handleLMB = () => {
    executeBinary();
    closeMenus();
  };

  const handleRMB: ButtonHandler = (e) => {
    // NOTE: This is here because we want `QuickstartAreaItem` to support `ContextMenu` clicks.
    e.stopPropagation();
    // TODO: Get cracking on context menu `Alternative`s!
  };

  const { icon, programName } = binary;

  return (
    <li className={styles.QuickstartAreaItem}>
      <OsButton className={styles.ButtonOverride} isDiscreet onMouseDown={switchOn({ LMB: handleLMB, RMB: handleRMB })} ref={quickstartAreaItemRef}>
        <Icon alt={programName} height={32} src={icon} width={32} />
      </OsButton>
    </li>
  );
};
