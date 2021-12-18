import { default as React, useState } from 'react';
import { Icon } from 'src/components/Icon';
import { onLmb } from 'src/event-filters/onLmb';
import { useMenuState } from 'src/state/useMenuState';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import type { Alternative } from 'src/typings/Alternative';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { toFalse } from 'src/utils/setters/toFalse';
import { toTrue } from 'src/utils/setters/toTrue';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromMenu = from<MenuState>().select('closeMenus');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly alternative: Alternative;
};

export const ContextMenuItem = ({ alternative }: Props) => {
  const { closeMenus } = useMenuState(fromMenu);
  const [isHovering, setIsHovering] = useState(false);

  const { action, icon, name } = alternative;

  const handleMouseDown = onLmb<HTMLLIElement>((): void => {
    closeMenus();
    action();
  });

  const handleMouseEnter = (): void => {
    setIsHovering(toTrue);
  };

  const handleMouseLeave = (): void => {
    setIsHovering(toFalse);
  };

  return (
    <li onMouseDown={handleMouseDown} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={isHovering ? hoverStyle : style}>
      {icon && <Icon alt={name} height={32} src={icon} width={32} />}
      <p>{name}</p>
    </li>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const style = css({
  alignItems: 'center',
  display: 'flex',
  fontSize: '24px',
  gap: '20px',
  paddingBottom: '2px',
  paddingLeft: '8px',
  paddingTop: '2px',
  ...INTERACTIVE,
} as const);

const hoverStyle = css({
  ...style,
  backgroundColor: 'var(--startmenu-spine-bright)',
  color: 'var(--white)',
  cursor: 'pointer',
} as const);
