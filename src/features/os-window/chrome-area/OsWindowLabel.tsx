import { default as React } from 'react';
import { Icon } from 'src/components/Icon';
import { Title } from 'src/components/Title';
import { useActiveState } from 'src/state/useActiveState';
import { isRef } from 'src/type-predicates/isRef';
import type { Process } from 'src/typings/Process';
import type { ActiveState } from 'src/typings/state/ActiveState';
import { css } from 'src/utils/as/css';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('activeRef');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly process: Process;
};

export const OsWindowLabel = ({ process }: Props) => {
  const { activeRef } = useActiveState(fromActive);

  const { binaryImage, osWindowRef } = process;
  const { icon, programName } = binaryImage;

  const style = isRef(activeRef, osWindowRef) ? activeStyle : styles.Title;

  return (
    <header style={styles.OsWindowLabel}>
      <Icon alt={programName} height={32} src={icon} width={32} />
      <Title style={style} of={programName} />
    </header>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Active: css({
    color: 'var(--white)',
    pointerEvents: 'none',
  } as const),

  OsWindowLabel: css({
    alignItems: 'center',
    display: 'flex',
    gap: '10px',
    pointerEvents: 'none',
  } as const),

  Title: css({
    color: 'var(--gray)',
    fontSize: '24px',
    fontWeight: '900',
    pointerEvents: 'none',
  } as const),
} as const;

const activeStyle = css({
  ...styles.Title,
  ...styles.Active,
} as const);
