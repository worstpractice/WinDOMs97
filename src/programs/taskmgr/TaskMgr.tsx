import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./TaskMgr.module.css";

type Props = {};

export const TaskMgr: FC<Props> = () => {
  return <div className={styles.TaskMgr}></div>;
};
