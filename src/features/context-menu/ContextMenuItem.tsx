import { default as React } from 'react';
import { Icon } from 'src/components/Icon';
import { Words } from 'src/components/Words';
import { onLMB } from 'src/event-filters/onLMB';
import { useMenuState } from 'src/state/useMenuState';
import type { Alternative } from 'src/typings/Alternative';
import type { MenuState } from 'src/typings/state/MenuState';
import styles from './ContextMenuItem.module.css';

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
  alternative: Alternative;
};

export const ContextMenuItem = ({ alternative }: Props) => {
  const { closeMenus } = useMenuState(fromMenu);

  const { action, icon, name } = alternative;

  const handleMouseDown = onLMB<HTMLLIElement>(() => {
    closeMenus();
    action();
  });

  return (
    <li className={styles.ContextMenuItem} onMouseDown={handleMouseDown}>
      {icon && <Icon alt={name} height={32} src={icon} width={32} />}
      <Words of={name} />
    </li>
  );
};
