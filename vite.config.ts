import { defineConfig, UserConfigExport, } from 'vitest/config'
import { splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    tsconfigPaths(),
    process.env.NODE_ENV !== 'test' && checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
      terminal: true,
      overlay: false,
    }),
  ],

  build: {
    sourcemap: false,
    rollupOptions: {
      plugins: [splitVendorChunkPlugin() as any],
    },
  },

  test: {
    globals: true,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, 'src/testSetup')],
  },
} as UserConfigExport)
