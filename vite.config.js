import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/PESTOUR/',
  build: {
    // Enable code splitting for lazy-loaded components
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks — split heavy dependencies into separate cacheable files
          'vendor-react': ['react', 'react-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/database'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': ['lucide-react', 'sweetalert2'],
        },
      },
    },
    // Increase chunk warning threshold (our components are large but acceptable)
    chunkSizeWarningLimit: 600,
    // Minify with esbuild (faster than terser, good enough compression)
    minify: 'esbuild',
    // Enable source maps for debugging (remove for prod if desired)
    sourcemap: false,
    // Target modern browsers for smaller output
    target: 'es2020',
  },
});
