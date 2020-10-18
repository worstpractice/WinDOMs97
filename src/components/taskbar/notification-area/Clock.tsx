import type { FC } from "react";
import * as React from "react";
import { timestamp } from "utils/timestamp";
import styles from "./Clock.module.css";

type Props = {};

export const Clock: FC<Props> = () => {
  return <p className={styles.Clock}>{timestamp()}</p>;
};
