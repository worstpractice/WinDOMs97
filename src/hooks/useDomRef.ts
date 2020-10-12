import { useRef } from "react";

export const useDomRef = <T extends NonNullable<unknown>>(initialValue: T | null = null) => {
  return useRef<T | null>(initialValue);
};
