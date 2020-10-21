import { Clock } from "features/taskbar/notification-area/Clock";
import { VerticalSeparator } from "components/separators/VerticalSeparator";
import type { ReactNode } from "react";
import * as React from "react";
import type { FC } from "typings/FC";
import styles from "./NotificationArea.module.css";

type Props = {
  children: ReactNode;
};

export const NotificationArea: FC<Props> = ({ children }) => {
  return (
    <section className={styles.Wrapper}>
      <VerticalSeparator />
      <section className={styles.NotificationArea}>
        <Clock />
        {children}
      </section>
    </section>
  );
};
