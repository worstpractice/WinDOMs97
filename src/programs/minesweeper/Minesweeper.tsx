import type { CSSProperties } from 'react';
import { default as React, useRef } from 'react';
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
// import styles from './Minesweeper.module.css';

type Props = {
  readonly getProcess: Loader;
};

export const Minesweeper = ({ getProcess }: Props) => {
  const minesweeperRef = useRef<HTMLDivElement>(null);
  const process = getProcess(minesweeperRef);
  useStartingDimensions(process);

  return <div style={styles.Minesweeper} ref={minesweeperRef}></div>;
};
