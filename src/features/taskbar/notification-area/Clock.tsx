import { default as React } from 'react';
import { css } from 'src/utils/as/css';
import { timestamp } from 'src/utils/timestamp';

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const Clock = ({}: Props) => {
  return <p style={styles.Clock}>{timestamp()}</p>;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Clock: css({
    fontSize: '22px',
    marginRight: '12px',
    paddingTop: '4px',
  } as const),
} as const;
