import { onLMB } from "event-filters/onLMB";
import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { default as React, useState } from "react";
import type { FC } from "typings/FC";
import type { Loader } from "typings/Loader";
import { css } from "utils/css";
import styles from "./Calc.module.css";

type Props = {
  getProcess: Loader;
};

export const Calc: FC<Props> = ({ getProcess }) => {
  const calcRef = useOsRef<HTMLElement>();
  const process = getProcess(calcRef);
  useStartingDimensions(process);
  const [sum, setSum] = useState(12);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = onLMB(() => {
    setIsPressed(true);
  });

  const handleMouseLeave = () => {
    if (!isPressed) return;

    setIsPressed(false);
  };

  const handleMouseUp = onLMB(() => {
    if (!isPressed) return;

    setIsPressed(false);
    setSum((prev) => prev + 1);
  });

  const buttonStyle = isPressed ? css(styles.CalculatorButton, styles.Pressed) : styles.CalculatorButton;

  return (
    <main className={styles.Calc} ref={calcRef}>
      <header className={styles.CalculatorResults}>{sum}</header>
      <section className={styles.GridContainer}>
        <button
          className={buttonStyle}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          type="button"
        >
          C
        </button>
      </section>
    </main>
  );
};
