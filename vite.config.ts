import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      // 1. Eğer '/api/reddit' ile başlayan bir istek gelirse...
      '/api/reddit': {
        // 2. Bu isteği 'https://www.reddit.com' adresine yönlendir
        target: 'https://www.reddit.com',
        // 3. CORS hatasını çözmek için kaynak (origin) bilgisini değiştir
        changeOrigin: true, 
        // 4. İletilen URL'den '/api/reddit' ön ekini kaldır
        rewrite: (path) => path.replace(/^\/api\/reddit/, ''),
      },
    },
  },
})
