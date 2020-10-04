import type { FC } from "react";
import React from "react";
import styles from "./VerticalSeparator.module.css";

type Props = {};

export const VerticalSeparator: FC<Props> = () => {
  return <div className={styles.VerticalSeparator}></div>;
};
