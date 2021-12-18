import type { Alternative } from 'src/typings/Alternative';

// prettier-ignore
export const alt = <T extends string>(name: T, action: () => void): Alternative => ({
  action,
  name,
} as const);
