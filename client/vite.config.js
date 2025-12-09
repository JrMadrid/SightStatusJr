import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()], // React Refresh
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // opcional, para usar imports tipo '@/components/...' 
    },
  },
  server: {
    port: 3000, // 5173 por defecto de 
    proxy: {
      '/': {
        target: 'http://localhost:88',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});