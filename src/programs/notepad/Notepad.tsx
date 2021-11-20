import { default as React } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useOsRef } from 'src/hooks/useOsRef';
import type { Loader } from 'src/typings/Loader';
import styles from './Notepad.module.css';

type Props = {
  getProcess: Loader;
};

export const Notepad = ({ getProcess }: Props) => {
  const notepadRef = useOsRef<HTMLDivElement>();
  const process = getProcess(notepadRef);
  useStartingDimensions(process);

  return <div className={styles.Notepad} ref={notepadRef}></div>;
};
