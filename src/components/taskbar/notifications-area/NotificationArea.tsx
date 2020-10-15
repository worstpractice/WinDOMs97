import { VerticalSeparator } from "components/taskbar/VerticalSeparator";
import type { ReactNode } from "react";
import * as React from "react";
import type { FC } from "typings/FC";
import { timestamp } from "utils/timestamp";
import styles from "./NotificationArea.module.css";

type Props = {
  children: ReactNode;
};

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
