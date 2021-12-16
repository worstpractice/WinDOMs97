import { default as React } from 'react';
import { ContextMenuItems } from 'src/collections/ContextMenuItems';
import { DesktopItems } from 'src/collections/DesktopIcons';
import { NotificationAreaItems } from 'src/collections/NotificationAreaItems';
import { OsWindows } from 'src/collections/OsWindows';
import { QuickstartAreaItems } from 'src/collections/QuickstartAreaItems';
import { RunningAreaItems } from 'src/collections/RunningAreaItems';
import { StartMenuItems } from 'src/collections/StartMenuItems';
import { ContextMenu } from 'src/features/context-menu/ContextMenu';
import { Desktop } from 'src/features/desktop/Desktop';
import { NotificationArea } from 'src/features/taskbar/notification-area/NotificationArea';
import { RunningArea } from 'src/features/taskbar/running-area/RunningArea';
import { QuickstartArea } from 'src/features/taskbar/start-area/quickstart-area/QuickstartArea';
import { StartMenu } from 'src/features/taskbar/start-area/start-menu/StartMenu';
import { StartArea } from 'src/features/taskbar/start-area/StartArea';
import { StartButton } from 'src/features/taskbar/start-area/StartButton';
import { Taskbar } from 'src/features/taskbar/Taskbar';
import { useMenuState } from 'src/state/useMenuState';
import type { MenuState } from 'src/typings/state/MenuState';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromMenu = from<MenuState>().select('openMenu');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const Explorer = ({}: Props) => {
  const { openMenu } = useMenuState(fromMenu);

  const isContextMenuOpen = openMenu === 'ContextMenu';

  const isStartMenuOpen = openMenu === 'StartMenu';

  return (
    <>
      {/******************************/}
      <Desktop>
        {isContextMenuOpen && (
          <ContextMenu>
            <ContextMenuItems />
          </ContextMenu>
        )}
        <DesktopItems />
      </Desktop>
      {/******************************/}
      <OsWindows />
      {/******************************/}
      {isStartMenuOpen && (
        <StartMenu>
          <StartMenuItems />
        </StartMenu>
      )}
      {/******************************/}
      <Taskbar>
        <StartArea>
          <StartButton />
          <QuickstartArea>
            <QuickstartAreaItems />
          </QuickstartArea>
        </StartArea>
        <RunningArea>
          <RunningAreaItems />
        </RunningArea>
        <NotificationArea>
          <NotificationAreaItems />
        </NotificationArea>
      </Taskbar>
      {/******************************/}
    </>
  );
};
