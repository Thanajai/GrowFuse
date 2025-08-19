
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This is the bridge: it takes the API_KEY from the Vercel build environment
    // and makes it available in your browser code under process.env.API_KEY.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
});
