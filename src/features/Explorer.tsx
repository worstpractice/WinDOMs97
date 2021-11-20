import { ContextMenuItems } from 'collections/ContextMenuItems';
import { DesktopItems } from 'collections/DesktopIcons';
import { NotificationAreaItems } from 'collections/NotificationAreaItems';
import { OsWindows } from 'collections/OsWindows';
import { QuickstartAreaItems } from 'collections/QuickstartAreaItems';
import { RunningAreaItems } from 'collections/RunningAreaItems';
import { StartMenuItems } from 'collections/StartMenuItems';
import { ContextMenu } from 'features/context-menu/ContextMenu';
import { Desktop } from 'features/desktop/Desktop';
import { NotificationArea } from 'features/taskbar/notification-area/NotificationArea';
import { RunningArea } from 'features/taskbar/running-area/RunningArea';
import { QuickstartArea } from 'features/taskbar/start-area/quickstart-area/QuickstartArea';
import { StartMenu } from 'features/taskbar/start-area/start-menu/StartMenu';
import { StartArea } from 'features/taskbar/start-area/StartArea';
import { StartButton } from 'features/taskbar/start-area/StartButton';
import { Taskbar } from 'features/taskbar/Taskbar';
import { useMenuState } from 'state/useMenuState';
import type { FC } from 'typings/FC';
import type { MenuState } from 'typings/state/MenuState';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromMenu = ({ openMenu }: MenuState) => {
  return {
    openMenu,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const Explorer: FC<Props> = () => {
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
