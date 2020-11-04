import type { Binary } from "typings/Binary";

export const forIsOnStartMenu = ({ softlinks }: Binary) => {
  const { isOnStartMenu } = softlinks;
  
  return isOnStartMenu;
};