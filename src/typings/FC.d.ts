import type { ReactElement, ValidationMap, WeakValidationMap } from "react";

/** The regular `FC` type, sans `PropsWithChildren`.
 *
 * Cost: we now have to manually specify 'children' in our props.
 *
 * Benefit: TS complains if we pass children to components that do not expect them.
 *
 * This also makes the `children` prop non-optional when we do type it out.
 *
 * Therefore:
 *  - we can rely on there being no children passed where unexpected.
 *  - we can rely on there being children passed where expected.
 *
 * @example
 * import type { ReactElement } from "react";
 * import type { FC } from "typings/FC";
 *
 * type Props = {
 *   children: ReactElement; // NOTE: Not optional unless you make it
 * };
 */
export type FC<P extends object> = {
  (props: P, context?: unknown): ReactElement<P, any> | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<unknown>;
  defaultProps?: Partial<P>;
  displayName?: string;
};
