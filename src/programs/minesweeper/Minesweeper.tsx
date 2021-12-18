import { default as React, useRef } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import type { Loader } from 'src/typings/Loader';
import { css } from 'src/utils/as/css';

type Props = {
  readonly getProcess: Loader;
};

export const Minesweeper = ({ getProcess }: Props) => {
  const programRef = useRef<HTMLDivElement>(null);
  const process = getProcess(programRef);
  useActivateOnMount(programRef);
  useStartingDimensions(process);

  return <div style={styles.Minesweeper} ref={programRef}></div>;
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
