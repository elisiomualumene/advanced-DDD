import path from 'path';
import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  rootDir: path.resolve(__dirname, 'src'),
  setupFilesAfterEnv: [
    path.resolve(__dirname, './src/shared/infra/testing/except-helpers.ts')
  ],
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
};

export default config;
