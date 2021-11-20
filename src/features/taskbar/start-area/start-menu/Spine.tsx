import { Title } from 'components/Title';
import styles from './Spine.module.css';

type Props = {};

export const Spine = ({}: Props) => {
  return (
    <header aria-orientation="vertical" className={styles.Spine}>
      <Title className={styles.Title} of={'WinDOMs 97'} />
    </header>
  );
};
