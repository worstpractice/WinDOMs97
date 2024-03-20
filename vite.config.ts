import { resolve } from 'node:path/posix';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';

export default defineConfig(async (): Promise<UserConfig> => {
  return {
    resolve: {
      alias: {
        src: resolve('src/'),
        assets: resolve('assets/'),
      },
    },
  } as const;
});
