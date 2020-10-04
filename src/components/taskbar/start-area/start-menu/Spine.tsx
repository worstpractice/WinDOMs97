import type { FC } from "react";
import React from "react";
import styles from "./Spine.module.css";

type Props = {};

export const Spine: FC<Props> = () => {
  return (
    <div className={styles.Spine}>
      <h1 className={styles.Title}>
        <strong className={styles.Bold}>FakeOS</strong> 97
      </h1>
    </div>
  );
};
