import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { Handler } from "typings/Handler";
import type { Loader } from "typings/Loader";
import styles from "./Cmd.module.css";

type Props = {
  getProcess: Loader;
};

export const Cmd: FC<Props> = ({ getProcess }) => {
  const programRef = useOsRef<HTMLElement>();
  const process = getProcess(programRef);
  useStartingDimensions(process);

  const handleClick: Handler<HTMLElement> = () => {
    process.binaryImage.softlinks.isInQuickstartArea = false;
  };

  return (
    <main className={styles.Cmd} onMouseDown={handleClick} ref={programRef}>
      <p>Mircosoft WinDOMs [Version 10.0.1337.1234]</p>
      <p>(c) 1997 Mircosoft Corporation. All rights reversed.</p>
    </main>
  );
};
