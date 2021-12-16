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
// import styles from './Notepad.module.css';

type Props = {
  readonly getProcess: Loader;
};

export const Notepad = ({ getProcess }: Props) => {
  const notepadRef = useRef<HTMLDivElement>(null);
  const process = getProcess(notepadRef);
  useStartingDimensions(process);

  return <div style={styles.Notepad} ref={notepadRef}></div>;
};
