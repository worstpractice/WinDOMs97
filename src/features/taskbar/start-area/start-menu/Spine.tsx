import { default as React } from 'react';
import { Title } from 'src/components/Title';
import styles from './Spine.module.css';

type Props = {};

export const Spine = ({}: Props) => {
  return (
    <header aria-orientation="vertical" className={styles.Spine}>
      <Title className={styles.Title} of={'WinDOMs 97'} />
    </header>
  );
};
