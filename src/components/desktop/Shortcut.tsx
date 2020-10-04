import type { DragEventHandler, FC, MouseEventHandler } from "react";
import React, { useRef, useState } from "react";
import styles from "./Shortcut.module.css";

type Props = {
  icon: string;
  name: string;
};

const LMB = 0 as const;
// MMB = 1
// RMB = 2

export const Shortcut: FC<Props> = ({ icon, name }) => {
  const shortcutRef = useRef<HTMLDivElement | null>(null);
  // Determines if transparent
  const [isHeld, setIsHeld] = useState<boolean>(false);

  const handleMouseDown: MouseEventHandler = ({ button, clientX, clientY }) => {
    if (button !== LMB) return;

    const shortcut = shortcutRef.current;

    if (!shortcut) return;

    let shiftX = clientX - shortcut.getBoundingClientRect().left;
    let shiftY = clientY - shortcut.getBoundingClientRect().top;

    /** `Document`-level event listener. */
    const onMouseMove = ({ button, pageX, pageY }: { button: number; pageX: number; pageY: number }) => {
      if (button !== LMB) return;

      shortcut.style.left = `${pageX - shiftX}px`;
      shortcut.style.top = `${pageY - shiftY}px`;
    };

    /** `Document`-level event listener. */
    const onMouseUp = ({ button }: { button: number }) => {
      if (button !== LMB) return;

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setIsHeld(false);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    setIsHeld(true);
  };

  const handleDragStart: DragEventHandler = (e) => {
    e.preventDefault();
    return false;
  };

  const style = isHeld ? `${styles.Shortcut} ${styles.Transparent}` : styles.Shortcut;

  return (
    <span className={style} onDragStart={handleDragStart} onMouseDown={handleMouseDown} ref={shortcutRef}>
      <img alt={name} className={styles.Icon} src={icon} />
      <span className={styles.Name}>{name}</span>
    </span>
  );
};
