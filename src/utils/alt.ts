import type { Alternative } from "typings/Alternative";

export const alt = (label: string, action: () => void): Alternative => {
  return { label, action } as const;
};
