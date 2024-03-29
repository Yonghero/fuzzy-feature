import { unref } from 'vue'
import type { Renderer } from 'packages/renderer/types-renderer'
import type { HttpAdapters } from 'packages/core/http/types-http'
import type { OptionsConfiguration } from '../types/options'
import { createFilter } from './createFilter'
import { createTable } from './createTable'
import { createDataProvider } from './createDataProvider'
import { createPagination } from './createPagination'
import { createDialogForm } from './createDialogForm'
import { createExtra } from './createExtra'
import { createHttp } from './createHttp'
import createDelete from './createDelete'

export interface StarterOptions {
  renderer: Renderer
  options: OptionsConfiguration
  http: HttpAdapters
}

export function starter({ renderer, http, activatedProps, templates }) {
  // 全局数据提供者
  const dataProvider = createDataProvider()

  // 请求提供
  const httpProvider = createHttp(unref(activatedProps.options), unref(activatedProps.handlers), http, dataProvider)
  // 创建表单对话框
  const { render: dialogForm, invokeCreateEvent, invokeUpdateEvent } = createDialogForm(renderer, unref(activatedProps.options), dataProvider, httpProvider, unref(activatedProps.handlers))

  // 创建查询组件
  const filter = createFilter(renderer.filter, unref(activatedProps.options), httpProvider)

  // 创建扩展组件
  const extra = createExtra(renderer, unref(activatedProps.options), unref(activatedProps.extraRenderer), invokeCreateEvent)

  const { render, invokeDeleteEvent } = createDelete(renderer, unref(activatedProps.options), dataProvider, httpProvider, unref(activatedProps.handlers))

  // 创建表格组件
  const table = createTable(renderer, activatedProps, templates, dataProvider, unref(activatedProps.handlers), invokeDeleteEvent, invokeUpdateEvent)

  // 创建分页组件
  const pagination = createPagination(renderer.pagination, unref(activatedProps.options), dataProvider, httpProvider)

  return {
    components: {
      filter,
      table,
      pagination,
      dialogForm,
      extra,
      delete: render,
    },
  }
}
