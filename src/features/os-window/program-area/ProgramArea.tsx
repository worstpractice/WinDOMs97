import type { ReactNode } from 'react';
import type { FC } from 'typings/FC';
import styles from './ProgramArea.module.css';

type Props = {
  children: ReactNode;
};

export const ProgramArea: FC<Props> = ({ children }) => {
  return <main className={styles.ProgramArea}>{children}</main>;
};
