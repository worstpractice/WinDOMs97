import { default as React } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useOsRef } from 'src/hooks/useOsRef';
import type { Loader } from 'src/typings/Loader';
import styles from './Minesweeper.module.css';

type Props = {
  getProcess: Loader;
};

export const Minesweeper = ({ getProcess }: Props) => {
  const minesweeperRef = useOsRef<HTMLDivElement>();
  const process = getProcess(minesweeperRef);
  useStartingDimensions(process);

  return <div className={styles.Minesweeper} ref={minesweeperRef}></div>;
};
