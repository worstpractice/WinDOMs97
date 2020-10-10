import styles from "styles/animations.module.css";
import type { Process } from "typings/Process";

export const minimize = ({ runningItemRef, windowRef }: Process) => {
  const runningItem = runningItemRef.current;
  const osWindow = windowRef.current;

  if (!runningItem) return;
  if (!osWindow) return;

  const reEmbiggenBackAgain = () => {
    osWindow.classList.toggle(styles.Minimized);
  };

  osWindow.classList.toggle(styles.Minimized);

  runningItem.addEventListener("mousedown", reEmbiggenBackAgain, { once: true });
};
