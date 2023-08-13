![](https://img.shields.io/badge/component-fuzzy-red.svg?style=for-the-badge&logo=Vue.js ) ![](https://img.shields.io/badge/npm-v8.5.2-orange?style=for-the-badge&logo=npm& )



### Fuzzy-Feature

> 基于 ```vue3 ``` ```typescript``` 制作的可配置式的后台管理框架为**Fuzzy**系列的核心



### 在 vue3 项目中的使用方法


### 配置 FuzzyFeature
```ts
import {
  DefaultLayoutProvider, // 默认布局
  FuzzyUIRenderer, // Fuzzy系列的UI布局
  HttpImp, // 接口对接实现层
  createFuzzyApp,
} from 'fuzzy-feature'

export function setupFuzzyViewer(app) {

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
  })

  app.use(fuzzyApp, { name: 'FuzzyViewer' })
}
```

### 安装FuzzyFeature
```ts
// main.ts

import { createApp } from 'vue'
import FuzzyUI from '@hitotek/fuzzy-ui'
import { setupFuzzyViewer } from './setup-fuzzy.js'

const app = createApp(App)

// 使用Fuzzy系UI
app.use(FuzzyUI)

// 按照全局组件
setupFuzzyViewer(app)
```

### 使用FuzzyFeature

``` js
// App.vue

<template>
  <FuzzyViewer 
    :options="options" 
    :handlers="handlers"
  />
</template>

<script setup>

  const options = ...
  const handlers = ...

</script>
```

### 组件的props介绍

- 核心options [文档地址](https://github.com/Yonghero/fuzzy-feature/blob/main/packages/core/src/types/options.ts)

- 各类生命钩子handlers [文档地址](https://github.com/Yonghero/fuzzy-feature/blob/main/packages/core/src/types/handlers.ts
)

- 渲染器renderer 默认使用全局配置的渲染器[文档地址](https://github.com/Yonghero/fuzzy-feature/tree/main/packages/renderer/src/fuzzy-ui)

- 组件的布局layout 默认使用全局配置的布局[文档地址](https://github.com/Yonghero/fuzzy-feature/blob/main/packages/layout-provider/src/default-layout-provider.tsx)

- 接口桥接http 默认使用全局配置的httpImpl [文档地址](https://github.com/Yonghero/fuzzy-feature/blob/main/packages/core/http/src/default-http-adapaters.ts)

- 扩展额外的组件extraRenderer [文档地址](https://github.com/Yonghero/fuzzy-feature/blob/main/packages/renderer/types-renderer.ts)

- 组件标题title 只有在多Tab下才传递 单Tab采用options配置里的title
