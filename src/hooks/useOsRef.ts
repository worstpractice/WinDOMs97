import { useRef } from 'react';

export const useOsRef = <T extends NonNullable<HTMLElement>>(initialValue: T | null = null) => {
  return useRef<T | null>(initialValue);
};
