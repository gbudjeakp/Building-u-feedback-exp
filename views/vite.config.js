import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Building-u-feedback/',
  test: {
    globals: true,
    environment: "node"
  }

  ////Uncomment for local development only
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  // },
})