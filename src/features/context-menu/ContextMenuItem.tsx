import { Icon } from 'components/Icon';
import { Words } from 'components/Words';
import { onLMB } from 'event-filters/onLMB';
import { useMenuState } from 'state/useMenuState';
import type { Alternative } from 'typings/Alternative';
import type { MenuState } from 'typings/state/MenuState';
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
