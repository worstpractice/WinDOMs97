import { useKernel } from "kernel";
import type { Alternative } from "typings/Alternative";
import type { Binary } from "typings/Binary";
import { alt } from "utils/alt";

export const useBinaryAlternatives = (binary: Binary) => {
  const { executeBinary } = useKernel();

  const alternatives: readonly Alternative[] = [
    alt("Run", () => {
      executeBinary(binary);
    }),
  ] as const;

  return alternatives;
};
