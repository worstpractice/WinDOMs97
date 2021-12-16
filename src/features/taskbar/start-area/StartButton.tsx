import logo from 'assets/icons/windows-0.png';
import { default as React, useRef } from 'react';
import { Icon } from 'src/components/Icon';
import { OsButton } from 'src/components/OsButton';
import { Title } from 'src/components/Title';
import { switchOn } from 'src/event-filters/switchOn';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import { usePressState } from 'src/state/usePressState';
import { isRef } from 'src/type-predicates/isRef';
import type { ButtonHandler } from 'src/typings/ButtonHandler';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import type { PressState } from 'src/typings/state/PressState';
import { css } from 'src/utils/as/css';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('activeRef', 'setActiveRef', 'unsetActiveRef');
const fromMenu = from<MenuState>().select('openMenu', 'toggleStartMenu');
const fromPress = from<PressState>().select('isLmbPressed');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const StartButton = ({}: Props) => {
  const { activeRef, setActiveRef, unsetActiveRef } = useActiveState(fromActive);
  const { openMenu, toggleStartMenu } = useMenuState(fromMenu);
  const { isLmbPressed } = usePressState(fromPress);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  const handleLMB: ButtonHandler = (e) => {
    // NOTE: Since the Taskbar under us runs `closeMenu` on mousedown, it's vital that we stop this event here -- or the Start menu cannot open.
    e.stopPropagation();

    // prettier-ignore
    isRef(activeRef, startButtonRef)
      ? unsetActiveRef()
      : setActiveRef(startButtonRef);

    toggleStartMenu();
  };

  const handleRMB: ButtonHandler = (e) => {
    // NOTE: This is here because we want `StartButton` to support `ContextMenu` clicks.
    e.stopPropagation();
    // TODO: Import `Alternative` and get cracking on context menu options!
  };

  return (
    <OsButton style={styles.StartButton} onMouseDown={switchOn({ LMB: handleLMB, RMB: handleRMB })} pressed={openMenu === 'StartMenu'} ref={startButtonRef}>
      <Icon alt={'Start'} height={38} src={logo} width={38} />
      <Title of={'Start'} style={{ fontSize: 28, paddingTop: 4 }} />
    </OsButton>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  StartButton: css({
    alignContent: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: '2px',
    height: '100%',
    justifyContent: 'center',
    width: '100px',
  } as const),
} as const;
