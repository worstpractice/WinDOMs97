import { DragSelection } from "components/desktop/drag-selection/DragSelection";
import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import type { ReactNode } from "react";
import * as React from "react";
import { MouseEventHandler, useState } from "react";
import { is } from "type-predicates/is";
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
  const desktopRef = useOsRef<HTMLElement>();
  const [isDragSelecting, setIsDragSelecting] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });

  // NOTE: this call is what allows the children calling `useActivateOnMount()` to function properly.
  useActivateOnMount(desktopRef);

  const handleContextMenu = onRMB<HTMLElement>(() => {
    onContextMenu();
  });

  const handleMouseDown = onLMB<HTMLElement>(({ target }) => {
    const { current } = desktopRef;

    // We're only interested in clicks on the actual desktop itself
    if (!is(current, target)) return;

    setIsDragSelecting(true);
    closeMenus();
    activate(desktopRef);
  });

  const handleMouseMove: MouseEventHandler<HTMLElement> = ({ clientX, clientY }) => {
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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={desktopRef}
    >
      {children}
      {isDragSelecting && <DragSelection currentPosition={currentPosition} />}
    </main>
  );
};
