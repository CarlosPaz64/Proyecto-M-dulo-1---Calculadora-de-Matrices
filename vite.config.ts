import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',  // Archivos de configuración inicial para las pruebas
    coverage: {
      provider: 'istanbul', // Otras opciones son 'c8'
    },
  },
});
