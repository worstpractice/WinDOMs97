import type { FC } from "react";
import React from "react";
import styles from "./App.module.css";

type Props = {};

export const App: FC<Props> = () => {
  return <div className={styles.App}>it works</div>;
};
