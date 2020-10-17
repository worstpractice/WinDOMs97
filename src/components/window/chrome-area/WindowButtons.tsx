import { ExitButton } from "components/window/chrome-area/buttons/ExitButton";
import { MaximizeButton } from "components/window/chrome-area/buttons/MaximizeButton";
import { MinimizeButton } from "components/window/chrome-area/buttons/MinimizeButton";
import { useKernel } from "kernel";
import * as React from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import styles from "./WindowButtons.module.css";

type Props = {
  closeMenus: () => void;
  process: Process;
};

export const WindowButtons: FC<Props> = ({ closeMenus, process }) => {
  const { activate, endProcess, maximize, minimize, unMaximize } = useKernel();

  const handleExit = () => {
    endProcess(process);
  };

  const handleMaximize = () => {
    const { isMaximized, windowRef } = process;
    activate(windowRef);
    isMaximized ? unMaximize(process) : maximize(process);
  };

  const handleMinimize = () => {
    minimize(process);
    activate({ current: null });
  };

  return (
    <section className={styles.WindowButtons}>
      <MinimizeButton closeMenus={closeMenus} onMouseUp={handleMinimize} />
      <MaximizeButton closeMenus={closeMenus} onMouseUp={handleMaximize} />
      <ExitButton closeMenus={closeMenus} onMouseUp={handleExit} />
    </section>
  );
};
