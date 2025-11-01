import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
  },
  base: '/miarmacraft/',
  resolve: {
    alias: {
      '@/': '/src/',
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // para no ver el warning
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          axios: ['axios'],
        }
      }
    }
  }
})