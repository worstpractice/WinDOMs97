import type { ReactNode } from 'react';
import { default as React } from 'react';
import styles from './StartArea.module.css';

type Props = {
  children: ReactNode;
};

export const StartArea = ({ children }: Props) => {
  return <section className={styles.StartArea}>{children}</section>;
};
