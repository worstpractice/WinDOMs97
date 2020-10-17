import { onLMB } from "event-filters/onLMB";
import type { MouseEventHandler } from "react";
import { useEffect } from "react";
import type { OsRef } from "typings/OsRef";
import { listen } from "utils/listen";

type Params<T extends HTMLElement> = {
  ref: OsRef<T>;
  msLatency: number;
  onSingleClick: MouseEventHandler<T>;
  onDoubleClick: MouseEventHandler<T>;
};

type UseOnDoubleClick = {
  <T extends HTMLElement>(params: Params<T>): void;
};

export const useOnDoubleClick: UseOnDoubleClick = ({ msLatency, onDoubleClick, onSingleClick, ref }) => {
  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    let clickCount = 0;

    const handleClick = onLMB<typeof current>((e) => {
      clickCount++;

      setTimeout(() => {
        if (clickCount === 1) onSingleClick(e);
        else if (clickCount === 2) onDoubleClick(e);

        clickCount = 0;
      }, msLatency);
    });

    const cleanup = listen({ on: current, event: "click", handler: handleClick, options: { capture: true } });

    return cleanup;
  }, [msLatency, onDoubleClick, onSingleClick, ref]);
};
