import { Separator } from "components/Separator";
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
      <Separator dent="in" direction="vertical" />
      <section className={styles.NotificationArea}>
        <Clock />
        {children}
      </section>
    </section>
  );
};
