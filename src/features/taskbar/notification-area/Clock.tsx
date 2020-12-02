import { Words } from "components/Words";
import type { FC } from "react";
import { timestamp } from "utils/timestamp";
import styles from "./Clock.module.css";

type Props = {};

export const Clock: FC<Props> = () => {
  return <Words className={styles.Clock} of={timestamp()} />;
};
