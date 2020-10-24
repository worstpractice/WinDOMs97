import { default as React } from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import styles from "./Calc.module.css";

type Props = {
  process: Process;
};

// const calculatorStartingSize = { width: 500, height: 600 };

export const Calc: FC<Props> = ({ process }) => {
  return (
    <main className={styles.Calc}>
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
