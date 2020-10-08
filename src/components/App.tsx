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
import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import { Desktop } from "./desktop/Desktop";
import { Shortcut } from "./desktop/Shortcut";
import { Taskbar } from "./taskbar/Taskbar";

type Props = {};

export const App: FC<Props> = () => {
  const { activeWidget, installedBinaries, runningProcesses } = useStore();

  return (
    <>
      <Desktop>
        {activeWidget === "ContextMenu" && (
          <ContextMenu>
            {!!installedBinaries.length &&
              installedBinaries.map((binary) => {
                const { name } = binary;

                return <ContextMenuItem binary={binary} key={name} />;
              })}
          </ContextMenu>
        )}
        {!!installedBinaries.length &&
          installedBinaries.map((binary) => {
            const { name } = binary;

            return <Shortcut binary={binary} key={name} />;
          })}
      </Desktop>
      {!!runningProcesses.length &&
        installedBinaries.map((binary) => {
          const { name } = binary;

          return <Window key={name} process={{ ...binary, pid: runningProcesses.length }} />;
        })}
      {activeWidget === "StartMenu" && (
        <StartMenu>
          {!!installedBinaries.length &&
            installedBinaries.map((binary) => {
              const { name } = binary;

              return <StartMenuItem binary={binary} key={name} />;
            })}
        </StartMenu>
      )}
      <Taskbar>
        <StartArea>
          <StartButton />
          <QuickStart>
            {!!installedBinaries.length &&
              installedBinaries.map((binary) => {
                const { name } = binary;

                return <QuickStartItem binary={binary} key={name} />;
              })}
          </QuickStart>
        </StartArea>
        <RunningArea>
          {!!runningProcesses.length &&
            installedBinaries.map((binary) => {
              const { name } = binary;

              return <RunningItem key={name} process={{ ...binary, pid: runningProcesses.length }} />;
            })}
        </RunningArea>
        <NotificationArea>
          {!!runningProcesses.length &&
            installedBinaries.map((binary) => {
              const { name } = binary;

              return <NotificationItem key={name} binary={binary} />;
            })}
        </NotificationArea>
      </Taskbar>
    </>
  );
};
