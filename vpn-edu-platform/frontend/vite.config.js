import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls from the Vite dev server to the Express backend.
      // This lets the frontend call `/vpn/...` without worrying about ports.
      '/vpn': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      },
    },
  },
})
