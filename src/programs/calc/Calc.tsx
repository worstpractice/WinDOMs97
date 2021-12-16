import type { CSSProperties } from 'react';
import { default as React, useRef, useState } from 'react';
import { OsButton } from 'src/components/OsButton';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import type { Loader } from 'src/typings/Loader';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles: { readonly [key in string]: CSSProperties } = new Proxy(
  {},
  {
    get() {
      return {};
    },
  },
);
// import styles from './Calc.module.css';

type Props = {
  readonly getProcess: Loader;
};

export const Calc = ({ getProcess }: Props) => {
  const calcRef = useRef<HTMLElement>(null);
  const process = getProcess(calcRef);
  useStartingDimensions(process);
  const [sum, setSum] = useState(12);

  const handleMouseUp = (): void => {
    setSum((prev) => prev + 1);
  };

  return (
    <main style={styles.Calc} ref={calcRef}>
      <header style={styles.CalculatorResults}>{sum}</header>
      <section style={styles.GridContainer}>
        <OsButton onMouseUp={handleMouseUp}>C</OsButton>
      </section>
    </main>
  );
};
