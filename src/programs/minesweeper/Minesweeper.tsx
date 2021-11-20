import { useStartingDimensions } from 'hooks/programs/useStartingDimensions';
import { useOsRef } from 'hooks/useOsRef';
import type { Loader } from 'typings/Loader';
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
