import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import htmlPlugin from 'vite-plugin-index-html';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from '@vant/auto-import-resolver';

import * as url from './url'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), htmlPlugin({
    input: './src/main.ts',
    preserveEntrySignatures: 'exports-only',
  }),
  AutoImport({
    resolvers: [ElementPlusResolver(), VantResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver(), VantResolver()],
  }),],
  base: '/',
  server: {
    https: url.HTTPS,
    host: url.IP,
    port: 9300,
    proxy: {
      '/api': {
        target: 'http://10.23.181.13:8098', // 代理目标地址
        changeOrigin: true, // 开启跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 去掉请求路径中的 '/api' 前缀

      }
    }
  }
});
