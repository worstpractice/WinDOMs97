import { default as React, useRef, useState } from 'react';
import { OsButton } from 'src/components/OsButton';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import type { Loader } from 'src/typings/Loader';
import { css } from 'src/utils/as/css';

type Props = {
  readonly getProcess: Loader;
};

export const Calc = ({ getProcess }: Props) => {
  const programRef = useRef<HTMLElement>(null);
  const process = getProcess(programRef);
  useActivateOnMount(programRef);
  useStartingDimensions(process);
  const [sum, setSum] = useState(12);

  const handleMouseUp = (): void => {
    setSum((prev) => prev + 1);
  };

  return (
    <main style={styles.Calc} ref={programRef}>
      <header style={styles.CalculatorResults}>{sum}</header>
      <section style={styles.GridContainer}>
        <OsButton onMouseUp={handleMouseUp}>C</OsButton>
      </section>
    </main>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Calc: css({
    alignItems: 'center',
    backgroundColor: 'var(--oswindow-background)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '10px',
    width: '100%',
  } as const),

  CalculatorResults: css({
    // add some styles bro
  } as const),

  GridContainer: css({
    // add some styles bro
  } as const),
} as const;
