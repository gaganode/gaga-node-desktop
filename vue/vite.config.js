import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: resolve(__dirname),
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    manifest: true,
    outDir: 'dist'
  }
})

