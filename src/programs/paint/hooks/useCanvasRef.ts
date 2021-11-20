import { useRef } from 'react';

// prettier-ignore
export const useCanvasRef = <T extends NonNullable<CanvasRenderingContext2D>>(initialValue: T | null = null) => {
  return useRef<T | null>(initialValue);
};
