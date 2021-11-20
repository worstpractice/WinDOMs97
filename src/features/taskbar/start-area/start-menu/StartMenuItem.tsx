// <div aria-hidden="true" style={{ fontSize: "8px" }}>
//  ►
// </div>
import { default as React } from 'react';
import { Icon } from 'src/components/Icon';
import { Words } from 'src/components/Words';
import { onLMB } from 'src/event-filters/onLMB';
import { useExecuteBinary } from 'src/hooks/syscalls/useExecuteBinary';
import { useOsRef } from 'src/hooks/useOsRef';
import { useMenuState } from 'src/state/useMenuState';
import type { Linker } from 'src/typings/Linker';
import type { MenuState } from 'src/typings/state/MenuState';
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
