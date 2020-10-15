import { WindowButton } from "components/window/chrome-area/WindowButton";
import { useKernel } from "kernel";
import * as React from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { maximizeOrRestore } from "utils/maximizeOrRestore";
import { minimize } from "utils/minimize";
import styles from "./WindowButtons.module.css";

type Props = {
  process: Process;
};

export const WindowButtons: FC<Props> = ({ process }) => {
  const { endProcess } = useKernel();

  const handleExit = () => {
    endProcess(process);
  };

  const handleMaximizeOrRestore = () => {
    maximizeOrRestore(process);
  };

  const handleMinimize = () => {
    minimize(process);
  };

  return (
    <section className={styles.WindowButtons}>
      <WindowButton kind="minimize" onMinimize={handleMinimize} />
      <WindowButton kind="maximizeOrRestore" onMaximizeOrRestore={handleMaximizeOrRestore} />
      <WindowButton kind="exit" onExit={handleExit} />
    </section>
  );
};
