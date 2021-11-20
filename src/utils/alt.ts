import type { Alternative } from 'src/typings/Alternative';

export const alt = (name: string, action: () => void): Alternative => {
  return {
    action,
    name,
  } as const;
};
