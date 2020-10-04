import plug from "assets/icons/ac_plug-0.png";
import cdRomDrive from "assets/icons/cd_drive-0.png";
import folder from "assets/icons/directory_closed_cool-0.png";
import mine from "assets/icons/game_mine_1-0.png";
import paint from "assets/icons/paint_file-5.png";
import { ContextMenu } from "components/desktop/context-menu/ContextMenu";
import { ContextMenuItem } from "components/desktop/context-menu/ContextMenuItem";
import { NotificationArea } from "components/taskbar/notifications-area/NotificationArea";
import { RunningArea } from "components/taskbar/running-area/RunningArea";
import { RunningItem } from "components/taskbar/running-area/RunningItem";
import { QuickStart } from "components/taskbar/start-area/quick-start/QuickStart";
import { QuickStartItem } from "components/taskbar/start-area/quick-start/QuickStartItem";
import { StartMenu } from "components/taskbar/start-area/start-menu/StartMenu";
import { StartMenuItem } from "components/taskbar/start-area/start-menu/StartMenuItem";
import { StartArea } from "components/taskbar/start-area/StartArea";
import { StartButton } from "components/taskbar/start-area/StartButton";
import { programs } from "data/programs";
import type { FC, MouseEventHandler } from "react";
import React, { useState } from "react";
import { Desktop } from "./desktop/Desktop";
import { Shortcut } from "./desktop/Shortcut";
import { Taskbar } from "./taskbar/Taskbar";

type Props = {};

export const App: FC<Props> = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const openContextMenu: MouseEventHandler = (e) => {
    console.log("Opened context menu");
    console.log(e);
    const { clientX, clientY } = e;
    setCoordinates({ x: clientX, y: clientY });
    setIsContextMenuOpen(true);
  };

  const closeContextMenu = () => {
    console.log("Closed context menu");
    setIsContextMenuOpen(false);
  };

  const closeStartMenu = () => {
    setIsStartMenuOpen(false);
  };

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  return (
    <>
      <Desktop onContextMenu={openContextMenu} onMouseDown={closeContextMenu} onMouseDownOutside={closeContextMenu}>
        {isContextMenuOpen && (
          <ContextMenu coordinates={coordinates} onMouseDownOutside={closeContextMenu}>
            <ContextMenuItem>New folder...</ContextMenuItem>
            <ContextMenuItem>New file</ContextMenuItem>
            <ContextMenuItem>Command Prompt</ContextMenuItem>
          </ContextMenu>
        )}
        {programs.map(({ icon, name }) => {
          return <Shortcut icon={icon} key={name} name={name} />;
        })}
      </Desktop>
      {isStartMenuOpen && (
        <StartMenu onMouseDownOutside={closeStartMenu}>
          <StartMenuItem>
            <img alt="CD-ROM" src={cdRomDrive} />
            CD-ROM
          </StartMenuItem>
          <StartMenuItem>
            <img alt="Folder" src={folder} />
            Junk Drawer
          </StartMenuItem>
          <StartMenuItem>
            <img alt="Paint" src={paint} />
            Paint
          </StartMenuItem>
        </StartMenu>
      )}
      <Taskbar>
        <StartArea>
          <StartButton isDepressed={isStartMenuOpen} onMouseDown={toggleStartMenu} />
          <QuickStart>
            <QuickStartItem>
              <img alt="Plug" src={plug} />
            </QuickStartItem>
            <QuickStartItem>
              <img alt="Mine" src={mine} />
            </QuickStartItem>
          </QuickStart>
        </StartArea>
        <RunningArea>
          <RunningItem>Hello</RunningItem>
        </RunningArea>
        <NotificationArea>
          <img alt="Plug" src={plug} style={{ objectFit: "contain", width: "24px" }} />
          <img alt="Mine" src={mine} style={{ objectFit: "contain", width: "24px" }} />
        </NotificationArea>
      </Taskbar>
    </>
  );
};
