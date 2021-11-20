import { default as React } from 'react';
import { Words } from 'src/components/Words';
import { timestamp } from 'src/utils/timestamp';
import styles from './Clock.module.css';

type Props = {};

export const Clock = ({}: Props) => {
  return <Words className={styles.Clock} of={timestamp()} />;
};
