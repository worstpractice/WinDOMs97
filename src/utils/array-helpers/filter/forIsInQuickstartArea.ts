import type { Binary } from 'src/typings/Binary';

export const forIsInQuickstartArea = ({ softlinks }: Binary) => {
  const { isInQuickstartArea } = softlinks;

  return isInQuickstartArea;
};
