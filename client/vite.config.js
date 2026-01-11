import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()], // React Refresh
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@css': path.resolve(__dirname, './src/components/css'),
      '@elementos': path.resolve(__dirname, './src/components/Elementos'),
      '@paneles': path.resolve(__dirname, './src/components/Paneles'),
      '@listas': path.resolve(__dirname, './src/components/Listas'),
      '@informativas': path.resolve(__dirname, './src/components/Informativas'),
      '@pantallas': path.resolve(__dirname, './src/components/Informativas/screens'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@cssp': path.resolve(__dirname, './src/pages/css'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@context': path.resolve(__dirname, './src/context'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@imgs': path.resolve(__dirname, './src/imgs'),
    },
  },
  server: {
    port: 3000, 
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:88',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['react-hot-toast', 'react-icons'],
        },
      },
    },
  },
});