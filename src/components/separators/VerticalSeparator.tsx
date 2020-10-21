import type { FC } from "typings/FC";
import * as React from "react";
import styles from "./VerticalSeparator.module.css";

type Props = {};

export const VerticalSeparator: FC<Props> = () => {
  return <aside className={styles.VerticalSeparator} />;
};