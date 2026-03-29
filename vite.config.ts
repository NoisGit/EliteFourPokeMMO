import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pkm-guide-vite/', // GitHub Pages repository name
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
export default defineConfig({
  base: '/farmeof4/',
  // ... resto de tu config
})
