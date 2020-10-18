import { DragSelection } from "components/desktop/drag-selection/DragSelection";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useDragSelection } from "hooks/useOnDragSelection";
import { useOsRef } from "hooks/useOsRef";
import type { ReactNode } from "react";
import * as React from "react";
import type { FC } from "typings/FC";
import styles from "./Desktop.module.css";

type Props = {
  children: ReactNode;
};

export const Desktop: FC<Props> = ({ children }) => {
  const desktopRef = useOsRef<HTMLElement>();
  const [isDragSelecting, currentPosition] = useDragSelection(desktopRef);

  // NOTE: this call is what allows the children calling `useActivateOnMount()` to function properly.
  useActivateOnMount(desktopRef);

  return (
    <main className={styles.Desktop} ref={desktopRef}>
      {children}
      {isDragSelecting && <DragSelection currentPosition={currentPosition} />}
    </main>
  );
};
