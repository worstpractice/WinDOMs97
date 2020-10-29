import { Icon } from "components/Icon";
import { Words } from "components/Words";
import { onLMB } from "event-filters/onLMB";
import { default as React } from "react";
import type { MenuState } from "state/useMenuState";
import { useMenuState } from "state/useMenuState";
import type { Alternative } from "typings/Alternative";
import type { FC } from "typings/FC";
import styles from "./ContextMenuItem.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fromMenu = ({ closeMenus }: MenuState) => ({
  closeMenus,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  alternative: Alternative;
};

export const ContextMenuItem: FC<Props> = ({ alternative }) => {
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
