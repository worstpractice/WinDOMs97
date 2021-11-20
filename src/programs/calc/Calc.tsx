import { OsButton } from 'components/OsButton';
import { useStartingDimensions } from 'hooks/programs/useStartingDimensions';
import { useOsRef } from 'hooks/useOsRef';
import { useState } from 'react';
import type { FC } from 'typings/FC';
import type { Loader } from 'typings/Loader';
import styles from './Calc.module.css';

type Props = {
  getProcess: Loader;
};

export const Calc: FC<Props> = ({ getProcess }) => {
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
