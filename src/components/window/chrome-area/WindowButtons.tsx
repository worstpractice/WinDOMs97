import { WindowButton } from "components/window/chrome-area/WindowButton";
import { useKernel } from "kernel";
import * as React from "react";
import type { FC } from "typings/FC";
import type { OsRef } from "typings/OsRef";
import type { Process } from "typings/Process";
import { minimize } from "utils/minimize";
import styles from "./WindowButtons.module.css";

type Props = {
  closeMenus: () => void;
  process: Process;
};

export const WindowButtons: FC<Props> = ({ closeMenus, process }) => {
  const { activate, endProcess } = useKernel();

  const handleExit = () => {
    endProcess(process);
  };

  const handleMaximizeOrRestore = (buttonRef: OsRef<HTMLButtonElement>) => {
    // maximizeOrRestore(process, buttonRef);
  };

  const handleMinimize = () => {
    activate({ current: null });
    minimize(process);
  };

  return (
    <section className={styles.WindowButtons}>
      <WindowButton closeMenus={closeMenus} kind="minimize" onMinimize={handleMinimize} />
      <WindowButton closeMenus={closeMenus} kind="maximizeOrRestore" onMaximizeOrRestore={handleMaximizeOrRestore} />
      <WindowButton closeMenus={closeMenus} kind="exit" onExit={handleExit} />
    </section>
  );
};
