import { useRef } from "react";

export const useMutableRef = (initialValue = null) => {
  return useRef<HTMLDivElement | null>(initialValue);
};
