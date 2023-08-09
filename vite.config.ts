import * as path from 'node:path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      'packages/': `${path.resolve(__dirname, './packages')}/`,
    },
    extensions: ['.tsx', '.ts'],
  },

  build: {
    lib: {
      entry: path.resolve(__dirname, './packages/core/index.ts'),
      name: 'fuzzy-feature',
      fileName: format => `fuzzy-feature.${format}.js`,
    },
    outDir: path.resolve(__dirname, './dist'),
    emptyOutDir: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus', 'elementPlus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'vue': 'Vue',
          'element-plus': 'ElementPlus',
          '@hitotek/fuzzy-ui': '@hitotek/fuzzy-ui',
        },
      },
    },
  },
})
