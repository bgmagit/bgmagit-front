import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  // 현재 실행 모드 (development, production)에 맞는 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      cors: true,
      proxy: {
        "/bgm-agit": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      }
    },
    plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(
        env.VITE_API_URL
      )
    }
  };
});
