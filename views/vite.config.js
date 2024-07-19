import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development or production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: '/Building-u-feedback/',
    define: {
      'process.env.VITE_API_ENDPOINT_PROD': JSON.stringify(env.VITE_API_ENDPOINT_PROD),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    // server: {
    //   watch: {
    //     usePolling: true,
    //   },
    // },
  };
});
