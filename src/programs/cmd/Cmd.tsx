import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { MouseHandler } from "typings/handlers/MouseHandler";
import type { Loader } from "typings/Loader";
import styles from "./Cmd.module.css";

type Props = {
  getProcess: Loader;
};

export const Cmd: FC<Props> = ({ getProcess }) => {
  const cmdRef = useOsRef<HTMLElement>();
  const process = getProcess(cmdRef);
  useStartingDimensions(process);

  const handleClick: MouseHandler<HTMLElement> = () => {
    process.binaryImage.softlinks.isInQuickstartArea = false;
  };

  return (
    <main className={styles.Cmd} onMouseDown={handleClick} ref={cmdRef}>
      <p>Mircosoft WinDOMs [Version 10.0.1337.1234]</p>
      <p>(c) 1997 Mircosoft Corporation. All rights reversed.</p>
    </main>
  );
};
