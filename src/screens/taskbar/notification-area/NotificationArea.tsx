import { Divider } from "components/Divider";
import type { ReactNode } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { Clock } from "views/taskbar/notification-area/Clock";
import styles from "./NotificationArea.module.css";

type Props = {
  children: ReactNode;
};

export const NotificationArea: FC<Props> = ({ children }) => {
  return (
    <section className={styles.Wrapper}>
      <Divider dent="in" direction="vertical" />
      <section className={styles.NotificationArea}>
        <Clock />
        {children}
      </section>
    </section>
  );
};
