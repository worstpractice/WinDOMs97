import { useLastClickPosition } from "hooks/useLastClickPosition";
import { useKernel } from "kernel";
import * as React from "react";
import type { FC } from "typings/FC";
import { ContextMenu } from "views/desktop/context-menu/ContextMenu";
import { ContextMenuItem } from "views/desktop/context-menu/ContextMenuItem";
import { OsWindow } from "views/os-window/OsWindow";
import { NotificationArea } from "views/taskbar/notification-area/NotificationArea";
import { NotificationItem } from "views/taskbar/notification-area/NotificationItem";
import { RunningArea } from "views/taskbar/running-area/RunningArea";
import { RunningAreaItem } from "views/taskbar/running-area/RunningAreaItem";
import { QuickstartArea } from "views/taskbar/start-area/quickstart-area/QuickstartArea";
import { QuickstartAreaItem } from "views/taskbar/start-area/quickstart-area/QuickstartAreaItem";
import { StartMenu } from "views/taskbar/start-area/start-menu/StartMenu";
import { StartMenuItem } from "views/taskbar/start-area/start-menu/StartMenuItem";
import { StartArea } from "views/taskbar/start-area/StartArea";
import { StartButton } from "views/taskbar/start-area/StartButton";
import { Desktop } from "./desktop/Desktop";
import { DesktopItem } from "./desktop/DesktopItem";
import { Taskbar } from "./taskbar/Taskbar";

type Props = {};

export const OS: FC<Props> = () => {
  const { alternatives, floppyDiscs, installedPrograms, installProgram, openMenu, runningProcesses } = useKernel();
  useLastClickPosition();

  if (!installedPrograms.length) {
    for (const floppy of floppyDiscs) {
      installProgram(floppy);
    }
  }

  const isContextMenuOpen = openMenu === "ContextMenu";

  const isStartMenuOpen = openMenu === "StartMenu";

  return (
    <>
      <Desktop>
        {isContextMenuOpen && (
          <ContextMenu>
            {alternatives.map((alternative) => {
              const { name } = alternative;

              return <ContextMenuItem alternative={alternative} key={`ContextMenuItem-${name}`} />;
            })}
          </ContextMenu>
        )}
        {installedPrograms.map((binary) => {
          const { fileName, name } = binary;

          return <DesktopItem binary={binary} key={`DesktopItem-${fileName}-${name}`} />;
        })}
      </Desktop>
      {runningProcesses.map((process) => {
        const { name, pid } = process;

        return <OsWindow key={`OsWindow-${pid}-${name}`} process={process} />;
      })}
      {isStartMenuOpen && (
        <StartMenu>
          {installedPrograms.map((binary) => {
            const { fileName, name } = binary;

            return <StartMenuItem binary={binary} key={`StartMenuItem-${fileName}-${name}`} />;
          })}
        </StartMenu>
      )}
      <Taskbar>
        <StartArea>
          <StartButton />
          <QuickstartArea>
            {installedPrograms.map((binary) => {
              const { fileName, name } = binary;

              return <QuickstartAreaItem binary={binary} key={`QuickstartAreaItem-${fileName}-${name}`} />;
            })}
          </QuickstartArea>
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

            return <NotificationItem key={`NotificationAreaItem-${pid}-${name}`} process={process} />;
          })}
        </NotificationArea>
      </Taskbar>
    </>
  );
};
