import type { FC } from "react";
import React from "react";
import styles from "./HorizontalSeparator.module.css";

type Props = {};

export const HorizontalSeparator: FC<Props> = () => {
  return <div className={styles.HorizontalSeparator}></div>;
};
