import { default as React, useRef, useState } from 'react';
import { Icon } from 'src/components/Icon';
import { useBinaryAlternatives } from 'src/hooks/alternatives/useBinaryAlternatives';
import { useExecuteBinary } from 'src/hooks/syscalls/useExecuteBinary';
import { useMenuState } from 'src/state/useMenuState';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import type { Linker } from 'src/typings/Linker';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { switchOn } from 'src/utils/event-filters/switchOn';
import { toFalse } from 'src/utils/setters/toFalse';
import { toTrue } from 'src/utils/setters/toTrue';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromMenu = from<MenuState>().select('closeMenus', 'openContextMenu');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly getBinary: Linker;
};

export const StartMenuItem = ({ getBinary }: Props) => {
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const startMenuItemRef = useRef<HTMLLIElement>(null);
  const binary = getBinary(startMenuItemRef);
  const executeBinary = useExecuteBinary(binary);
  const [isHovering, setIsHovering] = useState(false);
  const alternatives = useBinaryAlternatives(binary);

  const handleRmb = (): void => {
    openContextMenu(alternatives);
  };

  const handleLmb = (): void => {
    closeMenus();
    executeBinary();
  };

  const handleMouseEnter = (): void => {
    setIsHovering(toTrue);
  };

  const handleMouseLeave = (): void => {
    setIsHovering(toFalse);
  };

  const { fileName, icon, programName } = binary;

  return (
    <li
      onMouseDown={switchOn({ lmb: handleLmb, rmb: handleRmb } as const)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={startMenuItemRef}
      style={isHovering ? hoverStyle : style}
    >
      <Icon alt={fileName} height={64} src={icon} width={64} />
      <p>{programName}</p>
    </li>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * CSS *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const style = css({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '32px',
  gap: '20px',
  padding: '10px',
  ...INTERACTIVE,
} as const);

const hoverStyle = css({
  ...style,
  backgroundColor: 'var(--startmenu-spine-bright)',
  color: 'white',
} as const);
