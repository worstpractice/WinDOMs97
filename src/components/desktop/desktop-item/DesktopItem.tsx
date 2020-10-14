import { DesktopItemIcon } from "components/desktop/desktop-item/DesktopItemIcon";
import { DesktopItemTitle } from "components/desktop/desktop-item/DesktopItemTitle";
import { onLMB } from "event-filters/onLMB";
import { useDesktopLayoutOnMount } from "hooks/useDesktopLayoutOnMount";
import { useDomRef } from "hooks/useDomRef";
import { useOnDragAndDrop } from "hooks/useOnDragAndDrop";
import { useKernel } from "kernel";
import type { FC } from "react";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { Binary } from "typings/Binary";
import { blockNativeDrag } from "utils/blockNativeDrag";
import { css } from "utils/css";
import styles from "./DesktopItem.module.css";

type Props = {
  binary: Binary;
  closeMenus: () => void;
};

export const DesktopItem: FC<Props> = ({ binary, closeMenus }) => {
  const { activate, activeRef, executeBinary } = useKernel();
  const desktopitemRef = useDomRef<HTMLElement>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMoving, handleMove] = useOnDragAndDrop(desktopitemRef);

  // NOTE: to work properly, this call depends on the parent component (`Desktop`) calling `useActivateOnMount()` as well.
  useDesktopLayoutOnMount(desktopitemRef);

  const handleActive = onLMB<HTMLElement>((e) => {
    // NOTE: This makes desktopitem selection sticky, which we want.
    e.stopPropagation();
    closeMenus();
    activate(desktopitemRef);
    handleMove(e);
  });

  const handleLaunch = onLMB<HTMLElement>(() => {
    executeBinary(binary);
  });

  const style = isRef(activeRef, desktopitemRef) ? css(styles.DesktopItem, styles.Active) : styles.DesktopItem;

  return (
    <article
      className={style}
      // TODO: onDoubleClick not supported in Chrome? It works in firefox!
      onDoubleClick={handleLaunch}
      onDragStart={blockNativeDrag}
      onMouseDown={handleActive}
      ref={desktopitemRef}
    >
      <DesktopItemIcon binary={binary} />
      <DesktopItemTitle binary={binary} />
    </article>
  );
};
