import { useEffect, useRef } from "react";
import type { AnyProps } from "typings/AnyProps";

type Diff = {
  from: unknown;
  to: unknown;
};

type ChangeTracker = Record<keyof AnyProps, Diff>;

export const useWhyDidYouUpdate = <P extends AnyProps>(name: string, currentProps: P) => {
  const previousPropsRef = useRef(currentProps);

  useEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      const { current: previousProps } = previousPropsRef;

      if (!previousProps) return;

      const allKeys = Object.keys({ ...previousProps, ...currentProps });

      const changeTracker: ChangeTracker = Object.create(null);

      for (const key of allKeys) {
        // NOTE: Equivalency is not identity.
        if (previousProps[key] !== currentProps[key]) {
          const diff: Diff = Object.create(null);

          diff.from = previousProps[key];
          diff.to = currentProps[key];

          changeTracker[key] = diff;
        }
      }

      const changes = Object.keys(changeTracker).length;

      if (changes) {
        console.groupCollapsed(`${name} updated`);
        console.debug("Props:", changeTracker);
        console.groupEnd();
      }

      // NOTE: Last but not least.
      previousPropsRef.current = currentProps;
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
    // NOTE: No dependency array since we want this to always run.
  });
};
