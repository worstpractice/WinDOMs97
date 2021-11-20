import type { Alternative } from 'typings/Alternative';

export const alt = (name: string, action: () => void): Alternative => {
  return {
    action,
    name,
  } as const;
};
