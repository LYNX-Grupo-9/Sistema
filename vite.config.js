import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Quando a aplicação for servida em um subdiretório (/sistema),
  // defina o base para o mesmo caminho para que os assets gerados
  // e referências no `index.html` apontem para /sistema/
  base: '/sistema/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  server: {
    port: 5173,
    strictPort: false,
  },
  preview: {
    port: 4173,
  }
})
