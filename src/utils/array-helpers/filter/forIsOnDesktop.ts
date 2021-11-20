import type { Binary } from 'src/typings/Binary';

export const forIsOnDesktop = ({ softlinks }: Binary) => {
  const { isOnDesktop } = softlinks;

  return isOnDesktop;
};
