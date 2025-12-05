import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      // 1. If a request starting with ‘/api/reddit’ is received...
      '/api/reddit': {
        // 2. Redirect this request to 'https://www.reddit.com'
        target: 'https://www.reddit.com',
        // 3. Change the origin to avoid CORS issues
        changeOrigin: true, 
        // 4. Remove the '/api/reddit' prefix from the forwarded URL
        rewrite: (path) => path.replace(/^\/api\/reddit/, ''),
      },
    },
  },
})
