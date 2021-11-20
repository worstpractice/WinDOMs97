import { default as React } from 'react';
import { Icon } from 'src/components/Icon';
import { Title } from 'src/components/Title';
import { useActiveState } from 'src/state/useActiveState';
import { isRef } from 'src/type-predicates/isRef';
import type { Process } from 'src/typings/Process';
import type { ActiveState } from 'src/typings/state/ActiveState';
import { css } from 'src/utils/css';
import styles from './OsWindowLabel.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activeRef }: ActiveState) => {
  return {
    activeRef,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const activeStyle = css(styles.Title, styles.Active);

type Props = {
  process: Process;
};

export const OsWindowLabel = ({ process }: Props) => {
  const { activeRef } = useActiveState(fromActive);

  const { binaryImage, osWindowRef } = process;
  const { icon, programName } = binaryImage;

  const style = isRef(activeRef, osWindowRef) ? activeStyle : styles.Title;

  return (
    <header className={styles.OsWindowLabel}>
      <Icon alt={programName} className={styles.Icon} height={32} src={icon} width={32} />
      <Title className={style} of={programName} />
    </header>
  );
};
