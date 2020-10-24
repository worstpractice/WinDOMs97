import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import type { FC } from "typings/FC";
import type { Loader } from "typings/Loader";
import styles from "./Calc.module.css";

type Props = {
  getProcess: Loader;
};

export const Calc: FC<Props> = ({ getProcess }) => {
  const programRef = useOsRef<HTMLElement>();
  const process = getProcess(programRef);
  useStartingDimensions(process);

  return (
    <main className={styles.Calc} ref={programRef}>
      <input className={styles.CalculatorResults} type="text" />
      <section className={styles.GridContainer}>
        <button className={styles.CalculatorButton}>Maths</button>
        <button className={styles.CalculatorButton}>Maths</button>
        <button className={styles.CalculatorButton}>Maths</button>
        <button className={styles.CalculatorButton}>Maths</button>
        <button className={styles.CalculatorButton}>Maths</button>
      </section>
    </main>
  );
};
