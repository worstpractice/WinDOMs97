import { VerticalSeparator } from "components/taskbar/VerticalSeparator";
import type { FC } from "react";
import React from "react";
import { timestamp } from "utils/timestamp";
import styles from "./NotificationArea.module.css";

type Props = {};

export const NotificationArea: FC<Props> = ({ children }) => {
  return (
    <section className={styles.Wrapper}>
      <VerticalSeparator />
      <section className={styles.NotificationArea}>
        <p>{timestamp()}</p>
        {children}
      </section>
    </section>
  );
};
