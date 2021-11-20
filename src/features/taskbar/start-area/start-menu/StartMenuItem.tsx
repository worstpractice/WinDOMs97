import { Icon } from 'components/Icon';
import { Words } from 'components/Words';
import { onLMB } from 'event-filters/onLMB';
import { useExecuteBinary } from 'hooks/syscalls/useExecuteBinary';
import { useOsRef } from 'hooks/useOsRef';
import { useMenuState } from 'state/useMenuState';
import type { Linker } from 'typings/Linker';
import type { MenuState } from 'typings/state/MenuState';
import styles from './StartMenuItem.module.css';

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

export const StartMenuItem = ({ getBinary }: Props) => {
  const { closeMenus } = useMenuState(fromMenu);
  const startMenuItemRef = useOsRef<HTMLLIElement>();
  const binary = getBinary(startMenuItemRef);
  const executeBinary = useExecuteBinary(binary);

  const handleLaunch = onLMB<HTMLLIElement>(() => {
    closeMenus();
    executeBinary();
  });

  const { fileName, icon, programName } = binary;

  return (
    <li className={styles.StartMenuItem} onMouseDown={handleLaunch} ref={startMenuItemRef}>
      <Icon alt={fileName} height={64} src={icon} width={64} />
      <Words of={programName} />
    </li>
  );
};

// <div aria-hidden="true" style={{ fontSize: "8px" }}>
//  ►
// </div>
