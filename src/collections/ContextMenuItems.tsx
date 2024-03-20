import { default as React } from 'react';
import { ContextMenuItem } from 'src/features/context-menu/ContextMenuItem';
import { useMenuState } from 'src/state/useMenuState';
import type { MenuState } from 'src/typings/state/MenuState';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromMenu = from<MenuState>().select('alternatives');
////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const ContextMenuItems = ({}: Props) => {
  const { alternatives } = useMenuState(fromMenu);

  return (
    <>
      {alternatives.map((alternative) => {
        const { name } = alternative;

        return <ContextMenuItem alternative={alternative} key={`ContextMenuItem-${name}`} />;
      })}
    </>
  );
};
