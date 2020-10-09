import { ContextMenu } from "components/desktop/context-menu/ContextMenu";
import { ContextMenuItem } from "components/desktop/context-menu/ContextMenuItem";
import { NotificationArea } from "components/taskbar/notifications-area/NotificationArea";
import { NotificationItem } from "components/taskbar/notifications-area/NotificationItem";
import { RunningArea } from "components/taskbar/running-area/RunningArea";
import { RunningItem } from "components/taskbar/running-area/RunningItem";
import { QuickStart } from "components/taskbar/start-area/quick-start/QuickStart";
import { QuickStartItem } from "components/taskbar/start-area/quick-start/QuickStartItem";
import { StartMenu } from "components/taskbar/start-area/start-menu/StartMenu";
import { StartMenuItem } from "components/taskbar/start-area/start-menu/StartMenuItem";
import { StartArea } from "components/taskbar/start-area/StartArea";
import { StartButton } from "components/taskbar/start-area/StartButton";
import { Window } from "components/window/Window";
import { useMenu } from "hooks/useMenu";
import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import { Desktop } from "./desktop/Desktop";
import { Shortcut } from "./desktop/Shortcut";
import { Taskbar } from "./taskbar/Taskbar";

type Props = {};

export const OS: FC<Props> = () => {
  const { installedBinaries, runningProcesses } = useStore();
  const { openMenu, closeMenus, openContextMenu, toggleStartMenu } = useMenu();

  return (
    <>
      <Desktop onContextMenu={openContextMenu} onMouseDown={closeMenus}>
        {openMenu === "ContextMenu" && (
          <ContextMenu>
            {installedBinaries.map((binary) => {
              const { fileName, name } = binary;

              return <ContextMenuItem binary={binary} key={`${fileName}-${name}`} />;
            })}
          </ContextMenu>
        )}
        {!!installedBinaries.length &&
          installedBinaries.map((binary) => {
            const { fileName, name } = binary;

            return <Shortcut binary={binary} key={`${fileName}-${name}`} />;
          })}
      </Desktop>
      {runningProcesses.map((process) => {
        const { name, pid } = process;

        return <Window key={`${pid}-${name}`} onMouseDown={closeMenus} process={process} />;
      })}
      {openMenu === "StartMenu" && (
        <StartMenu openMenu={openMenu}>
          {installedBinaries.map((binary) => {
            const { fileName, name } = binary;

            return <StartMenuItem binary={binary} key={`${fileName}-${name}`} />;
          })}
        </StartMenu>
      )}
      <Taskbar>
        <StartArea>
          <StartButton isPressed={openMenu === "StartMenu"} onMouseDown={toggleStartMenu} />
          <QuickStart>
            {installedBinaries.map((binary) => {
              const { fileName, name } = binary;

              return <QuickStartItem binary={binary} onMouseDown={closeMenus} key={`${fileName}-${name}`} />;
            })}
          </QuickStart>
        </StartArea>
        <RunningArea>
          {runningProcesses.map((process) => {
            const { name, pid } = process;

            return <RunningItem key={`${pid}-${name}`} process={process} />;
          })}
        </RunningArea>
        <NotificationArea>
          {runningProcesses.map((process) => {
            const { name, pid } = process;

            return <NotificationItem process={process} key={`${pid}-${name}`} />;
          })}
        </NotificationArea>
      </Taskbar>
    </>
  );
};
