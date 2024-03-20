import { default as React } from 'react';
import { useClickState } from 'src/state/useClickState';
import type { Position } from 'src/typings/Position';
import type { ClickState } from 'src/typings/state/ClickState';
import { css } from 'src/utils/as/css';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromClick = from<ClickState>().select('lastClickPosition');
////////////////////////////////////////////////////////////////

type Props = {
  readonly currentPosition: Position;
};

export const DragSelection = ({ currentPosition }: Props) => {
  const { lastClickPosition } = useClickState(fromClick);

  const {
    //
    x: startX,
    y: startY,
  } = lastClickPosition;

  const {
    //
    x: currentX,
    y: currentY,
  } = currentPosition;

  const left = startX;
  const top = startY;

  const width = currentX - startX;
  const height = currentY - startY;

  return (
    <div
      style={{
        ...styles.DragSelection,
        height,
        left,
        top,
        width,
      }}
    />
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  DragSelection: css({
    background: `var(--blue-transparent)`,
    position: 'absolute',
    zIndex: 10,
  } as const),
} as const;
