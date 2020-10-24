import { default as React, useCallback, useLayoutEffect } from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import styles from "./Calc.module.css";

type Props = {
  process: Process;
  setOsWindowDimensions: (dimensions: { width: number; height: number }) => void;
};

const calculatorStartingSize = { width: 500, height: 600 };

export const Calc: FC<Props> = ({ process, setOsWindowDimensions }) => {
  const setDimensions = useCallback(setOsWindowDimensions, []);

  useLayoutEffect(() => {
    setDimensions(calculatorStartingSize);
  }, [setDimensions]);

  return (
    <div className={styles.Calc}>
      <main className={styles.GridContainer}>
        <input className={styles.CalculatorResults} type="text" />
        <button className={styles.CalculatorButton}>Maths</button>
        <button className={styles.CalculatorButton}>Maths</button>
        <button className={styles.CalculatorButton}>Maths</button>
        <button className={styles.CalculatorButton}>Maths</button>
        <button className={styles.CalculatorButton}>Maths</button>
      </main>
    </div>
  );
};
