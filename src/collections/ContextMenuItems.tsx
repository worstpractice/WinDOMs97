import { ContextMenuItem } from 'features/context-menu/ContextMenuItem';
import { useMenuState } from 'state/useMenuState';
import type { FC } from 'typings/FC';
import type { MenuState } from 'typings/state/MenuState';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromMenu = ({ alternatives }: MenuState) => {
  return {
    alternatives,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const ContextMenuItems: FC<Props> = () => {
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
