import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ////Uncomment for local development only
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  // },

  resolve:{
    "@": path.resolve(__dirname, "./src"),
  }
})
