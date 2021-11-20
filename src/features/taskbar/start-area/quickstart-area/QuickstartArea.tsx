import { Divider } from 'components/Divider';
import type { ReactNode } from 'react';
import type { FC } from 'typings/FC';
import styles from './QuickstartArea.module.css';

type Props = {
  children: ReactNode;
};

export const QuickstartArea: FC<Props> = ({ children }) => {
  return (
    <div className={styles.Wrapper}>
      <Divider dent="in" direction="vertical" />
      <Divider direction="vertical" isStocky />
      <ul className={styles.QuickstartArea}>{children}</ul>
      <Divider dent="in" direction="vertical" />
      <Divider direction="vertical" isStocky />
    </div>
  );
};
