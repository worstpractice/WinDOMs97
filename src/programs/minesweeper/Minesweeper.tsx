import { default as React, useRef } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import type { Loader } from 'src/typings/Loader';
import { css } from 'src/utils/as/css';

type Props = {
  readonly getProcess: Loader;
};

export const Minesweeper = ({ getProcess }: Props) => {
  const minesweeperRef = useRef<HTMLDivElement>(null);
  const process = getProcess(minesweeperRef);
  useStartingDimensions(process);

  return <div style={styles.Minesweeper} ref={minesweeperRef}></div>;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Minesweeper: css({
    height: '100%',
    width: '100%',
  } as const),
} as const;
