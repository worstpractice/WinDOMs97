import { programs } from "data";
import { Explorer } from "features/Explorer";
import { useLastClickPosition } from "hooks/useLastClickPosition";
import { useLastKeyPress } from "hooks/useLastKeyPress";
import { default as React } from "react";
import { useKernelState } from "state/useKernelState";
import type { FC } from "typings/FC";
import type { KernelState } from "typings/state/KernelState";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = ({ installedPrograms, installProgram }: KernelState) => ({
  installedPrograms,
  installProgram,
});

type Props = {};

export const Boot: FC<Props> = () => {
  const { installedPrograms, installProgram } = useKernelState(fromKernel);
  useLastClickPosition();
  useLastKeyPress();

  if (!installedPrograms.length) {
    for (const each of programs) {
      installProgram(each);
    }
  }

  return <Explorer />;
};
