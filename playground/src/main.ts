import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

// @ts-expect-error anyway
import FuzzyUI from '@hitotek/fuzzy-ui'
import type { Templates } from 'packages/core/src/types/options'
import { DefaultLayoutProvider, FuzzyUIRenderer, HttpImp, createFuzzyApp } from '../../packages/core/index'
import type { FuzzyPlugin } from './../../packages/renderer/types-renderer'
import App from './App.vue'

import '@hitotek/fuzzy-ui/style' // UI 样式
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'element-plus/dist/index.css'

class FixedTemplatesPlugin implements FuzzyPlugin {
  install(templates: Templates[]) {
    templates[0].fixed = true
    return templates
  }
}

const fuzzyApp = createFuzzyApp({
  renderer: new FuzzyUIRenderer(),
  http: new HttpImp(),
  layout: DefaultLayoutProvider,
  lang: {
    update: '编辑',
    delete: '删除',
    create: '新增',
    success: '成功',
    warning: '警告',
    fail: '错误',
  },
  paging: {
    current: 'current',
    size: 'size',
  },
  plugins: [new FixedTemplatesPlugin()],
})

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app.use(FuzzyUI)
app.use(fuzzyApp)

app.use(router)
app.mount('#app')
