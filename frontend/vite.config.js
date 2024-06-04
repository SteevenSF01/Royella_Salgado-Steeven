import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: '	http://127.0.0.1:8000', 
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
