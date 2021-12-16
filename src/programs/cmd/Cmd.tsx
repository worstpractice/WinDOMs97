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
// import styles from './Cmd.module.css';

type Props = {
  readonly getProcess: Loader;
};

export const Cmd = ({ getProcess }: Props) => {
  const cmdRef = useRef<HTMLElement>(null);
  const process = getProcess(cmdRef);
  useStartingDimensions(process);

  return (
    <main style={styles.Cmd} ref={cmdRef}>
      <p>Mircosoft WinDOMs [Version 10.0.1337.1234]</p>
      <p>(c) 1997 Mircosoft Corporation. All rights reversed.</p>
    </main>
  );
};
