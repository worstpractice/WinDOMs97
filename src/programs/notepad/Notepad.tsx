import { default as React, useRef } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import type { Loader } from 'src/typings/Loader';
import { css } from 'src/utils/as/css';

type Props = {
  readonly getProcess: Loader;
};

export const Notepad = ({ getProcess }: Props) => {
  const notepadRef = useRef<HTMLDivElement>(null);
  const process = getProcess(notepadRef);
  useStartingDimensions(process);

  return <div style={styles.Notepad} ref={notepadRef}></div>;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Notepad: css({
    // add some styles bro
  } as const),
} as const;
