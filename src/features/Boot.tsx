import { programs } from "data";
import { Bsod } from "features/BSOD";
import { Explorer } from "features/Explorer";
import { useLastClickPosition } from "hooks/useLastClickPosition";
import { useLastKeyPress } from "hooks/useLastKeyPress";
import { useErrorState } from "state/useErrorState";
import { useKernelState } from "state/useKernelState";
import type { FC } from "typings/FC";
import type { ErrorState } from "typings/state/ErrorState";
import type { KernelState } from "typings/state/KernelState";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromError = ({ isBsod }: ErrorState) => ({
  isBsod,
});

const fromKernel = ({ installedPrograms, installProgram }: KernelState) => ({
  installedPrograms,
  installProgram,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const Boot: FC<Props> = () => {
  const { isBsod } = useErrorState(fromError);
  const { installedPrograms, installProgram } = useKernelState(fromKernel);
  useLastClickPosition();
  useLastKeyPress();

  if (!installedPrograms.length) {
    for (const each of programs) {
      installProgram(each);
    }
  }

  return isBsod ? <Bsod /> : <Explorer />;
};
