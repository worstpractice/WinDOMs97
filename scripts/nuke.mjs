import { dirname } from 'path';
import { fileURLToPath } from 'url';

const getProjectRoot = () => {
  // @ts-ignore
  return globalThis.__dirname || dirname(fileURLToPath(import.meta.url));
};

const nuke = async () => {
  await rm(`${getProjectRoot()}/node_modules/.cache/snowpack`, { recursive: true });
};

const noOp = () => {};

void nuke().catch(noOp);
