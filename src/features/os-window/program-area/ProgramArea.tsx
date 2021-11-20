import type { ReactNode } from 'react';
import styles from './ProgramArea.module.css';

type Props = {
  children: ReactNode;
};

export const ProgramArea = ({ children }: Props) => {
  return <main className={styles.ProgramArea}>{children}</main>;
};
