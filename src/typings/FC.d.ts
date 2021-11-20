import type { ReactElement, ValidationMap, WeakValidationMap } from 'react';

export type FC<P extends {}> = {
  (props: P, context?: unknown): ReactElement<P, any> | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<unknown>;
  defaultProps?: Partial<P>;
  displayName?: string;
};
