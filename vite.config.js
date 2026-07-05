import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/',
  // Only strip console/debugger in production, keep for dev debugging
  esbuild: mode === 'production' ? {
    drop: ['console', 'debugger'],
    legalComments: 'none',
  } : {},
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
    // Increase chunk warning threshold
    chunkSizeWarningLimit: 600,
    // Use esbuild for fast minification (already bundled with Vite)
    minify: 'esbuild',
    // Disable source maps for production
    sourcemap: false,
    // Target modern browsers for smaller output
    target: 'es2020',
    // CSS minification
    cssMinify: true,
    // Inline small assets as base64 (under 4KB)
    assetsInlineLimit: 4096,
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
}));
