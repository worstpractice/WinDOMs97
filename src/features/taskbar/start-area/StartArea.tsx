import type { ReactNode } from 'react';
import type { FC } from 'typings/FC';
import styles from './StartArea.module.css';

type Props = {
  children: ReactNode;
};

export const StartArea: FC<Props> = ({ children }) => {
  return <section className={styles.StartArea}>{children}</section>;
};
