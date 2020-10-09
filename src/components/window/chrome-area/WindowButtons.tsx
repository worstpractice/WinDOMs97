import { WindowButton } from "components/window/chrome-area/WindowButton";
import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import styles from "./WindowButtons.module.css";

type Props = {
  process: Process;
};

export const WindowButtons: FC<Props> = ({ process }) => {
  const { endProcess } = useStore();

  const handleExit = () => {
    endProcess(process);
  };

  return (
    <section className={styles.WindowButtons}>
      <WindowButton kind="minimize" />
      <WindowButton kind="maximizeOrRestore" />
      <WindowButton kind="exit" onExit={handleExit} />
    </section>
  );
};
