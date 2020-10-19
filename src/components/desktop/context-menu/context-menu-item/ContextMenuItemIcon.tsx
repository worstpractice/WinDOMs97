import type { FC } from "react";
import * as React from "react";
import type { Alternative } from "typings/Alternative";
import styles from "./ContextMenuItemIcon.module.css";

type Props = {
  alternative: Alternative;
};

export const ContextMenuItemIcon: FC<Props> = ({ alternative }) => {
  const { icon, label } = alternative;

  return <img alt={label} className={styles.ContextMenuItemIcon} loading="eager" src={icon} />;
};
