import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app/solver': resolve(__dirname, '../../packages/solver/src/index.ts'),
      '@app/state': resolve(__dirname, '../../packages/state/src/index.ts')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})