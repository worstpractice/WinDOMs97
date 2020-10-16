import { DragSelection } from "components/desktop/drag-selection/DragSelection";
import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useDomRef } from "hooks/useDomRef";
//import { useOnDragSelection } from "hooks/useOnDragSelection";
import { useKernel } from "kernel";
import type { ReactNode } from "react";
import * as React from "react";
import { MouseEventHandler, useState } from "react";
import type { FC } from "typings/FC";
import type { Position } from "typings/Position";
import styles from "./Desktop.module.css";

type Props = {
  closeMenus: () => void;
  onContextMenu: () => void;
  children: ReactNode;
};

export const Desktop: FC<Props> = ({ children, closeMenus, onContextMenu }) => {
  const { activate } = useKernel();
  const desktopRef = useDomRef<HTMLElement>();
  //const handleDragSelection = useOnDragSelection(desktopRef);
  const [isDragSelecting, setIsDragSelecting] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });

  // NOTE: this call is what allows the children calling `useActivateOnMount()` to function properly.
  useActivateOnMount(desktopRef);

  const handleContextMenu = onRMB<HTMLElement>(() => {
    onContextMenu();
  });

  const handleMouseDown = onLMB<HTMLElement>(() => {
    setIsDragSelecting(true);
    closeMenus();
    activate(desktopRef);
    //handleDragSelection(e);
  });

  const handleMouseMoveCapture: MouseEventHandler<HTMLElement> = ({ clientX, clientY }) => {
    setCurrentPosition({ x: clientX, y: clientY });
  };

  const handleMouseUp = onLMB<HTMLElement>(() => {
    setIsDragSelecting(false);
  });

  return (
    <main
      className={styles.Desktop}
      id="Desktop"
      onContextMenu={handleContextMenu}
      onDoubleClickCapture={console.log}
      onMouseDown={handleMouseDown}
      onMouseMoveCapture={handleMouseMoveCapture}
      onMouseUp={handleMouseUp}
      ref={desktopRef}
    >
      {children}
      {isDragSelecting && <DragSelection currentPosition={currentPosition} />}
    </main>
  );
};
