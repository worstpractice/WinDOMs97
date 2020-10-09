import { Spine } from "components/taskbar/start-area/start-menu/Spine";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useMutableRef } from "hooks/useMutableRef";
import type { FC } from "react";
import React from "react";
import styles from "./StartMenu.module.css";

type Props = {};

export const StartMenu: FC<Props> = ({ children }) => {
  const startMenuRef = useMutableRef();
  useActivateOnMount(startMenuRef);

  return (
    <section className={styles.StartMenu} ref={startMenuRef}>
      <Spine />
      <ul className={styles.ContentList}>{children}</ul>
    </section>
  );
};

