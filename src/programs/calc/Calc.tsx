import { default as React, useState } from 'react';
import { OsButton } from 'src/components/OsButton';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useOsRef } from 'src/hooks/useOsRef';
import type { Loader } from 'src/typings/Loader';
import styles from './Calc.module.css';

type Props = {
  getProcess: Loader;
};

export const Calc = ({ getProcess }: Props) => {
  const calcRef = useOsRef<HTMLElement>();
  const process = getProcess(calcRef);
  useStartingDimensions(process);
  const [sum, setSum] = useState(12);

  const handleMouseUp = () => {
    setSum((prev) => {
      return prev + 1;
    });
  };

  return (
    <main className={styles.Calc} ref={calcRef}>
      <header className={styles.CalculatorResults}>{sum}</header>
      <section className={styles.GridContainer}>
        <OsButton onMouseUp={handleMouseUp}>C</OsButton>
      </section>
    </main>
  );
};
