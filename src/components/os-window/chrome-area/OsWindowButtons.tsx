import { ExitButton } from "components/os-window/chrome-area/buttons/ExitButton";
import { MaximizeButton } from "components/os-window/chrome-area/buttons/MaximizeButton";
import { MinimizeButton } from "components/os-window/chrome-area/buttons/MinimizeButton";
import { useKernel } from "kernel";
import * as React from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import styles from "./OsWindowButtons.module.css";

type Props = {
  closeMenus: () => void;
  process: Process;
};

export const OsWindowButtons: FC<Props> = ({ closeMenus, process }) => {
  const { activate, endProcess, maximize, minimize, unMaximize } = useKernel();

  const handleExit = () => {
    endProcess(process);
  };

  const handleMaximize = () => {
    const { isMaximized, osWindowRef } = process;
    activate(osWindowRef);
    isMaximized ? unMaximize(process) : maximize(process);
  };

  const handleMinimize = () => {
    minimize(process);
    activate({ current: null });
  };

  return (
    <section className={styles.OsWindowButtons}>
      <MinimizeButton closeMenus={closeMenus} onMouseUp={handleMinimize} />
      <MaximizeButton closeMenus={closeMenus} onMouseUp={handleMaximize} />
      <ExitButton closeMenus={closeMenus} onMouseUp={handleExit} />
    </section>
  );
};