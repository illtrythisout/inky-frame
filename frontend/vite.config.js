/* eslint-env node */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: true,
      allowedHosts: [env.VITE_ALLOWED_HOSTS],
    },
    preview: {
      host: true,
      allowedHosts: [env.VITE_ALLOWED_HOSTS],
    },
  };
});
