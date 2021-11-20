import type { Binary } from 'typings/Binary';

export const forIsOnDesktop = ({ softlinks }: Binary) => {
  const { isOnDesktop } = softlinks;

  return isOnDesktop;
};
