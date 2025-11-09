import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// get env variables
const ALLOWED_HOSTS = import.meta.env.VITE_ALLOWED_HOSTS;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [ALLOWED_HOSTS],
  },
});
