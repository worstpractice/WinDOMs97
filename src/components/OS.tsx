import { ContextMenu } from "components/desktop/context-menu/ContextMenu";
import { ContextMenuItem } from "components/desktop/context-menu/ContextMenuItem";
import { OsWindow } from "components/os-window/OsWindow";
import { NotificationArea } from "components/taskbar/notification-area/NotificationArea";
import { NotificationAreaItem } from "components/taskbar/notification-area/NotificationAreaItem";
import { RunningArea } from "components/taskbar/running-area/RunningArea";
import { RunningAreaItem } from "components/taskbar/running-area/RunningAreaItem";
import { QuickStart } from "components/taskbar/start-area/quick-start/QuickStart";
import { QuickStartItem } from "components/taskbar/start-area/quick-start/QuickStartItem";
import { StartMenu } from "components/taskbar/start-area/start-menu/StartMenu";
import { StartMenuItem } from "components/taskbar/start-area/start-menu/StartMenuItem";
import { StartArea } from "components/taskbar/start-area/StartArea";
import { StartButton } from "components/taskbar/start-area/StartButton";
import { useLastClickPosition } from "hooks/useLastClickPosition";
import { useOnContextMenu } from "hooks/useOnContextMenu";
import { useKernel } from "kernel";
import * as React from "react";
import { useMemo } from "react";
import type { FC } from "typings/FC";
import { Desktop } from "./desktop/Desktop";
import { DesktopItem } from "./desktop/desktop-item/DesktopItem";
import { Taskbar } from "./taskbar/Taskbar";

type Props = {};

export const OS: FC<Props> = () => {
  const { floppyDiscs, installedPrograms, installProgram, openMenu, runningProcesses } = useKernel();
  useOnContextMenu();
  useLastClickPosition();

  if (!installedPrograms.length) {
    for (const floppy of floppyDiscs) {
      installProgram(floppy);
    }
  }

  const isContextMenuOpen = openMenu === "ContextMenu";

  const isStartMenuOpen = openMenu === "StartMenu";

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const memoizedContextMenuItems = useMemo(() => {
    return installedPrograms.map((binary) => {
      const { fileName, name } = binary;

      return <ContextMenuItem binary={binary} key={`ContextMenuItem-${fileName}-${name}`} />;
    });
  }, [installedPrograms]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const memoizedDesktopItems = useMemo(() => {
    return installedPrograms.map((binary) => {
      const { fileName, name } = binary;

      return <DesktopItem binary={binary} key={`DesktopItem-${fileName}-${name}`} />;
    });
  }, [installedPrograms]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const memoizedStartMenuItems = useMemo(() => {
    return installedPrograms.map((binary) => {
      const { fileName, name } = binary;

      return <StartMenuItem binary={binary} key={`StartMenuItem-${fileName}-${name}`} />;
    });
  }, [installedPrograms]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const memoizedQuickStartItems = useMemo(() => {
    return installedPrograms.map((binary) => {
      const { fileName, name } = binary;

      return <QuickStartItem binary={binary} key={`QuickStartItem-${fileName}-${name}`} />;
    });
  }, [installedPrograms]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Desktop>
        {isContextMenuOpen && <ContextMenu>{memoizedContextMenuItems}</ContextMenu>}
        {memoizedDesktopItems}
      </Desktop>
      {runningProcesses.map((process) => {
        const { name, pid } = process;

        return <OsWindow key={`OsWindow-${pid}-${name}`} process={process} />;
      })}
      {isStartMenuOpen && <StartMenu>{memoizedStartMenuItems}</StartMenu>}
      <Taskbar>
        <StartArea>
          <StartButton />
          <QuickStart>{memoizedQuickStartItems}</QuickStart>
        </StartArea>
        <RunningArea>
          {runningProcesses.map((process) => {
            const { name, pid } = process;

            return <RunningAreaItem key={`RunningAreaItem-${pid}-${name}`} process={process} />;
          })}
        </RunningArea>
        <NotificationArea>
          {runningProcesses.map((process) => {
            const { name, pid } = process;

            return <NotificationAreaItem key={`NotificationAreaItem-${pid}-${name}`} process={process} />;
          })}
        </NotificationArea>
      </Taskbar>
    </>
  );
};
