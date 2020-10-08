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
  const { endProcess, setActiveWidget } = useStore();

  const handleExit = () => {
    endProcess(process);
    setActiveWidget("Desktop");
  };

  return (
    <section className={styles.WindowButtons}>
      <WindowButton kind={"minimize"}></WindowButton>
      <WindowButton kind={"maximizeOrRestore"}></WindowButton>
      <WindowButton kind={"exit"} onExit={handleExit}></WindowButton>
    </section>
  );
};
