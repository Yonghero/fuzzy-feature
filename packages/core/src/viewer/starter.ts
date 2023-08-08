import type { Renderer } from 'packages/renderer/types-renderer'
import type { HttpAdapters } from 'packages/http'
import type { OptionsConfiguration } from '../types/options'
import { createFilter } from './createFilter'
import { createTable } from './createTable'
import { createDataProvider } from './createDataProvider'
import { createPagination } from './createPagination'
import { createDialogForm } from './createDialogForm'

export interface StarterOptions {
  renderer: Renderer
  options: OptionsConfiguration
  http: HttpAdapters
}

export function starter({ renderer, options, http }) {
  const provider = createDataProvider()

  // 创建查询组件
  const filter = createFilter(renderer.filter.render, options)

  // 创建表格组件
  const table = createTable(renderer, options, provider)

  // 创建分页组件
  const pagination = createPagination(renderer.pagination.render, options, provider)

  // 创建表单对话框
  const dialogForm = createDialogForm(renderer.dialogForm.render, options, provider)

  return {
    components: {
      filter,
      table,
      pagination,
      dialogForm,
    },
  }
}
