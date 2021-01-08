import type { Binary } from "typings/Binary";

export const forIsInQuickstartArea = ({ softlinks }: Binary) => {
  const { isInQuickstartArea } = softlinks;

  return isInQuickstartArea;
};
