import { ContextMenuItemIcon } from "components/desktop/context-menu/context-menu-item/ContextMenuItemIcon";
import { ContextMenuItemLabel } from "components/desktop/context-menu/context-menu-item/ContextMenuItemLabel";
import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import * as React from "react";
import type { Alternative } from "typings/Alternative";
import type { FC } from "typings/FC";
import styles from "./ContextMenuItem.module.css";

type Props = {
  alternative: Alternative;
};

export const ContextMenuItem: FC<Props> = ({ alternative }) => {
  const { closeMenus } = useKernel();

  const { action, icon } = alternative;

  const handleMouseDown = onLMB<HTMLLIElement>(() => {
    closeMenus();
    action();
  });

  return (
    <li className={styles.ContextMenuItem} onMouseDown={handleMouseDown}>
      {icon && <ContextMenuItemIcon alternative={alternative} />}
      <ContextMenuItemLabel alternative={alternative} />
    </li>
  );
};
