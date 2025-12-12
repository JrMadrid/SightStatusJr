import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()], // React Refresh
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@css': path.resolve(__dirname, './src/components/css'),
      '@elementos': path.resolve(__dirname, './src/components/Elementos'),
      '@informativas': path.resolve(__dirname, './src/components/Informativas'),
      '@pantallas': path.resolve(__dirname, './src/components/Informativas/screens'),
      '@listas': path.resolve(__dirname, './src/components/Listas'),
      '@paneles': path.resolve(__dirname, './src/components/Paneles'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@imgs': path.resolve(__dirname, './src/imgs'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@cssp': path.resolve(__dirname, './src/pages/css'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 3000, // 5173 por defecto de Vite
    proxy: {
      '/api': {
        target: 'http://localhost:88',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});