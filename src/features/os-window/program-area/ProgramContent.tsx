import type { ReactNode } from 'react';
import styles from './ProgramContent.module.css';

type Props = {
  children: ReactNode;
};

export const ProgramContent = ({ children }: Props) => {
  return <section className={styles.ProgramContent}>{children}</section>;
};
