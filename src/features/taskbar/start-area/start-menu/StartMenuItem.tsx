import { default as React, useRef, useState } from 'react';
import { Icon } from 'src/components/Icon';
import { Words } from 'src/components/Words';
import { onLMB } from 'src/event-filters/onLMB';
import { useExecuteBinary } from 'src/hooks/syscalls/useExecuteBinary';
import { useMenuState } from 'src/state/useMenuState';
import type { Linker } from 'src/typings/Linker';
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
  readonly getBinary: Linker;
};

export const StartMenuItem = ({ getBinary }: Props) => {
  const { closeMenus } = useMenuState(fromMenu);
  const startMenuItemRef = useRef<HTMLLIElement>(null);
  const binary = getBinary(startMenuItemRef);
  const executeBinary = useExecuteBinary(binary);
  const [isHovering, setIsHovering] = useState(false);

  const handleLaunch = onLMB<HTMLLIElement>(() => {
    closeMenus();
    executeBinary();
  });

  const handleMouseEnter = () => {
    setIsHovering(toTrue);
  };

  const handleMouseLeave = () => {
    setIsHovering(toFalse);
  };

  const { fileName, icon, programName } = binary;

  return (
    <li
      onMouseDown={handleLaunch}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={startMenuItemRef}
      style={isHovering ? hoverStyle : style}
    >
      <Icon alt={fileName} height={64} src={icon} width={64} />
      <Words of={programName} />
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
} as const);

const hoverStyle = css({
  ...style,
  backgroundColor: 'var(--startmenu-spine-bright)',
  color: 'white',
} as const);
