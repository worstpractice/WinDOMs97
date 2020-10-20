import type { FC } from "react";
import * as React from "react";
import type { Alternative } from "typings/Alternative";
import styles from "./ContextMenuItemLabel.module.css";

type Props = {
  alternative: Alternative;
};

export const ContextMenuItemLabel: FC<Props> = ({ alternative }) => {
  const { label } = alternative;

  return <p className={styles.ContextMenuItemLabel}>{label}</p>;
};
