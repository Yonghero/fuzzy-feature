import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

import FuzzyUI from '@hitotek/fuzzy-ui'
import type { FuzzyPlugin, Templates } from '../../packages'
import { DefaultLayoutProvider, FuzzyUIRenderer, HttpImp, createFuzzyApp } from '../../packages'
import App from './App.vue'

import '@hitotek/fuzzy-ui/style' // UI 样式
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

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

app.config.warnHandler = (msg) => {
  if (msg.includes('[Vue warn]: Invalid prop: type check failed for prop "loading". Expected Object, got Boolean with value false. '))
    return null
  if (msg.includes('Invalid prop: type check failed for prop "style". Expected Object, got String with value "height'))
    return null
  return msg
}
