import type { Binary } from 'src/typings/Binary';

export const forIsOnStartMenu = ({ softlinks }: Binary) => {
  const { isOnStartMenu } = softlinks;

  return isOnStartMenu;
};
