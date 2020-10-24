import { Divider } from "components/Divider";
import { Clock } from "features/taskbar/notification-area/Clock";
import type { ReactNode } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./NotificationArea.module.css";

type Props = {
  children: ReactNode;
};

export const NotificationArea: FC<Props> = ({ children }) => {
  // @ts-expect-error Lying is wrong.
  const hasChildren = children?.length;

  const iconsStyle = hasChildren ? styles.Icons : "";

  return (
    <section className={styles.Wrapper}>
      <Divider dent="in" direction="vertical" />
      <section className={styles.NotificationArea}>
        <aside className={iconsStyle}>{children}</aside>
        <Clock />
      </section>
    </section>
  );
};
