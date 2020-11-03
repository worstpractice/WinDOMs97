import { ContextMenuItems } from "collections/ContextMenuItems";
import { DesktopItems } from "collections/DesktopIcons";
import { NotificationAreaItems } from "collections/NotificationAreaItems";
import { OsWindows } from "collections/OsWindows";
import { QuickstartAreaItems } from "collections/QuickstartAreaItems";
import { RunningAreaItems } from "collections/RunningAreaItems";
import { StartMenuItems } from "collections/StartMenuItems";
import { Bsod } from "features/Bsod";
import { ContextMenu } from "features/context-menu/ContextMenu";
import { Desktop } from "features/desktop/Desktop";
import { NotificationArea } from "features/taskbar/notification-area/NotificationArea";
import { RunningArea } from "features/taskbar/running-area/RunningArea";
import { QuickstartArea } from "features/taskbar/start-area/quickstart-area/QuickstartArea";
import { StartMenu } from "features/taskbar/start-area/start-menu/StartMenu";
import { StartArea } from "features/taskbar/start-area/StartArea";
import { StartButton } from "features/taskbar/start-area/StartButton";
import { Taskbar } from "features/taskbar/Taskbar";
import { default as React } from "react";
import { useErrorState } from "state/useErrorState";
import { useMenuState } from "state/useMenuState";
import type { FC } from "typings/FC";
import type { ErrorState } from "typings/state/ErrorState";
import type { MenuState } from "typings/state/MenuState";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromError = ({ isBsod }: ErrorState) => ({
  isBsod,
});

const fromMenu = ({ openMenu }: MenuState) => ({
  openMenu,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const Explorer: FC<Props> = () => {
  const { isBsod } = useErrorState(fromError);
  const { openMenu } = useMenuState(fromMenu);

  if (isBsod) {
    return <Bsod />;
  }

  const isContextMenuOpen = openMenu === "ContextMenu";

  const isStartMenuOpen = openMenu === "StartMenu";

  return (
    <>
      {/******************************/}
      <Desktop>
        {isContextMenuOpen ? (
          <ContextMenu>
            <ContextMenuItems />
          </ContextMenu>
        ) : null}
        <DesktopItems />
      </Desktop>
      {/******************************/}
      <OsWindows />
      {/******************************/}
      {isStartMenuOpen ? (
        <StartMenu>
          <StartMenuItems />
        </StartMenu>
      ) : null}
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
