export const panic = <T>(error: T): never => {
  throw error;
};
