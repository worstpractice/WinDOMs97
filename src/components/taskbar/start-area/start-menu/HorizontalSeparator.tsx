import type { FC } from "react";
import * as React from "react";
import styles from "./HorizontalSeparator.module.css";

type Props = {};

export const HorizontalSeparator: FC<Props> = () => {
  return <aside className={styles.HorizontalSeparator}></aside>;
};
