import logo from 'assets/icons/windows-0.png';
import { default as React, useRef } from 'react';
import { Icon } from 'src/components/Icon';
import { OsButton } from 'src/components/OsButton';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import type { ButtonHandler } from 'src/typings/ButtonHandler';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { switchOn } from 'src/utils/event-filters/switchOn';
import { from } from 'src/utils/state/from';
import { isRef } from 'src/utils/type-predicates/isRef';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('activeRef', 'setActiveRef', 'unsetActiveRef');
const fromMenu = from<MenuState>().select('openMenu', 'toggleStartMenu');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const StartButton = ({}: Props) => {
  const { activeRef, setActiveRef, unsetActiveRef } = useActiveState(fromActive);
  const { openMenu, toggleStartMenu } = useMenuState(fromMenu);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  const handleLmb: ButtonHandler = (event) => {
    // NOTE: Since the `Taskbar` under us runs `closeMenu` on mousedown, it's vital that we stop this event here -- or the Start menu cannot open.
    event.stopPropagation();

    // prettier-ignore
    isRef(activeRef, startButtonRef)
      ? unsetActiveRef()
      : setActiveRef(startButtonRef);

    toggleStartMenu();
  };

  const handleRmb: ButtonHandler = (event) => {
    // NOTE: This is here because we want `StartButton` to support `ContextMenu` clicks.
    event.stopPropagation();
    // TODO: Import `Alternative` and get cracking on context menu options!
  };

  return (
    <OsButton
      //
      // onMouseDown={switchOn({ lmb: handleLmb, rmb: handleRmb })}
      onMouseDown={switchOn({ lmb: handleLmb, rmb: handleRmb })}
      // depress={openMenu === 'StartMenu'}
      ref={startButtonRef}
      style={{
        ...styles.StartButton,
        outlineStyle: openMenu === 'StartMenu' ? 'outset' : 'inset',
      }}
    >
      <Icon alt={'Start'} height={38} src={logo} width={38} />
      <p style={styles.Title}>Start</p>
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
    ...INTERACTIVE,
  } as const),

  Title: css({
    fontSize: 28,
    paddingTop: 4,
  } as const),
} as const;
