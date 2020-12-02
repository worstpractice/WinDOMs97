import { Divider } from "components/Divider";
import { Clock } from "features/taskbar/notification-area/Clock";
import type { ReactNode } from "react";
import type { FC } from "typings/FC";
import styles from "./NotificationArea.module.css";

type Props = {
  children: ReactNode;
};

export const NotificationArea: FC<Props> = ({ children }) => {
  return (
    <section className={styles.Wrapper}>
      <Divider dent="in" direction="vertical" />
      <section className={styles.NotificationArea}>
        <aside className={styles.Icons}>{children}</aside>
        <Clock />
      </section>
    </section>
  );
};
