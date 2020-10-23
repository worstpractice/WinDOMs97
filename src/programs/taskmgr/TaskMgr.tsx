import { default as React } from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import styles from "./TaskMgr.module.css";

type Props = {
  process: Process;
};

export const TaskMgr: FC<Props> = ({ process }) => {
  return <div className={styles.TaskMgr}></div>;
};
