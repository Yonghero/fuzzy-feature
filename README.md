![](https://img.shields.io/badge/component-fuzzy-red.svg?style=for-the-badge&logo=Vue.js ) ![](https://img.shields.io/badge/npm-v8.5.2-orange?style=for-the-badge&logo=npm& )


### fuzzy-feature

> 基于 ```vue3 ``` ```typescript``` 制作的配置式的后台管理框架


- [介绍](#介绍)
- [安装](#安装)
- [配置](#配置)
- [举个例子](#举个例子)


### 介绍

起点是通过 ``` createFuzzyApp ``` 函数生成一个可供``` vue.use ```安装的插件，该插件的作用是在任意``` .vue```文件中使用一个全局组件，组件名称可配置，默认为 ``` <FuzzyViewer/> ```, 给该组件传递特定的配置，即可生成一个标准的后台管理页面（查询、新增、修改、编辑、...）

***管理页面使用到的UI组件为``` FuzzyUI ``` 也为我司基于element-plus组件库封装的组件库，再使用fuzzy-feature框架时，需提前安装FuzzyUI, UI的安装方式请查阅 [FuzzyUI静态站点](https://github.com/Yonghero/fuzzy-ui)***

### 安装

```shell
$ pnpm add fuzzy-feature
```
---

```ts
// FILE -> main.ts

// 请提前安装FuzzyUI... 以下代码无UI的具体安装过程。
import { createApp } from 'vue'
import App from './App.vue'
import {
  DefaultLayoutProvider,
  FuzzyUIRenderer,
  HttpImp,
  createFuzzyApp,
} from 'fuzzy-feature'

// 以下的每一项配置会在后面进行详细的介绍
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

const app = createApp(App)

// 配置后，可在任意.vue页面中使用 名为 <FuzzyViewer/> 的全局组件
app.use(fuzzyApp, { name: 'FuzzyViewer' })
```

### 配置

- ### createFuzzyApp(config)
  - ### config.renderer
    > 页面展示的UI实现层，默认提供FuzzyUI, 你也可以选择AntDesign, 不过需要自己实现AntDesign的UI层, 并不困难, 如有需要请看[FuzzyUI是怎么实现桥接的](https://github.com/Yonghero/fuzzy-feature/tree/main/packages/renderer/src/fuzzy-ui), 当然也可以联系作者[younghero](yxzhang@hitotek.com)来实现。
  - ### config.layout
    > 页面的布局方式, 比如查询组件应该放置在哪里，分页组件如何摆放，该配置是用来实现各个部分功能组件的摆放方式，高度灵活的页面布局的组织方式，最常见的是，某一些页面不需要查询条件时，我该怎么做，可直接在该在布局配置中注释查询组件的代码即可。[实现方式一看便知](https://github.com/Yonghero/fuzzy-feature/blob/main/packages/layout-provider/src/default-layout-provider.tsx)

  - config.http
    > fuzzy-feature 提供了标准的后台管理页面，那如何对接后端接口呢？ 就是这个配置了！查询一般为get请求所以需要去对接一下get请求, 框架提供请求参数，请求成功后框架需要接受的数据是需要固定的格式的, 类比新增post、删除delete、编辑patch都是相同的处理方式, 这个文件需要使用该框架的人自己实现一遍, 毕竟不是每一个后端的返回格式都是统一的, 放心, 实现起来很简单[这是个例子](https://github.com/Yonghero/fuzzy-feature/blob/main/packages/core/http/src/default-http-adapaters.ts)


### 举个例子

``` js
// page.vue

// 组件可以传递的配置请看下面的详细讲解
<template>
  <FuzzyViewer 
    :options="options" 
    :handlers="handlers"
    :renderer="renderer"
    :extraRenderer="[h('button', '导出')]"
  />
</template>

<script setup>

  const options = ...
  const handlers = ...
  const renderer = new FuzzyUIRenderer()

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
