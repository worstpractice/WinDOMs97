import { Words } from 'components/Words';
import { timestamp } from 'utils/timestamp';
import styles from './Clock.module.css';

type Props = {};

export const Clock = ({}: Props) => {
  return <Words className={styles.Clock} of={timestamp()} />;
};
