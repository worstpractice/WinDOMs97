import { default as React, useRef } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import type { Loader } from 'src/typings/Loader';
import { css } from 'src/utils/as/css';

type Props = {
  readonly getProcess: Loader;
};

export const Cmd = ({ getProcess }: Props) => {
  const programRef = useRef<HTMLElement>(null);
  const process = getProcess(programRef);
  useActivateOnMount(programRef);
  useStartingDimensions(process);

  return (
    <main style={styles.Cmd} ref={programRef}>
      <p>Mircosoft WinDOMs [Version 10.0.1337.1234]</p>
      <p>(c) 1997 Mircosoft Corporation. All rights reversed.</p>
    </main>
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  Cmd: css({
    backgroundColor: 'black',
    color: 'white',
    fontSize: '32px',
    height: '100%',
    width: '100%',
  } as const),
} as const;
